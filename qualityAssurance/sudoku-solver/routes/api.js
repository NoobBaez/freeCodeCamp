/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const body = req.body;
      const coordinate = body.coordinate && body.coordinate.split(/(?<=[a-i])(?=\d)/i);
      const parseToInt = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8 };

      const inputValidation = checkValidation(body.puzzle, coordinate, body.value);
      if (inputValidation) return res.json(inputValidation);

      const puzzle = body.puzzle;
      const row = coordinate[1];
      const column = parseToInt[coordinate[0].toLowerCase()];
      const value = body.value;

      const rowCheck = solver.checkRowPlacement(puzzle, row, column, value);
      const columnCheck = solver.checkColPlacement(puzzle, row, column, value);
      const regionCheck = solver.checkRegionPlacement(puzzle, row, column, value);

      let result = { valid: true }
      if (!rowCheck || !columnCheck || !regionCheck) {
        result.conflict = [];
        if (!rowCheck) result.conflict.push('row');
        if (!columnCheck) result.conflict.push('column');
        if (!regionCheck) result.conflict.push('region');
        result.valid = false;
      };
      res.json(result);
    });

  app.route('/api/solve')
    .post((req, res) => {
      let validation = solver.validate(req.body.puzzle[0]);
      if (validation && validation.error) {
        res.json(validation);
      } else {
        let solution = solver.solve(req.body.puzzle);
        if (solution) {
          res.json({ solution });
        } else {
          res.json({ error: 'Puzzle cannot be solved' });
        };
      };
    });

  function checkValidation(puzzle, coordinate, value) {

    if (!puzzle || !coordinate || !value) {
      //if the object submitted is missing puzzle, coordinate or value
      return { error: 'Required field(s) missing' };
    } else if (/[^\.\d]/.test(puzzle)) {
      //if the puzzle submitted contains values which are not numbers or periods
      return { error: 'Invalid characters in puzzle' };
    } else if (puzzle.length !== 81) {
      //if the puzzle submitted is greater or less than 81 characters
      return { error: 'Expected puzzle to be 81 characters long' };
    } else if (/[^a-i]/i.test(coordinate[0]) || /\D/.test(coordinate[1])) {
      //if the coordinate submitted does not point to an existing grid cell
      return { error: 'Invalid coordinate' }
    } else if (/\D/.test(value)) {
      //if the value submitted to /api/check is not a number between 1 and 9
      return { error: 'Invalid value' };
    } else {
      return null;
    }
  };
};
