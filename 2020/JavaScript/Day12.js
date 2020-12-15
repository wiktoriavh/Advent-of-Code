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

directions.forEach(dir => {
  const face = movement.facing;

  if (dir.direction === "L" || dir.direction === "R") {
    let steps = 0;
    switch (dir.value) {
      case 90:
        steps = 1;
        break;
      case 180:
        steps = 2;
        break;
      case 270:
        steps = 3;
        break;
    }
    const currentIndex = cardinals.indexOf(face);
    const newIndex = (currentIndex + steps) >= 4 ? currentIndex + steps - 4 : currentIndex + steps;
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

