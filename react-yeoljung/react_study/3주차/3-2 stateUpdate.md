## 연산수행후 대기열에 추가하는법

1. "일괄 처리"란 무엇이며 React가 이를 사용해 여러 상태 업데이트를 처리하는 방법
2. 동일한 상태 변수에 여러 업데이트를 연속으로 적용하는 방법


- React는 클릭과 같은 여러 의도적인 이벤트를 일괄 처리하지 않는다.

## 다음 렌더링 전에 동일한 상태 변수를 여러 번 업데이트하기

렌더링이 일어나며 수식이 전달되는 것이기 때문에 수식을 전달하면 그에따른 계산이 이루어진다 
``` 
setNumber(n => n + 1): n => n + 1
```

업데이터 함수의 이름은 event => e 와같이 함수이름의 첫글자를 사용
좀 더 자세한 설명을 할떈 setEnabled (enabled => !enabled) 로 상태이름을 다시사용하거나 앞에 의미를 붙임

**
state를 설정해도 기존 렌더링의 변수는 변경되지 않지만 새로운 렌더링을 요청합니다.
React는 이벤트 핸들러가 실행을 마친 후 상태 업데이트를 처리합니다. 이를 일괄 처리라고 합니다.
하나의 이벤트에서 일부 상태를 여러 번 업데이트하려면 setNumber(n => n + 1) 업데이터 함수를 사용할 수 있습니다.

https://codesandbox.io/s/3juca-2-1-kateugabs-gyesanhagi-5tzs0e?file=/App.js < 카트값 계산

https://codesandbox.io/s/jalmoshangeo-wxoyrr?file=/processQueue.js
