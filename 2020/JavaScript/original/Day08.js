import Fetch from "../../../Fetch.js";

class Day08 extends Fetch {

  constructor(path) {
    super();
    this.path = path;
  }

  async init() {
    await this.fetchData(this.path);
  }



  day08() {
    const data = this.data.split(/\n/);
    const regex = /(jmp|acc|nop)\s(\-|\+)(\d+)/g;
    let accumulator = 0;
    let visitedIndex = [];
    let visitedRules = [];
    let index = 0;

    while (index < data.length) {
      // console.log(index);

      const instruction = data[index];
      const matches = instruction.matchAll(regex);

      if (visitedIndex.includes(index)) {
        console.log("acc: " + accumulator);

        return;
      }
      visitedIndex.push(index);
      this.forLoopMatches(matches, accumulator, index);
    }

    console.log("visited: " + visitedIndex)
  }

  forLoopMatches(matches, acc, index) {
    let accu = acc;

    for (const [match, action, symbol, amount] of matches) {
      const num = Number(amount);

      switch (action) {
        case "jmp":
          if (symbol === "+") {
            index += num;
          } else {
            index -= num;
          };
          break;
        case "nop":
          index++;
          break;
        case "acc":
          if (symbol === "+") {
            accu += num
          } else {
            accu -= num
          };
          index++;
          break;
      }
    }
  }
}

const day = new Day08("./Inputs/08-data.txt");

day.init().then(() => {
  day.day08();
})