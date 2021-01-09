var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;
var opponentGroup
var redComp, redCompGroup
var distance=0;
var bell
var restartB
var gameoverB

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkImage = loadImage("images/pinkracer.png")
  yellowImage = loadImage("images/yellowracer.png")
  bell = loadSound ("sound/bell.mp3")
  restartImage = loadImage("images/restart.png")
  gameoverImage = loadImage("images/gameover.png")
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);


//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
 opponentGroup = createGroup() 
  restartB = createSprite(250,200,10,10)
  restartB.addImage(restartImage)
  restartB.scale = 0.5
 gameoverB = createSprite (250,100,10,10)
  gameoverB.addImage(gameoverImage)
}

function draw() {
  background(0);
  
 
  if(gameState===PLAY){
  restartB.visible = false
  gameoverB.visible = false
   mainCyclist.y = World.mouseY;
  spawnOpponentCyclists()
    path.velocityX = -(distance/100*3+5)
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = path.width/2;
  }
   distance = distance + Math.round(getFrameRate()/60);
   
  if(mainCyclist.isTouching(opponentGroup)){
   gameState= END 
  }
    
 }
  else if (gameState===END){
    opponentGroup.setVelocityXEach(0)
    mainCyclist.velocityX = 0
    restartB.visible = true
  gameoverB.visible = true
    path.velocityX = 0
    if (mousePressedOver(restartB)){
      RESET()
    }
  }
   drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  
}
function spawnOpponentCyclists (){
  if(frameCount%50===0){ 
    bell.play()
  opponent = createSprite(0,
              Math.round(random(20,250)),20,21)
    opponent.velocityX = 5
  var image = Math.round(random(1,2))
  if (image===1){
    opponent.addImage (pinkImage)
  } else{
    opponent.addImage(yellowImage)
  }
 opponentGroup.add(opponent)
  }
  
}

function RESET(){
   gameState=PLAY
      opponentGroup.destroyEach()
      distance = 0
     
}