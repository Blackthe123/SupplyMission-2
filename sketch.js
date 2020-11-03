var helicopterIMG, helicopterSprite, packageSprite,packageIMG, p1, p2;
var packageBody,box1, box2, box3, h1, h2, i1, i2, i3, i4, ig1, ig2;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
    score=0;
	b=0;

	p1=createSprite(800, 350, 10, 700);
	p1.visible=false;

	p2=createSprite(0, 350, 10, 700);
	p2.visible=false;

	i1=createSprite(width/2, 220, 60, 5);
	i1.visible=false;

	i2=createSprite(400, 650, 50, 10);
	i2.visible=false

	i3=createSprite(170, 650, 350, 10);
    i3.visible=false;

	i4=createSprite(630, 650, 350, 10);
	i4.visible=false;

	ig1=createSprite(170, 655, 350, 10);
	ig1.shapeColor=("white");

	ig2=createSprite(630, 655, 350, 10);
	ig2.shapeColor=("white");

	box1=createSprite(400, 655, 100, 10);
	box1.shapeColor=("red");
	
	box2=createSprite(350, 625, 10, 70);
	box2.shapeColor=("red");
	
	box3=createSprite(450, 625, 10, 70);
	box3.shapeColor=("red");

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(100, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

    engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.rectangle(width/2, 200, 10,10, {isStatic:true});
	World.add(world, packageBody);

	box1=Bodies.rectangle(400, 655, 100, 20, {isStatic:true, density:3, friction:2});
	World.add(world, box1);

	box2=Bodies.rectangle(350, 625, 20, 70, {isStatic:true, density:3, friction:2});
	World.add(world, box2);

	box3=Bodies.rectangle(450, 625, 20, 70, {isStatic:true, density:3, friction:2});
	World.add(world, box3);
	
	ig1 = Bodies.rectangle(170, 655, 350, 10, {isStatic:true} );
	World.add(world, ig1);
	 
	ig2 = Bodies.rectangle(630, 655, 350, 10, {isStatic:true} );
	World.add(world, ig2);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x ;
  packageSprite.y= packageBody.position.y ;
  i1.y=packageBody.position.y+10 ;
  i1.x=helicopterSprite.x;
  packageSprite.x=helicopterSprite.x;
  helicopterSprite.bounce(p1);
  helicopterSprite.bounce(p2);

  if(i1.isTouching(i2)){
	  score=score+1;
	  helicopterSprite.x=100;
	  packageBody.position.y=100;
  }

  if(i1.isTouching(i4)){
	   b=b+1;
	   helicopterSprite.x=100;
	  packageBody.position.y=100;
  }

  if(i1.isTouching(i3)){
	b=b+1;
	helicopterSprite.x=100;
   packageBody.position.y=100;
}

  drawSprites();
 
  text("boxes delivered = "+ score, 625, 50);
  text("boxes failed to be delivered = "+ b, 50, 50);
  
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.6, isStatic:false, friction:1, density:2});
	World.add(world, packageBody);
  }
  
  if (keyCode === RIGHT_ARROW){
	  helicopterSprite.velocityX=3;
	  }
	  
 if (keyCode === LEFT_ARROW){
	helicopterSprite.velocityX=-3;
}
}

  
function isTouching(packageBody,box1){
    if(packageBody.x - box1.x < packageBody.width/2+  box1.width/2
      && box1.x - packageBody.x < packageBody.width/2 + box1.width/2
       && packageBody.y - box1.y < packageBody.height/2 + box1.height/2
       && box1.y - packageBody.y < packageBody.height/2 + box1.height/2){
    return true;
    }
    else{
      return false;
    }
}



