class Noed {
  childRight;
  childBottom;
  childTop;
  childLeft;
  x;
  y;
  parentPosition;
  parent;
  constructor(parent, parentPosition, x, y, callback = renderNoed) {
    this.parent = parent;
    this.parentPosition = parentPosition;
    this.x = x;
    this.y = y;
    callback && callback(this);
  }
}

let visitedCells = [];

const deleteBorder = (row, column, border) =>
  (document.getElementById("cell_" + row + "_" + column).style[
    `border-${border}`
  ] = "none");

const fillMatrix = () => {
  for (let i = 0; i < COLS; i++) {
    visitedCells[i] = new Array(ROWS).fill(0);
  }
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * @param {Noed} noed
 */
const renderNoed = (noed) => {
  currentCell = document.getElementById("cell_" + noed.y + "_" + noed.x);
  currentCell.style.backgroundColor = "#f00000";
  if (!noed.parent && !noed.parentPosition) return;

  deleteBorder(
    noed.parent.y,
    noed.parent.x,
    oppsitDirection[noed.parentPosition]
  );
  deleteBorder(noed.y, noed.x, noed.parentPosition);
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
 * @param {Noed} noed current
 * @returns
 */
const generateTree = async (noed) => {
  // await sleep(0);
  visitedCells[noed.x][noed.y] = 1;
  let possibleMoves = Object.values(MOVES);
  //check possible Moves
  if (!isPossibleMove(noed.x - 1, noed.y))
    possibleMoves = possibleMoves.filter((move) => move !== MOVES.LEFT);
  if (!isPossibleMove(noed.x + 1, noed.y))
    possibleMoves = possibleMoves.filter((move) => move !== MOVES.RIGHT);
  if (!isPossibleMove(noed.x, noed.y - 1))
    possibleMoves = possibleMoves.filter((move) => move !== MOVES.TOP);
  if (!isPossibleMove(noed.x, noed.y + 1))
    possibleMoves = possibleMoves.filter((move) => move !== MOVES.BOTTOM);
  if (possibleMoves.length === 0) return;
  //generate childrens
  for (let i = 0; i <= Math.min(possibleMoves.length - 1, 2); i++) {
    const randomDirection =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    possibleMoves = possibleMoves.filter((move) => move !== randomDirection);
    switch (randomDirection) {
      case "right":
        noed.childRight = new Noed(
          noed,
          oppsitDirection[randomDirection],
          noed.x + 1,
          noed.y
        );

        // visitedCells[noed.x + 1][noed.y] = 1;
        generateTree(noed.childRight);
        break;

      case "bottom":
        noed.childBottom = new Noed(
          noed,
          oppsitDirection[randomDirection],
          noed.x,
          noed.y + 1
        );
        // visitedCells[noed.x][noed.y + 1] = 1;
        generateTree(noed.childBottom);
        break;

      case "left":
        noed.childLeft = new Noed(
          noed,
          oppsitDirection[randomDirection],
          noed.x - 1,
          noed.y
        );
        // visitedCells[noed.x - 1][noed.y] = 1;
        generateTree(noed.childLeft);
        break;

      case "top":
        noed.childTop = new Noed(
          noed,
          oppsitDirection[randomDirection],
          noed.x,
          noed.y - 1
        );
        // visitedCells[noed.x][noed.y - 1] = 1;
        generateTree(noed.childTop);
        break;
    }
  }
  return;
};

createBlankMaze(ROWS, COLS);
fillMatrix();
const root = new Noed(null, null, 0, 0);
generateTree(root);
console.log(root);
