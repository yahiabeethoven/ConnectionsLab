let express = require("express");
let app = express();
const PORT = 3000;

// the list of top songs was inspired from https://happymag.tv/10-most-popular-songs-in-the-world-youtube/
let songs = {
    "1": {
         "name": "Despacito",
         "artist": "Luis Fonsi ft. Daddy Yankee",
         "year": "2017",
         "views": "7.9",
         "url": "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
    },
    "2": {
         "name": "Shape of You",
         "artist": "Ed Sheeran",
         "year": "2017",
         "views": "5.8",
         "url": "https://www.youtube.com/watch?v=JGwWNGJdvx8"  
    },
    "3": {
         "name": "See You Again",
         "artist": "Wiz Khalifa ft. Charlie Puth",
         "year": "2015",
         "views": "5.7",
         "url": "https://www.youtube.com/watch?v=RgKAFK5djSk&t=1s"  
     },
     "4": {
         "name": "Uptown Funk",
         "artist": "Mark Ronson ft. Bruno Mars",
         "year": "2014",
         "views": "4.7",
         "url": "https://www.youtube.com/watch?v=OPf0YbXqDm0"  
     },
     "5": {
         "name": "Gangam Style",
         "artist": "PSY",
         "year": "2012",
         "views": "4.6",
         "url": "https://www.youtube.com/watch?v=RgKAFK5djSk&t=1s"  
     },
     "6": {
         "name": "See You Again",
         "artist": "El Chombo ft. Cutty Ranks",
         "year": "2018",
         "views": "4.1",
         "url": "https://www.youtube.com/watch?v=FzG4uDgje3M"  
     },
     "7": {
         "name": "Sugar",
         "artist": "Maroon 5",
         "year": "2015",
         "views": "3.7",
         "url": "https://www.youtube.com/watch?v=09R8_2nJtjg"  
     },
     "8": {
         "name": "Roar",
         "artist": "Katy Perry",
         "year": "2013",
         "views": "3.7",
         "url": "https://www.youtube.com/watch?v=CevxZvSJLk8"  
     },
     "9": {
         "name": "Counting Stars",
         "artist": "OneRepublic",
         "year": "2013",
         "views": "3.7",
         "url": "https://www.youtube.com/watch?v=hT_nvWreIhg"  
     },
     "10": {
         "name": "Sorry (PURPOSE : The Movement)",
         "artist": "Justin Bieber",
         "year": "2015",
         "views": "3.6",
         "url": "https://www.youtube.com/watch?v=fRh_vgS2dFE"  
     },
     "11": {
         "name": "Thinking Out Loud",
         "artist": "Ed Sheeran",
         "year": "2014",
         "views": "3.5",
         "url": "https://www.youtube.com/watch?v=lp-EO5I60KA"  
     },
     "12": {
         "name": "You Belong With Me",
         "artist": "Taylor Swift",
         "year": "2008",
         "views": "1.4",
         "url": "https://www.youtube.com/watch?v=VuNIsY6JdUw"  
     }
 }

app.use("/", express.static("public"));

app.get("/songs", (req, res) => {
    let singleName = req.query.single;
    if (songs[singleName]) {
        res.json(songs[singleName]);
    }
    else {
        res.json({"name": "data does not exist"});
    }
    
})
app.get("/song/:single", (req, res) => {
    let singleName = req.params.single;
    console.log(singleName);
    res.json(songs[singleName]);
})

app.listen(PORT, () => {
    console.log("Server is running on port: "+PORT);    
})