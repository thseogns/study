const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = input.split(" ").map((item) => +item);

solution(input[0]);

function solution(testScore) {
  if (90 <= testScore && testScore <= 100) {
    console.log("A");
  } else if (80 <= testScore && testScore <= 89) {
    console.log("B");
  } else if (70 <= testScore && testScore <= 79) {
    console.log("C");
  } else if (60 <= testScore && testScore <= 69) {
    console.log("D");
  } else {
    console.log("F");
  }
}
