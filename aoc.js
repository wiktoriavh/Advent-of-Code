let para = document.getElementById("text");
let overlay = document.getElementById("overlay");

let myData = "";

async function fetchData(path, callback) {
  let fetchPromise = fetch(path);
  let res = await fetchPromise;
  let status = res.status;

  if (status < 200 || status >= 300) {
    // useData(status, res)
    return error(status)
  }

  const text = await res.text();

  // useData(null, text);
  day09(text)
}

fetchData("./Inputs/09-data.txt");

function day01(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }
  let dataArr = data.split(/\n/g);

  dataArr.forEach((el, i) => {
    dataArr.forEach((item, x) => {
      if (i !== x) {
        let sum = Number(el) + Number(item);
        // console.log(sum)
        if (sum === 2020) {
          let mult = Number(el) * Number(item);
          console.log(mult)
        }
      }
      dataArr.forEach((a, b) => {
        if (i !== x && i !== b && x !== b) {
          let secondSum = Number(el) + Number(item) + Number(a);
          if (secondSum === 2020) {
            let secondMult = Number(el) * Number(item) * Number(a);
            console.log(secondMult);
          }
        }
      })
    })
  })

}

function useData(error, data) {
  if (error !== null) {
    console.error("Etwas ist schief gelaufen: " + error);
  } else {

    /**
     * Array of the rules and passwords
     */
    let numRule = data.match(/(?:\d+-\d+)/gm).join().split(",");
    let charRule = data.match(/\b(?:[a-z])\b/gm).join().split(",");
    let pswd = data.match(/[a-z]{2,}/gm).join().split(",");
    let firstNum = data.match(/^\d+/gm).join().split(",");
    let lastNum = [];

    numRule.forEach(el => {
      let check = el.match(/\d+$/).join();
      lastNum.push(check);
    })

    for (let i = 0; i < charRule.length; i++) {
      checkPassword(firstNum[i], lastNum[i], charRule[i], pswd[i]);
    }
    console.log(valid);
    console.log(validTwo)
    // para.innerHTML = lastNum;
  }
}

let valid = 0;
let validTwo = 0;

function checkPassword(from, to, check, password) {
  let re = new RegExp(check, "g");
  let count = (password.match(re) || []).length;
  if (count >= from && count <= to) {
    valid++
  }

  if (password.charAt(from - 1) === check && password.charAt(to - 1) !== check) {
    validTwo++;
  } else if (password.charAt(from - 1) !== check && password.charAt(to - 1) === check) {
    validTwo++;
  }

}

function day03(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  para.innerHTML = data;

  let slopeArr = data.split(/\n/);

  let moves = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]

  let multiTrees = 1;

  moves.forEach(el => {
    let count = checkSlope(slopeArr, el[0], el[1]);
    console.log(count);
    multiTrees *= count;
  })

  console.log(multiTrees);
}

function checkSlope(arr, step, skip) {
  let counter = 0;
  let right = 0;
  let row = 31;

  arr.forEach((el, i) => {
    if (skip === 1) {
      let check = el.charAt(right);
      if (check === "#") {
        counter++;
      }
      right += step;
      if (right >= row) {
        right -= row;
      }
    } else if (i % 2 === 0) {
      let check = el.charAt(right);
      if (check === "#") {
        counter++;
      }
      right += step;
      if (right >= row) {
        right -= row;
      }
    }
  });

  return counter;
}

