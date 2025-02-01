import { gameHeight } from "./index.js";
export class Paddle {
  constructor(height, width, position) {
    this.height = height;
    this.width = width;
    this.position = position;
  }
  drawPaddle(ctx) {
    ctx.beginPath();
    ctx.rect(this.position, gameHeight - this.height, this.width, this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}
