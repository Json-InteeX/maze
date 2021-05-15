export const COLS = 100 ;
export const ROWS = 50;

export const MOVES = {
  TOP: "top",
  BOTTOM: "bottom",
  RIGHT: "right",
  LEFT: "left",
};

export const oppsitDirection = {
  right: MOVES.LEFT,
  bottom: MOVES.TOP,
  left: MOVES.RIGHT,
  top: MOVES.BOTTOM,
};

export const COLORS = {
  litegray: "#B0AFAF",
  red: "#ff0000",
  black: "#000000",
};


export const GENERATOR = {
 BINARY : "binary-tree",
 KRUSKAL : "kruskal",
 RECURSIVE_DIVISION : "recursive-division",
 BACKTRACK : "backtrack",
}
