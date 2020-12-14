import fetchData from "/Fetch.js";
fetchData("./Inputs/10-data.txt", day10);

function day10(input) {
  const data = input.split(/\n/).map(n => Number(n));
  const sortedData = [0, ...data.sort((a, b) => a - b)]; // Add the socket of 0 to the front and spread the data array into the new array, sorted ascending
  const lastNum = sortedData[sortedData.length-1]
  sortedData.push(lastNum+3); // add the device of n+3 at the end of the array

  console.log("Part One: " + partOne(sortedData))
  console.log("Part Two: " + partTwo(sortedData));
}

function partOne(arr) {
  let oneJolt = 0;
  let twoJolts = 0;
  let threeJolts = 0;

  for (let n = 0; n < arr.length; n++) {
    const sub = arr[n+1] - arr[n];
    switch (sub) {
      case 1:
        oneJolt++;
        break;
      case 2:
        twoJolts++;
        break;
      case 3:
        threeJolts++;
        break;
    }
  }
  return oneJolt * threeJolts;
}

function partTwo(arr){
  let options = {};
  arr.forEach(e =>{
      let toConnect1 = e+1;
      let toConnect2 = e+2;
      let toConnect3 = e+3;
      options[e] =[[],0];
      arr.forEach(element => {
          switch(element){
              case toConnect1:
                  options[e][0].push(toConnect1);
                  break; 
              case toConnect2:
                  options[e][0].push(toConnect2);
                  break; 
              case toConnect3:
                  options[e][0].push(toConnect3);
                  break;
          }
      });
  })
console.log(options)
  arr.sort((a,b) =>{return b-a});
  // console.log(options)
  let first = false;
  arr.forEach(e => {
      if(first===false){
        first = true;
       options[e][1]++;   
      }else{
          let sum  = 0;
          options[e][0].forEach(op =>{
              sum += options[op][1]
          })
          options[e][1] = sum;
      };       
  })
      console.log(options)
  }