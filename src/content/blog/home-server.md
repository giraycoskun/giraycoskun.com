---
title: Home Server
date: 2024-12-15
id: home-server
description: Building a custom landing page for my home server with React, Vite, and TypeScript, featuring automated deployment via GitHub webhooks.
tags: [homeserver, systemd, docker, network, linux]
coverImage: "https://images.giraycoskun.dev/server-landing-page.png"
author:
  name: Giray Coskun
  avatar: https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4
draft: true
---

## Intro

I have a home server that I use for various personal projects and host open source services like jellyfin, booklore, audiobookshelf, and more. This blog is to share my journey of creating my home server from landing page to network setup.

My setup runs on:

- **OS:** Ubuntu 24.04.3 LT
- **Architecture:** x86-64
- **Kernel:** Linux 6.2.0-37-generic
- **Device:** Beelink MINIS13001
- **RAM:** 16GB DDR4
- **CPU:** Intel(R) N150

![Architecture](https://images.giraycoskun.dev/localhost.drawio.png)

## Network and Proxy Setup

I use Cloudflare Tunnel to expose my home server to the internet securely without opening ports on my router except the bittorrent port. It redirects any traffic from \*.giraycoskun.dev to my home server. Initally I configured every service port on Cloudflare Tunnel config but later switched to using Traefik as a reverse proxy to manage routing. CF Tunnel provides SSL/TLS certificates and secure connection to the server while inside server Traefik handles routing to different services based on subdomains and traffic inside is right now unencrypted HTTP.

Traefik is used as a reverse proxy to route traffic to different services based on subdomains. Most services run as containers managed by Docker Compose. Traefik discovers these services based on docker labels and routes traffic accordingly.

```
Internet → Cloudflare Tunnel → Traefik → Services (Docker containers, Nginx)
                                   ↓
                           SSL/TLS termination
                           Routing & load balancing
```

## Systemd Services

I have used systemd for services for which docker isolation creates unnecessary overhead or complexity. These include:

- **Cloudflare Tunnel:** Important for fast network access as the all network traffic goes through this tunnel.
- **Jellyfin Media Server:** Runs as a systemd service for better performance and easier access for hardware acceleration.
- **Nginx Web Server:** Serves the landing page and acts as a reverse proxy for some services. It can also serve my PoC projects that don't need containerization.
- **Qbittorrent-nox:** Runs as a systemd service to manage file download without volume mounts and integrate with jellyfin and \*arr services.
- **Wireguard VPN:** Provides remote access to bittorent client.
- **Port Forwarding**:\*\* Manages port forwarding for Wireguard VPN connections.

### Nginx Setup

Nginx for now is used to serve 3 main things:
- Landing Page and Github Webhook Listener for automatic deployment of the page
- Serve static assets for [my personal page](https://giraycoskun.com)
- Reverse Proxy for some internal services that don't need containerization

### Media Services (Jellyfin + \*arr Services)

![media-flow.drawio.png](https://images.giraycoskun.dev/media-flow.drawio.png)

### VPN and QBittorrent Setup

## Docker Services

### Traefik Config

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.whoami.rule=Host(`whoami.example.com`)"
  - "traefik.http.routers.whoami.entrypoints=web"
```

## Landing Page

I wanted a custom landing page to keep notes and port map as well as a dashboard for access to my services. I ahve more services in the LAN than the public so I have two versions of data shown on the landing page depending on if I'm accessing it from local network or external network. 2 versions are built and served by nginx based on the source IP.

You can check out the project on GitHub: [giraycoskun/server.giraycoskun.dev](https://github.com/giraycoskun/server.giraycoskun.dev)

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
  <img src="https://images.giraycoskun.dev/ss-server-local.png" alt="Server Landing Page Local" style="width: 600px; height: auto;" />
  <img src="https://images.giraycoskun.dev/ss-server-external.png" alt="Server Landing Page External" style="width: 600px; height: auto;" />
</div>

```ini
# /etc/systemd/system/server-webhook.service
[Unit]
Description=GitHub Server-Webhook Listener
After=network.target

[Service]
Type=simple
User=giraycoskun
WorkingDirectory=/home/giraycoskun/Code/server.giraycoskun.dev/
ExecStart=/home/giraycoskun/.nvm/versions/node/v24.11.1/bin/pnpm start
Restart=always

Environment="PATH=/home/giraycoskun/.nvm/versions/node/v24.11.1/bin:/usr/local/bin:/usr/bin:/bin"
EnvironmentFile=/etc/webhook-server.env
# Redirect logs to a file
StandardOutput=append:/var/log/server-webhook.log
StandardError=inherit

[Install]
WantedBy=multi-user.target
```

## Conclusion

This setup provides:

- ✅ Secure external access without port forwarding via `Cloudflare Tunnel`
- ✅ Automatic TLS/SSL certificates via `Cloudflare`
- ✅ Easy service discovery and routing via `Traefik`
- ✅ Containerized applications with `Docker`
- ✅ System-level service management with `systemd`
