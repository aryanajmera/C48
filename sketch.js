var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullets=70,bulletgroup
var gameState='fight'
var loseSound,winningSound,explosionSound
var score=0
var life=3
var reset,resetImg


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
heart1img = loadImage("assets/heart_1.png")
heart2img = loadImage("assets/heart_2.png")
heart3img = loadImage("assets/heart_3.png")
zombieimg = loadImage("assets/zombie.png")
loseSound = loadSound("assets/lose.mp3")
winSound = loadSound("assets/win.mp3")
explosionSound = loadSound("assets/explosion.mp3")
resetImg =loadImage("assets/download.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
bulletgroup=new Group()
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

//Creating Sprites For Lives
heart1= createSprite(displayWidth-150,40,20,20)
heart1.visible=false
heart1.addImage(heart1img)
heart1.scale=0.4

 
heart2= createSprite(displayWidth-100,40,20,20)
heart2.visible=false
heart2.addImage(heart2img)
heart2.scale=0.4

heart3= createSprite(displayWidth-150,40,20,20)
heart3.addImage(heart3img)
heart3.scale=0.4

zombiegroup=new Group()

reset = createSprite(1000,300)
reset.addImage(resetImg)
reset.visible=false

}

function draw() {
  background(0); 

if(gameState==='fight'){
  if(life===3){
    heart3.visible=true
    heart1.visible=false
    heart2.visible=false
  }

  if(life===2){
    heart2.visible=true
    heart1.visible=false
    heart3.visible=false
  }

  if(life===1){
    heart1.visible=true
    heart2.visible=false
    heart3.visible=false
  }

  if(life===0){
    gameState='lost'

  }

  if(score===100 ||score>100){
    gameState='won'
    winSound.play()
  }
//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.velocityX=20;
 bulletgroup.add(bullet)
 player.depth=bullet.depth
 player.depth=player.depth+2
bullets=bullets-1
  player.addImage(shooter_shooting)
  explosionSound.play()
 
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){

  player.addImage(shooterImg)
}

if(bullets==0){
  loseSound.play() 
  gameState='bullet'
}
if(zombiegroup.isTouching(bulletgroup)){
  for(var i=0;i<zombiegroup.length;i++){
    if(zombiegroup[i].isTouching(bulletgroup)){
      zombiegroup[i].destroy()
      bulletgroup.destroyEach()
      explosionSound.play()
      score=score+3
    }
  }
}
//Destroy Zombies when PLayer Touches
if(zombiegroup.isTouching(player)){
loseSound.play()
  for(var i=0;i<zombiegroup.length;i++){
    if(zombiegroup[i].isTouching(player)){
      zombiegroup[i].destroy()
      life=life-1
    }
  }
}

reset.visible=false
enemy();
}


  


drawSprites();
textSize(30)
strokeWeight(5)
stroke('red')
fill('yellow')
text('BULLETS='+bullets,displayWidth-210,displayHeight/2-250)
text('SCORE='+score,displayWidth-200,displayHeight/2-220)
text('LIVES='+life,displayWidth-200,displayHeight/2-280)

if(mousePressedOver(reset)){
  life=3
  score=0
  bullets=70
  gameState='fight'
  player.visible=true
}
if(gameState=='lost'){
  textSize(100)
  strokeWeight(7)
  stroke('white')
  fill('black')
  text('LOST',400,400)
  zombiegroup.destroyEach()
  player.visible=false
  reset.visible=true
}
else if(gameState=='won'){
  textSize(100)
  fill('Yellow')
  text('WON THE GAME',400,400)
  zombiegroup.destroyEach()
  player.visible=false
    reset.visible=true
}
else if(gameState=='bullet'){
  textSize(100)
  strokeWeight(5)
  fill('blue')
  text('YOU RAN OUT OF BULLETS',470,410)
  zombiegroup.destroyEach()
  player.visible=false
  bulletgroup.destroyEach()
  reset.visible=true
}
}

function enemy(){
  if(frameCount%100===0){
    zombie=createSprite(random(1000,1700),random(100,500),40,40)
    zombie.addImage(zombieimg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.debug=true
    zombie.setCollider('rectangle',0,0,400,400)
    zombie.lifetime=400
    zombiegroup.add(zombie)
  }
}