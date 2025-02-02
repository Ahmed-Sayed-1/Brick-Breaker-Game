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
      visible: true
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
  ballRadius: 10,
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

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x_axis, ball.y_axis, ball.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
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
      block.visible = false;
      yDirection = -yDirection; 
    }
  });
  removeBlock();
}
function removeBlock(){
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (!blocks[i].visible) {
      blocks.splice(i, 1);
    }
  }
}
function drawBlocks() {
  blocks.forEach(block => {
    if (block.visible) {
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.width, block.height);
      ctx.fillStyle = "#8c513e";
      ctx.fill();
      ctx.closePath();
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  drawBall();
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
