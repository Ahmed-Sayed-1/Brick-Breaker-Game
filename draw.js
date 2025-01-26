const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1; 
let dy = -1;
const ballRadius = 10; 

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function handleDirection() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; 
  }
  x += dx;

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  y += dy;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  drawBall();
  handleDirection(); 
}

function startGame() {
  setInterval(draw, 10);
}

document.getElementById("runButton").addEventListener("click", function () {
  startGame();
  this.disabled = true; 
});