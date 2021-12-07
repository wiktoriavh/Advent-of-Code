import { getData } from "../../getData";
const DATA = getData(2021, 6);
const data = DATA.split(",").map(Number);
const test = [3,4,3,1,2];

/**
 * 
 * Original Attempt
 * Part 1
 */

function populateFishes(fishes: number[], days: number): number {
    if (days === 0) {
        return fishes.length;
    }
const update = [];
    for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i];
        const updatedFish = fish - 1;
        if (updatedFish === -1) {
            update.push(6);
            update.push(8);
        } else {
            update.push(updatedFish);
        }
    }
    return populateFishes(update, days - 1);
}

console.log(populateFishes(data, 80));