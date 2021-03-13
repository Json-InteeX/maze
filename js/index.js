import { Backtrackgenerator } from "./backtrack-generator.js";
import { drawGrid } from "./sceen.js";
import { COLS, ROWS } from "./constants.js";

drawGrid(ROWS, COLS);
let generator = new Backtrackgenerator(ROWS, COLS, 0, 0, 0, 0);
generator.generate();
