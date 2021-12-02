import fs from "fs";
import path from "path";

export const getData = (year: number, dayNumber: number) => {
  const day = dayNumber.toString().padStart(2, "0");
  const filePath = path.join(year.toString(), "inputs", day + ".txt");
  const data = fs.readFileSync(filePath, "utf8");
  return data;
};
