var background1, bgSprite;
var run, runSprite;
var enemy, MC, obstacle;
var cactus, cactusSprite;
var invGround1, invGround2;
var battery, batteryimg;
var batteryGroup, enemyGroup, cactusGroup;
var no = 100;
var gameState = "play";

function preload(){
    background1 = loadImage("Images/back.png");
    cactus = loadImage("Images/obstacle.png");
    run = loadAnimation("Images/run1.png","Images/run2.png","Images/run3.png","Images/run4.png","Images/run5.png","Images/run6.png");
    enemy = loadAnimation("Images/enemy1.png","Images/enemy2.png","Images/enemy3.png");
    batteryimg = loadImage("Images/Battery.png")
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    bgSprite = createSprite(displayWidth/2,displayHeight/2);
    bgSprite.addImage("back",background1);
    bgSprite.scale = 1.9;

    invGround1 = createSprite(displayWidth/2,displayHeight/2 + 180,displayWidth,20);
    invGround1.visible = false;
    invGround2 = createSprite(displayWidth/2,displayHeight/2 - 100,displayWidth,20);
    invGround2.visible = false;

    runSprite = createSprite(displayWidth/4 - 200,displayHeight/2 + 110);
    runSprite.addAnimation("runing",run);
    runSprite.scale =1.3 ;
    runSprite.debug=false;
    runSprite.setCollider("rectangle", 0, 0, 50,80)

    batteryGroup = new Group();
    enemyGroup = new Group();
    cactusGroup = new Group();

     
    

}

function draw(){
    
    background("black");

    //textSize(25);
    //text(no,displayWidth/2,displayHeight/2);
if(gameState === "play"){
    bgSprite.velocityX = -3;
    if(bgSprite.x < 200){
        bgSprite.x = bgSprite.width/2
    }
    if(keyDown("space") && no > 0){
        no = no - 1;
        runSprite.velocityY = -8;
    }

    if(batteryGroup.isTouching(runSprite)){
        no = 100
        batteryGroup.destroyEach();
    }

    if(enemyGroup.isTouching(runSprite)||cactusGroup.isTouching(runSprite)){
    gameState = "End";
       // runSprite.destroy();
    //bgSprite.destroy();
    //enemyGroup.destroyEach();
    // cactusGroup.destroyEach();
    
    }

    runSprite.velocityY = runSprite.velocityY + 0.2;
    runSprite.collide(invGround1);   
    runSprite.collide(invGround2);
    
    console.log(no)
    

    spawnObstacles();
    spawnEnemy();
    spawnBattery();
    


    drawSprites();
}

if(gameState === "End"){
    textSize (50);
    fill("Black");
    stroke("yellow");
    text("GAME OVER!!",displayWidth/2 - 200,displayHeight/2)
}
}

function spawnObstacles(){
    if(frameCount % 200 === 0){
    obstacle = createSprite(displayWidth/4 + 1000,displayHeight/2 + 130);
    obstacle.addImage(cactus);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.debug=false;
    cactusGroup.add(obstacle);
    }
    
}
function spawnEnemy(){
    if(frameCount % 293 === 0){
    MC = createSprite(displayWidth/4 + 1000,displayHeight/2 + 130);
    MC.addAnimation("MC", enemy);
    MC.scale = 0.3;
    MC.velocityX = -3;
    MC.debug=false
    MC.setCollider("rectangle", 0, 0, 50,300)
    enemyGroup.add(MC);
    }
}

function spawnBattery(){
    if(frameCount % 500 === 0){
    battery = createSprite(displayWidth/4 + 1000,displayHeight/2 + 130);
    battery.addImage(batteryimg);
    battery.scale = 0.1;
    battery.velocityX = -3;
    battery.debug=false; 
    batteryGroup.add(battery);
    }
}