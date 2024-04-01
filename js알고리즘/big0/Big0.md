# Big0란

2가지의 해결법이있다. 어느 것이 좋을까?  
작동에서 그치지않고 성능까지.
시간.

## 코드의 시간재기

1에서부터 특정한 n값까지 사이에있는 모든 숫자들을 더하는 Function을 만들고싶다면?

첫 번째 방법

```.js
function addUpTo (n){
    let total = 0;
    for (let i = 1; i <= n; i++){
        total +=i;
    }
return total;
}
```

두 번째 방법

```.js
function addUpTo (n){

return n * (n + 1) / 2;
}
```

속도는 내장된 timingFunction을 사용한다.
EX)

```.js
function addUpTo (n){
    let total = 0;
    for (let i = 1; i <= n; i++){
        total +=i;
    }
return total;
}
let t1 = performance.now(); //실행했을 때 시간
addUpTo(10000000000);
let t2 = performance.now(); //실행이 끝났을 때 시간
console.log((t2 - t1) / 1000);

```

두 번째 식이 연산이 적다.
첫 번째 식은 n의 값만큼 연산을 실행해야함.

고려사항: 속도 , 메모리 사용 , 가독성
