window.addEventListener("load",() => {
  let songs_url;
  let songsContainer = document.getElementById("songs_container");
  for(let i =1; i < 13; i++) {
    songs_url = "/songs?single="+i.toString();
    fetch(songs_url)
    .then(res => res.json())
    .then(data => {
      let viewsLimit;
      console.log(data);
      let songName = data.name;
      let songArtist = data.artist;
      let songYear = data.year;
      let songViews = data.views;
      let songLink = data.url;

      const songObj = document.createElement("div");
      songObj.className = "song-container";
      songObj.id = "song"+i.toString();
      songsContainer.appendChild(songObj);
      let currentObjId = document.getElementById(songObj.id);

      const nameObj = document.createElement("h2");
      nameObj.innerHTML = i.toString() + ". " + songName;
      nameObj.className = "song-name";
      nameObj.id = "name"+i.toString();
      currentObjId.appendChild(nameObj);

      const artistObj = document.createElement("p");
      artistObj.innerHTML = "Artist(s): "+songArtist;
      artistObj.className = "attributes";
      artistObj.id = "artist"+i.toString();
      currentObjId.appendChild(artistObj);

      const yearObj = document.createElement("p");
      yearObj.innerHTML = "Released: "+songYear;
      yearObj.className = "attributes";
      yearObj.id = "year"+i.toString();
      currentObjId.appendChild(yearObj);

      const viewsObj = document.createElement("p");
      viewsObj.innerHTML = songViews + " views";
      viewsObj.className = "views";
      viewsObj.id = "views"+i.toString();
      currentObjId.appendChild(viewsObj);

      const linkObj = document.createElement("a");
      linkObj.href = songLink;
      linkObj.className = "song-link";
      linkObj.innerHTML = "Click to watch music video";
      linkObj.id = "link"+i.toString();
      currentObjId.appendChild(linkObj);

      let input = document.getElementById("views-input");
      input.addEventListener("submit", (e) => {
        e.preventDefault();
        viewsLimit = document.getElementById("views-input-text").value;
        console.log(viewsLimit);
        if (viewsLimit != "") {
          
        }
        for (let i = 1; i < document.getElementsByClassName("song-container").length+1; i++) {
          let currentSong = document.getElementById("song" + i.toString());
          let childNodes = currentSong.childNodes;
          if(parseFloat(document.getElementsByClassName("views")[i - 1].innerHTML) < parseFloat(viewsLimit)) {
            console.log("less than minimum");
            currentSong.style.display = "none";
          }
          else {
            currentSong.style.display = "block";
          }
        }
        
      })
    })
    
  }
  
})