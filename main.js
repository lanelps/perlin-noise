import { Noise } from "noisejs";
import "./main.css";

const mainGridElement = document.getElementById(`grid`);
const updateButton = document.getElementById(`update`);

const NODES = 50;

function listenerEvents() {
  updateButton.addEventListener(`click`, () => updateGrid());
}

function generateGrid(nodes) {
  let grid = [];
  const noise = new Noise(Math.random());

  for (let x = 0; x < nodes; x++) {
    let row = [];
    for (let y = 0; y < nodes; y++) {
      const value = noise.perlin2(x / 2, y / 2);
      row.push(value + 0.5);
    }
    grid.push(row);
  }
  return grid;
}

function generateGridNodes(grid) {
  grid.forEach((gridRow, gridRowIndex) => {
    const gridRowEl = document.createElement(`div`);
    gridRowEl.classList.add(`row`);

    gridRow.forEach((_, gridColumnIndex) => {
      const pixel = document.createElement(`div`);
      pixel.classList.add(`pixel`);
      pixel.dataset.row = gridRowIndex;
      pixel.dataset.column = gridColumnIndex;

      gridRowEl.appendChild(pixel);
    });

    mainGridElement.appendChild(gridRowEl);
  });
}

function drawGrid(grid) {
  grid.forEach((gridRow, gridRowIndex) => {
    gridRow.forEach((gridItem, gridColumnIndex) => {
      const pixel = document.querySelector(
        `[data-row="${gridRowIndex}"][data-column="${gridColumnIndex}"]`
      );
      const color = gridItem * 255;
      pixel.style.cssText = `
        background-color: rgba(${color},${color},${color});
      `;
    });
  });
}

function updateGrid() {
  const updatedGrid = generateGrid(NODES);
  drawGrid(updatedGrid);
}

function main() {
  listenerEvents();

  const initialGrid = generateGrid(NODES);
  generateGridNodes(initialGrid);
  drawGrid(initialGrid);
}

main();
