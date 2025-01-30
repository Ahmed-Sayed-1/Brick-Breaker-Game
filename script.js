//Insert canvas and append the blocks inside it
import { Block } from "./Block.js";
export function initializeContainers() {
  let blocks2 = [];
  const randomRows = Math.floor(Math.random() * 3) + 4;
  const gaps = [5, 10, 15, 20, 25];
  const randomIndex = Math.floor(Math.random() * gaps.length);
  const gap = gaps[randomIndex];
  const totalWidth = 480;
  let x = 20;
  let y = 50;
  const numberOfBlocks = totalWidth / (Block.blockWidth + gap);
  for (let i = 0; i < randomRows; i++) {
    const randomStart = [10, 20, 30, 50, 60, 70, 80];
    const randomI = Math.floor(Math.random() * randomStart.length);
    const randomBegin = randomStart[randomI];
    x = randomBegin;
    for (let j = 0; j < numberOfBlocks; j++) {
      x += Block.blockWidth + gap;
      if (x + Block.blockWidth + gap > totalWidth) break;
      const block = new Block(x, y);
      blocks2.push(block);
    }
    y += Block.blockHeight + gap;
  }
  return blocks2;
}
