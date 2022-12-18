let socket = io();

let poseNet;
let pose;
let skeleton;
let MIRROR_VIDEO_FEED = true;
let myAudio;
let constraints;
let receivedSound;

let videoToSend;
let backgroundButtons;
let backgroundSelected;

let canvasWidth = 921;
let canvasHeight = 691;

let videoWidth = canvasWidth;
let videoHeight = canvasHeight;

let drum1sound;
let drum2sound;
let drum3sound;

let drum1, drum1img, drum1touch;
let drum2, drum2img, drum2touch;
let drum3, drum3img, drum3touch;

let guitar1sound;
let guitar2sound;
let guitar3sound;
let guitar4sound;

let guitar1, guitar1img, guitar1touch;
let guitar2, guitar2img, guitar2touch;
let guitar3, guitar3img, guitar3touch;
let guitar4, guitar4img, guitar4touch;

let p5l;

let myVideo;
let otherVideo;
let myCanvas;

let drummerClient;
let guitaristClient;
let clientId;

let backgroundSong1;
let backgroundSong2;
let backgroundSong3;
let backgroundSong4;

function preload() {
  drum1img = loadImage("assets/drum1.png");
  drum2img = loadImage(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drum2.png?v=1670800786888"
  );
  drum3img = loadImage("assets/drum3.png");
  drum4img = loadImage(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drum4.png?v=1670803281642"
  );

  drum1sound = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy1%20(1).mp3?v=1670802960355"
  );
  drum2sound = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy4.mp3?v=1670802970263"
  );
  drum3sound = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy3.mp3?v=1670802966463"
  );
  drum4sound = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy2.mp3?v=1670802962242"
  );

  guitar1img = loadImage(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/guitar2.png?v=1670758056375"
  );
  guitar2img = loadImage(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/guitar1.png?v=1670757585438"
  );
  guitar3img = loadImage(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/guitara-removebg-preview.png?v=1670764297930"
  );
  guitar4img = loadImage(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/square4.png?v=1670798038194"
  );

  guitar1sound = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/guitarsound.wav?v=1670764349221"
  );
  guitar2sound = loadSound("assets/drum3.wav");
  guitar3sound = loadSound("assets/drum3.wav");
  guitar4sound = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/synth4.mp3?v=1670799618423"
  );

  backgroundSong1 = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/Europe%20-%20The%20Final%20Countdown%20(Synthless%20Mix).mp3?v=1670805330369"
  );
  backgroundSong2 = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/bgsong2.mp3?v=1670811365241"
  );
  backgroundSong3 = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/Tame%20Impala%20-%20Let%20It%20Happen%20(Soulwax%20Remix)%20(Official%20Audio).mp3?v=1670811495852"
  );
  backgroundSong4 = loadSound(
    "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/bgsong4.mp3?v=1670812626865"
  );
}

roomCode = window.location.pathname;
roomCode = roomCode.substring(1, roomCode.length - 1);

let p5lset = false;
let videoStreams = [];

function TimeToggle(el) {
  if (el.checked) {
    backgroundSelected = el.value;
  } else {
    console.log("BACKGROUND MUSIC NOT SELECTED");
    backgroundSelected = " ";
  }
  console.log(backgroundSelected);

  if (backgroundSelected.includes("1")) {
    if (backgroundSelected == "backgroundSong1") {
      el.checked = true;
      p5l.socket.emit("backgroundMusicInfo", "backgroundSong1");
    } else {
      el.checked = false;
      console.log("STOP 1 _____________________");
      p5l.socket.emit("backgroundMusicInfo", "stop1");
    }
  }

  if (backgroundSelected.includes("2")) {
    if (backgroundSelected == "backgroundSong2") {
      el.checked = true;
      p5l.socket.emit("backgroundMusicInfo", "backgroundSong2");
    } else {
      el.checked = false;
      console.log("STOP 2 _____________________");
      p5l.socket.emit("backgroundMusicInfo", "stop2");
    }
  }
  if (backgroundSelected.includes("3")) {
    if (backgroundSelected == "backgroundSong3") {
      el.checked = true;
      p5l.socket.emit("backgroundMusicInfo", "backgroundSong3");
    } else {
      el.checked = false;
      console.log("STOP 3 _____________________");
      p5l.socket.emit("backgroundMusicInfo", "stop3");
    }
  }
  if (backgroundSelected.includes("4")) {
    if (backgroundSelected == "backgroundSong4") {
      el.checked = true;
      p5l.socket.emit("backgroundMusicInfo", "backgroundSong4");
    } else {
      el.checked = false;
      console.log("STOP 4 _____________________");
      p5l.socket.emit("backgroundMusicInfo", "stop4");
    }
  }
}

