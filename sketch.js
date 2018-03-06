let field;
let vehicles;
let numberOfV;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(640, 360);
  background(255);

  numberOfV = 50;
  field = new FlowField(20);
  vehicles = new Array(numberOfV);
  for(var i = 0; i < numberOfV; i++){
    vehicles[i] = new Vehicle(createVector(Math.ceil(random(width)), Math.ceil(random(height))), random(3, 5), random(0.3, 0.7));
  }
  // field.init();
  field.display();
}

function draw() {
  background(255);
  field.display();
  for(v of vehicles){
    v.follow(field);
    v.run();
  }
}

function mousePressed(){
  field.init();
  console.log("mousePressed");
}
