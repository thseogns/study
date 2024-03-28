# Synchronizing with Effects (효과, 동기화)

학습 내용

이펙트란 무엇인가요?
Effect가 이벤트와 어떻게 다른지
컴포넌트에서 Effect를 선언하는 방법
불필요하게 Effect를 다시 실행하는 것을 건너뛰는 방법
개발 과정에서 이펙트가 두 번 실행되는 이유와 해결 방법


react component 있는 두가지 유형의 로직

이펙트를 사용하면 특정 이벤트가 아닌 렌더링 자체로 인해 발생하는 side effect을 지정할 수 있습니다. 
채팅에서 메시지를 보내는 것은 사용자가 특정 버튼을 클릭함으로써 직접 발생하므로 이벤트에 해당합니다.
그러나 서버 연결 설정은 컴포넌트가 표시되는 원인이 되는 상호작용에 관계없이 발생해야 하므로 이펙트입니다

Effect는 일반적으로 React 코드에서 벗어나 외부 시스템과 동기화할 때 사용된다는 점을 명심하세요. 


Effect 사용방법
1. Effect를 선언합니다. 기본적으로 효과는 렌더링할 때마다 실행됩니다.

2. Effect 종속성을 지정합니다. 대부분의 Effect는 매 렌더링 후가 아니라 필요할 때만 다시 실행되어야 합니다.
예를 들어 페이드인 애니메이션은 컴포넌트가 나타날 때만 트리거되어야 합니다. 대화방 연결 및 연결 해제는 컴포넌트가 나타났다가 사라질 때 또는 대화방이 변경될 때만 발생해야 합니다.
종속성을 지정하여 이를 제어하는 방법을 배우게 됩니다.
필요한 경우 정리를 추가합니다. 일부 효과는 수행 중이던 작업을 중지, 실행 취소 또는 정리하는 방법을 지정해야 합니다.

3. 예를 들어, "연결"에는 "연결 끊기", "구독"에는 "구독 취소", "가져오기"에는 "취소" 또는 "무시"가 필요합니다. 
정리 함수를 반환하여 이를 수행하는 방법을 배우게 됩니다.


```

  if (isPlaying) {
    ref.current.play(); // 렌더링 중에 호출하는 것은 허용되지 않습니다.
  } else {
    ref.current.pause(); // 역시 충돌합니다.
  }
  
  
```

(if for등의 게산은 순수하게 계산만 행해야 한다.) 계산을 시행하지않고 완료된 계산을 적용

## DOM 업데이트를 Effect로 감싸서 React가 먼저 화면을 업데이트하도록 합니다. 그런 다음 Effect가 실행됩니다.

주의할점$$
기본적으로 효과는 모든 렌더링 후에 실행됩니다. 그렇기 때문에 이와 같은 코드는 무한 루프를 생성합니다:
```
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```

의존성 배열이 없는 경우와 빈 [] 의존성 배열이 있는 경우의 동작은 다릅니다:

useEffect(() => {
  // 모든 렌더링 후에 실행됩니다.
});

useEffect(() => {
  // 마운트할 때만 실행됩니다 (컴포넌트가 나타날 때).
}, []);

useEffect(() => {
  // 마운트 *시에도 실행되며, 마지막 렌더링 이후 a 또는 b가 변경된 경우에도 실행됩니다.
}, [a, b]);

종속성은 상황에따라 생략될 수 도있다.
```
useEffect(() => {
  const connection = createConnection();
  connection.connect();
}, []); //한번만 실행 
```

중복실행돼도 영향이없으면 상관없음

```
useEffect(() => {
  // 🔴 오류: 이 Effect는 개발 과정에서 두 번 실행되어 코드에 문제가 노출됩니다.
  fetch('/api/buy', { method: 'POST' });
}, []);// 이코드는 실행될때 구매가 한번더 실행된다.
```
상황에 맞춰쓰라?

&& 를 이용해서 component가 자동으로 실행되게 만들었다.
```
import { useState, useEffect } from 'react';

function Playground() {
  const [text, setText] = useState('a');

  useEffect(() => {
    function onTimeout() {
      console.log('⏰ ' + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      console.log('🟡 Cancel "' + text + '" log');
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <label>
        What to log:{' '}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </label>
      <h1>{text}</h1>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Unmount' : 'Mount'} the component
      </button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
}
```
요약
1. 이벤트와 달리 효과는 특정 상호작용이 아닌 렌더링 자체로 인해 발생합니다.
2. 효과를 사용하면 컴포넌트를 외부 시스템(타사 API, 네트워크 등)과 동기화할 수 있습니다.
3. 기본적으로 효과는 모든 렌더링(초기 렌더링 포함) 후에 실행됩니다.
4. 모든 종속성의 값이 마지막 렌더링 때와 같으면 React는 Effect를 건너뜁니다.
5. 의존성을 "선택"할 수는 없습니다. Effect 내부의 코드에 의해 결정됩니다.
6. 빈 의존성 배열([])은 컴포넌트 "마운트", 즉 화면에 추가되는 것에 해당합니다.
7. 엄격 모드에서 React는 컴포넌트를 두 번 마운트하여(개발 시에만!) 이펙트를 스트레스 테스트합니다.
8. 만약 이펙트를 다시 마운트하는 과정에서 이펙트가 깨진다면, 정리 함수를 구현해야 합니다.
9. React는 다음 번에 이펙트가 실행되기 전과 마운트 해제 중에 정리 함수를 호출합니다.



1번https://codesandbox.io/s/pokeoseuhagi-wp41oc?file=/MyInput.js

2번 https://codesandbox.io/s/ifmun-euro-effect-1egexg

3번 https://codesandbox.io/s/return-c3bihz
,4번 못풀(뭔소린지?) (틀림 - 실행이 한번되면 그값에 true를 줘서 다음 실행이 안되게 막는다 이거인듯?)
