export class Heart {
  constructor(x, y, width = 30, height = 30) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "./assets/images/heart.png";
    this.visible = true;
  }

  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  increaseSpeed() {
    this.y += 5;
  }

  checkUserGetHeart(paddle) {
    if (
      this.visible &&
      this.y + this.height >= paddle.y &&
      this.x + this.width >= paddle.x &&
      this.x <= paddle.x + paddle.width
    ) {
      this.visible = false;
      return true;
    } else {
      return false;
    }
  }

  resetPosition(canvas) {
    this.x = Math.random() * (canvas.width - 30);
    this.y = 0;
    this.visible = true;
  }
}
