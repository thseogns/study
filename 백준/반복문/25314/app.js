/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
input = input[0];
let str = "long ";
let result = "";

for (let i = 0; i < input / 4; i++) {
  result += str;
}
console.log(result + "int");
