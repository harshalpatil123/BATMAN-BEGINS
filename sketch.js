const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var thunder, thunder1,thunder2,thunder3,thunder4,thunderingSound;

var engine,cloudsGroup, world;
var drops = [],batGroup;
var rand,clouds,cloud;
var man,ground,l,mani;
var maxDrops=100,bat,bats;

var thunderCreatedFrame=0;

function preload(){
    thunder1 = loadImage("1.png");
    thunder2 = loadImage("2.png");
    thunder3 = loadImage("3.png");
    thunder4 = loadImage("4.png");

    cloud=loadImage('clouds.png')
    groun=loadImage('groundi.png');

thunderingSound=loadSound('thunderSound.mp3')

    bats=loadAnimation('bat1.png','bat2.png','bat3.png','bat4.png','bat5.png','bat6.png','bat7.png','bat8.png','bat9.png','bat10.png',)
    mani = loadAnimation("walking_1.png","walking_2.png","walking_3.png","walking_4.png","walking_5.png","walking_6.png","walking_7.png","walking_8.png");
}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(windowWidth,windowHeight);
    umbrella = new Umbrella(200,500);

l=createSprite(width/2-570,height/2+340,8000,100)
l.shapeColor=88,88,88;

man=createSprite(width/2-570,height/2+180,1,1);
man.addAnimation('walking',mani);
man.scale=0.3


batGroup=createGroup();
cloudsGroup=createGroup();

ground=createSprite(width/2+20,height/1-70,100000,1);
ground.addImage(groun);
ground.x = ground.width /2;
ground.scale=2



    if(frameCount % 150 === 0){

        for(var i=0; i<maxDrops; i++){
            drops.push(new createDrop(random(0,width/2), random(0,400)));
        }

    }
    
}

function draw(){
    Engine.update(engine);
    background(0); 

    
    ground.velocityX = -7

    if (ground.x < -20){
        ground.x = ground.width/2;
      }

    rand = Math.round(random(1,4));
    if(frameCount%55===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(width/2,height/2), random(10,30), 10, 10);
        thunderingSound.play();
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.3,0.6)
        background('white');
    }
    else if(frameCount%88===0){

        thunderingSound.stop();
    }

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }

   // Umbrella.umbrella.display();
    for(var i = 0; i<maxDrops; i++){
        drops[i].showDrop();
        drops[i].updateY()
        
    }

    drawSprites();

fill('red')
textSize(32)
textFont('Franklin Gothic');
text("BATMAN BEGINS",width/2+500,height-670);

    if (frameCount % 130 === 0) {
        bat=createSprite(width/2+600,height-400,10,10);
       bat.y = Math.round(random(height-400,height-650));
        bat.addAnimation('flying',bats);

        bat.velocityX = -10;
        
         
        bat.lifetime = 200;
        

        
        
        //add each cloud to the group
        batGroup.add(bat);
      }

if (frameCount % 80 === 0) {
    clouds=createSprite(width/2+600,height-600,10,10);
    clouds.y = Math.round(random(80,120));
    clouds.addImage(cloud);
    clouds.scale = 0.9;
    clouds.velocityX = -7;
    
     //assign lifetime to the variable
    clouds.lifetime = 200;
    
    //adjust the depth
    thunder.depth = clouds.depth;
    clouds.depth = clouds.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(clouds);
  }

}
