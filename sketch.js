var player,imp_block,imp_block2,counter,gamestate,count,block1,block2,block3;
function preload(){
  skurt=loadImage("skurt.png")
}
function setup() {
//canvas size
  createCanvas(400, 400);
  
//player
  player=createSprite(200,170);
  player.addImage(skurt);
  //player.debug=true;
  player.setCollider("rectangle",0,0,30,50);
  
//blocks to start the game
  imp_block=createSprite(200,200,70,10);
  imp_block.lifetime=100;
  imp_block2=createSprite(118,400,70,10);
  imp_block2.lifetime=300;
  
//The thing that kills the player
  counter=createSprite(200,10,400,30);
  counter.shapeColor="red";

//gamestate
  gamestate="play"
  
//The group for blocks
  blockgroup=new Group();
  
//The scoreboard
  count=0;
}

function draw() {
//background color
  background("blue");

//Edges
  createEdgeSprites();
  //player.collide(leftEdge);
  //player.collide(rightEdge);
  if(gamestate=="play"){
//counting the score
    count=Math.round(World.frameCount/4);
    if(count%500==0 && count>0){
      counter.y=counter.y+5;
    }
//velocities of objects
    imp_block.velocityY=-2;
    imp_block2.velocityY=-2;
    player.velocityY=3;
    blockgroup.setVelocityYEach(-(2+2*count/200));

    //generating blocks randomly
    if(World.frameCount%75==0){
      block1=createSprite(random(66,334),random(410,700),70,10);
      blockgroup.add(block1);
      block2=createSprite(random(66,334),random(410,700),70,10);
      blockgroup.add(block2);
      block3=createSprite(random(66,334),random(410,700),70,10);
      blockgroup.add(block3);

//group characteristics
      blockgroup.setColliderEach("rectangle",0,0,70,10);
      blockgroup.collide(blockgroup);
      blockgroup.setLifetimeEach(100);
  }
//player characteristics
    player.collide(imp_block);
    player.collide(imp_block2);
    player.collide(blockgroup);

//controls
    if(keyDown("LEFT_ARROW")){
      player.velocityX=-3;
    }
    if(keyDown("RIGHT_ARROW")){
      player.velocityX=3;
    }
    if(keyDown("UP_ARROW")){
      player.velocityY=-3;
    }
    
//losing condition
    if(player.isTouching(counter)){
      gamestate="end";
    }
    //if(player.isTouching(bottomEdge)){
      //playSound("sound://category_hits/8bit_splat.mp3");
      //gamestate="end";
    //}
}
  if(gamestate=="end"){
    player.velocityX=0;
    player.velocityY=0;
    blockgroup.setVelocityYEach(0);
    blockgroup.setLifetimeEach(-1);
    imp_block.velocityY=0;
    imp_block2.velocityY=0;
    imp_block.lifetime=-1;
    imp_block2.lifetime=-1;
    textFont("Georgia");
    textSize(20);
    text("Game Over",150,200);
  }
  textFont("Georgia");
  textSize(20);
  text("Score:"+ count,250,100);
  drawSprites();
}