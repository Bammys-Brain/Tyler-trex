  
var trex_Animation, TrexA;

var ground_Image, gI

var GrountT 

var JumpPower = 3

var cloud

var cloud_Image

var obs1, obs2, obs3, obs4, obs5, obs6

var o

var bird

var bird_Image

var sky = 0

var Play = 1

var End = 0

var GameState = Play

var ObstaclesGroup

var CloudGroup 

var jump
  
var die
  
var checkpoint

var Trex_Die, TrexD

var Reset_Button, RB







function preload(){
  
  trex_Animation = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  
  ground_Image = loadImage("ground2.png")
  
  cloud_Image = loadImage("cloud.png")
  
  obs1 = loadImage("obstacle1.png")
   obs2 = loadImage("obstacle2.png")
   obs3 = loadImage("obstacle3.png")
   obs4 = loadImage("obstacle4.png")
   obs5 = loadImage("obstacle5.png")
   obs6 = loadImage("obstacle6.png")
  
  bird_Image = loadImage("Bird.png")
  
  Trex_Die = loadAnimation("trex_collided.png")
  
  Reset_Button = loadImage("gameOver.png")
  
 
  
  
  
  
 
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  
  
  
  
  
  
  
  
  
  
  
}



function setup(){
  
  
  
  
  
  createCanvas(600,200)
  
  
  
 GrountT = createSprite(300, 195, 600, 5)
GrountT.visible = false
  
 ObstaclesGroup = createGroup()

CloudGroup = createGroup()
  
  

  

  
  
  
  gI = createSprite (300, 190)
                      
  gI.addImage("ground", ground_Image)
  
  
  
  gI.velocityX = -5;
  
  TrexA = createSprite(100, 175, 5, 5)

  
  TrexA.addAnimation("Running Dino", trex_Animation)
  TrexA.addAnimation("Dead Dino", Trex_Die)
  
  TrexA.scale = .5
  
  //TrexA.debug = true
  
  TrexA.setCollider("circle",-10, 0, 50, )
  
  //GrountT.debug = true
  
  //GrountT.visible = true
  
  Reset_Button = createSprite(300, 100)
  
  //Reset_Button.visible = false
  
  Reset_Button.addImage("Reset", Reset_Button)


   
  
 
}




function draw(){
  
  
  
  
  
 
  
  
  
  if (GameState === Play){
    
    if (keyDown("space") && TrexA.isTouching(gI)){
    
    TrexA.velocityY = -12
      
     jump.play()
      
     }
      
     gI.velocityX = -(sky / 100 + 5) 
      
       if (gI.x < 0){
        
        gI.x = gI.width / 2
      
    
    }
    
    
      
      sky = sky + Math.round(getFrameRate() / 70 + 1)
    
    TrexA.velocityY = TrexA.velocityY + 0.8
    
    if(sky % 200 === 0)  {
      
      
    checkpoint.play()
      
      
    }
    

    
    
  
  if (sky.frameCount == 100){
    
    sky.color=("black")
  }
      
      if (ObstaclesGroup.isTouching(TrexA)){
        
        GameState = End
        
        //TrexA.velocityY = 10
         
      }
    
    
     
  } 
  
  
  //if (f){
    
    //trex.velocityX = trex.velocityX + 2                                          
  //}
   
    
  
  
  if (GameState === End){
    
    
    
    ObstaclesGroup.setVelocityXEach(0)
    
    CloudGroup.setVelocityXEach(0)
    
    die.play()
    reset()
   
    
    
    sky.frameRate = 0
    
  
    
    //TrexA.changeAnimation("Dead Dino", Trex_Die)
    
    
    
    
    
    Reset_Button.visible = true
    
    
    
  
    
    
    
  }


  
 
  
  
    
    
  
  
  TrexA.collide(GrountT)
  
  LoadClouds()
  
  Obstacles()
  Birds()
  
  
  background("lightgrey")
  
 
 
  
  
  
  text("Score = " + sky, 470, 40)
  
 
  

  
  
    
   
    
    
  
             
  drawSprites();
  
}

function LoadClouds(){
  
  
  
  
  
  if (frameCount % 60 === 0){
    cloud = createSprite(600,100)
  
  cloud.addImage("cloud",cloud_Image)
  
  
   cloud.velocityX  = -(sky / 100 + 2)
    
    cloud.y = Math.round(random (20, 120))
    
    cloud.depth = 1
    
    console.log(cloud.depth)
    
    cloud.lifetime = 120 
    
    CloudGroup.add(cloud)
    
    
    
   
    
  }
  
  
  
  
  
  
}

function Obstacles(){
    
  
  
  
  if(frameCount % 70 === 0)  {
    o = createSprite(600, 170, 15, 15)
    
    ObstaclesGroup.add(o)
    
    o.lifetime = 120
    
    
    
    
    
    
   
  
  
   
   
   
   
   
    
     o.velocityX = -(sky / 100 + 5)
    
    o.scale = .5
    
    switch(Math.round(random(1, 6))){
        
      case 1:o.addImage(obs1)
      break
      case 2: o.addImage(obs2)
        break
        case 3: o.addImage(obs3)
        break
        case 4: o.addImage(obs4)
        break
      case 5: o.addImage(obs5)
        break
      case 6: o.addImage(obs6)
      default:break
        
    }
      
     
    
  }
    
    
    
  
  
    
  }
  
  function Birds(){
    
    

    
    
    if(frameCount % (Math.round(random(500, 1000))) === 0){
      
      
    bird = createSprite(600, 100, 15, 15)
    
    bird.addImage(bird_Image)
    
    bird.scale = .1
      
      bird.velocityX = -5
      
    }
    
    
    
    
  }
  
  function reset(){
    
    if (GameState == End){
      
      gI.velocityX = 0
      
    }
    
  
    
    
  }