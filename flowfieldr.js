class FlowField {
  constructor(canvasSize) {
    this.rows = parseInt(width/canvasSize);
    this.cols = parseInt(height/canvasSize);
    this.res = canvasSize;
    // 2D array in js using fill
    this.flowfield = new Array(this.rows).fill(new Array(this.cols));
    // this.canvasSize = canvasSize;
    this.init();
  }

  init(){
    noise(random(1000));
    let offsetR = 0;
    for(let i = 0; i < this.rows; i++){
      let offsetC = 0;
      for(let j = 0; j < this.cols; j++){
        let angleOffset = map(noise(offsetR, offsetC), 0, 1, 0, TWO_PI);
        this.flowfield[i][j] = createVector(cos(angleOffset), sin(angleOffset));
        offsetC += 0.1;
      }
      offsetR += 0.1;
    }
  }

  drawVector(v, x, y, s){
    push();
    translate(x, y);
    stroke(0, 200);
    rotate(v.heading());
    let l = v.mag()*s;
    // let l = 100;
    line(0, 0, l, 0);
    pop();
  }

  display(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.drawVector(this.flowfield[i][j], i*this.res, j*this.res, this.res-2);
      }
    }
  }
  lookup(lookupV){
    // look up the vector based on the grid of vectors
    let r = parseInt(constrain(lookupV.x/this.res,0, this.cols-1));
    let c = parseInt(constrain(lookupV.y/this.res, 0, this.rows-1));
    return this.flowfield[r][c];
  }
}
