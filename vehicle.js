class Vehicle{
  constructor(p, ms, mf){
    this.pos = p;
    this.r = 3.0;
    this.maxSpeed = ms;
    this.maxforce = mf;
    this.acc = createVector();
    this.vel = createVector();
    this.prePos = createVector(0, 0);
  }

  run(){
    this.update();
    this.edge();
    this.display();
    // this.drawPath();
  }

  follow(field){
    let desired = field.lookup(this.pos);
    // console.log("looked up this pos: " + this.pos + "desired: "+ desired);
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.prePos = (this.pos.x, this.pos.y);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f){
    this.acc.add(f);
  }

  display(){
    let angle = this.vel.heading() + radians(90);
    fill(200);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    beginShape(TRIANGLES);
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape();
    pop();
  }

  drawPath(){
    let angle = this.vel.heading() + radians(90);
    fill(200);
    stroke(0);
    push();
    // let prePos = createVector(this.pos);
    // point(this.pos.x, this.pos.y);
    line(this.prePos.x, this.prePos.y, this.pos.x, this.pos.y);
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    pop();
  }

  edge(){
    if(this.pos.x < -this.r){
      this.pos.x = width+this.r;
    }
    if(this.pos.x > width+this.r){
      this.pos.x = -this.r;
    }
    if(this.pos.y < -this.r){
      this.pos.y = height+this.r;
    }
    if(this.pos.y > height+this.r){
      this.pos.y = -this.r;
    }
  }
}
