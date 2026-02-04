---
title: "Side Project: Tally IOS App"
createdAt: 2026-02-03
updatedAt: 2026-02-04
description: A simple and minimalist ios app for habit tracking. Built with Swift and SwiftUI.
tags: [developer, ios, swift]
author:
  name: Giray Coskun
  avatar: https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4
draft: true
---

## Intro

Everyone has its own idea of a habit tracker and in addition to that all available apps which I liked, limit number of habits. I thought why not with the help of coding agents it became possible to create a working version on an afternoon. So here it is, Tally -

A simple habit tracking app for iOS with GitHub-style contribution grids, analytics and reminders.

<div class="flex flex-wrap justify-center gap-4">
  <figure class="w-[48%] text-center">
    <img src="https://images.giraycoskun.dev/ss-tally-home.png" 
         alt="Tally App Screenshot 1" 
         class="w-full h-auto rounded-md shadow-md" />
    <figcaption class="-mt-5 text-md text-gray-600">Habit List</figcaption>
  </figure>

  <figure class="w-[48%] text-center">
    <img src="https://images.giraycoskun.dev/ss-tally-reminders.png"
          alt="Tally App Screenshot 3"
          class="w-full h-auto rounded-md shadow-md" />
        <figcaption class="-mt-5 text-md text-gray-600">Reminders</figcaption>
    </figure>

   <figure class="w-[48%] text-center">
        <img src="https://images.giraycoskun.dev/ss-tally-reminders.png"
            alt="Tally App Screenshot 3"
            class="w-full h-auto rounded-md shadow-md" />
        <figcaption class="-mt-5 text-md text-gray-600">Reminders</figcaption>
    </figure>

  <figure class="w-[48%] text-center">
    <img src="https://images.giraycoskun.dev/ss-tally-stats.png" 
         alt="Tally App Screenshot 2" 
         class="w-full h-auto rounded-md shadow-md" />
    <figcaption class="-mt-5 text-md text-gray-600">Analytics</figcaption>
  </figure>
</div>

## How to Load without Apple Developer Account

You can load the app on your own device without Apple Developer Account using Xcode or Altstore.
Altstore has auto refresh feature so you don't need to re-install every 7 days like with Xcode.

- Build with Xcode (Product -> Clean Build Folder, then Product -> Build)
- Open Product Build Folder (Product -> Show Build Folder in Finder)
- Locate the .app file in the Build folder
- Create a Payload folder and place the .app file inside
- Compress the Payload folder into a .zip file change the extension to .ipa 
- (I couldn't airdrop the .ipa file so i airdropped the .zip file and renamed it on the device)
- Send the file to your iOS device (AirDrop, Email, etc.)
- Open Altstore on your iOS device
- Go to My Apps tab and tap the + icon on the top left
- Select the .ipa file you sent to your device

## Features

## Roadmap
