var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacles, obstaclesImage, obstaclesGroup;
var score = 0;
var SurvivalTime = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  console.log(ground.x);

  bananaGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}


function draw() {
  background(225);


  ground.velocityX = -(5 + 2 - score / 100);

  if (gameState === PLAY) {
    
    console.log(monkey.y)
    
    score = Math.round(frameCount / 3);
    SurvivalTime = Math.ceil(frameCount / frameRate());
    
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y> 310) {
      monkey.velocityY = -20;
    }
    
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
    }

    spawnBananas();
    spawnObstacles();

    if(monkey.isTouching(obstaclesGroup)){
       gameState = END;
    }
    drawSprites();
  } else if (gameState === END) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  stroke("black");
  textSize(20);
  fill("red");
  text("score:" + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("red");
  text("Survival Time: " + score, 130, 20);

  
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 165, 10, 40);
    banana.velocityX = -(5 + 2 - score / 100);
    banana.addImage("banana", bananaImage);
    banana.y = Math.round(random(120, 290));
    banana.scale = 0.1;

    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);
  }
}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    var obstacles = createSprite(400, 320, 20, 20);
    obstacles.velocityX = -(5 + 2 - score / 100);
    obstacles.addImage("obtacle", obstaclesImage);
    obstacles.scale = 0.2;

    obstaclesGroup.add(obstacles);
    obstaclesGroup.setLifetimeEach(100);
    obstacles.setCollider("circle", 0, 0, 200);
  }
}