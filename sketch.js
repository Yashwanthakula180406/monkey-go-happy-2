var monkey, monkey_running, monkey_stop;
var stone, stoneImg, stonesGroup;
var banana, bananaImg, bananasGroup;
var invisibleGround;

var backGround, backGroundImg;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkey_stop = loadAnimation("Monkey_08.png");
  
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  
  backGroundImg = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(500, 368);
  
  backGround = createSprite(250, 20);
  backGround.addImage(backGroundImg);
  backGround.scale = 1;
  backGround.velocityX = -7;
  
  monkey = createSprite(80, 300);
  monkey.addAnimation("monkey running", monkey_running);
  monkey.addAnimation("monkey stops", monkey_stop);
  monkey.scale = 0.12;
  
  invisibleGround = createSprite(250, 310, 500, 10);
  invisibleGround.visible = false;
  
  stonesGroup = new Group();
  bananasGroup = new Group();
  
  //backGround.debug = true;
}

function draw() {
  //background("white");
  
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
  }
  
  if (gameState === PLAY){
     
  
     
  if (keyDown("space") && monkey.y >= 50){
    monkey.velocityY = -32;
   }  
    monkey.velocityY = monkey.velocityY + 2.6;
      
    //console.log(monkey.y); 
    
  if (bananasGroup.isTouching(monkey)){
    bananasGroup.setLifetimeEach(0); 
    score = score + 1;  
    monkey.scale = monkey.scale + 0.008;  
  }
  
  if(stonesGroup.isTouching(monkey)){
    //gameState = END;
    monkey.scale = 0.12;
  }
      
    if (keyDown("Y")){
      gameState = END;
    }
  spawnStones();
  spawnBananas();
  
}

  
  
  
  monkey.collide(invisibleGround);

 monkey.debug = false;
monkey.setCollider("rectangle", 0, 0, 150, monkey.height + 500);
 
  //console.log(monkey.y);
  
  drawSprites();
  
  fill("white");
  stroke("white");
  textSize(20);
  text("Score: " + score, 375, 30);
  
 if (gameState === END){
   
   bananasGroup.setVelocityXEach(0);
   bananasGroup.setLifetimeEach(-1);
   stonesGroup.setVelocityXEach(0);
   stonesGroup.setLifetimeEach(-1);
   backGround.velocityX = 0;
   monkey.changeAnimation( "monkey stops",monkey_stop);
   
   fill("white");
   stroke("white");
   textSize(30);
   text("YAHOO!", 176, 100);
   
   text("Your Score Is " + score, 140, 170);
 }
  
  if (gameState === PLAY){
  fill("white");
  stroke("white");
  textSize(20);
  text("Press Y To End The Game", 20, 20);  
  }
}

 function spawnStones(){
  
  if (frameCount % 200 === 0){
    stone = createSprite(500, 290);
    stone.addImage(stoneImg);
    stone.scale = 0.15;
    stone.velocityX = -7;
    stone.lifetime = 120;
    stonesGroup.add(stone);  
   }
  
}

function spawnBananas(){
  if (frameCount % 120 === 0){
    banana = createSprite(500, 180);
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -7;
    banana.lifetime = 200;
    bananasGroup.add(banana);  
    
    banana.y = Math.round(random(50, 180));
  } 
}