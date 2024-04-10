/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

for (let i = 0; i <= input.length - 1; i++) {
  let num = input[i].split(" ");

  console.log(parseInt(num[0]) + parseInt(num[1]));
}
