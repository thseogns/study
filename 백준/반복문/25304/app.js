/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const totalSum = Number(input[0]);
const count = Number(input[1]);
let arr = [];
let sum = 0;
for (let i = 2; i < count + 2; i++) {
  arr.push(input[i].split(" "));
}

arr.forEach((e) => (sum += Number(e[0]) * Number(e[1])));
console.log(sum === totalSum ? "Yes" : "No");
