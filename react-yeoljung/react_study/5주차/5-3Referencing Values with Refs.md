# Referencing Values with Refs

컴포넌트가 특정 정보를 '기억'하도록 하고 싶지만
해당 정보가 새 렌더링을 트리거하지 않도록 하려는 경우  ref 를 사용할 수 있습니다

랜더링하지않고 특정정보 기억하기.

#### 학습내용

1. 컴포넌트에  ref 를 추가하는 방법
2.  ref  값을 업데이트하는 방법
3. state와 ref의 차이점
4.  ref 를 안전하게 사용하는 방법

컴포넌트 내에서 useRef Hook을 호출하고 참조하려는 초기 값을 유일한 인수로 전달한다.
ex) 값 0에 대한 참조
```
const ref = useRef(0);
```


useRef는 다음과 같은 객체를 반환
```
{ 
  current: 0 // useRef에 전달한 값
}
```

ref                                                                 state
    useRef(initialValue)는 { current: initialValue }를 반환합니다.        useState(initialValue)는 상태 변수의 현재 값과 상태 설정자 함수([value, setValue])를 반환합니다.
    변경시 렌더링트리거하지 않는다.                                        변경시 렌더링한다.
    변경가능 == 렌더링 프로세르 외부에서 값을 수정하고 변경할 수 있다.       변경불가.
    렌더링 중에는 현재값을 읽거나 쓰지않아야 한다.                          언제든 가능
 
 ref는 렌더링되지 않는다?
 이벤트가 실행돼도 텍스트값이 변하지 않는다??
 렌더링중에 ref.current를 읽으면 코드가 불안정해지는 이유?
 
 
 ref는 seter가 없는 state형태 라고 생각
 ```
 // Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```


ref를 사용할때
1. 타임아웃 ID 저장
2. 다음에 올 페이지에서 다룰 DOM 엘리먼트 저장 및 조작하기
3. JSX를 계산하는 데 필요하지 않은 다른 객체를 저장하는 경우.
4. 컴포넌트에 일부 값을 저장해야 하지만 렌더링 로직에 영향을 미치지 않는 경우 ref를 선택하세요.

ref는 렌더링중에 사용하면 안된다. 어느 순서에 변경 될지 정확히 예측하기 어렵기 때문에 렌더링 후를 예측할 수 없다.
예외로는  if (!ref.current) ref.current = new Thing() <= 처럼 렌더링중 한번만 설정할 수있게 하는것?


요약
1. Ref는 렌더링에 사용되지 않는 값을 유지하기 위한 이스케이프 해치입니다. 자주 필요하지 않습니다.
2. ref는 현재라는 단일 프로퍼티를 가진 일반 자바스크립트 객체로, 읽거나 설정할 수 있습니다.
3. useRef Hook을 호출하여 React에 ref를 제공하도록 요청할 수 있습니다.
4. state와 마찬가지로 ref를 사용하면 컴포넌트의 재렌더링 사이에 정보를 유지할 수 있습니다.
5. state와 달리 ref의 현재 값을 설정해도 리렌더링이 트리거되지 않습니다.
6. 렌더링 중에는 ref.current를 읽거나 쓰지 마세요. 이렇게 하면 컴포넌트를 예측하기 어렵습니다.

1문 https://codesandbox.io/s/current-sujeong-sjxi2u?file=/App.js:364-368
2문  https://codesandbox.io/s/statejeondal-c93h94?file=/App.js
3문 https://codesandbox.io/s/cleartimeoute-refneohgi-q1kky0?file=/App.js
4문 https://codesandbox.io/s/broken-sun-m1ijh5?file=/App.js  답을보니 3초뒤에 나오는게 아니라 아닌듯

