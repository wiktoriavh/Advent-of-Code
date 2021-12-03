import { getData } from "../../getData";
const DATA = getData(2021, 3);
const data = DATA.split("\r\n");

let count: Count = {};
const powerConsumption = (data: string[]) => {
  for (let i = 0; i < data.length; i++) {
    const binaryCollection = data[i].split("");
    for (let j = 0; j < binaryCollection.length; j++) {
      const current = binaryCollection[j];

      count[j] = {
        ...count[j],
        [current]: count[j]
          ? count[j][current]
            ? count[j][current] + 1
            : 1
          : 1,
      };
      // result = { ...obj };
    }
  }

  const power = {
    gamma: "",
    epsilon: "",
  };

  for (let key in count) {
    const one = count[key]["1"];
    const zero = count[key]["0"];

    if (one > zero) {
      power.gamma += "1";
      power.epsilon += "0";
    } else {
      power.gamma += "0";
      power.epsilon += "1";
    }
  }

  let result = parseInt(power.gamma, 2) * parseInt(power.epsilon, 2);

  return result;
};

console.log("Part 1", powerConsumption(data));

type Count = {
  [key: number]: {
    [key: string]: number;
  };
};

const lifeSupportRating = (data: string[]) => {
  const mostCommonNumbers: MostLeastCommonNumbers = [];
  const leastCommonNumbers: MostLeastCommonNumbers = [];

  for (let key in count) {
    if (count[key]["1"] >= count[key]["0"]) {
      mostCommonNumbers.push(1);
      leastCommonNumbers.push(0);
    } else if (count[key]["1"] < count[key]["0"]) {
      mostCommonNumbers.push(0);
      leastCommonNumbers.push(1);
    }
  }

  const oxygen = getRating(data, mostCommonNumbers, 0);
  const co2 = getRating(data, leastCommonNumbers, 0);

  return parseInt(oxygen, 2) * parseInt(co2, 2);
};

// console.log(lifeSupportRating(data));

type MostLeastCommonNumbers = number[];

function getRating(
  collection: string[],
  against: number[],
  index: number | false
): string {
  if (collection.length === 1 || index === false) {
    return collection[0];
  }

  let update = collection.filter((item) => {
    return Number(item[index]) === against[index];
  });

  const nextIndex = index + 1 > against.length - 1 ? false : index + 1;

  return getRating(update, against, nextIndex);
}

console.log("Part 2", calculateRatings(data));

function calculateRatings(data: Binary): number {
  const { mostCommon, leastCommon } = getCommons(data, 0);
  const highest = reduceDataToMatch(data, 0, mostCommon);
  const lowest = reduceDataToMatch(data, 0, leastCommon);

  const o2 = combineRatings(highest, 1, true);
  const co2 = combineRatings(lowest, 1, false);

  if (o2 === null || co2 === null) {
    console.log(o2, co2);
    throw new Error("Could not find the correct combination");
  }

  return parseInt(o2, 2) * parseInt(co2, 2);
}

function getCommons(
  data: Binary,
  index: number
): { mostCommon: string; leastCommon: string } {
  if (typeof data === "string") {
    return { mostCommon: data, leastCommon: data };
  }
  const count = data.reduce(
    (acc: { [key: string]: number }, curr: string) => {
      const current: string = curr[index];
      const update = {
        ...acc,
        [current]: acc[current] + 1,
      };
      return update;
    },
    { "0": 0, "1": 0 }
  );

  let mostCommon = "1",
    leastCommon = "0";
  if (count["0"] > count["1"]) {
    mostCommon = "0";
    leastCommon = "1";
  }
  if (count["0"] < count["1"]) {
    mostCommon = "1";
    leastCommon = "0";
  }

  return { mostCommon, leastCommon };
}

function reduceDataToMatch(data: Binary, index: number, match: string): Binary {
  if (typeof data === "string") {
    return data;
  }
  const result = data.reduce((acc: string[], curr: string) => {
    if (curr[index] === match) {
      acc.push(curr);
    }
    return acc;
  }, []);

  if (result.length === 1) {
    return result[0];
  }

  return result;
}

function combineRatings(
  data: Binary,
  index: number,
  isOxygen: boolean
): string | null {
  if (typeof data === "string") {
    return data;
  }

  const { mostCommon, leastCommon } = getCommons(data, index);
  let newData: Binary = reduceDataToMatch(
    data,
    index,
    isOxygen ? mostCommon : leastCommon
  );

  if (newData[0].length === index + 1) {
    return null;
  }

  return combineRatings(newData, index + 1, isOxygen);
}

type OxygenCo2 = {
  o2: string;
  co2: string;
};

type Binary = string[] | string;
