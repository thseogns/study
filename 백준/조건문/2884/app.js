const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = input.split(" ").map((item) => +item);

solution(input[0], input[1]);

function solution(hour, minute) {
  minute -= 45;

  if (minute < 0) {
    minute += 60;
    hour--;
    if (hour < 0) hour = 23;
  }
  console.log(hour + " " + minute);
}
