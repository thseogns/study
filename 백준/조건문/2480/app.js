const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = input.split(" ").map((item) => +item);

solution(input[0], input[1], input[2]);

function solution(A, B, C) {
  let maxNumber = 0;
  if (A === B && B === C) {
    console.log(10000 + A * 1000);
  } else if (A === B) {
    console.log(1000 + A * 100);
  } else if (B === C) {
    console.log(1000 + B * 100);
  } else if (A === C) {
    console.log(1000 + C * 100);
  } else {
    maxNumber = Math.max(A, B, C);
    console.log(maxNumber * 100);
  }
}
