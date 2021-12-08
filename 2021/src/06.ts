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

// console.log(populateFishes(data, 80));

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

const fishTimer = createObject(data);
const testTimer = createObject(test);

function growFishPopulation(fishes: {[key:string]:number}, days: number): number {
 
    console.log(fishes);

    let countdown = days;
    let update: {[key:string]:number} = {...fishes};

    while (countdown > 0) {
        const group = {...update}
        for (let key in group) {
            if (Number(key) - 1 === -1) {
                group["6"] = group["6"] ? group["6"] + update[key] + 1 : update[key] + 1;
                group["8"] = group["8"] ? group["8"] + 1 : 1;
            } else {
                group[Number(key) - 1] = group[Number(key) - 1] ? group[Number(key) - 1] + update[key] : update[key];
            }

        }
        update = {...group};
        countdown--;
    }
    let count = 0;
    for (let key in update) {
        count += update[key];
    }

console.log(count);
}


const solutionTest2 = growFishPopulation(testTimer, 256);
console.log(solutionTest2, expectedTest2);


