import * as Factory from "./factoryMethode.js";
import { drawGrid } from "./sceen.js";
import { COLS, GENERATOR, ROWS } from "./constants.js";


drawGrid(ROWS, COLS);
let generator = Factory.createGenerator(GENERATOR.BACKTRACK, ROWS, COLS);
generator.generate();