window.addEventListener("load", () => {
  const radioButtons = document.querySelectorAll('input[type="radio"');
  const helpText = document.querySelector("#help");

  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("click", () => {
      instrument = document.querySelector(
        'input[name="instrument"]:checked'
      ).value;
      console.log(
        document.querySelector('input[name="instrument"]:checked').value
      );
      if (instrument == "drums") {
        p5l.socket.emit("instrumentInfo", "Drummer");

        if (drummerClient) {
          videoStreams[0] = drummerClient;
        } else {
          drummerClient = new Drummer(
            myVideo,
            clientId,
            canvasWidth,
            canvasHeight,
            videoWidth,
            videoHeight / 2
          );
          videoStreams[0] = drummerClient;
        }
      } else if (instrument == "guitar") {
        p5l.socket.emit("instrumentInfo", "Guitarist");

        if (guitaristClient) {
          videoStreams[0] = guitaristClient;
        } else {
          guitaristClient = new Guitarist(
            myVideo,
            clientId,
            canvasWidth,
            canvasHeight,
            videoWidth,
            videoHeight / 2
          );
          videoStreams[0] = guitaristClient;
        }
      }

      videoStreams[0].p5l = p5l;
    });
  }
});

function setup() {
  myCanvas = createCanvas(canvasWidth, canvasHeight);
  myCanvas.parent("canvas-container");

  myVideo = createCapture(VIDEO, function (stream) {
    print(window.location.hostname);
    p5l = new p5LiveMedia(
      this,
      "CAPTURE",
      stream,
      roomCode,
      window.location.hostname
    );

    p5l.on("stream", gotStream);
    p5l.on("data", gotData);
    p5l.on("disconnect", gotDisconnect);

    p5l.socket.on("redirect", () => {
      window.location.href = "roomFull";
    });

    p5l.socket.on("instrumentList", (data) => {
      instrumentList = data;
      print(instrumentList);

      print(videoStreams.length);
      for (let i = 1; i < videoStreams.length; i++) {
        for (socketId in instrumentList) {
          // print(socketId);
          if (socketId == videoStreams[i].socketId) {
            videoStreams[i].instrumentName = instrumentList[socketId];
          }
        }
      }
    });

    p5l.socket.on("backgroundMusicList", (data) => {
      backgroundMusicList = data;
      print(backgroundMusicList);

      print(videoStreams.length);
      for (let i = 1; i < videoStreams.length; i++) {
        for (socketId in backgroundMusicList) {
          // print(socketId);
          if (socketId == videoStreams[i].socketId) {
            videoStreams[i].backgroundMusicName = backgroundMusicList[socketId];
          }
        }
      }
    });
  });

  myVideo.muted = true;
  myVideo.hide();

  if (myVideo != null) {
    drummerClient = new Drummer(
      myVideo,
      "temp",
      canvasWidth,
      canvasHeight,
      videoWidth,
      videoHeight / 2
    );

    videoStreams.push(drummerClient);
    document.querySelector('input[value="drums"]').checked = true;
  }
}