function day04(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  let batch = data.split(/\n{2}/g);
  let processingBatch = [];
  let passports = [];

  batch.forEach(el => {
    processingBatch.push(el.split(/\n/g));
  })

  processingBatch.forEach(el => {
    let a;
    a = el.join(" ");
    let arr = a.split(" ");
    passports.push(arr);
  })

  let passObj = [];
  passports.forEach((passport, x) => {
    let parts = {}
    passport.forEach((el, i) => {
      let match = el.match(/([a-z]{3})(:)(.+)/);
      parts[match[1]] = match[3];
    })
    passObj.push(parts);
  })

  const props = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  let valid = 0;
  passObj.forEach((el, i) => {
    const reqProp = 7;
    let hasProps = 7;
    let validValues = true;

    props.forEach(prop => {
      let checkProp = (el.hasOwnProperty(prop));

      if (checkProp == false) {
        hasProps--
      }
    })

    if (hasProps === reqProp) {
      let byr = el[props[0]];
      let iyr = el[props[1]];
      let eyr = el[props[2]];
      let hgt = el[props[3]];
      let hcl = el[props[4]];
      let ecl = el[props[5]];
      let pid = el[props[6]];



      if (!(byr >= 1920 && byr <= 2002)) {
        return validValues = false;
      }
      if (!(iyr >= 2010 && iyr <= 2020)) {
        return validValues = false;
      }
      if (!(eyr >= 2020 && eyr <= 2030)) {
        return validValues = false;
      }
      if (hgt.match(/cm/)) {
        let height = hgt.match(/\d+/)[0];
        if (!(height >= 150 && height <= 193)) {
          return validValues = false;
        }
      } else if (hgt.match(/in/)) {
        let height = hgt.match(/\d+/)[0];
        if (!(height >= 59 && height <= 76)) {
          return validValues = false;
        }
      }
      if (!(hcl.match(/#\w{6}/))) {
        return validValues = false;
      }
      let eyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      let matchEye = false;
      eyes.forEach(eye => {
        if (eye === ecl) {
          matchEye = true
        }
      })
      if (matchEye === false) {
        return validValues = false;
      }
      if (!pid.match(/\d{9}/)) {
        return validValues = false;
      }

    }

    if (validValues === true) {
      valid++;
    }
  })

  console.log(valid);

}

function day05(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  const seats = data.split(/\n/)
  const binSeats = [];
  seats.forEach(seat => {
    let newSeat = "";
    seat.split("").forEach(letter => {
      let dec = letter.replace(/(F)|(B)|(L)|(R)/g, replacer);
      newSeat += dec;
    })

    binSeats.push(newSeat);
  })
  const seatObj = [];
  binSeats.forEach(seat => {
    seat.replace(/(\d{7})(\d{3})/, (m, row, seat) => {
      const obj = {
        "row": row,
        "seat": seat
      };
      seatObj.push(obj);
    });
  })

  const seatNums = [];
  seatObj.forEach(obj => {
    const int = {
      "row": parseInt(obj.row, 2),
      "seat": parseInt(obj.seat, 2)
    };
    seatNums.push(int);
  })

  const seatIDs = [];
  seatNums.forEach(seat => {
    const row = seat.row;
    const chair = seat.seat;
    const id = row * 8 + chair;
    seatIDs.push(id);
  })

  seatIDs.sort((a, b) => {
    return b - a;
  })

  const topSeat = seatIDs[0];
  const lastSeat = seatIDs[seatIDs.length - 1];

  seatIDs.forEach(id => {
    const check = seatIDs.includes(id - 1);
    // console.log(check)
    if (!check) {
      const mySeat = id - 1;
      const myNeighbourUp = seatIDs.includes(mySeat - 1);
      const myNeighbourDown = seatIDs.includes(mySeat + 1);
      if (myNeighbourUp && myNeighbourDown) {
        console.log(mySeat);
      }
    }
  })

}

function checkSeat(match, row, seat) {
  const obj = {
    "row": row,
    "seat": seat
  };
  // console.log(match)
  return obj;
}

function replacer(match, p1, p2, p3, p4) {

  let char = p1 || p2 || p3 || p4;

  switch (char) {
    case "F":
      return 0;
    case "B":
      return 1;
    case "L":
      return 0;
    case "R":
      return 1;
  }
}

function day06(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  const groups = data.split(/\n\n/);
  let groupArr = [];
  let strGroup = [];
  let countArr = [];
  let groupYes = [];
  let wholeYes = 0;
  let everyoneYes = 0;

  groups.forEach(group => {
    groupArr.push(group.split(/\n/));
  })

  groupArr.forEach(group => {
    let str = group.join("");
    strGroup.push(str);
  })

  strGroup.forEach(str => {
    const smth = charTally(str);
    countArr.push(smth);
  });


  countArr.forEach((obj, i) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const num = keys.length;
    let len = groupArr[i].length;
    wholeYes += num;


    let counter = 0;
    keys.forEach(key => {
      if (obj[key] === len) {
        everyoneYes++;
      }
    })

  });
  console.log(wholeYes) // answer for part one
  console.log(everyoneYes) // answer for part two

}

function charTally(input) {
  return input.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

function error(error) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }
}


