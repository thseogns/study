const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const inputSec = input[1];
input = input[0];

input = input.split(" ").map((item) => +item);
input.push(Number(inputSec));

solution(input[0], input[1], input[2]);

function solution(A, B, C) {
  let hour = A;
  let minute = B;

  hour *= 60;

  totalMinute = hour + minute;
  let reqMinute = totalMinute + C;
  hour = Math.floor(reqMinute / 60);
  minute = reqMinute % 60;
  if (hour > 23) hour = Math.floor(hour % 24);
  console.log(hour, minute);
}
