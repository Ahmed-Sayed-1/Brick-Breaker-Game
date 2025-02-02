//Insert canvas and append the blocks inside it
import { Block } from "./Block.js";
const blocks = [];
function initializeContainers() {
  const canvas = document.querySelector("canvas");
  const randomRows = Math.floor(Math.random() * 3) + 4;
  const ctx = canvas.getContext("2d");
  //Create the block objects and draw them to the page
  const gaps = [5, 10, 15, 20, 25];
  const randomIndex = Math.floor(Math.random() * gaps.length);
  const gap = gaps[randomIndex];
  const totalWidth = canvas.width;
  let x = 20;
  let y = 50;
  const numberOfBlocks = totalWidth / (Block.width + gap);
  for (let i = 0; i < randomRows; i++) {
    const randomStart = [10, 20, 30, 50, 60, 70, 80];
    const randomI = Math.floor(Math.random() * randomStart.length);
    const randomBegin = randomStart[randomI];
    x = randomBegin;
    for (let j = 0; j < numberOfBlocks; j++) {
      x += Block.width + gap;
      if (x + Block.width + gap > totalWidth) break;
      const block = new Block(x, y);
      blocks.push(block);
      block.drawBlock(ctx);
    }
    console.log(x);
    y += Block.height + gap;
  }
}

initializeContainers();
//I need function to create random color to set it to the block array of colors
//I need to make it responsive
