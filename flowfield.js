class FlowField {
  constructor(cellSize) {
    this.rows = Math.floor(width/cellSize);
    this.cols = Math.floor(height/cellSize);
    this.cellSize = cellSize;
    // 2D array in js using fill
    this.flowfield = new Array(this.rows).fill(new Array(this.cols));
    // this.canvasSize = canvasSize
    this.t = 0;
    this.init();
  }

  init(){
    noise(random(1000));
    let offsetR = 0;
    for(let i = 0; i < this.rows; i++){
      let offsetC = 0;
      for(let j = 0; j < this.cols; j++){
        let dirNoise = noise(offsetC, offsetR, this.t)*2*TWO_PI;
        let dir = p5.Vector.fromAngle(dirNoise);
        // let angleOffset = this.getNoise(i+this.cellSize,j+this.cellSize, this.t);
        // let dir = p5.Vector.fromAngle(angleOffset);

        // let angleOffset = this.getNoise(i+this.cellSize,j+this.cellSize);
        // let angleOffset = map(noise(offsetR, offsetC), 0, 1, 0, TWO_PI);
        // this.flowfield[i][j] = createVector(cos(angleOffset), sin(angleOffset));
        this.flowfield[i][j] = dir;
        offsetC += 0.1;
      }
      offsetR += 0.1;
      this.t += 0.001;
    }
  }

  drawVector(v, x, y, s){
    let vCopy = v.copy();
    push();
    translate(x, y);
    stroke(0, 200);
    rotate(vCopy.heading());
    let l = vCopy.mag()*s;
    line(0, 0, l, 0);
    pop();
  }

  display(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.drawVector(this.flowfield[i][j], i*this.cellSize, j*this.cellSize, this.cellSize-2);
      }
    }
  }
  lookup(lookupV){
    // look up the vector based on the grid of vectors
    let r = Math.floor(constrain(lookupV.x/this.cellSize,0, this.rows-1));
    let c = Math.floor(constrain(lookupV.y/this.cellSize, 0, this.cols-1));
    return this.flowfield[r][c];
  }
  getNoise(x, y, t){
    let s = 0.008;
    return noise(x*s, y*s, t)*Math.PI*2;
  }
}
