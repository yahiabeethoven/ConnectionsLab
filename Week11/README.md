## This is Egypt

## Summary
For this small assignment, I made use of the very fun Aframe library. A-frame is a web framework for building 3D/AR/VR experiences and makes the integration of virtual immersive experiences with web development quite simple and easy.

## Process
I based my website on a preset example of a 3D photo gallery on Aframe, and made some changes to cutomize it to my own needs. The original example just showed some random 360 degrees images when the user clicks on their respective interactive boxes, and these boxes only contained text in them.

I amended the example such that it tells a story about my home country, Egypt. Even though Egypt has one of the most ancient civilizations in history and is very recognizable globally, there is a misleading conception that it is a plain desert with camels. In an effort to fight that stereotype while still advertising for the iconic pyramids of Giza, I allow the user to explore three very different sceneries: sklyine of Cairo metropolitan city at sunset, pyramids in the morning, and a glimpse of the unique Qaitbay castle in Alexandria.
I added icons of each of these scenes inside the boxes rather than text on a grey background to make the experience much more interesting.

Code to alternate between each of the 360 images
```
<!-- Image links. -->
      <a-entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
        <a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>
        <a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>
        <a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity>
      </a-entity>
```
Choices available to user
<img src="https://cdn.glitch.global/42245299-f247-4eb8-9b9f-baf336a35f45/Choices?v=1668964341498">

Metropolitan Cairo:
<img src="https://cdn.glitch.global/42245299-f247-4eb8-9b9f-baf336a35f45/cairo_city.jpg?v=1668961230241">

Pyramids:
<img src="https://cdn.glitch.global/42245299-f247-4eb8-9b9f-baf336a35f45/pyramids.jpg?v=1668960958608">

Qaitbay Castle in Alexandria:
<img src="https://cdn.glitch.global/42245299-f247-4eb8-9b9f-baf336a35f45/qaitbay.jpg?v=1668960362331">

# Challenges
Some challenges in making this simple website include the fact that Egypt lacks publicly available high quality landscape picture that can be used as 360 degrees images for free. Some good resources exist but require a lot of money, which is obviously not possible for me. Therefore, I tried my best to mimick 360 image sby getting almost symmetrical wide images, cropping them as fit, and converting them to 360 degree images online. 
Additionally, finding nice icons of Cairo that represent each of the themes was a bit challenging, there were mostly only icons of the pyramids, but I managed to find some others eventually.
