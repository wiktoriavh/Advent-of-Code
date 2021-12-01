import fs from "fs";
import path from "path";

const day = "01";
console.log(path.join(path.dirname(__dirname), "inputs", day + ".txt"));

export const getData = (dayNumber: number) => {
  const day = dayNumber.toString().padStart(2, "0");
  const filePath = path.join(path.dirname(__dirname), "inputs", day + ".txt");
  const data = fs.readFileSync(filePath, "utf8");
  return data;
};
