---
title: Homeserver Setup with Cloudflare, Traefik & Docker
date: 2026-01-09
description: Complete guide to setting up a homeserver using Cloudflare Tunnel for TLS/SSL, Traefik as reverse proxy, Nginx, Docker services, and systemd integration.
tags: [homeserver, docker, traefik, cloudflare, nginx, devops]
author:
  name: Giray Coskun
  avatar: https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4
---

## Contents

1. [Intro](#intro)
2. [Architecture](#architecture)
3. [Cloudflare Tunnel](#cloudflare)
4. [Traefik Reverse Proxy](#traefik)
5. [Docker & Services](#docker)
6. [Systemd Services](#systemd)
7. [Conclusion](#conclusion)

## Intro {#intro}

Setting up a homeserver that's accessible from the internet requires careful consideration of security, SSL/TLS certificates, reverse proxying, and service management. This guide walks through a production-ready setup using:

- **Cloudflare Tunnel** for secure external access with automatic TLS/SSL
- **Traefik** as a reverse proxy for routing and load balancing
- **Docker** for containerized services
- **Nginx** for serving static sites
- **systemd** for service management

## Architecture {#architecture}

The setup follows this architecture:

```
Internet → Cloudflare Tunnel → Traefik → Services (Docker containers, Nginx)
                                   ↓
                           SSL/TLS termination
                           Routing & load balancing
```

Key components:
- Cloudflare Tunnel handles external access and provides TLS certificates
- Traefik acts as reverse proxy, routing requests to appropriate services
- Docker runs containerized applications (databases, apps, etc.)
- Nginx serves static websites
- systemd manages all services as system daemons

## Cloudflare Tunnel {#cloudflare}

Cloudflare Tunnel (formerly Argo Tunnel) creates a secure connection from your server to Cloudflare's edge network without opening inbound ports.

### Setup Steps

1. Install cloudflared:
```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

2. Authenticate:
```bash
cloudflared tunnel login
```

3. Create tunnel:
```bash
cloudflared tunnel create myserver
```

4. Configure routing in `config.yml`:
```yaml
tunnel: <tunnel-id>
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: example.com
    service: http://localhost:8080
  - service: http_status:404
```

5. Run as systemd service:
```bash
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

## Traefik Reverse Proxy {#traefik}

Traefik automatically discovers services and configures routing.

### docker-compose.yml

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    restart: unless-stopped
```

## Docker & Services {#docker}

Example service with Traefik labels:

```yaml
services:
  whoami:
    image: traefik/whoami
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`whoami.example.com`)"
      - "traefik.http.routers.whoami.entrypoints=web"
    restart: unless-stopped
```

## Systemd Services {#systemd}

Create a systemd service for your Docker Compose stack:

```ini
[Unit]
Description=Homeserver Docker Services
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/homeserver
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable homeserver
sudo systemctl start homeserver
```

## Conclusion {#conclusion}

This setup provides:
- ✅ Secure external access without port forwarding
- ✅ Automatic TLS/SSL certificates
- ✅ Easy service discovery and routing
- ✅ Containerized applications
- ✅ System-level service management

For more details, check out the [Cloudflare Tunnel docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) and [Traefik documentation](https://doc.traefik.io/traefik/).
