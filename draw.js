const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2; 
let y = canvas.height - 30; 
let dx = 1; 
let dy = -1; 
const ballRadius = 10; 
const paddleHeight = 10; 
const paddleWidth = canvas.width *.15; 
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false; 
let leftPressed = false; 

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function handleDirection() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; 
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  if (
    y + dy > canvas.height - ballRadius - paddleHeight && x > paddleX && x < paddleX + paddleWidth ) 
    {
    dy = -dy; 
    }

    x += dx;
    y += dy;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  drawBall(); 
  drawPaddle(); 
  handleDirection(); 
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7; 
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function startGame() {
  setInterval(draw, 10); 
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

document.getElementById("runButton").addEventListener("click", function () {
  startGame();
  this.disabled = true; 
});