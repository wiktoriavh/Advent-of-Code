import { getData } from "../../getData";
const DATA = getData(2020, 3);
const data = DATA.split("\n");

const coords: Coords = {
  x: 0,
  y: 0,
};

function calculateTreeEncounter(
  map: string[],
  coords: Coords,
  trees: number = 0,
  traversal: { x: number; y: number }
): number {
  let { x, y } = coords;
  let updatedCoords = { x: x + traversal.x, y: y + traversal.y };
  let updatedTrees = trees;

  if (updatedCoords.x > map[0].length - 1) {
    const newX = x - map[0].length;
    updatedCoords = { x: newX, y };
  }

  const currentPosition = map[updatedCoords.y][updatedCoords.x];
  if (currentPosition === "#") {
    updatedTrees++;
  }

  if (updatedCoords.y === map.length - 1) {
    return updatedTrees;
  } else {
    return calculateTreeEncounter(map, updatedCoords, updatedTrees, traversal);
  }
}

type Coords = {
  x: number;
  y: number;
};

const solution1 = calculateTreeEncounter(data, coords, 0, { x: 3, y: 1 });
console.log(solution1);

/**
 * Part 2
 */

const traversalStyles = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];
const solution2 = traversalStyles.reduce((acc, traversal) => {
  return acc * calculateTreeEncounter(data, coords, 0, traversal);
}, 1);
console.log(solution2);
