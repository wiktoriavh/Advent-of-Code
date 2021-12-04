import { getData } from "../../getData";
const DATA = getData(2021, 4);
const data = DATA.split(/\r\n\r\n/);

const list = data[0].split(",").map(Number);
const boards = data.slice(1).map((item) => {
  return item.trim().split(/\s+/).map(Number);
});

/**
 * Original Attempt
 * Part 1
 */

function checkForBingo(
  numbers: number[],
  cards: number[][],
  shouldWin: boolean = true
) {
  const bingoCards: (string | number)[][] = [...cards];
  let bingoBoard: number = -1;
  let loopAmount = [];
  let wantedLoopAmount: number = -1;
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
        loopAmount.push(i);

        if (shouldWin && wantedLoopAmount > i) {
          bingoBoard = j;
        }
        if (!shouldWin && wantedLoopAmount < i) {
          bingoBoard = j;
        }
        wantedLoopAmount = shouldWin
          ? Math.min(...loopAmount)
          : Math.max(...loopAmount);

        continue loopBoards;
      }
    }
  }

  const sum: number = bingoCards[bingoBoard].reduce<number>(
    (acc, curr): number => {
      if (typeof curr === "number") {
        return acc + curr;
      }
      return acc;
    },
    0
  );

  return sum * numbers[wantedLoopAmount];
}

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

const solution1 = checkForBingo(list, boards, true);
console.log("Part 1:", solution1);

/**
 * Part 2
 */

const cards = data.slice(1).map((item) => {
  return item.trim().split(/\s+/).map(Number);
});
const solution2 = checkForBingo(list, cards, false);
console.log("Part 2:", solution2);
