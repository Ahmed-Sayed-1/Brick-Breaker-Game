export class Ball {
  constructor(x, y, ballRadius) {
    this.ballRadius = ballRadius;
    this.x = x;
    this.y = y;
  }
  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}
