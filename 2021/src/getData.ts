import fs from "fs";
import path from "path";

export const getData = (dayNumber: number) => {
  const day = dayNumber.toString().padStart(2, "0");
  const filePath = path.join(path.dirname(__dirname), "inputs", day + ".txt");
  const data = fs.readFileSync(filePath, "utf8");
  return data;
};
