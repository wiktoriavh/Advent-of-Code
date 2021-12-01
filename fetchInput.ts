import axios from "axios";

export const fetchInput = async (year: number, day: number) => {
  const { data: input } = await axios.get(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: "session=" + process.env.SESSION_ID,
      },
    }
  );

  return input;
};

console.log(fetchInput(2021, 1));
