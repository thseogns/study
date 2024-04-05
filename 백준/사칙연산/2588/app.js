const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((item) => +item);

solution(input[0], input[1]);

function solution(A, B) {
  const stringB = String(B);
  const first = stringB[2] * A;
  const second = stringB[1] * A * 10;
  const third = stringB[0] * A * 100;
  console.log(stringB[2] * A);
  console.log(stringB[1] * A);
  console.log(stringB[0] * A);
  console.log(first + second + third);
}
