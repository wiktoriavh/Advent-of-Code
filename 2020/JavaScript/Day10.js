import {
  resolve,
  dirname
} from "path";
import {
  readFileSync
} from "fs";
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, "../Inputs/10-data.txt");
const data = readFileSync(filePath, "utf-8");

const adapters = data.split("\n")
  .map(joltage => Number(joltage))
  .sort((a, b) => a - b)
  .map(joltage => {
    return {
      minJoltage: joltage,
      maxJoltage: joltage + 3
    }
  });
const lastAdapter = adapters[adapters.length - 1];
adapters.push({
  minJoltage: lastAdapter.minJoltage + 3,
  maxJoltage: lastAdapter.maxJoltage + 3
});

/**
 * Part One
 */
const joltageCount = [];

adapters
  .slice(0, adapters.length - 1)
  .forEach((adapter, index) => {
    const diff = adapters[index + 1].minJoltage - adapter.minJoltage;
    if (!joltageCount[diff]) {
      joltageCount[diff] = 0;
    }
    joltageCount[diff]++;
  });

const partOne = joltageCount[1] * joltageCount[3];
console.log(partOne)

/**
 * Part Two
 */