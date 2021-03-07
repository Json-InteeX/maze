/**
 * @param {number} mazeHeight number of rows
 * @param {number} mazeWidth number of columns
 */
const createBlankMaze = (mazeHeight, mazeWidth) => {
  let rowIndex, colIndex;
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  for (rowIndex = 0; rowIndex < mazeHeight; rowIndex++) {
    let row = document.createElement("tr");
    for (colIndex = 0; colIndex < mazeWidth; colIndex++) {
      let col = document.createElement("td");
      col.style.backgroundColor = "rgb(255,255,255)";
      col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
      row.appendChild(col);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  document.querySelector(".table").appendChild(table);
};
