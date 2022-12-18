class Drummer extends Camera {
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
    this.drum1;
    this.drum2;
    this.drum3;
    this.drum4;
    this.drum1img;
    this.drum2img;
    this.drum3img;
    this.drum4img;
    this.drum1sound;
    this.drum2sound;
    this.drum3sound;
    this.drum4sound;
    this.drum1touch;
    this.drum2touch;
    this.drum3touch;
    this.drum4touch;
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
    this.drum1img = loadImage("assets/drum1.png");
    this.drum2img = loadImage("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drum2.png?v=1670800786888");
    this.drum3img = loadImage("assets/drum3.png");
    this.drum4img = loadImage("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drum4.png?v=1670803281642");

    this.drum1sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy1%20(1).mp3?v=1670802960355");
    this.drum2sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy4.mp3?v=1670802970263");
    this.drum3sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy3.mp3?v=1670802966463");
    this.drum4sound = loadSound("https://cdn.glitch.global/158f7402-3da5-43e6-935d-0b1c0068020f/drumy2.mp3?v=1670802962242");

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

  
  draw(x, y) {
    this.widthMultiplier = (width * 2) / 3 / this.video.width;
    this.heightMultiplier = height / this.video.height;

    // move image by the width of image to the left
    translate(this.width, 0);


    tint(255, 255, 255, 255);
    scale(-1 * this.widthMultiplier, 1 * this.heightMultiplier);
    image(this.video, x, y);


    if (this.pose) {
      
      fill(255, 0, 0);
      

      this.drum1 = new Instrument(
        this.bottomLeftX,
        this.bottomLeftY,
        this.radiusX,
        this.radiusY * 0.9,
        this.drum1img,
        this.minThresh,
        this.maxThresh
      );

      this.drum1touch = this.drum1.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );

      this.drum2 = new Instrument(
        this.topRightX,
        this.topRightY,
        this.radiusX,
        this.radiusY,
        this.drum2img,
        this.minThresh,
        this.maxThresh
      );

      this.drum2touch = this.drum2.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );

      this.drum3 = new Instrument(
        this.bottomRightX,
        this.bottomRightY,
        this.radiusX,
        this.radiusY,
        this.drum3img,
        this.minThresh,
        this.maxThresh
      );

      this.drum3touch = this.drum3.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );
      
        this.drum4 = new Instrument(
        this.topLeftX,
        this.topLeftY,
        this.radiusX,
        this.radiusY,
        this.drum4img,
        this.minThresh,
        this.maxThresh
      );

      this.drum4touch = this.drum4.wristTouch(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        this.wristRadius
      );

      
      // fill(0, 255, 0);
      if (this.drum1touch[0] == 1 || this.drum1touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.drum1.size < this.drum1.maxSize) {
          // console.log("touching drum")
          this.drum1.increaseRadius(20);
          if (!this.drum1sound.isPlaying()) {
            this.drum1sound.play();
            this.p5l.send(JSON.stringify("drum1sound"));
            
          }
        }
      } else {
        tint(255, 126);

        if (this.drum1.size > this.drum1.minSize) {
          this.drum1.shrinkRadius(20);
          this.drum1sound.stop();
          
        }
      }
      this.drum1.display();

      if (this.drum2touch[0] == 1 || this.drum2touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.drum2.size < this.drum2.maxSize) {
          // console.log("touching plate")
          this.drum2.increaseRadius(20);
          if (!this.drum2sound.isPlaying()) {
            this.drum2sound.play();
            this.p5l.send(JSON.stringify("drum2sound"));
           
          }
        }
      } else {
        tint(255, 126);

        if (this.drum2.size > this.drum2.minSize) {
          this.drum2.shrinkRadius(20);
          this.drum2sound.stop();
        }
      }
      this.drum2.display();

      if (this.drum3touch[0] == 1 || this.drum3touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.drum3.size < this.drum3.maxSize) {
      
          this.drum3.increaseRadius(20);
          if (!this.drum3sound.isPlaying()) {
            this.drum3sound.play();
            
            this.p5l.send(JSON.stringify("drum3sound"));
            
          }
        }
      } else {
        tint(255, 126);

        if (this.drum3.size > this.drum3.minSize) {
          this.drum3.shrinkRadius(20);
          this.drum3sound.stop();
        }
      }
      this.drum3.display();
      
      
      //
       if (this.drum4touch[0] == 1 || this.drum4touch[1] == 1) {
        fill(255, 204, 0);
        tint(255, 255, 255, 255);
        if (this.drum4.size < this.drum4.maxSize) {
      
          this.drum4.increaseRadius(20);
          if (!this.drum4sound.isPlaying()) {
            this.drum4sound.play();
            
            this.p5l.send(JSON.stringify("drum4sound"));
            
          }
        }
      } else {
        tint(255, 126);

        if (this.drum4.size > this.drum4.minSize) {
          this.drum4.shrinkRadius(20);
          this.drum4sound.stop();
        }
      }
      this.drum4.display();
      
      

      // for (let i = 0; i < this.pose.keypoints.length; i++) {
      //   let x = this.pose.keypoints[i].position.x;
      //   let y = this.pose.keypoints[i].position.y;
      //   fill(0, 255, 0);
      //   if (x <= this.width && x >= 0 && y <= this.height && y >= 0) {
      //     ellipse(x, y, 0.025 * this.width, 0.033 * this.height);
      //   }
      // }
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
