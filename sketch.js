var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running, monkeyFallen;
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, bananaScore;
var invisibalGround;
var gameOverImg,over,overSound,fall, jumpSound, restartImg, restart;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("game-over-2720584_640.png")
  monkeyFallen = loadImage("monkey-309461_640-1.png")
  overSound = loadSound("salamisound-7409355-cartoon-boing.mp3");
  jumpSound = loadSound("salamisound-6941726-sfx-jump-9-game-computer.mp3");
  restartImg = loadImage("loop-button-5484820_640.png");

}

function setup() {
  createCanvas(600,400);
  score = 0;
  bananaScore = 0;
  
 
  fall = createSprite(290,140,1,1);
  over = createSprite(290,160,1,1);
  invisibalGround = createSprite(350,350,900,10);
  
  restart = createSprite(380,290,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.13;
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.12;
  
 
  ground = createSprite(350,350,900,10);
  ground.velocityX = 4;
  ground.x = ground.width/2;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("pink");
  
  textSize(20);
  stroke("red");
  fill("red");
  
  text("Survival Time - "+score,400,30);
  text("Bananas Collected - "+bananaScore,160,30);
  

  if(gameState === PLAY){
    
    if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY = -19;
    jumpSound.play();  
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaScore = bananaScore + 1;
    bananaGroup.destroyEach();
  }
  
  score = score + Math.round(getFrameRate()/60);
    
  monkey.velocityY = monkey.velocityY + 0.9;
    
  if(ground.x < 150){
     ground.x = ground.width/2; 
  }
     monkey.collide(invisibalGround);
    restart.visible = false;
  }
  
   if(gameState === END){
     
   restart.visible = true;  
   monkey.visible = false;
   ground.visible = false;  
   invisibalGround.visible = false;  
   fall.visible = true;
   over.visible = true;  
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.setVelocity(0,0);
   over.addImage(gameOverImg);  
   over.scale = 0.6;
   fall.addImage(monkeyFallen);
   fall.scale = 0.25;  
   fall.x = 200;
   fall.y = 316;
   textSize(22);
   stroke("red");
   fill("red");  
   text("Press above icon to restart",270,365);  
 }
   
 if(monkey.isTouching(obstacleGroup)){
   overSound.play();
   gameState = END;
 }
  
  if(mousePressedOver(restart)&& gameState === END) {
    gameState = PLAY;
    monkey.visible = true;
    fall.visible = false;
    ground.visible = true;
    invisibalGround.visible = true;
    over.visible = false;
    score = 0;
    bananaScore = 0;
  }
  
  drawSprites(); 
  createBananas();
  spawnObstacles();
}

function createBananas(){
  if (frameCount% 80 === 0){
    var banana = createSprite(400,400,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.115;
    banana.velocityX = -(4 + bananaScore/5);
    banana.lifetime = 200;
    banana.y = Math.round(random(120,200));
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if (frameCount% 300===0){
    obstacle = createSprite(400,320,50,50);
    obstacle.velocityX = -(6 + bananaScore/7);
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale = 0.14;
    obstacle.lifetime = 200;
    obstacle.setCollider("circle", 0, 0, 180);
    obstacleGroup.add(obstacle);
  }
  
}


  


