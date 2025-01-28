export class Block {
  static width = 20;
  static height = 10;
  #visible;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.#visible = true;
  }

  drawBlock(ctx) {
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(this.x, this.y, Block.width, Block.height);
  }

  deleteBlock() {
    this.#visible = false;
  }
}
