[![Netlify Status](https://api.netlify.com/api/v1/badges/5eaf9a72-65e8-4007-a03d-51db74f7df06/deploy-status)](https://kwoka-spotify.netlify.app/)
<img src="https://badgen.net/badge/icon/typescript?icon=typescript&label">
<img src="https://badgen.net/github/commits/ekwoka/spotify-webapp?icon=github">

# Spotify FrontEnd Rebuild

## Summary
An Alternative to the Spotify WebApp, built with a totally new design and additional social features.

- Live Site: https://kwoka-spotify.netlify.app/
- Core Technologies: Preact, Spotify SDK, FaunaDB
- Additional Tools: esBuild, Netlify, TypeScript, TailwindCSS

---
## Longer Description

This is my attempt at recreating Spotify but with some (and, in my opinion, improved) UI/UX as well as extend it with additional features.

Design is inspired by designs from Behanced:
Mobile: [SPOTIFY REDESIGN by Heba Zatar](https://www.behance.net/gallery/110213585/SPOTIFY-REDESIGN-UIUX-DESIGN-FREE)
Desktop: [Spotify by Thalia Brittanie](https://www.behance.net/gallery/96546951/Spotify)

This project is built on top of a custom scaffold I put together I call a [PETT App](https://www.npmjs.com/package/@ekwoka/create-pett-app).

At the core is Preact (a lightweight React alternative) coupled with some custom utilities and Spotify-web-playback to enable a powerful experience.

This is complemented by esBuild for 🔥 BLAZINGLY FAST 🔥 build times. So fast there isn't a need for a special dev server.

## Unique Features

The most obvious differences are in the UI, as this isn't simply a Spotify Clone, however, the differences don't have to stop there.

The main basis for extending Spotify beyond simply a cosmetic redesign is to improve the social experience to music and podcasts. Being able to more easily and organically share music with those closest to you and discover new music through your network.

> Note: This project is still a work in progress and is not accessible by users that have not been manually approved. This is a restriction imposed by Spotify. For access, just message me!

### Party Mode

The first unique feature I implemented (after basic playback and search support) was a Party Mode! With a simple button press, a room is created housing your party playlist. A 4 letter room code is provided. 

Others logged into the app can now enter that code and join the room. They can now add songs to the playback queue and have them play from the Party Host device.

#### Challenges
##### Queue Sharing
There were some challenges implementing this feature, and at the time of writing the UX is very poor (and the code even poorer). The first was how to allow users to add songs to another users active queue while maintaining a serverless architecture. 

Using Websockets or other P2P technologies would be a fantastic solution, but they require an active server (and libraries that implement this using other servers for signalling were unwieldly).

Due to the fact that near realtime queueing was totally not required, I settled on using a noSQL database (FaunaDB) with polling. It's not the most efficient, but considering I can poll at many minutes and maintain a 'good enough' experience, this satisfied the goals of the feature reasonably well.

##### Difficulties with the Spotify SDKs
The project currently uses the spotify-web-playback SDK and a separate wrapper for the Spotify-web-api. Furthermore, this now convolutes things by adding in my own layer of the party controls. This became a significant challenge to work with. 

- Playing Songs directly uses the Web Playback SDK
- Adding songs to the queue uses Spotify-Web-Api
- Interacting with the Party Queue requires my own API Layer

I had issues with the two separate Spotify systems already, but this really cemented my goal to write my own wrapper that can better integrate the two together as well as my additional layer, possibly with an improved expansion support.

Stay Tuned for that...
