var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var paddleHeight = 12;
var paddleWidth = 72;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;


var brickRowCount = 4;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 24;
var brickPadding = 12;
var brickOffsetTop = 32;
var brickOffsetLeft = 32;
var score = 0;

var bricks = [];

for(c=0;c<brickColumnCount;c++){
  bricks[c] = [];

  for(r=0;r<brickRowCount;r++){
    bricks[c][r] = {x:0,y:0,status:1};
  }
}





document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);




function drawBricks(){
  for(c=0;c<brickColumnCount;c++){
    for(r=0;r<brickRowCount;r++){

      var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;

      var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      
      if(bricks[c][r].status==1){
      
      ctx.beginPath();
      ctx.rect(brickX,brickY,brickWidth,brickHeight);
      ctx.fillStyle = "pink";
      ctx.fill();
      ctx.closePath;
      }
    }
  }
}
function drawScore(){
  ctx.font = "18px Arial";
  ctx.fillStyle = "Black";
  ctx.fillText("Score:"+score,8,20);

}

function collisionDetection(){
  for(c=0;c<brickColumnCount;c++){
    for(r=0;r<brickRowCount;r++){
      var b = bricks[c][r];

     

      if(b.status == 1){

        
        if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
          score+=1;
          dy = -dy;
          bricks[c][r].status = 0;

          if(score==28){
            alert("Winner!!!");
          }
        }
      }
    }
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2,false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

}
function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed=true;
  }
  else if(e.keyCode == 37){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed=false;
  }
  else if(e.keyCode == 37){
    leftPressed = false;
  }
}

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;

  if(relativeX>0 && relativeX<canvas.width){
    paddleX = relativeX-paddleWidth/2;
  }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle="yellow";
  ctx.fill();
  ctx.closePath();
}
function draw(){
  
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();

  if(x + dx > canvas.width-ballRadius || x+dx<ballRadius){
    dx = -dx;
  }
  if( y+dy<ballRadius){
    dy = -dy;
  }

  else if(y+dy>canvas.height-ballRadius){
    if(x>paddleX && x<paddleX+paddleWidth){
      dy=-dy;
    }
    else{
      dy=-dy;
      alert("GAME OVER!!!");
      
      location.reload(true);
    }
  }
  if(rightPressed && paddleX<canvas.width-paddleWidth){
    paddleX+=7;
  }
  else if(leftPressed && paddleX>0) {
    paddleX-=7;
  }

  x+=dx;
  y+=dy;
}

setInterval(draw,10);