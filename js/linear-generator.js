import { COLORS, MOVES } from "./constants.js";
import { renderNoed } from "./sceen.js";
import { selectRandomElement, sleep } from "./utils/helpers.js";

/**
 * A binary tree maze is a standard orthogonal maze where each cell 
 * always has a passage leading up or leading left, but never both.
 */
export class BinaryTreeGenerator {

  constructor(rows, cols, xStart, yStart, xEnd, yEnd) {
    this.rows = rows;
    this.cols = cols;
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
  }

  /**
   * 
   * @param {Array} possibleMoves 
   * @param {number} x
   * @param {number} y 
   */
  filterPossibleMoves = (possibleMoves, x, y) => {
    if (x === 0) {
      possibleMoves = possibleMoves.filter(m => m != MOVES.LEFT)
    }
    if (y === 0) {
      possibleMoves = possibleMoves.filter(m => m != MOVES.TOP)
    }
    return possibleMoves
  }

  generate = async () => {

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {

        let possibleMoves = [MOVES.TOP, MOVES.LEFT]

        await sleep(0)
        possibleMoves = this.filterPossibleMoves(possibleMoves, j, i)
        if (possibleMoves.length == 0) {
          console.log(i, j)
          continue
        }
        let move = selectRandomElement(possibleMoves)

        let from = null
        switch (move) {
          case MOVES.TOP:
            from = { x: j, y: i - 1 }
            break;

          default:
            from = { x: j - 1, y: i }
            break;
        }
        renderNoed(from, { x: j,  y: i }, COLORS.litegray)
      }

    }
  }
}