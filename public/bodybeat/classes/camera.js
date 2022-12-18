class Camera {
  constructor(video, socketId, w, h) {
    this.socketId = socketId;
    this.video = video;
    this.width = w;
    this.height = h;
    this.instrumentName = "";
    this.xOrientation = 1;
    this.yOrientation = 1;
    
  }
  draw(x, y) {
    

    image(this.video, x, y, this.width, this.height);
    
  }
}