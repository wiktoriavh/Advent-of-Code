import { getData } from "../../getData";
const DATA = getData(2021, 8);
const data = DATA.split("\r\n").map((segment) => {
  const split = segment.split(" | ");
  const [pattern, output] = split;
  return { pattern: pattern.split(" "), output: output.split(" ") };
});

const example =
  `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
    .split("\n")
    .map((segment) => {
      const split = segment.split(" | ");
      const [pattern, output] = split;
      return { pattern: pattern.split(" "), output: output.split(" ") };
    });

const digits: { [key: number]: number | number[] } = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
  5: [2, 3, 5],
  6: [6, 9],
};

/**
 * Original Attempt
 * Part 1
 */

const solutionExample1 = 26;

function countUniqueDigits(input: Data) {
  let countUniques = 0;
  for (let i = 0; i < input.length; i++) {
    const { output } = input[i];
    const count = output.reduce((acc, curr) => {
      if (typeof digits[curr.length] === "number") {
        return acc + 1;
      }
      return acc;
    }, 0);
    countUniques += count;
  }
  return countUniques;
}

const part1Solution = countUniqueDigits(data);
console.log(part1Solution);

type Pattern = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];
type Output = [string, string, string, string];
type Segment = {
  pattern: Pattern;
  output: Output;
};
type Data = Segment[];
