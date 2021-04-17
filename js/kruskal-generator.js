import { COLORS } from "./constants.js";
import { renderNoed, setContent } from "./sceen.js";
import { randomIndex, sleep } from "./utils/helpers.js";

class Node {
  /**
   *
   * @param {any} value
   * @param {Node} parent
   */
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
  }
}
export class UnionFind {
  nodes = new Map();

  /**
   * add a value and assign it to a nex unique class
   * @param {any} value 
   */
  add = (value) => {
    this.nodes.set(value, new Node(value, null));
  };

  /**
   * merge two classes that the values belongs to
   * if the two values are from same class 
   * does nothing   * 
   * @param {any} value1 value from class  
   * @param {any} value2 value from class 
   */
  union = (value1, value2) => {
    const root1 = this.find(value1);
    const root2 = this.find(value2);
    if (root1.value < root2.value) root2.parent = root1;
    else root1.parent = root2;
  };

  /**
   *  return the root of the class of the provided value
   * @param {any} value
   * @returns {Node} root of this node.
   */
  find = (value) => {
    let current = this.nodes.get(value);
    while (current.parent !== null) {
      current = current.parent;
    }
    return current;
  };

  isSmaeClass = (value1, value2) => {
    const root1 = this.find(value1);
    const root2 = this.find(value2);
    return root1.value === root2.value;
  };
}

/**
 * @see `https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Kruskal's_algorithm`
 * @see `https://fr.wikipedia.org/wiki/Mod%C3%A9lisation_math%C3%A9matique_de_labyrinthe#Fusion_al%C3%A9atoire_de_chemins`
 */
export class KruskalGenerator {
  walls = [];
  cells = null;
  constructor(rows, cols, xStart, yStart, xEnd, yEnd) {
    this.rows = rows;
    this.cols = cols;
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
  }

  setup = () => {
    this.cells = new UnionFind();
    for (let i = 0; i < this.cols * this.rows; i++) {
      //add i to union-find structure
      this.cells.add(i);
      //add the vertical wall of i to wals list
      if ((i + 1) % this.cols !== 0) this.walls.push({ x: i, y: i + 1 });
      //add the horizontal wall of i to wals list
      if (i < this.cols * (this.rows - 1))
        this.walls.push({ x: i, y: i + this.cols });
    }
  };

  generate = async () => {
    this.setup();
    while (this.walls.length) {
      const element = this.walls.splice(randomIndex(this.walls), 1)[0];

      // if same class don't join the cells
      if (this.cells.isSmaeClass(element.x, element.y)) continue;

      // they are in the same class so we join cells and merge classes
      this.cells.union(element.x, element.y);

      // convert from sequenece number to coordinates
      const from = {
        y: Math.floor(element.x / this.cols),
        x: element.x % this.cols,
      };
      const to = {
        y: Math.floor(element.y / this.cols),
        x: element.y % this.cols,
      };
      await sleep(10);
      renderNoed(from, to, COLORS.litegray);
    }
  };
}
