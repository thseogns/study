/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const count = Number(input[0]);
let answer = "";
let space = " ";
const star = "*";
for (let i = 1; i < count + 1; i++) {
  const sumSpace = space.repeat(count - i);
  answer += star;
  console.log(sumSpace + answer);
}
