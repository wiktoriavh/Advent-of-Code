import { getData } from "../../getData";
const DATA = getData(2020, 2);
const data = DATA.split("\r\n");

/**
 * Part 1
 */

function checkPassword(data: string[]) {
  let valid = 0;
  for (let i = 0; i < data.length; i++) {
    const [from, to, letter, password] = data[i].split(/-|\s|:\s/);
    const letters = password.match(new RegExp(letter, "g"));
    if (
      letters &&
      letters.length >= Number(from) &&
      letters.length <= Number(to)
    ) {
      valid++;
    }
  }
  return valid;
}

console.log("Part 1", checkPassword(data));

/**
 * Part 2
 */

function positionOfLetter(data: string[]) {
  let valid = 0;
  for (let i = 0; i < data.length; i++) {
    const [from, to, letter, password] = data[i].split(/-|\s|:\s/);
    const positionOne = password[Number(from) - 1] === letter;
    const positionTwo = password[Number(to) - 1] === letter;
    if (positionOne !== positionTwo) {
      valid++;
    }
  }
  return valid;
}

console.log("Part 2", positionOfLetter(data));
