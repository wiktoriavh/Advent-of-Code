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

const filePath = resolve(__dirname, "../Inputs/12-data.txt");
const data = readFileSync(filePath, "utf-8");

const directions =
  data
  .split("\n")
  .filter(line => line)
  .map(el => {
    const matches = el.matchAll(/([A-Z])(\d+)/g);
    const input = [];
    for (const [, g1, g2] of matches) {
      input["direction"] = g1;
      input["value"] = Number(g2);
    }
    return input;
  });

const movement = {
  "north": 0,
  "east": 0,
  "south": 0,
  "west": 0,
  "facing": "east"
};
const cardinals = ["north", "east", "south", "west"];
/**
 * Part One
 */
directions.forEach(dir => {
  const face = movement.facing;

  if (dir.direction === "L" || dir.direction === "R") {
    const turn = dir.direction;
    let steps = 0;
    switch (dir.value) {
      case 90:
        steps = turn === "R" ? 1 : -1;
        break;
      case 180:
        steps = turn === "R" ? 2 : -2;
        break;
      case 270:
        steps = turn === "R" ? 3 : -3;
        break;
    }
    const currentIndex = cardinals.indexOf(face);
    const newIndex = (currentIndex + steps) >= 4 ?
      currentIndex + steps - 4 : (currentIndex + steps) < 0 ?
      currentIndex + steps + 4 : currentIndex + steps;
    const newFace = cardinals[newIndex];
    movement.facing = newFace;
  } else {

    switch (dir.direction) {
      case "N":
        movement.north += dir.value;
        break;
      case "E":
        movement.east += dir.value;
        break;
      case "S":
        movement.south += dir.value;
        break;
      case "W":
        movement.west += dir.value;
        break;
      case "F":
        movement[face] += dir.value;
        break;
    }
  }
})

function manhattenDistance(obj) {
  /**
   * d(a, b) = (a1 - b1) + (a2 - b2)
   * also known as taxicab distance. 
   * Whereas the first group is the x axis and the second group being the y axis,
   * the sum inside the groups has to be positive.
   */

  const a1 = obj.north; // y axis
  const a2 = obj.east; // x axis
  const b1 = obj.south; // y axis
  const b2 = obj.west; // x axis

  const g1 = a1 - b1;
  const g2 = a2 - b2;
  return Math.abs(g1) + Math.abs(g2);
}

const taxicab = manhattenDistance(movement);
console.log("Part One: " + taxicab) // 364

/**
 * Part Two
 */
const ship = {
  "north": 0,
  "east": 0,
  "south": 0,
  "west": 0,
};

const waypoint = {
  "north": 1,
  "east": 10,
  "south": 0,
  "west": 0,
}
console.log(ship)
directions.forEach(dir => {
  const move = dir.direction;
  const val = dir.value;

  switch (move) {
    case "N":
      return waypoint.north += val;
    case "E":
      return waypoint.east += val;
    case "S":
      return waypoint.south += val;
    case "W":
      return waypoint.west += val;
  }

  if (move === "R" || move === "L") {
    let steps = 0;
    switch (dir.value) {
      case 90:
        steps = move === "R" ? 1 : -1;
        break;
      case 180:
        steps = move === "R" ? 2 : -2;
        break;
      case 270:
        steps = move === "R" ? 3 : -3;
        break;
    }

    const keys = Object.keys(waypoint);
    const vals = Object.values(waypoint);
    let newVals = [];

    vals.forEach((value, i) => {
      const x = (i + steps) >= 4 ?
        (i + steps) - 4 : (i + steps) < 0 ?
        (i + steps) + 4 : (i + steps);
      newVals[x] = value;
    })

    for (let j = 0; j < keys.length; j++) {
      waypoint[keys[j]] = newVals[j];
    }
  }

  if (move === "F") {
    const vals = Object.values(waypoint);
    let multiplyWaypointValue = [];

    vals.forEach(value => {
      const multiplied = value * val;
      multiplyWaypointValue.push(multiplied);
    })

    const shipKeys = Object.keys(ship);

    for (let a = 0; a < shipKeys.length; a++) {
      ship[shipKeys[a]] = multiplyWaypointValue[a];
    }
  }
});

const taxicabTwo = manhattenDistance(ship);
console.log(taxicabTwo); // 740, wrong answer