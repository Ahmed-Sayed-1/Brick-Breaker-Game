const fireballImage = new Image();
fireballImage.src = "/assets/images/images-Photoroom.png";

export class Ball {
  constructor(x, y, ballRadius) {
    this.ballRadius = ballRadius;
    this.x = x;
    this.y = y;
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.drawImage(fireballImage, this.x - this.ballRadius, this.y - this.ballRadius, 2 * this.ballRadius, 2 * this.ballRadius);
    ctx.closePath();
  }
}