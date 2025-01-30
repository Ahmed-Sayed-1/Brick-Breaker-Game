import { initializeContainers } from "./script.js";
import { Block } from "./Block.js";
let visibleTrigger = true;
const canvas = document.getElementById("myCanvas");
export const ctx = canvas.getContext("2d");
const blocks = initializeContainers();
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
  x: gameWidth / 2,
  y: gameHeight - 30,
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
  ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI * 2);
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
    e.clientY >= gameBorder.bottom &&
    e.clientY <= gameHeight
  ) {
    paddle.position = e.clientX;
  } else if (e.clientX > gameWidth - paddle.width) {
    paddle.position = gameWidth - paddle.width;
  }
}

function handleDirection() {
  if (
    ball.x + xDirection > gameWidth - ball.ballRadius ||
    ball.x + xDirection < ball.ballRadius
  ) {
    xDirection = -xDirection;
  }
  if (ball.y + yDirection < ball.ballRadius) {
    yDirection = -yDirection;
  }

  if (
    ball.y + yDirection > gameHeight - ball.ballRadius - paddle.height &&
    ball.x > paddle.position &&
    ball.x < paddle.position + paddle.width
  ) {
    yDirection = -yDirection;
  }
  blockCollisions();
  ball.x += xDirection;
  ball.y += yDirection;
}
function blockCollisions() {
  blocks.forEach((block) => {
    if (
      block.visible &&
      ball.x + ball.ballRadius > block.x &&
      ball.x - ball.ballRadius < block.x + Block.blockWidth &&
      ball.y + ball.ballRadius > block.y &&
      ball.y - ball.ballRadius < block.y + Block.blockHeight
    ) {
      if (visibleTrigger == true) {
        visibleTrigger = false;
        setTimeout(() => {
          block.visible--;
          visibleTrigger = true;
          removeBlock();
        }, "80");
      }
      yDirection = -yDirection;
    }
  });
}
function removeBlock() {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (!blocks[i].visible) {
      blocks.splice(i, 1);
    }
  }
}
function drawBlocks() {
  blocks.forEach((block) => {
    if (block.visible) {
      ctx.beginPath();
      ctx.rect(block.x, block.y, Block.blockWidth, Block.blockHeight);
      ctx.fillStyle = "#0095DD";
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
