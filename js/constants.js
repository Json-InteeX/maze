const COLS = 10;
const ROWS = 10;

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
