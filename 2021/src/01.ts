import { getData } from "./getData";

const DATA = getData(1);
const data = DATA.split("\r\n").map((item) => Number(item));

/**
 * Original Attempt
 */

const measurements = {
  increase: 0,
  decrease: 0,
  slidingIncrease: 0,
  slidingDecrease: 0,
};

let prev: number | null = null;
data.forEach((item) => {
  if (prev === null) {
    prev = item;
    return;
  }

  if (item > prev) {
    measurements.increase++;
  }
  if (item < prev) {
    measurements.decrease++;
  }

  prev = item;
});

const slidingWindows = data.reduce((acc: Array<number>, first, index, arr) => {
  const second: number = arr[index + 1];
  const third: number | undefined = arr[index + 2];

  if (!third) {
    return acc;
  }

  const sum: number = first + second + third;
  acc.push(sum);
  return acc;
}, []);

prev = null;
slidingWindows.forEach((item) => {
  if (prev === null) {
    prev = item;
    return;
  }

  if (item > prev) {
    measurements.slidingIncrease++;
  }
  if (item < prev) {
    measurements.slidingDecrease++;
  }

  prev = item;
});

console.log(measurements);

/**
 * Refactored Attempt
 */

const results = data.reduce(
  (accumulation: Results, current, index, array): Results => {
    const prev = array[index - 1];
    const next = array[index + 1];
    const prevWindow = prev + current + next;
    const currentWindow = current + next + array[index + 2];

    const updated = { ...accumulation };

    if (current > prev) {
      updated.increase++;
    }
    if (Boolean(currentWindow) && currentWindow > prevWindow) {
      updated.windowIncrease++;
    }

    return updated;
  },
  { increase: 0, windowIncrease: 0 }
);

type Results = { increase: number; windowIncrease: number };

console.log(results);
