# Body-Beat: a Connection Lab project
### Youssef Aouni & Yahia Beethoven    
## Concept:
Body beat is a unique web application that allows users to collaborate and create music by utilizing their bodies.
Through the utilization of motion-tracking technology, users can play various instruments by making specific body movements. This allows for a truly 
interactive experience that allows two people to create music together without having to be in the same physical space. Our team believes that it is 
hay time to rethink the way people connect online and rethink the way we interact and connect online from a new perspective. Body-beat is an attempt
to encourage people to connect in a unique and fun way that includes physical movement, making art and unleashing their creativity. the platform has 
been designed to be user-friendly and intuitive. It featuring a basic user interface with a video feed that connects two users, as well as a set of
instruments that each user can choose from that can be drums or synth sounds. Through the use of motion tracking and a camera, the platform can detect 
the movements of each user and interpret them as notes on the corresponding instrument. This allows the two users to create music together in real-time or add sounds to famous songs,regardless of distance.
## Design:
Body-Beat is especially engineered to have a straightforward and intuitive design in order to provide the users with a frictionless interaction with the website. Moreover, the pastel color palette, use of emojis, and big clear buttons, have been purposely implemented to appeal to the younger generations as much as the older generation. Body-Beat aims to be an attractive website that would appeal to all age ranges, that can be seamlessly used by everyone.
Once the users are in a room they have the option of choosing the instruments they would like to play with their wrists( drums or synths). Moreover, the users have the choice of playing a background song from four different categories (Rock, Wavey, house, silly) that they can edit creatively by adding on sounds on their own.
## Tools:
Body-Beat required a lot of different tools and techniques inorder to perfect all the features. here is the list of the tools we used:
- PoseNet, ml5 library has been used to detect the users body movement and predict the position of the arms and the wrists.
- P5 Live Media, developed and made available by the ITP in New York University, allowed us to run your signaling server by running server.js (with       Node, Express and Socket.io). This tool has allowed us to share direct video and data feed from users.
- P5, we used p5 as it was able to run the ml5 library and P5 live media and thus all the web-app had been developed through P5.
- Glitch, allowed us to host our website.
## technical difficulties:
### Styling video feed: 
despite being able to share video feed from the users, styling the video window was a challenge as it was displayed in a peculiar 
way and was challenging to re-style. However, we were able to have the two video feeds share a required square in the middle of the page.
### Sharing-Data: 
In order to have a seamless user experience the sound of the instruments needed to be produced upon contact of the wrist's coordinates with the instrument on the screen. Therefore, it was necessary to implement a system that would share with the other user the signals that would generate  the sounds activated. Using the Sharing Data function in P5 Livemedia we were able to share the required data. 
### background music:
One of the biggest challenges was implementing a system that allows the users to play background music. This feature had a lot of hidden challenges because it needs to allow the users to play a song and have it broadcasted to the other user then stopped once they decide to stop it. This issue has made implementing the feature challenging since the music needs to be coordinated and the second user needs to be aware of which song is playing.
### recording the sounds:
In order to make the web application more engaging and interesting the sounds of the instruments need to seem professional and appealing. However, due to the shortage of available special sound effects online we had to improvise. We manually recorded and edited all the sound effects from different sources and added them to our product. Thus, we were able to provide high end, interesting sounds.

## Future-aspirations:
We would like to further develop body-beat in the future. We would like to add more instruments such as guitar or piano and background more songs. We would also like to add some AR features to the web-app. By using poseNet, body detection software we will be able to add elements to the video feed, e.i: the users can choose a hat or an outfit that will be appropriately overlayed over the users body on the screen. 
We are also thinking of adding tone.js which will allow users to be more creative and add more detailed sounds on instruments such as piano or flute.


