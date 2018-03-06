let field;
let vehicles;
let numberOfV;

let debug = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(640, 360);
  background(255);
  reset();
}

function reset(){
  numberOfV = 100;
  field = new FlowField(15);
  vehicles = new Array(numberOfV);
  for(var i = 0; i < numberOfV; i++){
    vehicles[i] = new Vehicle(createVector(width/2, height/2), random(2, 4), random(0.3, 0.5));
  }
}

function draw() {
  background(255);
  field.init();
  for(v of vehicles){
    v.follow(field);
    v.run();
  }

  if(debug)field.display();
}

function keyPressed(){
  //debug on and off
  if(key == ' '){
    debug = !debug;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  reset();
}
