class FlowField {
  constructor(cellSize) {
    this.rows = Math.ceil(width/cellSize);
    this.cols = Math.ceil(height/cellSize);
    this.cellSize = cellSize;
    // 2D array in js using fill
    this.flowfield = new Array(this.rows).fill(new Array(this.cols));
    this.init();
  }

  init(){
    noise(Math.ceil(random(1000)));
    let offsetR = 0;
    for(let i = 0; i < this.rows; i++){
      let offsetC = 0;
      for(let j = 0; j < this.cols; j++){
        let angleOffset = map(noise(offsetR, offsetC), 0, 1, 0, TWO_PI);
        // let angleOffset = this.getNoise(i+this.cellSize,j+this.cellSize);
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
    // rotate(this.getNoise(x, y));
    let l = v.mag()*s;
    line(0, 0, l, 0);
    pop();
  }

  display(){
    // background(255);
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.drawVector(this.flowfield[i][j], i*this.cellSize, j*this.cellSize, this.cellSize-2);
      }
    }
  }

  lookup(lookupV){
    // look up the vector based on the grid of vectors
    let r = Math.ceil(constrain(lookupV.x/this.cellSize,0, this.rows-1));
    let c = Math.ceil(constrain(lookupV.y/this.cellSize, 0, this.cols-1));
    return this.flowfield[r][c];
  }

  getNoise(x, y){
    let s = 0.008;
    return noise(x*s, y*s)*Math.PI*2;
  }
}
