const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
document.addEventListener("mousemove", moveMouse);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
const gameWidth = canvas.width;
const gameHeight = canvas.height;
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

  ball.x_axis += xDirection;
  ball.y_axis += yDirection;
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  drawBall();
  drawPaddle();
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
