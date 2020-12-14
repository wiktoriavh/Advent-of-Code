import {
  resolve,
  dirname
} from "path";
import {
  readFileSync
} from "fs";
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, "../Inputs/11-data.txt");
const data = readFileSync(filePath, "utf-8");

const seats = data
  .split("\n")
  .filter(line => line)
  .map(row => row.split(""))

const empty = "L";
const floor = ".";
const occupied = "#";

/**
 * Part One
 */

function iterate(original) {
  let changedSeat = false;
  const next = original.map((line, row) => {
    return line.map((seat, col) => {
      const newState = applyRules(original, row, col);
      if (original[row][col] !== newState) {
        changedSeat = true;
      }
      return newState;
    })
  });

  return {
    "state": next,
    changedSeat
  };
}

function applyRules(state, row, col) {
  if (state[row][col] === floor) {
    return floor;
  }

  const adjacentSeats = countAdjacentSeats(state, row, col);

  if (adjacentSeats === 0 && state[row][col] === empty) {
    return occupied;
  } else if (adjacentSeats >= 4 && state[row][col] === occupied) {
    return empty;
  }

  return state[row][col];
}

function countAdjacentSeats(state, row, col) {
  return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]
    .map(([drow, dcol]) => {
      return [
        row + drow,
        col + dcol
      ];
    })
    .filter(([nrow, ncol]) => {
      return (nrow >= 0 && nrow < state.length) &&
        (ncol >= 0 && ncol < state[nrow].length);
    })
    .filter(([nrow, ncol]) => {
      return state[nrow][ncol] === occupied;
    })
    .length;
}

function chaos(original) {
  let changedSeat = true;
  let state = original;
  let count = 1;
  while (changedSeat) {
    ({
      state,
      changedSeat
    } = iterate(state));
    count++;
  }

  let totalCount = 0;
  const total = state.map(row => {
      return row.filter(seat => seat === occupied);
    })
    .forEach(line => {
      totalCount += line.length;
    })

  console.log(totalCount)
}

chaos(seats);