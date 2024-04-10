/** @format */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const count = Number(input[0]);

for (let i = 1; i <= count; i++) {
  let num = input[i].split(" ");
  console.log(
    `Case #${i}: ${parseInt(num[0])} + ${parseInt(num[1])} = ${
      parseInt(num[0]) + parseInt(num[1])
    }`
  );
}
