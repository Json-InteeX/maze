import { renderNoed } from "../sceen.js";
import { MOVES, ROWS, COLS, oppsitDirection } from "../constants.js";
import { selectRandomElement, sleep } from "../utils/helpers.js";
/**
 *
 */
export class Backtrackgenerator {
  visitedCells = [];
  root = null;

  constructor(rows, cols, xStart, yStart, xEnd, yEnd) {
    this.rows = rows;
    this.cols = cols;
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    // create a matrix that represents our grid
    this.visitedCells = this.fillMatrix(rows, cols);
  }

  fillMatrix = (ROWS, COLS) => {
    let matrix = [];
    for (let i = 0; i < COLS; i++) matrix[i] = new Array(ROWS).fill(0);
    return matrix;
  };

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns
   */
  generate = async () => {
    let cell = new Cell(null, null, this.xStart, this.yStart, Object.values(MOVES), renderNoed);
    this.root = cell;
    while (cell.parent || cell.possibleMoves.length > 0) {
      // /!\ uncoment next line to see animation /!\
      await sleep(0);
      this.visitedCells[cell.x][cell.y] = 1;
      //check possible Moves
      if (!this.isPossibleMove(cell.x - 1, cell.y)) cell.deleteMove(MOVES.LEFT);
      if (!this.isPossibleMove(cell.x + 1, cell.y))
        cell.deleteMove(MOVES.RIGHT);
      if (!this.isPossibleMove(cell.x, cell.y - 1)) cell.deleteMove(MOVES.TOP);
      if (!this.isPossibleMove(cell.x, cell.y + 1))
        cell.deleteMove(MOVES.BOTTOM);

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
        default:
          return;
      }
      // create a new Cell and link it to it's parent!
      nextCell = new Cell(
        cell,
        oppsitDirection[chosedMove],
        x,
        y,
        Object.values(MOVES),
        renderNoed
      );
      cell.childs = [...cell.childs, nextCell];
      cell = nextCell;
    }
  };

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns boolean
   */
  isPossibleMove = (x, y) => {
    if (x >= COLS || x < 0 || y >= ROWS || y < 0) return false;
    if (this.visitedCells[x][y]) return false;
    return true;
  };
}

class Cell {
  constructor(parent, parentPosition, x, y, possibleMoves, callback) {
    this.parent = parent;
    this.childs = [];
    this.parentPosition = parentPosition;
    this.x = x;
    this.y = y;
    this.possibleMoves = possibleMoves;
    callback(parent, this);
  }

  deleteMove = (move) => {
    this.possibleMoves = this.possibleMoves.filter((m) => m !== move);
  };

  /**
   * Choose one random move from possible moves
   * @returns {"top" | "bottom" | "right" | "left" } "top" | "bottom" | "right" | "left"
   */
  chooseMove = () =>
    selectRandomElement(this.possibleMoves)
}