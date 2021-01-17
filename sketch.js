const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;

var GameState = "OnSling";

var bg = "sprites/bg.png";

function preload() {

    getBackground();

    PIGSNORT = loadSound("sounds/pig_snort.mp3");
    BIRDFLYING = loadSound("sounds/bird_flying.mp3");
    BIRDSELECT = loadSound("sounds/bird_select.mp3");

}

//Create Birds Array
var birds = [];

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200, 50);
    bird1 = new Bird(150, 170);
    bird2 = new Bird(100, 170);
    bird3 = new Bird(50, 170);

    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird1);
    birds.push(bird);

    slingshot = new SlingShot(bird.body, {x: 200, y: 50});

}

function draw(){

    if(backgroundImg){
        background(backgroundImg);
    }

    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();

    platform.display();

    slingshot.display();
}

function mouseDragged() {
    if(GameState == "OnSling"){
     Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX, y: mouseY});
     Matter.Body.applyForce(birds[birds.length-1].body, birds[birds.length-1].body.position, {x: 10, y: -10});
     BIRDSELECT.play();
     return false;
 }
}

function mouseReleased() {
    slingshot.fly();
    birds.pop();
    GameState = "Launch"
    BIRDFLYING.play();
    return false;
}

function keyPressed(){
   if(keyCode === 32 && GameState == "Launch"){
    if(birds.length >= 0){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: 200, y:50});
        slingshot.attach(birds[birds.length-1].body);
        birds[birds.length-1].Trajectory = [];
        GameState = "OnSling";
      }
   }
}

async function getBackground(){
   var response = await fetch("http://worldclockapi.com/api/json/est/now");
   var responseJSON = await response.json();
   var DateTime = responseJSON.currentDateTime;
   var hour = DateTime.slice(11, 13);
   if(hour>=06 && hour<=19){
       bg = "sprites/bg.png"
   }
   else{
       bg = "sprites/bg2.jpg"
   }
   //Loading both BGs at once
   backgroundImg = loadImage(bg);
}