function draw() {
  background(220);
  tint(255, 255, 255, 255);

  for (let i = 1; i < videoStreams.length; i++) {
    videoStreams[i].draw(videoWidth / 2, ((i - 1) * videoHeight) / 2);
  }
  videoStreams[0].draw(0, 0);

  if (!p5lset) {
    videoStreams[0].p5l = p5l;
    if (videoStreams[0].p5l) {
      clientId = p5l.socket.id;
      videoStreams[0].socketId = clientId;
      p5lset = true;
    }
  }

  //   if (getInstrumentName(videoStreams[0]) == "Drummer") {
  //   }
  //   else if (getInstrumentName(videoStreams[0]) == "Guitarist") {
  //   }

  //   if (getBackgroundMusicName(videoStreams[0]) == "backgroundSong1") {
  //     console.log("background song 1!!!!!");
  //   }
  //    if (getBackgroundMusicName(videoStreams[0]) == "backgroundSong2") {
  //     console.log("background song 2!!!!!");
  //   }
  //    if (getBackgroundMusicName(videoStreams[0]) == "backgroundSong3") {
  //     console.log("background song 3!!!!!");
  //   }
  //    if (getBackgroundMusicName(videoStreams[0]) == "backgroundSong4") {
  //     console.log("background song 4!!!!!");
  //   }
}

function gotStream(stream, id) {
  stream.hide();
  videoStreams.push(new Camera(stream, id, videoWidth, videoHeight));

  for (let i = 1; i < videoStreams.length; i++) {
    for (socketId in instrumentList) {
      if (socketId == videoStreams[i].socketId) {
        videoStreams[i].instrumentName = instrumentList[socketId];
      }
    }

    for (socketId in backgroundMusicList) {
      if (socketId == videoStreams[i].socketId) {
        videoStreams[i].backgroundMusicName = backgroundMusicList[socketId];
      }
    }
  }
}

function gotData(data, id) {
  let backgroundElements = document.querySelectorAll('input[type="checkbox"');
  print(id + ":" + data);

  let d = JSON.parse(data);
  console.log(d);
  switch (d) {
    case "drum1sound":
      drum1sound.play();
      break;
    case "drum2sound":
      drum2sound.play();
      break;
    case "drum3sound":
      drum3sound.play();
      break;
    case "guitar1sound":
      guitar1sound.play();
      break;
    case "guitar2sound":
      guitar2sound.play();
      break;
    case "guitar3sound":
      guitar3sound.play();
      break;
    case "guitar4sound":
      guitar4sound.play();
      break;
    case "backgroundSong1":
      backgroundElements[0].checked = true;
      if (!backgroundSong1.isPlaying()) {
        backgroundSong1.play();
      }
      break;
    case "stop1":
      backgroundElements[0].checked = false;
      backgroundSong1.stop();
      break;
    case "backgroundSong2":
      backgroundElements[1].checked = true;
      if (!backgroundSong2.isPlaying()) {
        backgroundSong2.play();
      }
      break;
    case "stop2":
      backgroundElements[1].checked = false;
      backgroundSong2.stop();
      break;
    case "backgroundSong3":
      backgroundElements[2].checked = true;
      if (!backgroundSong3.isPlaying()) {
        backgroundSong3.play();
      }
      break;
    case "stop3":
      backgroundElements[2].checked = false;
      backgroundSong3.stop();
      break;
    case "backgroundSong4":
      backgroundElements[3].checked = true;
      if (!backgroundSong4.isPlaying()) {
        backgroundSong4.play();
      }
      break;
    case "stop2":
      backgroundElements[3].checked = false;
      backgroundSong4.stop();
      break;
  }
}

function gotDisconnect(id) {
  for (let i = 1; i < videoStreams.length; i++) {
    if (videoStreams[i].socketId == id) {
      videoStreams.splice(i, 1);
      break;
    }
  }
}

function gotInstrumentList(data) {
  console.log(data);
}
function gotBackgroundMusicList(data) {
  console.log(data);
}

function getInstrumentName(inst) {
  if (inst instanceof Drummer) {
    return "Drummer";
  } else if (inst instanceof Guitarist) {
    return "Guitarist";
  }
}

function getBackgroundMusicName(inst) {
  if (inst.backgroundMusicName == "backgroundSong1") {
    return "backgroundSong1";
  }
  if (inst.backgroundMusicName == "backgroundSong2") {
    return "backgroundSong2";
  }
  if (inst.backgroundMusicName == "backgroundSong3") {
    return "backgroundSong3";
  }
  if (inst.backgroundMusicName == "backgroundSong4") {
    return "backgroundSong4";
  }
}
