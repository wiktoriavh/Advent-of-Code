import { getData } from "../../getData";
const DATA = getData(2021, 7);
const data = DATA.split(",").map(Number);
const example = [16,1,2,0,4,2,7,1,2,14];
const exampleSolution = 37;

type Crabs = number[]

/**
 * Original Attempt
 * Part 1
 */

function calculateCrabBeamFuel(crabs: Crabs) {
    const sorted = crabs.sort((a, b) => a - b);
    const pointer = Math.floor((sorted.length - 1) / 2);
    const median = sorted[pointer];
    
    const fuel = crabs.reduce((acc, curr) => {
         return acc += Math.abs(curr - median);
    }, 0);

    return fuel;
}

const beamFuel = calculateCrabBeamFuel(data);
console.log(beamFuel);