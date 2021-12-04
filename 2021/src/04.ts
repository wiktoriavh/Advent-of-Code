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

let quickestWinnerBoardIndex = -1;
let leastAmountOfTries = 999;
let resetBingoBoard: BingoBoard = {
  x0: [],
  x1: [],
  x2: [],
  x3: [],
  x4: [],
  y0: [],
  y1: [],
  y2: [],
  y3: [],
  y4: [],
};

type BingoBoard = {
  [key: string]: number[];
};

boards.forEach((board, boardIndex) => {
  let bingoBoard = { ...resetBingoBoard };
  numbersLoop: for (
    let numbersIndex = 0;
    numbersIndex < numbers.length;
    numbersIndex++
  ) {
    const number = numbers[numbersIndex];
    const update = checkBoardForNumber(board, number, bingoBoard);
    if (!update) {
      continue;
    }
    bingoBoard = update;
    for (let key in bingoBoard) {
      if (bingoBoard[key].length === 5) {
        if (numbersIndex < leastAmountOfTries) {
          // console.log(number, leastAmountOfTries, numbersIndex);
          // console.log(number, numbers[numbersIndex]);
          quickestWinnerBoardIndex = boardIndex;
          leastAmountOfTries = numbersIndex;
          // console.log(bingoBoard);
        }
        break numbersLoop;
      }
    }
  }
});

function checkBoardForNumber(
  board: number[],
  number: number,
  bingoBoard: BingoBoard
) {
  const indexOfNumber = board.indexOf(number);

  if (indexOfNumber === -1) {
    return;
  }
  const y = Math.floor(indexOfNumber / 5);
  const x = indexOfNumber % 5;

  const update = {
    ...bingoBoard,
    [`x${x}`]: [...bingoBoard[`x${x}`], number],
    [`y${y}`]: [...bingoBoard[`y${y}`], number],
  };

  return update;
}

const markedNumbers: number[] = [];
const unmarkedNumbers = [...boards[quickestWinnerBoardIndex]];
for (let i = 0; i <= leastAmountOfTries; i++) {
  markedNumbers.push(numbers[i]);
  const unmarkedIndex = unmarkedNumbers.indexOf(numbers[i]);
  unmarkedNumbers.splice(unmarkedIndex, 1);
}
console.log(unmarkedNumbers.length + markedNumbers.length);

const lastCalledNumber = numbers[leastAmountOfTries];
const sumUnmarkedNumbers = unmarkedNumbers.reduce((acc, curr) => acc + curr);

console.log(sumUnmarkedNumbers * lastCalledNumber); // should be solution
// console.log(unmarkedNumbers);
// console.log(boards[quickestWinnerBoardIndex].length);
// console.log(markedNumbers.length + unmarkedNumbers.length);
