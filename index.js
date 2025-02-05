import { initializeContainers } from "./initializeContainers.js";
import { Block } from "./Block.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";
import { Heart } from "./Heart.js";

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
const ball = new Ball(paddle.position + paddle.width / 2, gameHeight - paddle.height - 10, 20);
const block = new Block();
let heart = null;

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
    resetBall();
  }

  blockCollisions();

  ball.x += xDirection * speed;
  ball.y += yDirection * speed;
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
      playSound(hitSound);

      // Simplified collision response
      if (ball.x < block.x || ball.x > block.x + Block.blockWidth) {
        xDirection = -xDirection;
      } else {
        yDirection = -yDirection;
      }

      if (block.visible > 0) {
        block.visible--;
        block.cracked = true;
      }
      if (block.visible === 0) {
        if (Math.random() < 0.2) { // 20% chance to drop a heart
          heart = new Heart(block.x + block.width / 2, block.y);
        }
        removeBlock(block);
      }
    }
  });
}

function removeBlock(block) {
  const index = blocks.indexOf(block);
  if (index > -1) {
    blocks.splice(index, 1);
    increaseScore();
<<<<<<< HEAD
    winGame();
  }
  if (Math.random() < 0.2) {
    increaseLives();
    const lives = document.getElementById("lives");
    if (heart.checkUserGetHeart(paddle)) {
      if (parseInt(lives.innerHTML) < 5) {
        lives.innerHTML = parseInt(lives.innerHTML) + 1;
      }
    }
=======
>>>>>>> bb947b327418f9d1ff02ba7687db4a4b263bad24
  }
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  ball.drawBall(ctx);
  paddle.drawPaddle(ctx);
  block.drawBlocks(blocks, ctx);
  if (heart) {
    heart.draw(ctx);
    heart.increaseSpeed();
    if (heart.checkUserGetHeart(paddle, gameHeight)) {
      increaseLives();
      heart = null;
    } else if (heart.y > gameHeight) {
      heart = null;
    }
  }
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
  document.getElementById("menu-container").remove();
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
  lives.innerHTML = parseInt(lives.innerHTML) - 1;

  if (parseInt(lives.innerHTML) === 0) {
    xDirection = 0;
    yDirection = 0;
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    document.removeEventListener("mousemove", moveMouse);
    displayGameOver("Game Over!", false);
  }
}

function resetBall() {
  ball.x = paddle.position + paddle.width / 2;
  ball.y = gameHeight - paddle.height - 10;
  xDirection = 1;
  yDirection = -1;
  if (parseInt(lives.innerHTML) === 0) {
    xDirection = 0;
    yDirection = 0;
  }
}

function increaseLives() {
<<<<<<< HEAD
  heart.draw(ctx);
}

function winGame() {
  const checkArray = [];
  blocks
    .filter((block) => block.visible !== -1)
    .map((block) => checkArray.push(block));
  if (checkArray.length === 0) {
    //Stop the ball movement and the remove event listeners
    xDirection = 0;
    yDirection = 0;
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    document.removeEventListener("mousemove", moveMouse);
    displayGameOver("You Win!", true);
  }
}

function displayGameOver(message, isWin) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.zIndex = "1000";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  // Create message box
  const messageBox = document.createElement("div");
  messageBox.style.backgroundColor = isWin ? "#4CAF50" : "#f44336";
  messageBox.style.padding = "2rem";
  messageBox.style.borderRadius = "10px";
  messageBox.style.textAlign = "center";
  messageBox.style.color = "white";

  // Add content
  messageBox.innerHTML = `
    <h2>${message}</h2>
    <button id="restart-btn" style="
        padding: 10px 20px;
        margin: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background: white;
        color: ${isWin ? "#4CAF50" : "#f44336"};
      ">
      Play Again
    </button>
  `;

  // Add elements to DOM
  overlay.appendChild(messageBox);
  document.body.appendChild(overlay);

  // Handle restart
  document.getElementById("restart-btn").addEventListener("click", () => {
    document.body.removeChild(overlay);
    resetGame();
  });
}

function resetGame() {
  blocks = initializeContainers(gameWidth, blockWidth, blockHeight);

  ball.x = gameWidth / 2;
  ball.y = gameHeight - 30;

  paddle.position = (gameWidth - paddle.width) / 2;

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  document.addEventListener("mousemove", moveMouse);
  const scoreElement = document.getElementById("score");
  const livesElement = document.getElementById("lives");
  scoreElement.textContent = "0";
  livesElement.textContent = "3";

  xDirection = 1;
  yDirection = -1;
}
=======
  const lives = document.getElementById("lives");
  const currentLives = parseInt(lives.innerHTML);
  if (currentLives < 5) {
    lives.innerHTML = currentLives + 1;
  }
}
>>>>>>> bb947b327418f9d1ff02ba7687db4a4b263bad24
