import { getData } from "../../getData";
const DATA = getData(2021, 5);
const data = DATA.split(/\r\n/);

/**
 * Original Attempt
 */

function calculateCrossingVents(input: string[]): { [key: string]: number } {
  const coords = input.map((line) => {
    const [x1, y1, x2, y2] = line.split(/\s->\s|,/);
    return { x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2) };
  });

  const oceanFloor = new Map();
  const straightOceanFloor = new Map();
  let ventCrosses = 0;
  let straightVentCrosses = 0;

  for (let i = 0; i < coords.length; i++) {
    const current = coords[i];
    /**
     * Part 1 + 2
     */
    let { x1, x2, y1, y2 } = current;
    if (current.x1 === current.x2 || current.y1 === current.y2) {
      const moveX =
        current.x1 > current.x2 ? -1 : current.x2 > current.x1 ? 1 : 0;
      const moveY =
        current.y1 > current.y2 ? -1 : current.y2 > current.y1 ? 1 : 0;

      while (x1 !== x2 + moveX || y1 !== y2 + moveY) {
        const straightValue = straightOceanFloor.get(`${x1},${y1}`) || 0;
        const allValue = oceanFloor.get(`${x1},${y1}`) || 0;
        if (straightValue === 1) {
          straightVentCrosses++;
        }
        if (allValue === 1) {
          ventCrosses++;
        }
        straightOceanFloor.set(`${x1},${y1}`, straightValue + 1);
        oceanFloor.set(`${x1},${y1}`, allValue + 1);
        x1 += moveX;
        y1 += moveY;
      }
    } else {
      const moveX =
        current.x1 > current.x2 ? -1 : current.x2 > current.x1 ? 1 : 0;
      const moveY =
        current.y1 > current.y2 ? -1 : current.y2 > current.y1 ? 1 : 0;

      while (x1 !== x2 + moveX || y1 !== y2 + moveY) {
        const value = oceanFloor.get(`${x1},${y1}`) || 0;
        if (value === 1) {
          ventCrosses++;
        }
        oceanFloor.set(`${x1},${y1}`, value + 1);
        x1 += moveX;
        y1 += moveY;
      }
    }
  }
  return { ventCrosses, straightVentCrosses };
}

console.log(calculateCrossingVents(data));
