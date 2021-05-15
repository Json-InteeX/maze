import { GENERATOR } from "./constants.js";
import {
  BinaryTreeGenerator,
  RecursiveDivision,
  KruskalGenerator,
  Backtrackgenerator,
} from "./generators";

export const createGenerator = (
  type,
  rows,
  cols,
  xStart = 0,
  yStart = 0,
  xEnd = 0,
  yEnd = 0
) => {
  let generator;

  if (type === GENERATOR.BINARY) {
    generator = new BinaryTreeGenerator(rows, cols, xStart, yStart, xEnd, yEnd);
  } else if (type === GENERATOR.KRUSKAL) {
    generator = new KruskalGenerator(rows, cols, xStart, yStart, xEnd, yEnd);
  } else if (type === GENERATOR.RECURSIVE_DIVISION) {
    generator = new RecursiveDivision(rows, cols, xStart, yStart, xEnd, yEnd);
  } else if (type === GENERATOR.BACKTRACK) {
    generator = new Backtrackgenerator(rows, cols, xStart, yStart, xEnd, yEnd);
  }

  return generator;
};
