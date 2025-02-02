const blocks = [];
const blockWidth = 100; 
const blockHeight = 50;
const spacing = 10; 





const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext("2d");
document.addEventListener("mousemove", moveMouse);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const gameWidth = canvas.width;
const gameHeight = canvas.height;

// Calculate number of columns dynamically
const colCount = Math.floor(gameWidth / (blockWidth + spacing));
const rowCount = 5; // Keep it fixed or make it dynamic

for (let row = 0; row < rowCount; row++) {
  for (let col = 0; col < colCount; col++) {
    blocks.push({
      x: col * (blockWidth + spacing),
      y: row * (blockHeight + spacing),
      width: blockWidth,
      height: blockHeight,
      visible: true,
      cracked:false,
      brickId:0,
    });
  }
}



const gameBorder = {
  left: 0,
  bottom: 0,
  top: gameHeight,
  right: gameWidth,
};
const ball = {
  x_axis: gameWidth / 2,
  y_axis: gameHeight - 30,
  ballRadius: 30,
};

const paddle = {
  height: 10,
  width: gameBorder.right * 0.15,
  position: (gameBorder.right - this.width) / 2,
};
let xDirection = 1;
let yDirection = -1;
let rightPressed = false;
let leftPressed = false;

const ballImage = new Image();

ballImage.src= '/assets/images/ball-image-2.png'


// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(ball.x_axis, ball.y_axis, ball.ballRadius, 0, Math.PI * 2);
//   ctx.fillStyle = "#0095DD";
//   ctx.fill();
//   ctx.closePath();
// }
// ballImage.onload = () => {
//   // Create a canvas element
//   const canvas = document.createElement('canvas');
//   document.body.appendChild(canvas);
//   const ctx = canvas.getContext('2d');

  
//   canvas.width = 50; 
//   canvas.height = 60; 

//   ctx.drawImage(ballImage, 0, 0, 50, 60);
// };
let angle = 0;  
let rotationSpeed = 0.005;  

function drawBall() {
    ctx.save();   
    ctx.translate(ball.x_axis, ball.y_axis);
    ctx.rotate(angle);

    
    ctx.drawImage(ballImage, -ball.ballRadius, -ball.ballRadius, ball.ballRadius * 2, ball.ballRadius * 2);

    ctx.restore(); 

    angle += rotationSpeed;
    if (angle >= 2 * Math.PI) {
        angle = 0;  
    }
}

function animateBall() {
  drawBall();  
  requestAnimationFrame(animateBall);  
}

 

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddle.position,
    gameHeight - paddle.height,
    paddle.width,
    paddle.height
  );
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
``;
function moveMouse(e) {
  if (
    e.clientX >= gameBorder.left &&
    e.clientX <= gameWidth - paddle.width &&
    e.clientY >= gameBorder.bottom && //////////
    e.clientY <= gameHeight
  ) {
    paddle.position = e.clientX;
  } else if (e.clientX > gameWidth - paddle.width) {
    paddle.position = gameWidth - paddle.width;
  }
}



function handleDirection() {
  if (
    ball.x_axis + xDirection > gameWidth - ball.ballRadius ||
    ball.x_axis + xDirection < ball.ballRadius
  ) {
    xDirection = -xDirection;
  }
  if (ball.y_axis + yDirection < ball.ballRadius) {
    yDirection = -yDirection;
  }

  if (
    ball.y_axis + yDirection > gameHeight - ball.ballRadius - paddle.height &&
    ball.x_axis > paddle.position &&
    ball.x_axis < paddle.position + paddle.width
  ) {
    yDirection = -yDirection;
  }
  blockCollisions();
  ball.x_axis += xDirection;
  ball.y_axis += yDirection;
}
function blockCollisions(){
  blocks.forEach(block => {
    if (
      block.visible &&
      ball.x_axis + ball.ballRadius > block.x &&
      ball.x_axis - ball.ballRadius < block.x + block.width &&
      ball.y_axis + ball.ballRadius > block.y &&
      ball.y_axis - ball.ballRadius < block.y + block.height
    ) {
      if(!block.cracked)
        {
          block.cracked = true;
          drawCrackedBlock(block);
        }else{
          block.visible = false;
        } 
      yDirection = -yDirection; 
    }
  });
  removeBlock();
}

const crackedBlockImage = new Image();
crackedBlockImage.src = '/assets/images/cracked-block-image.jpg'
function drawCrackedBlock(block) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.beginPath();
      ctx.drawImage(crackedBlockImage,block.x, block.y, block.width, block.height);
      ctx.closePath();
      ctx.restore();
    }
   

function removeBlock(){
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (!blocks[i].visible) {
      blocks.splice(i, 1);
    }
  }
}
const blockImage = new Image();
blockImage.src = '/assets/images/block-image.jpg'
function drawBlocks() {
  blocks.forEach(block => {
    if (block.visible) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.beginPath();
      if (block.cracked) {
        ctx.drawImage(crackedBlockImage, block.x, block.y, block.width, block.height);
      } else {
        ctx.drawImage(blockImage, block.x, block.y, block.width, block.height);
      }
      ctx.closePath();
      ctx.restore();
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  animateBall(); 
  drawPaddle();
  drawBlocks(); 
  handleDirection();
  if (rightPressed && paddle.position < gameWidth - paddle.width) {
    paddle.position += 7;
  } else if (leftPressed && paddle.position > 0) {
    paddle.position -= 7;
  }
}

function startGame() {
  setInterval(draw, 10);
}

function keyDownHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = true;
    console.log(e.key);
  } else if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

document.getElementById("runButton").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});
