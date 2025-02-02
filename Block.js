export class Block {
  static blockWidth = 20;
  static blockHeight = 10;
  visible;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visible = 2;
  }

  drawBlock(ctx) {
    if (this.visible == 2) {
      ctx.fillStyle = "#0095DD";
    } else if (this.visible == 1) {
      ctx.fillStyle = "#FFFFFF";
    } else {
      ctx.fillStyle = "#252525";
    }

    ctx.fillRect(this.x, this.y, Block.blockWidth, Block.blockHeight);
  }
}
