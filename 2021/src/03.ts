import { getData } from "../../getData";
const DATA = getData(2021, 3);
const data = DATA.split("\r\n");

const powerConsumption = (data: string[]) => {
  let count: ResultCollection = {};
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

console.log(powerConsumption(data));

type ResultCollection = {
  [key: number]: {
    [key: string]: number;
  };
};
