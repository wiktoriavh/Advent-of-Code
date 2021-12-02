import { getData } from "./getData";

const DATA = getData(2);
const data = DATA.split("\r\n");

/**
 * Original Attempt
 */

// Part 1

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

console.log(results);

// Part 2

const aiming: Aiming = {
  x: 0,
  y: 0,
  get multiplication() {
    return this.x * this.y;
  },
  depth: 0,
  aim: 0,
  get position() {
    return this.depth * this.x;
  }
};

type Aiming = {
  x: number;
  y: number;
  multiplication: number;
  depth: number;
  aim: number;
  position: number;
};

const aimResults = data.reduce((accumulator: Aiming, current) => {
  const [direction, steps] = current.split(" ");

  switch (direction) {
    case "up":
      accumulator.y -= parseInt(steps);
      accumulator.aim -= parseInt(steps);
      break;
    case "down":
      accumulator.y += parseInt(steps);
      accumulator.aim += parseInt(steps);
      break;
    case "forward":
      accumulator.x += parseInt(steps);
      accumulator.depth += (parseInt(steps) * accumulator.aim);
      break;
    default:
      break;
  }

  return accumulator;
}, aiming);

console.log(aimResults.position);
