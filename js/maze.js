class Cell {
  constructor(
    parent,
    parentPosition,
    x,
    y,
    possibleMoves,
    callback = renderNoed
  ) {
    this.parent = parent;
    this.childs = [];
    this.parentPosition = parentPosition;
    this.x = x;
    this.y = y;
    this.possibleMoves = possibleMoves;
    callback && callback(parent, this);
  }

  deleteMove = (move) => {
    this.possibleMoves = this.possibleMoves.filter((m) => m !== move);
  };

  /**
   * Choose one random move from possible moves
   * @returns {"top" | "bottom" | "right" | "left" } "top" | "bottom" | "right" | "left"
   */
  chooseMove = () =>
    this.possibleMoves[Math.floor(Math.random() * this.possibleMoves.length)];
}

const deleteBorder = (row, column, border) =>
  (document.getElementById("cell_" + row + "_" + column).style[
    `border-${border}-color`
  ] = COLORS.litegray);

/**
 * create a matrix filled out with 0
 * @param {number} COLS
 * @param {number} ROWS
 * @returns Matrix [][]
 */
const fillMatrix = (COLS, ROWS) => {
  let matrix = [];
  for (let i = 0; i < COLS; i++) matrix[i] = new Array(ROWS).fill(0);
  return matrix;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * get the previous cell position by calculating coordinates
 * @param {Cell} from
 * @param {Cell} to
 */
function getPreviousPosition(from, to) {
  if (from.x > to.x) return MOVES.RIGHT;
  if (from.x < to.x) return MOVES.LEFT;
  if (from.y > to.y) return MOVES.BOTTOM;
  if (from.y < to.y) return MOVES.TOP;
}

/**
 * @param {Cell} cell
 */
const renderNoed = (from, to) => {
  const currentCell = document.getElementById("cell_" + to.y + "_" + to.x);
  currentCell.style.backgroundColor = COLORS.RED;
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
 *
 * @param {number} x
 * @param {number} y
 * @returns boolean
 */
const isPossibleMove = (x, y) => {
  if (x >= COLS || x < 0 || y >= ROWS || y < 0) return false;
  if (visitedCells[x][y]) return false;
  return true;
};

/**
 *
 * @param {Cell} cell current
 * @returns
 */
const generateMaze = async (cell) => {
  while (cell.parent || cell.possibleMoves.length > 0) {
    // /!\ uncoment next line to see animation /!\
    // await sleep(0);
    visitedCells[cell.x][cell.y] = 1;
    //check possible Moves
    if (!isPossibleMove(cell.x - 1, cell.y)) cell.deleteMove(MOVES.LEFT);
    if (!isPossibleMove(cell.x + 1, cell.y)) cell.deleteMove(MOVES.RIGHT);
    if (!isPossibleMove(cell.x, cell.y - 1)) cell.deleteMove(MOVES.TOP);
    if (!isPossibleMove(cell.x, cell.y + 1)) cell.deleteMove(MOVES.BOTTOM);

    // if there is no possible moves, then back track!
    if (cell.possibleMoves.length === 0) {
      renderNoed(cell, cell.parent);
      cell = cell.parent;
      continue;
    }

    // chose one move randomly from possible moves
    const chosedMove = cell.chooseMove();
    cell.deleteMove(chosedMove);

    let nextCell = null,
      x = cell.x,
      y = cell.y;
    switch (chosedMove) {
      case "right":
        x = x + 1;
        break;
      case "bottom":
        y = y + 1;
        break;
      case "left":
        x = x - 1;
        break;
      case "top":
        y = y - 1;
        break;
      default: return;
    }
    // create a new Cell and link it to it's parent!
    nextCell = new Cell(cell, oppsitDirection[chosedMove], x, y, possibleMoves);
    cell.childs = [...cell.childs, nextCell];
    cell = nextCell;
  }
};

createBlankMaze(ROWS, COLS);
// create a matrix that represents our grid
let visitedCells = fillMatrix(ROWS, COLS);
const possibleMoves = Object.values(MOVES);
const root = new Cell(null, null, 0, 0, possibleMoves);
generateMaze(root);
