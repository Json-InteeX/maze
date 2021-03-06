class Noed {
  childs;
  x;
  y;
  parentPosition;
  parent;
  possibleMoves;
  constructor(
    parent,
    parentPosition,
    x,
    y,
    possibleMoves,
    callback = renderNoed
  ) {
    this.childs = [];
    this.parent = parent;
    this.parentPosition = parentPosition;
    this.x = x;
    this.y = y;
    this.possibleMoves = possibleMoves;
    callback && callback(parent, this);
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
 *
 * @param {Noed} from
 * @param {Noed} to
 */
function getPreviousPosition(from, to) {
  if (from.x > to.x) return MOVES.RIGHT;
  if (from.x < to.x) return MOVES.LEFT;
  if (from.y > to.y) return MOVES.BOTTOM;
  if (from.y < to.y) return MOVES.TOP;
  console.log("why..?");
}
/**
 * @param {Noed} noed
 */
const renderNoed = (from, to) => {
  currentCell = document.getElementById("cell_" + to.y + "_" + to.x);
  currentCell.style.backgroundColor = "#ff0000";

  //Green color for the start and the end of the maze
  if (to.y == START.Y && to.x == START.X) {
    currentCell.style.backgroundColor = "rgb(0,255,0)";
    currentCell.setAttribute("type", "start");
  } else if (to.y === END.Y && to.x === END.X) {
    currentCell.style.backgroundColor = "rgb(0,255,0)";
    currentCell.setAttribute("type", "finish");
  }

  if (!from) return;

  let fromPosition = getPreviousPosition(from, to);
  let preveCell = document.getElementById("cell_" + from.y + "_" + from.x);
  preveCell.style.backgroundColor = "#B0AFAF";

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
 * @param {Noed} noed current
 * @returns
 */
const generateTree = async (noed) => {
  await sleep(10);
  visitedCells[noed.x][noed.y] = 1;
  //check possible Moves
  if (!isPossibleMove(noed.x - 1, noed.y))
    noed.possibleMoves = noed.possibleMoves.filter(
      (move) => move !== MOVES.LEFT
    );
  if (!isPossibleMove(noed.x + 1, noed.y))
    noed.possibleMoves = noed.possibleMoves.filter(
      (move) => move !== MOVES.RIGHT
    );
  if (!isPossibleMove(noed.x, noed.y - 1))
    noed.possibleMoves = noed.possibleMoves.filter(
      (move) => move !== MOVES.TOP
    );
  if (!isPossibleMove(noed.x, noed.y + 1))
    noed.possibleMoves = noed.possibleMoves.filter(
      (move) => move !== MOVES.BOTTOM
    );
  if (noed.possibleMoves.length === 0) {
    if (!noed.parent) return;
    renderNoed(noed, noed.parent);
    return generateTree(noed.parent);
  }
  //generate childrens
  const randomDirection =
    noed.possibleMoves[Math.floor(Math.random() * noed.possibleMoves.length)];
  noed.possibleMoves = noed.possibleMoves.filter(
    (move) => move !== randomDirection
  );
  let nextNoed = null;
  switch (randomDirection) {
    case "right":
      nextNoed = new Noed(
        noed,
        oppsitDirection[randomDirection],
        noed.x + 1,
        noed.y,
        possibleMoves
      );
      break;

    case "bottom":
      nextNoed = new Noed(
        noed,
        oppsitDirection[randomDirection],
        noed.x,
        noed.y + 1,
        possibleMoves
      );
      break;

    case "left":
      nextNoed = new Noed(
        noed,
        oppsitDirection[randomDirection],
        noed.x - 1,
        noed.y,
        possibleMoves
      );
      break;
    case "top":
      nextNoed = new Noed(
        noed,
        oppsitDirection[randomDirection],
        noed.x,
        noed.y - 1,
        possibleMoves
      );
      break;
  }

  noed.childs = [...noed.childs, nextNoed];
  return generateTree(nextNoed);
};

createBlankMaze(ROWS, COLS);
fillMatrix();
const possibleMoves = Object.values(MOVES);
const root = new Noed(null, null, START.X, START.Y, possibleMoves);
generateTree(root);
console.log(root);
