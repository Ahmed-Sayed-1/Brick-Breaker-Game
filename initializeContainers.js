export function initializeContainers(gameWidth, blockWidth, blockHeight) {
  let blocks = [];
  const randomRows = Math.floor(Math.random() * 3) + 4;
  const spacings = [5, 10, 15, 20, 25];
  const randomIndex = Math.floor(Math.random() * spacings.length);
  const spacing = spacings[randomIndex];
  const colCount = Math.floor(gameWidth / (blockWidth + spacing));
  const totalWidth = colCount * blockWidth + (colCount - 1) * spacing;
  const randomHorizontal = [10, 20, 30, 50, 60, 70, 80];
  const totalPageHeight = window.innerHeight;
  const verticalMargin = 0.03 * totalPageHeight;
  let visibility;
  for (let row = 0; row < randomRows; row++) {
    const randomI = Math.floor(Math.random() * randomHorizontal.length);
    const HorizontalMargin = randomHorizontal[randomI];
    for (let col = 0; col < colCount; col++) {
      if (Math.random() > 0.85) {
        visibility = -1;
      } else {
        visibility = 2;
      }
      let block = {
        x: HorizontalMargin + col * (blockWidth + spacing),
        y: verticalMargin + row * (blockHeight + spacing),
        width: blockWidth,
        height: blockHeight,
        visible: visibility,
        cracked: false,
        inLevel: 1,
      };
      blocks.push(block);
    }
  }
  return blocks;
}
