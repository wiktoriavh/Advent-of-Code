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

const filePath = resolve(__dirname, "../Inputs/11-data.txt");
const data = readFileSync(filePath, "utf-8");

let seats = [];
const rows = data
  .split("\n")
  .forEach(row => seats.push(row.split("")))

const empty = "L";
const floor = ".";
const occupied = "#";

/**
 * Part One
 */
