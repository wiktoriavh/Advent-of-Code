import { getData } from "./getData";

const DATA = getData(1);

const data = DATA.split("\r\n").map((item) => Number(item));

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
