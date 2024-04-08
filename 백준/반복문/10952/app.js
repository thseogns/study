/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

for (let i = 0; i <= input.length - 1; i++) {
  let num = input[i].split(" ");
  if (Number(num[0]) === 0 && Number(num[1]) === 0) return;
  console.log(Number(num[0]) + Number(num[1]));
}
