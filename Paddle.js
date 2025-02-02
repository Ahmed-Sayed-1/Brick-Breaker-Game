import { gameHeight } from "./index.js";
export class Paddle {
  constructor(height, width, position) {
    this.height = height;
    this.width = width;
    this.position = position;
  }
  drawPaddle(ctx) {
    let radius = 10;
  
    ctx.beginPath();
    ctx.moveTo(this.position + radius, gameHeight - this.height);
    
  
    ctx.arcTo( // top-right corner
      this.position + this.width,
      gameHeight - this.height,
      this.position + this.width,
      gameHeight,
      radius
    );
  
   
    ctx.arcTo( //bottom-right corner
      this.position + this.width,
      gameHeight,
      this.position,
      gameHeight,
      radius
    );
  
    ctx.arcTo( //bottom-left corner
      this.position,
      gameHeight,
      this.position,
      gameHeight - this.height,
      radius
    );
  
  
    ctx.arcTo( //top-left corner
      this.position,
      gameHeight - this.height,
      this.position + this.width,
      gameHeight - this.height,
      radius
    );
  
    ctx.closePath();
    ctx.fillStyle = "#373D42"; 
    ctx.fill();
  }

}