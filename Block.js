const blockImage = new Image();
const crackedBlockImage = new Image();
const unbreakableBlockImage = new Image();
crackedBlockImage.src = "/assets/images/cracked-block-image.jpg";
blockImage.src = "/assets/images/block-image.jpg";
unbreakableBlockImage.src = "assets/images/unbreakable-blocks.jpg";

export class Block {
  static blockWidth = 100;
  static blockHeight = 50;
  visible;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visible = 2;
  }

  drawBlocks(blocks, ctx) {
    blocks.forEach((block) => {
      if (block.visible && block.inLevel) {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.beginPath();
        if (block.visible < 0) {
          ctx.drawImage(
            unbreakableBlockImage,
            block.x,
            block.y,
            block.width,
            block.height
          );
        } else if (block.cracked) {
          ctx.drawImage(
            crackedBlockImage,
            block.x,
            block.y,
            block.width,
            block.height
          );
        } else {
          ctx.drawImage(
            blockImage,
            block.x,
            block.y,
            block.width,
            block.height
          );
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#373D42";
        ctx.strokeRect(block.x, block.y, block.width, block.height);
        ctx.closePath();
        ctx.restore();
      }
    });
  }

  drawCrackedBlock(block) {
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.beginPath();
    ctx.drawImage(
      crackedBlockImage,
      block.x,
      block.y,
      block.width,
      block.height
    );
    ctx.closePath();
    ctx.restore();
  }
}
