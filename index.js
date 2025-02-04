import { initializeContainers } from "./initializeContainers.js";
import { Block } from "./Block.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";
const canvas = document.querySelector(".game-canvas");
const hitSound = document.getElementById("hit-sound");
export const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const gameWidth = canvas.width;
export const blockWidth = 100;
export const blockHeight = 50;
let blocks = initializeContainers(gameWidth, blockWidth, blockHeight);
document.addEventListener("mousemove", moveMouse);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
let speed = 3.0;
export const gameHeight = canvas.height;

const ball = new Ball(gameWidth / 2, gameHeight - 30, 10);

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const block = new Block();

const gameBorder = {
  left: 0,
  bottom: 0,
  top: gameHeight,
  right: gameWidth,
};

const paddle = new Paddle(
  20,
  gameBorder.right * 0.15,
  (gameBorder.right - gameBorder.right * 0.15) / 2
);
let xDirection = 1;
let yDirection = -1;
let rightPressed = false;
let leftPressed = false;

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
    ball.y > gameHeight - ball.ballRadius - paddle.height &&
    ball.y < gameHeight - paddle.height &&
    ball.x > paddle.position &&
    ball.x < paddle.position + paddle.width
  ) {
    ball.y = gameHeight - ball.ballRadius - paddle.height;
    let newX = ball.x - (paddle.position + paddle.width / 2);
    let Intersect = newX / (paddle.width / 2);
    let Angle = Intersect * (Math.PI / 3);

    xDirection = Math.sin(Angle);
    yDirection = -Math.cos(Angle);
  }

  if (ball.y + ball.ballRadius > canvas.height) {
    ball.y = gameHeight - ball.ballRadius;
    decreaseLives();
    ball.x = gameWidth / 2;
    ball.y = gameHeight - 30;
    xDirection = 1;
    yDirection = -1;
  }

  blockCollisions();

  ball.x += xDirection * speed;
  ball.y += yDirection * speed;
}

function blockCollisions() {
  //
  blocks.forEach((block) => {
    if (
      block.visible &&
      ball.x + ball.ballRadius > block.x &&
      ball.x - ball.ballRadius < block.x + Block.blockWidth &&
      ball.y + ball.ballRadius > block.y &&
      ball.y - ball.ballRadius < block.y + Block.blockHeight
    ) {
      playSound(hitSound);
      let hitFromLeft = ball.x - ball.ballRadius < block.x;
      let hitFromRight = ball.x + ball.ballRadius > block.x + Block.blockWidth;
      let hitFromTop = ball.y - ball.ballRadius < block.y;
      let hitFromBottom =
        ball.y + ball.ballRadius > block.y + Block.blockHeight;

      if (hitFromLeft || hitFromRight) {
        xDirection = -xDirection;
      }
      if (hitFromTop || hitFromBottom) {
        yDirection = -yDirection;
      }
      if (!block.cracked) {
        block.cracked = true;
      }
      if (block.visible > 0) {
        block.visible--;
      }
      removeBlock();
    }
  });
}
let countOfBroken = 0;
function removeBlock() {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].visible == 0) {
      blocks.splice(i, 1);
      increaseScore();
      countOfBroken++;
      console.log(countOfBroken);
    }
    if (countOfBroken === 5) {
      const lives = document.getElementById("lives");
      lives.innerHTML = parseInt(lives.innerHTML) + 1;
      const result = document.querySelector(".status-container");
      const congratulationDiv = document.createElement("div");
      congratulationDiv.classList.add("congratulation");
      congratulationDiv.innerHTML =
        "Congratulations! You have earned an extra life!";
      result.appendChild(congratulationDiv);
      setTimeout(() => {
        result.removeChild(congratulationDiv);
      }, 3000);
      countOfBroken = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  ball.drawBall(ctx);
  paddle.drawPaddle(ctx);
  block.drawBlocks(blocks, ctx);
  handleDirection();
  if (rightPressed && paddle.position < gameWidth - paddle.width) {
    paddle.position += 15;
  } else if (leftPressed && paddle.position > 0) {
    paddle.position -= 15;
  }
}

const mainAudio = document.getElementById("main-audio");
function startGame() {
  mainAudio.play();
  mainAudio.currentTime = 0;
  function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

function keyDownHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = true;
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
window.setDifficulty = function (level, btn) {
  document.getElementById("buttonContainer").remove();
  speed = level;
  startGame();
  btn.disabled = true;
};
window.onload = function () {
  mainAudio.play().catch((error) => {
    console.log(
      "Audio play blocked. Please interact with the page to allow audio."
    );
  });
};

function playSound(sound) {
  sound.play().catch((error) => {
    console.log("Sound play failed: " + error);
  });
}

window.createScoreAndLives = function () {
  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  const score = document.createElement("div");
  score.classList.add("score");
  score.innerHTML = "Score: <span id='score'>0</span>";
  statusContainer.appendChild(score);
  const lives = document.createElement("div");
  lives.classList.add("lives");
  lives.innerHTML = "Lives: <span id='lives'>3</span>";
  statusContainer.appendChild(lives);
  document.body.appendChild(statusContainer);
};

function increaseScore() {
  const score = document.getElementById("score");
  score.innerHTML = parseInt(score.innerHTML) + 500;
}

function decreaseLives() {
  const lives = document.getElementById("lives");
  if (parseInt(lives.innerHTML) === 1) {
    alert("Game Over!");
    location.reload();
  }
  lives.innerHTML = parseInt(lives.innerHTML) - 1;
}
