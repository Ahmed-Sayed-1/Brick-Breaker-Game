//Insert the containers
function initializeContainers() {
  // const mainContainer = document.querySelector(".main-container");
  const subContainer = document.querySelector(".sub-container");
  const randomNumberOfContainer = Math.floor(Math.random() * 3) + 4;
  for (let i = 0; i < randomNumberOfContainer; i++) {
    const subDiv = document.createElement("div");
    subDiv.classList.add("containers");
    subContainer.appendChild(subDiv);
    //create array of gaps
    const gaps = [0, 10, 20, 30, 40];
    const randomIndex = Math.floor(Math.random() * gaps.length);
    const gap = gaps[randomIndex];
    const numberOfBlocks = subDiv.clientWidth / (75 + gap);
    for (let j = 0; j < numberOfBlocks; j++) {
      const blocks = document.createElement("div");
      blocks.classList.add("blocks");
      subDiv.appendChild(blocks);
    }
  }
}

initializeContainers();
//I need function to create random color to set it to the block array of colors
//I need to make it responsive
