# Lifecycle of Reactive Effects



배우게 될 내용
이펙트의 라이프사이클이 컴포넌트의 라이프사이클과 다른 점
각 개별 효과를 개별적으로 생각하는 방법
이펙트를 다시 동기화해야 하는 시기와 그 이유
이펙트의 종속성이 결정되는 방법
값이 반응형이라는 것의 의미
빈 의존성 배열이 의미하는 것
React가 링터로 의존성이 올바른지 확인하는 방법
린터에 동의하지 않을 때 해야 할 일

```
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) { // 아이디 값을 바꿔주면서 랜더링이 일어나게 한다.
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect(); // 변경시 종료되면서 서버연결을 끊는다.
  }, [roomId]); //여기서 종속되었기 때문에 값이 바뀌면 리랜더링한다. (의존성)
  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}// 불린 값에 따라 켜지고 꺼진다.
    </>
  );
}

```

다른값이 추가될 수 있기 때문에 로그인 아이디를 따로저장했다.(이러는 편이 더 깔끔하다.)
```
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
  }, [roomId]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    // ...
  }, [roomId]);
  // ...
}

랜더링시 변경되는 값만 종속성을 부여해준다.


```

외부에 값을 두면 종속성에 빈배열을 두어도 된다.
```
const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ All dependencies declared
  // ...
}
```
이펙트가 사용하는 컴포넌트 본문의 모든 변수는 이펙트 종속성 목록에 있어야 합니다.별별

객체와 함수를 종속성으로 의존하지 마세요. // 현재 제작중인게 이거문제
렌더링 중에 객체와 함수를 생성한 다음 Effect에서 읽으면 렌더링할 때마다 객체와 함수가 달라집니다.
이렇게 하면 매번 효과가 다시 


요약
컴포넌트는 마운트, 업데이트, 마운트 해제할 수 있습니다.
각 이펙트는 주변 컴포넌트와 별도의 라이프사이클을 가집니다.
각 효과는 시작 및 중지할 수 있는 별도의 동기화 프로세스를 설명합니다.
효과를 작성하고 읽을 때는 컴포넌트의 관점(마운트, 업데이트 또는 마운트 해제 방법)이 아닌 각 개별 효과의 관점(동기화 시작 및 중지 방법)에서 생각하세요.
컴포넌트 본문 내부에 선언된 값은 "반응형"입니다.
반응형 값은 시간이 지남에 따라 변경될 수 있으므로 이펙트를 다시 동기화해야 합니다.
인터프리터는 이펙트 내부에서 사용된 모든 반응형 값이 종속성으로 지정되었는지 확인합니다.
린터에 의해 플래그가 지정된 모든 오류는 합법적인 오류입니다. 규칙을 위반하지 않도록 코드를 수정할 수 있는 방법은 항상 있습니다.


1.https://codesandbox.io/s/jongsogseonggabs-hqeb6p 종속성
2.https://codesandbox.io/s/pointeo-mubeu-if-47njr4 포인터 무브
3.https://codesandbox.io/s/mweoji-ddoggateungeoaninga-w13m95
4.https://codesandbox.io/s/jongsogseongcuga-jfo9yx
5.귀찮.
