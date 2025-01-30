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
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(this.x, this.y, Block.blockWidth, Block.blockHeight);
  }
}
