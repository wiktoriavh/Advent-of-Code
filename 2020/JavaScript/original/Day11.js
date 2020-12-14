import fetchData from "/Fetch.js";
fetchData("./Inputs/11-data.txt", day11);

function day11(input) {
  const rows = input.split(/\n/);
  let seats = [];
  const empty = "L";
  const floor = ".";
  const occupied = "#";
  
  rows.forEach(row => {
    seats.push(row.split(""));
  });

  let prev = seats;
  let next = [];

  const boolArrs = arrayEquals(prev, next);

  console.log(mapArr(prev));

  if (boolArrs === true) {
    return console.log("The same: " + next);
  }
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function mapArr(arr) {
  arr.forEach((row, i, array) => {
    row.map((seat, j) => {
      const curRow = i;
      const curSeat = j;

      const topRow = i-1;
      const bottomRow = i+1;

      const rows = [curRow, topRow, bottomRow];

      
      const leftSeat = j-1
      const rightSeat = j+1;

      const seats = [curSeat, leftSeat, rightSeat]

      let adjacent = [];
      rows.forEach(el => {
        seats.forEach(ol => {
          if (array[el][ol] !== undefined) {
            adjacent.push(array[el][ol])
          }
        })
      })
    
      console.log(adjacent)
      if (seat === "L") {
        
      }
    })
  })
}