function day07(data) {
  const sentences = data.split(/\n/);
  let rules = [];


  sentences.forEach((sentence, i) => {
    const regex = new RegExp(/(\w+\s\w+)\sbags contain\s(?:(?:(?:(\d)\s(\w+\s\w+))\s(?:bags|bag)(?:,\s(?:(\d)\s(\w+\s\w+))\s(?:bags|bag))?(?:,\s(?:(\d)\s(\w+\s\w+))\s(?:bags|bag))?(?:,\s(?:(\d)\s(\w+\s\w+))\s(?:bags|bag))?)?|(no other bags)?)\./giu);
    let arr = {};
    const matches = sentence.matchAll(regex);
    let match, bag, num1, bag1, num2, bag2, num3, bag3, num4, bag5, noBags;

    for ([match, bag, num1, bag1, num2, bag2, num3, bag3, num4, bag5, noBags] of matches) {
      const bagArr = [bag1, bag2, bag3, bag5];
      const numArr = [num1, num2, num3, num4];
      let obj = {};
      if (noBags) {
        arr[bag] = obj;
      } else {
        for (let x = 0; x < bagArr.length; x++) {
          if (bagArr[x] !== undefined) {
            const aBag = bagArr[x];
            const aNum = Number(numArr[x]);
            obj[aBag] = aNum;
          }
          arr[bag] = obj;
        }
      }
    }
    rules.push(arr);
  });

  let firstLevel = [];
  let secondLevel = [];

  rules.forEach(rule => {
    const key = Object.keys(rule);
    const bags = rule[key];
    const bagKey = Object.keys(bags);

    iterate(bagKey, key);
  });

  // console.log(topBags);
}

let topBags = 0;

function iterate(input, key) {
  let level = []
  let arr = [...input];
  // console.log(arr)
  arr.forEach(bag => {
    if (bag === "shiny gold") {
      level.push(key[0]);
      topBags++;
    }
  });
  let check = level.length;
  if (check !== 0) {
    level.forEach(part => {
      iterate(part);
    })
  }
}

let index = 0;
let accumulator = 0;

function day08(input) {
  const data = input.split(/\n/);
  const regex = /(jmp|acc|nop)\s(\-|\+)(\d+)/g;
  let jmpNopIndexes = [];
  let visitedIndex = [];


  if (index === data.length - 1) {
    console.log("Party Two: " + accumulator);
  }

  while (index < data.length) {

    const instruction = data[index];
    const matches = instruction.matchAll(regex);

    if (visitedIndex.includes(index)) {
      return;
    }
    visitedIndex.push(index);


    let match, action, symbol, amount;
    for ([match, action, symbol, amount] of matches) {
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
            accumulator += num
          } else {
            accumulator -= num
          };
          index++;
          break;
      }
    }
  }
  console.log(accumulator);
}

function findJmpNop(matches) {
  let match, action, symbol, amount;
  for ([match, action, symbol, amount] of matches) {

    if (action === "jmp") {
      console.log(action);
    } else if (action === "nop") {
      console.log(action);
    }
  }
}

function replaceJmpNop(input) {
  console.log("ICH BIN REPLACEJMPNOP");
}

function day09(input) {
  const data = input.split(/\n/).map(y => Number(y));
  let previous25 = [];
  let target = 0;

  data.forEach((el, i) => {
    if (previous25.length !== 25) {
      return previous25.push(el);
    }
    let sums = [];
    previous25.forEach((prev1, j) => {
      previous25.forEach((prev2, x) => {
        if (j === x) {
          return;
        }
        const sum = Number(prev1) + Number(prev2);
        sums.push(sum);
      })
    });
    const includes = sums.includes(Number(el));

    if (!includes) {
      target = Number(el);
      console.log(target);
    }
    previous25.shift(1);
    previous25.push(el);
  });

  const cusums = [0];
  for (let n in data) {
    const lastEntry = cusums[cusums.length - 1];
    cusums.push(lastEntry + data[n]);
  }

  let a = 0;
  let b = 1;
  let bool = true;

  while (bool) {
    const partsum = cusums[b] - cusums[a];
    if (partsum < target) {
      b++;
    } else if (partsum > target) {
      a++;
    } else {
      bool = false;
    }
  }

  const subsequence = data.slice(a, b + 1);
  const answer = Math.min(...subsequence) + Math.max(...subsequence);
  console.log(answer);

}