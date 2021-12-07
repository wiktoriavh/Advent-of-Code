import { getData } from "../../getData";
const DATA = getData(2021, 6);
const data = DATA.split(",").map(Number);
const test = [3,4,3,1,2];

let days = 80;

function startPopulation(group: number[], days: number) {
    let fishes = [...group];
    let amountOfNewFishes = 0;

    console.log(group)

    while ( days !== -1 ) {
        for ( let i = 0; i < fishes.length; i++ ) {
            const fish = fishes[i];
            if ( fish - 1 === -1 ) {
                fishes[i] = 6;
                console.log("reborn", fish, i, fishes[i])
            } else if (fish === 6){
                console.log("born", fish, i, fishes[i])
                amountOfNewFishes++;
            } else {
                fishes[i] = fish - 1;
            }
        }
        days--;
        
        for (let i = 0; i <= amountOfNewFishes; i++) {
            fishes.push(8);
        }
        amountOfNewFishes = 0;
        console.log(fishes);
    }

    return fishes.length;
}

// console.log(startPopulation(data, days));
console.log(startPopulation(test, 1));