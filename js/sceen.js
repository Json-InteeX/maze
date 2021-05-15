import { oppsitDirection, COLORS, MOVES } from "./constants.js";
/**
 *
 * @param {number} rows
 * @param {number} cols
 */
export const drawGrid = (rows, cols) => {
  let rowIndex, colIndex;
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  for (rowIndex = 0; rowIndex < rows; rowIndex++) {
    let row = document.createElement("tr");
    for (colIndex = 0; colIndex < cols; colIndex++) {
      let col = document.createElement("td");
      col.style.backgroundColor = "rgb(0,0,0)";
      col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
      row.appendChild(col);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  document.querySelector(".table").appendChild(table);
};

const deleteBorder = (row, column, border) =>
(document.getElementById("cell_" + row + "_" + column).style[
  `border-${border}-color`
] = COLORS.litegray);
/**
 *
 * @param {*} from
 * @param {*} to
 * @returns
 */
export const renderNoed = (from, to, headColor = COLORS.red) => {
  const currentCell = document.getElementById("cell_" + to.y + "_" + to.x);
  currentCell.style.backgroundColor = headColor;
  // start Cell Color
  if (to.y == 0 && to.x == 0) {
    currentCell.style.backgroundColor = COLORS.litegray;
    currentCell.setAttribute("type", "start");
  }
  if (!from) return;

  const fromPosition = getPreviousPosition(from, to);
  const preveCell = document.getElementById("cell_" + from.y + "_" + from.x);
  preveCell.style.backgroundColor = COLORS.litegray;

  deleteBorder(from.y, from.x, oppsitDirection[fromPosition]);
  deleteBorder(to.y, to.x, fromPosition);
};

/**
 * get the previous cell position by calculating coordinates
 * @param {Cell} from
 * @param {Cell} to
 */
const getPreviousPosition = (from, to) => {
  if (from.x > to.x) return MOVES.RIGHT;
  if (from.x < to.x) return MOVES.LEFT;
  if (from.y > to.y) return MOVES.BOTTOM;
  if (from.y < to.y) return MOVES.TOP;
};

export const setContent = (row, col, content) => {
  const cell = document.getElementById("cell_" + row + "_" + col);
  cell.innerHTML += content;
  cell.style.backgroundColor = "rgb(255,255,255)";
  cell.style.textAlign = "center";
};
/**
 * 
 * @param {boolean} isVertical 
 * @param {any} cell
 */
export const drawLine = (from, to, hole, isVertical) => {
  for (let i = from; i < to; i++) {
    if (isVertical) {
      deleteBorder(i, hole.x - 1, "right")
    } else deleteBorder(hole.y - 1, i, "bottom")
  }

  if (isVertical)
    document.getElementById("cell_" + hole.y + "_" + (hole.x - 1)).style[
      `border-right-color`
    ] = COLORS.black;

  if (!isVertical)
    document.getElementById("cell_" + (hole.y - 1) + "_" + hole.x).style[
      `border-bottom-color`
    ] = COLORS.black;

}
