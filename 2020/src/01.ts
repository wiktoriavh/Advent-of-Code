import { getData } from "../../getData";

const DATA = getData(2020, 1);
const data = DATA.split("\n").map(Number).sort();

const binarySearch: BinarySearchArgs = (input, expectation) => {
  let result = -1;
  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const lookup = expectation - current;
    const find = input.find((item) => item === lookup);
    if (find) {
      result = current * find;
    }
  }

  return result;
};

type BinarySearchArgs = (input: number[], expectation: number) => number;

const result = binarySearch(data, 2020);
console.log(result);

const solution2 = 84035952;
const threeValues: BinarySearchArgs = (input, expectation) => {
  let result = -1;

  for (let i = 0; i < input.length; i++) {
    for (let j = 1; j < input.length; j++) {
      const current = input[i] + input[j];
      const lookup = expectation - current;
      const find = input.find((item) => item === lookup);
      if (find) {
        result = input[i] * input[j] * find;
      }
    }
  }
  return result;
};
const result2 = threeValues(data, 2020);
console.log(result2, result2 === solution2);
