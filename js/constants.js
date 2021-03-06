const COLS = 15;
const ROWS = 15;

const START = {
  X: 3,
  Y: 0,
};

const END = {
  X: 4,
  Y: ROWS - 1,
};

const MOVES = {
  TOP: "top",
  BOTTOM: "bottom",
  RIGHT: "right",
  LEFT: "left",
};

const oppsitDirection = {
  right: MOVES.LEFT,
  bottom: MOVES.TOP,
  left: MOVES.RIGHT,
  top: MOVES.BOTTOM,
};
