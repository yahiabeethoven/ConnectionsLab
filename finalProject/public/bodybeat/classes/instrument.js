class Instrument {
  constructor(x, y, dx, dy, img, minThresh, maxThresh) {
    this.x = x;
    this.y = y;
    this.radiusX = dx;
    this.radiusY = dy;
    this.img = img;
    this.position = [];
    this.minThresh = minThresh;
    this.maxThresh = maxThresh;
  }
  // Getter
  get coordinates() {
    return this.calcPosition();
  }
  
  get size() {
    return (this.radiusX + this.radiusY)/2;
  }
  
  get maxSize() {
    return this.maxThresh;
  }
  
  get minSize() {
    return this.minThresh;
  }
  
  wristTouch(rightX, rightY,leftX, leftY, wristRadius) {
    let rightTouch = 0;
    let leftTouch = 0;
    if (this.distanceTo(rightX,rightY) <= (this.radiusX + this.radiusY)/2 - 2*wristRadius) {
      rightTouch = 1;
    }
    if (this.distanceTo(leftX, leftY) <= (this.radiusX + this.radiusY)/2 - 2*wristRadius) {
      leftTouch = 1;
    }
    let wristTouches = [rightTouch, leftTouch];
    return wristTouches;
  }
  
  increaseRadius(increment) {
    this.radiusX += increment;  
    this.radiusY += increment;
    // this.display();
  }
  
  shrinkRadius(increment) {
    this.radiusX -= increment;
    this.radiusY -= increment;
    // this.display();
  }
  
  calcPosition() {
    this.position = [this.x,this.y];
    return this.position;
  }
  
  distanceTo(targetX, targetY) {
    return dist(targetX,targetY, this.x, this.y);
  }
  
  display () {
    image(this.img, this.x - this.radiusX/2, this.y - this.radiusY/2, this.radiusX, this.radiusY);
  }
  
  
}