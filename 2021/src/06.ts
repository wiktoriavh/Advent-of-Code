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

/**
 * Part 2
 */

const expectedTest2 = 26984457539;

const fishObject = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
}

function createObject(fishes: number []): {[key:string]:number} {
    const obj: {[key:string]:number} = {...fishObject};
    for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i];
        if (!obj[fish]) {
            obj[fish] = 1;
        } else {
            obj[fish]++;
        }
    }
    return obj;
}

function growFishPopulation(fishes: number[], days: number): number {
 let school = createObject(fishes);

    let countdown = days;

    while (countdown > 0) {
        school = {
            0: school["1"],
            1: school["2"],
            2: school["3"],
            3: school["4"],
            4: school["5"],
            5: school["6"],
            6: school["7"] + school["0"],
            7: school["8"],
            8: school["0"],
        }
        countdown--;
    }
    
    let count = 0;
    for (let key in school) {
        count += school[key];
    }
    return count;
}


const solutionTest2 = growFishPopulation(data, 256);
console.log(solutionTest2);


