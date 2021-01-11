class Bird extends BaseClass {
constructor(x,y){
  super(x,y,50,50);
  this.image = loadImage("sprites/bird.png");
  this.smokeImage = loadImage("sprites/smoke.png");
  this.Trajectory = [];
  }

  display() {
    super.display();
    if(this.body.velocity.x > 10 & this.body.position.x > 200){
      var Position = [this.body.position.x, this.body.position.y];
      this.Trajectory.push(Position);
    }
    for(var i = 0; i < this.Trajectory.length; i++){
    image(this.smokeImage, this.Trajectory[i][0], this.Trajectory[i][1]);
    }
  }
}
