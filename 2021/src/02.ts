import { getData } from "./getData";

const DATA = getData(2);
const data = DATA.split("\r\n");

const movements: Movements = {
  x: 0,
  y: 0,
  get multiplication() {
    return this.x * this.y;
  },
};

const results = data.reduce((accumulator: Movements, current) => {
  const [direction, steps] = current.split(" ");

  switch (direction) {
    case "up":
      accumulator.y -= parseInt(steps);
      break;
    case "down":
      accumulator.y += parseInt(steps);
      break;
    case "forward":
      accumulator.x += parseInt(steps);
      break;
    default:
      break;
  }

  return accumulator;
}, movements);

type Movements = {
  x: number;
  y: number;
  multiplication: number;
};
console.log(results.multiplication);
