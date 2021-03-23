import { Backtrackgenerator } from "./backtrack-generator.js";
import { drawGrid } from "./sceen.js";
import { COLS, ROWS } from "./constants.js";
import { BinaryTreeGenerator } from "./linear-generator.js";
import { KruskalGenerator } from "./kruskal-generator.js";

drawGrid(ROWS, COLS);
let generator = new KruskalGenerator(ROWS, COLS, 0, 0, 0, 0);
generator.generate();
