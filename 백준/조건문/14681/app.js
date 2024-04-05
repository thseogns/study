let input = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

input = input.map((item) => +item);

solution(input[0], input[1]);

function solution(X, Y) {
  if (X > 0 && Y > 0) {
    console.log(1);
  } else if (X < 0 && Y > 0) {
    console.log(2);
  } else if (X < 0 && Y < 0) {
    console.log(3);
  } else {
    console.log(4);
  }
}
