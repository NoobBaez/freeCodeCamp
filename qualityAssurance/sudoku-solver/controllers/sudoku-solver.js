class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString) {
      return { error: 'Required field missing' };
    } else if (/[^\.\d]/.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    } else if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    } else {
      return null;
    }
  };

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.createGrid(puzzleString);
    if (grid[row - 1][column] === value) return true;
    let rowValues = puzzleString.slice(9 * (row - 1), 9 * row).replace(/\./g, "");
    //return TRUE if it is not present at the row, FALSE otherwise
    return !rowValues.includes(value);
  };

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.createGrid(puzzleString);
    if (grid[row - 1][column] === value) return true;

    let colValues = puzzleString.split("").reduce((arr, _ele, index) => {
      if (index % 9 === 0) {
        if (/\d/.test(puzzleString[index + column])) {
          return arr.concat(puzzleString[index + column]);
        };
      };
      return arr;
    }, []).join('');
    //return TRUE if it is not include at the col, FALSE otherwise
    return !colValues.includes(value)
  };

  checkRegionPlacement(puzzleString, row, column, value) {
    let _grid = this.createGrid(puzzleString);
    if (_grid[row - 1][column] === value) return true;

    let grid = this.createGrid(puzzleString);
    let x = Math.floor(column / 3) * 3;
    let y = Math.floor((row - 1) / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let t = 0; t < 3; t++) {
        if (grid[y + i][x + t] === value.toString()) return false;
      };
    };
    return true;
  };

  solve(puzzle, log = []) {
    const puzzleString = puzzle[puzzle.length - 1];
    let grid = this.createGrid(puzzleString);

    for (let row = 1; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row - 1][col] === '.') {
          for (let value = 1; value < 10; value++) {
            value = value.toString();

            //check that the VALUE is valid the COLUMN, ROW and REGION (3x3 grid)
            let checkCol = this.checkColPlacement(puzzleString, row, col, value);
            let checkRow = this.checkRowPlacement(puzzleString, row, col, value);
            let checkRegion = this.checkRegionPlacement(puzzleString, row, col, value);

            if (checkCol && checkRow && checkRegion) {
              //add the value (number) to the grid and parse it
              grid[row - 1][col] = value;
              let newPuzzleString = grid.flat().join("");
              log.push(newPuzzleString);
              //console.log(log);
              //if the return value for the next recursion is a GRID you got a solution 
              //other wise it is NULL and have to reset the coordinate to a dot (.) and 
              //try with a different value
              let isSolution = this.solve(puzzle.concat(newPuzzleString), log);
              if (isSolution) return isSolution;
              grid[row - 1][col] = '.';
            };
          };
          return null;
        };
      };
    };
    return log//puzzle.concat(grid.flat().join(""));
  };

  createGrid(puzzleString) {
    let grid = [];
    let arrContainer = [];

    //create a 9x9 grid
    puzzleString.split("").forEach((ele) => {
      if (arrContainer.length < 9) arrContainer.push(ele);
      if (arrContainer.length === 9) {
        grid.push(arrContainer);
        arrContainer = [];
      };
    });
    return grid;
  };
};

module.exports = SudokuSolver;

