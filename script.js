export function initializeContainers(gameWidth, blockWidth, blockHeight) {
 
  let blocks = [];
  const spacing = 10; 
  const colCount = Math.floor(gameWidth / (blockWidth + spacing));
  const rowCount = 5;
  let visibility;
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (Math.random() > 0.85) {
        visibility = -1;
      }
      else {visibility =  2;
        }
      let block ={  x: col * (blockWidth + spacing),
      y: row * (blockHeight + spacing),
      width: blockWidth,
      height: blockHeight,
      visible: visibility,
      cracked:false,
      inLevel:1,
    }
    blocks.push(block);
    console.log(block.visible);    
    }
  }
  return blocks;
}
