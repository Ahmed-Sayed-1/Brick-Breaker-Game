const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
document.addEventListener("mousemove", moveMouse);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const gameBorder = {
  left: 0,
  right: 0,
  top: gameHeight,
  bottom: gameWidth,
};
const ball = {
  x_axis: gameWidth / 2,
  y_axis: gameHeight - 30,
  ballRadius: 10,
};

let xDirection = 1;
let yDirection = -1;
const paddleHeight = 10;
const paddleWidth = gameWidth * 0.15;
let paddleX = (gameWidth - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x_axis, ball.y_axis, ball.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function moveMouse(e) {
  if (
    e.clientX >= gameBorder.left &&
    e.clientX <= gameWidth - paddleWidth &&
    e.clientY >= gameBorder.right &&
    e.clientY <= gameHeight
  ) {
    paddleX = e.clientX;
  } else if (e.clientX > gameWidth - paddleWidth) {
    paddleX = gameWidth - paddleWidth;
  }
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, gameHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
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
    ball.y_axis + yDirection > gameHeight - ball.ballRadius - paddleHeight &&
    ball.x_axis > paddleX &&
    ball.x_axis < paddleX + paddleWidth
  ) {
    yDirection = -yDirection;
  }

  ball.x_axis += xDirection;
  ball.y_axis += yDirection;
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  drawBall();
  drawPaddle();
  handleDirection();
  if (rightPressed && paddleX < gameWidth - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function startGame() {
  setInterval(draw, 10);
}

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
