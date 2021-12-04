import { getData } from "../../getData";
const DATA = getData(2021, 4);
const data = DATA.split(/\r\n\r\n/);

const numbers = data[0].split(",").map(Number);
const boardsWithRows = data.slice(1).map((item) => {
  const row = item.split("\r\n");
  const num = row.map((piece) => piece.trim().split(/\s+/));
  return num.map((piece) => piece.map(Number));
});
const boards = data.slice(1).map((item) => {
  return item.trim().split(/\s+/).map(Number);
});

/**
 * Original Attempt
 * Part 1
 */

const bingoCards: (string | number)[][] = [...boards];
let bingoBoard = -1;
let loopAmount = 99;
loopBoards: for (let j = 0; j < bingoCards.length; j++) {
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    bingoCards[j].forEach((item, index) => {
      if (item === number) {
        bingoCards[j][index] = "X";
      }
    });

    const isBingo = checkBoardForBingo(bingoCards[j]);
    if (isBingo) {
      if (loopAmount > i) {
        loopAmount = i;
        bingoBoard = j;
      }
      continue loopBoards;
    }
  }
}

const sum: number = bingoCards[bingoBoard].reduce((acc, curr): number => {
  if (typeof curr === "number") {
    return acc + curr;
  }
  return acc;
}, 0);

function checkBoardForBingo(board: (string | number)[]) {
  const bingoHash: { [key: string]: number } = {};

  board.forEach((item, i) => {
    if (item === "X") {
      const x = Math.floor(i / 5);
      const y = i % 5;
      bingoHash[`x${x}`] = bingoHash[`x${x}`] ? bingoHash[`x${x}`] + 1 : 1;
      bingoHash[`y${y}`] = bingoHash[`y${y}`] ? bingoHash[`y${y}`] + 1 : 1;
    }
  });

  for (let key in bingoHash) {
    if (bingoHash[key] === 5) {
      return true;
    }
  }
  return false;
}

console.log(sum * numbers[loopAmount]); // Solution
