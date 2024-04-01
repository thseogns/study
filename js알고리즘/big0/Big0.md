# BigO

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

## 연산 갯수 세기

시간은 연산 갯수에 달려있다.

```.js
function addUpTo (n){
    let total = 0;
    for (let i = 1; i <= n; i++){  //연산이 n의 값만큼 반복
        total +=i;
    }
return total;
}

```

n이 커질 수록 연산의 갯수가 비약적으로 늘어날 수 있다.
예시 사이트  
https://rithmschool.github.io/function-timer-demo/

예시 사이트에서 확인 한 결과 n의 숫자에 따라 큰차이를 보인다.

## BigO란 무엇인가?

f((n) = n) n만큼 증가
f((n) = n²) n만큼 ²증가
f((n) = 1) 영향을 받지않음

실행시간이 가질 수 있는 최대치?

앞서 본

```.js
function addUpTo (n){

return n * (n + 1) / 2;
}
```

이식은 BigO가 O(1)이라고 볼 수 있다. n의 증가가 거영향을 미치지 못한다.

아래의 식들은 BigO가 O(n)인 식이다. n의 값만큼 증가.

```.js
function addUpTo (n){
    let total = 0;
    for (let i = 1; i <= n; i++){  //연산이 n의 값만큼 반복
        total +=i;
    }
return total;
}


function countUpAndDown (n){ //연산식이 2개이지만 O(n)과 큰 차이가 없다.

    for (let i = 1; i <= n; i++){
      console.log(i)
    }
    for (let j = 1; j <= n; j++){
      console.log(j)
    }
return total;
}
```

하지만 아래의 식은 다르다.

```.js
function frintAllPairs (n){
    for(var i = 0; 1 < n; i++){     //중첩루프가 된다.
        for(var j = 0; 1 < n; j++){  // O(n)이 2번 중첩된다
            console.log(i,j);
        }
    }
}
```

O(n)2개의 루프가 중첩되었다. 따라서 O(n²)이라 할 수 있다.

O(2n) x = O(n)
O(500) x = O(1)
O(13n²) x = O(n²)

아래의 경우는 어떨까?

```.js
function logAtleast5(n){
    for (var i = 1; i <=Math.max(5, n); i++) { //max
        console.log(i);
    }
}
function logAtMost5(n){
    for (var i = 1; i <=Math.min(5, n); i++) { //min
        console.log(i);
    }
}
```

n과 5중 큰값을 출력하는 max의 경우 n의 값만큼 증가하기 때문에 O(n) 이라 할 수 있다.
하지만 min의 경우 5와n값중 작은 값을 출력하기 때문에 n의 값이 증가해도 값이 5이상 늘어나지 않는다. 따라서 O(1)이라 할 수 있다.
