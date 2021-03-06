/**
 * @param {number} mazeHeight number of rows
 * @param {number} mazeWidth number of columns
 */
const createBlankMaze = (mazeHeight, mazeWidth) => {
  let rowIndex, colIndex;
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  for (rowIndex = 0; rowIndex < mazeHeight; rowIndex++) {
    // create a row
    let row = document.createElement("tr");

    for (colIndex = 0; colIndex < mazeWidth; colIndex++) {
      // create a column
      let col = document.createElement("td");
      // if (rowIndex == 0 && colIndex == 0) {
      //   col.style.backgroundColor = "rgb(0,255,0)";
      //   col.setAttribute("type", "start");
      // } else if (rowIndex === mazeHeight - 1 && colIndex === mazeWidth - 1) {
      //   col.style.backgroundColor = "rgb(0,255,0)";
      //   col.setAttribute("type", "finish");
      // } else {
      //   col.style.backgroundColor = "rgb(255,255,255)";
      // }
      col.style.backgroundColor = "rgb(255,255,255)";
      col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);

      row.appendChild(col);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  document.querySelector(".table").appendChild(table);
};
