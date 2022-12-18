class Guitarist extends Camera {
  constructor(video, p5l, canvasWidth, canvasHeight, videoWidth, videoHeight) {
    super(video);
    this.p5l = p5l;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = videoWidth / 2;
    this.height = videoHeight;

    this.bottomLeftX = 0.25 * this.width;
    this.bottomLeftY = 1.2 * this.height;
    
    this.bottomRightX = 0.8 * this.width;
    this.bottomRightY = 1.2 * this.height;
    
    this.topRightX = 0.8 * this.width;
    this.topRightY = 0.25 * this.height;

    this.topLeftX = 0.25 * this.width;
    this.topLeftY = 0.25 * this.height;
    
    this.radiusX = 0.4 * this.width;
    this.radiusY = 0.35 * this.height;
    this.maxThresh = 1.12 * this.radiusX;
    this.minThresh = 1.12 * this.radiusX;
    this.wristRadius = 0.05 * this.width;
    this.guitar1;
    this.guitar2;
    this.guitar3;
    this.guitar4;
    this.guitar1img;
    this.guitar2img;
    this.guitar3img;
    this.guitar4img;
    this.guitar1sound;
    this.guitar2sound;
    this.guitar3sound;
    this.guitar4sound;
    this.guitar1touch;
    this.guitar2touch;
    this.guitar3touch;
    this.guitar4touch;
    this.skeleton;
    this.backgroundSong1;
    this.backgroundSong2;
    this.backgroundSong3;
    this.backgroundSong4;
    
    this.backgroundMusicName = "";
    this.backgroundSelected;

    this.poseNet = ml5.poseNet(video, () => {
      console.log("model ready");
    });
    this.pose;
    this.poseNet = ml5.poseNet(video, this.modelLoaded);

    this.poseNet.on("pose", (poses) => {
      if (poses.length > 0) {
        this.pose = poses[0].pose;
        this.skeleton = poses[0].skeleton;
        this.eyeR = this.pose.rightEye;
        this.eyeL = this.pose.leftEye;
        this.d = dist(this.eyeR.x, this.eyeR.y, this.eyeL.x, this.eyeL.y);
      }
    });

    this.widthMultiplier;
    this.heightMultiplier;

    this.preload();
  }

  preload() {
    this.guitar1img = loadImage(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/square2.png?v=1670796249509");
    
    
    this.guitar2img = loadImage(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/square1.png?v=1670796243622"
    );
    this.guitar3img = loadImage(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/square3.png?v=1670796304468"
    );
    
    this.guitar4img = loadImage(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/square4.png?v=1670798038194"
    );
    this.backgroundSong2 = loadSound(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/Drake%20-%20Massive.mp3?v=1670785907477"
    );

    this.guitar1sound = loadSound(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/synth1.mp3?v=1670795158226");
    this.guitar2sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/synth2.mp4?v=1670795467810");
    this.guitar3sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/synth3.mp4?v=1670795575833");
    this.guitar4sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/synth4.mp3?v=1670799618423");
    
    this.backgroundSong1 = loadSound(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/Europe%20-%20The%20Final%20Countdown%20(Synthless%20Mix).mp3?v=1670805330369"
    );
    this.backgroundSong2 = loadSound(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/bgsong2.mp3?v=1670811365241"
    );
    this.backgroundSong3 = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/Tame%20Impala%20-%20Let%20It%20Happen%20(Soulwax%20Remix)%20(Official%20Audio).mp3?v=1670811495852");
    this.backgroundSong4 = loadSound(
      "https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/bgsong4.mp3?v=1670812626865"
    );
    
    
    

    let backgroundButtons = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < backgroundButtons.length; i++) {
      backgroundButtons[i].addEventListener("change", () => {
        this.TimeToggle(backgroundButtons[i], i);
      });
    }
  }

  
  
  
  
  
  modelLoaded() {
    console.log("poseNet ready");
  }
  TimeToggle(el, i) {
    i++;
    let index = i.toString();
    console.log(index);
    if (el.checked) {
      this.backgroundSelected = el.value;
    } else {
      console.log("BACKGROUND MUSIC NOT SELECTED");
      //this.backgroundSelected = "stop1";
      this.backgroundSelected = "stop"+index;
    }

    console.log(this.backgroundSelected);

    // if (this.backgroundSelected == "backgroundSong1") {
    if (this.backgroundSelected == "backgroundSong"+index) {
      if (el.checked != true) {
        el.checked = true;
      }
      if (index == "1") {
        if (!backgroundSong1.isPlaying()) {
         this.backgroundSong1.play();
       }
      }
      else if (index == "2") {
         if (!backgroundSong2.isPlaying()) {
           this.backgroundSong2.play();
         }       
      }
       else if (index == "3") {
         if (!backgroundSong3.isPlaying()) {
           this.backgroundSong3.play();
         }       
      }
       else if (index == "4") {
         if (!backgroundSong4.isPlaying()) {
           this.backgroundSong4.play();
         }       
      }

      // this.p5l.send(JSON.stringify("backgroundSong1"));
      this.p5l.send(JSON.stringify("backgroundSong"+index));
    } else {
      
      if (el.checked == true) {
        el.checked = false;
      }
      if (index == "1") {
        this.backgroundSong1.stop();
      }
      else if (index == "2") {
        this.backgroundSong2.stop();
      }
      
      else if (index == "3") {
        this.backgroundSong3.stop();
      }
      else if (index == "4") {
        this.backgroundSong4.stop();
      }
      
      console.log("STOP 1 _____________________");
      this.p5l.send(JSON.stringify("stop"+index));
    }
    this.backgroundMusicName = this.backgroundSelected;
  }
  
  
  
  

  
  
  
  
  
//   modelLoaded() {
//     console.log("poseNet ready");
//   }

//   TimeToggle(el, index) {
//     if (el.checked) {
//       this.backgroundSelected = el.value;
//     } else {
//       console.log("BACKGROUND MUSIC NOT SELECTED");
//       this.backgroundSelected = "stop1";
//     }

//     console.log(this.backgroundSelected);

//     if (this.backgroundSelected == "backgroundSong1") {
//       if (el.checked != true) {
//         el.checked = true;
//       }
//       if (!backgroundSong1.isPlaying()) {
//         this.backgroundSong1.play();
//       }

//       this.p5l.send(JSON.stringify("backgroundSong1"));
//     } else {
//       if (el.checked == true) {
//         el.checked = false;
//       }

//       this.backgroundSong1.stop();
//       console.log("STOP 1 _____________________");
//       this.p5l.send(JSON.stringify("stop1"));
//     }
//     this.backgroundMusicName = this.backgroundSelected;
//   }

  draw(x, y) {
    this.widthMultiplier = (width * 2) / 3 / this.video.width;
    this.heightMultiplier = height / this.video.height;
    // push();
    // move image by the width of image to the left
    translate(this.width, 0);
    // then scale it by -1 in the x-axis
    // to flip the image
    tint(255, 255, 255, 255);
    scale(-1 * this.widthMultiplier, 1 * this.heightMultiplier);
    image(this.video, x, y);

    if (this.pose) {
      fill(255, 0, 0);

      this.guitar1 = new Instrument(
        this.bottomLeftX,
        this.bottomLeftY,
        this.radiusX,
        this.radiusY * 0.9,
        this.guitar1img,
        this.minThresh,
        this.maxThresh
      );

      this.guitar1touch = this.guitar1.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );

      this.guitar2 = new Instrument(
        this.topRightX,
        this.topRightY,
        this.radiusX,
        this.radiusY,
        this.guitar2img,
        this.minThresh,
        this.maxThresh
      );

      this.guitar2touch = this.guitar2.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );

      this.guitar3 = new Instrument(
        this.bottomRightX,
        this.bottomRightY,
        this.radiusX,
        this.radiusY,
        this.guitar3img,
        this.minThresh,
        this.maxThresh
      );

      this.guitar3touch = this.guitar3.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );
      
      
        this.guitar4 = new Instrument(
        this.topLeftX,
        this.topLeftY,
        this.radiusX,
        this.radiusY,
        this.guitar4img,
        this.minThresh,
        this.maxThresh
      );

      this.guitar4touch = this.guitar4.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );
      
      

      if (this.guitar1touch[0] == 1 || this.guitar1touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.guitar1.size < this.guitar1.maxSize) {
          this.guitar1.increaseRadius(20);
          if (!this.guitar1sound.isPlaying()) {
            this.guitar1sound.play();
            this.p5l.send(JSON.stringify("guitar1sound"));
          }
        }
      } else {
        tint(255, 126);

        if (this.guitar1.size > this.guitar1.minSize) {
          this.guitar1.shrinkRadius(20);
          this.guitar1sound.stop();
         
        }
      }
      this.guitar1.display();

      if (this.guitar2touch[0] == 1 || this.guitar2touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.guitar2.size < this.guitar2.maxSize) {
          // console.log("touching plate")
          this.guitar2.increaseRadius(20);
          if (!this.guitar2sound.isPlaying()) {
            this.guitar2sound.play();
            this.p5l.send(JSON.stringify("guitar2sound"));
            ;
          }
        }
      } else {
        tint(255, 126);

        if (this.guitar2.size > this.guitar2.minSize) {
          this.guitar2.shrinkRadius(20);
          this.guitar2sound.stop();
        }
      }
      this.guitar2.display();

      if (this.guitar3touch[0] == 1 || this.guitar3touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.guitar3.size < this.guitar3.maxSize) {
          // console.log("touching plate")
          this.guitar3.increaseRadius(20);
          if (!this.guitar3sound.isPlaying()) {
            this.guitar3sound.play();
            this.p5l.send(JSON.stringify("guitar3sound"));
          }
        }
      } else {
        tint(255, 126);

        if (this.guitar3.size > this.guitar3.minSize) {
          this.guitar3.shrinkRadius(20);
          this.guitar3sound.stop();
        }
      }
      this.guitar3.display();
      
      //
            if (this.guitar4touch[0] == 1 || this.guitar4touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.guitar4.size < this.guitar4.maxSize) {
          // console.log("touching plate")
          this.guitar4.increaseRadius(20);
          if (!this.guitar4sound.isPlaying()) {
            this.guitar4sound.play();
            this.p5l.send(JSON.stringify("guitar4sound"));
          }
        }
      } else {
        tint(255, 126);

        if (this.guitar4.size > this.guitar4.minSize) {
          this.guitar4.shrinkRadius(20);
          this.guitar4sound.stop();
        }
      }
      this.guitar4.display();
      
      

//       for (let i = 0; i < this.pose.keypoints.length; i++) {
//         let x = this.pose.keypoints[i].position.x;
//         let y = this.pose.keypoints[i].position.y;
//         fill(0, 255, 0);
//         if (x <= this.width && x >= 0 && y <= this.height && y >= 0) {
//           ellipse(x, y, 0.025 * this.width, 0.033 * this.height);
//         }
//       }
      for (let i = 0; i < this.skeleton.length; i++) {
        let a = this.skeleton[i][0];
        let b = this.skeleton[i][1];
        strokeWeight(7);
        stroke(255);

        line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
      fill(0, 0, 255);

      strokeWeight(2);
      ellipse(this.pose.leftWrist.x, this.pose.leftWrist.y, this.wristRadius);

      strokeWeight(2);
      ellipse(this.pose.rightWrist.x, this.pose.rightWrist.y, this.wristRadius);
      // ellipse(
      //   this.width - mouseX,
      //   mouseY,
      //   0.078 * this.canvasWidth,
      //   0.105 * this.canvasHeight
      // );
    }
  }
}
