/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = input.split(" ").map((item) => +item);

solution(input[0]);

function solution(A) {
  console.log(`${A} * 1 = ${A * 1}`);
  console.log(`${A} * 2 = ${A * 2}`);
  console.log(`${A} * 3 = ${A * 3}`);
  console.log(`${A} * 4 = ${A * 4}`);
  console.log(`${A} * 5 = ${A * 5}`);
  console.log(`${A} * 6 = ${A * 6}`);
  console.log(`${A} * 7 = ${A * 7}`);
  console.log(`${A} * 8 = ${A * 8}`);
  console.log(`${A} * 9 = ${A * 9}`);
}
