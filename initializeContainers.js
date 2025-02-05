export function initializeContainers(gameWidth, blockWidth, blockHeight) {
  let blocks = [];
  const randomRows = Math.floor(Math.random() * 3) + 4;
  const spacings = [5, 10, 15, 20, 25];
  const randomIndex = Math.floor(Math.random() * spacings.length);
  const spacing = spacings[randomIndex];
  const colCount = Math.floor(gameWidth / (blockWidth + spacing));
  const randomHorizontal = [10, 20, 30, 50, 60, 70, 80];
  const totalPageHeight = window.innerHeight;
  const verticalMargin = 0.1 * totalPageHeight;
  const verticalLimit = 0.7 * totalPageHeight;
  let visibility;

  for (let row = 0; row < randomRows; row++) {
    const randomI = Math.floor(Math.random() * randomHorizontal.length);
    const HorizontalMargin = randomHorizontal[randomI];
    const rowOffset = Math.random() * 0.05 * gameWidth;
    const maxHeight = Math.min(
      verticalMargin + row * (blockHeight + spacing),
      verticalLimit
    );
    for (let col = 0; col < colCount; col++) {
      visibility = Math.random() > 0.85 ? -1 : 2;
      let block = {
        x: HorizontalMargin + col * (blockWidth + spacing),
        y: maxHeight,
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