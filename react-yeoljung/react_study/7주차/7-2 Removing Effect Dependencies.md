## Removing Effect Dependencies

불필요한 종속성을 방지해서 무한루프 탈출

학습 내용
무한 효과 종속성 루프를 수정하는 방법
종속성을 제거할 때 해야 할 일
이펙트에 "반응"하지 않고 이펙트에서 값을 읽는 방법
오브젝트 및 함수 종속성을 피하는 방법과 이유
종속성 린터를 억제하는 것이 위험한 이유와 그 대신 해야 할 일

```

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); //시작과
    connection.connect();
    return () => connection.disconnect(); //중지를선어나면
  }, []); // <-- 오류에 무엇이 필요한지 짚어줌
  return <h1>Welcome to the {roomId} room!</h1>;
}
```
```
이펙트의 코드에서 사용되는 모든 반응형 값은 종속성 목록에 선언되어야 한다.

반응형 값 => 프로퍼티와 컴포넌트 내부에서 직접 선언된 모든 변수 및 함수가 포함.

const serverUrl = 'https://localhost:1234';
const roomId = 'music'; // 변하는 반응형값이 아니라는것을 인식

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared// 비울수있다.
  // ...
}
```

따로 실행 되어야 할 코드는 여러개의 Effect로 분할하여야 한다.


```
함수 ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);// messages 를 복사하면 의존성에 추가해야 하기 때문에 업데이터 함수를 대기열에 넣으면 ?? 몬소리?
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 모든 의존성 선언됨
  // ...
이제 Effect가 메시지 변수를 전혀 읽지 않는 것을 알 수 있습니다. 
msgs => [...msgs, receivedMessage]와 같은 업데이터 함수만 전달하면 됩니다. 
React는 업데이터 함수를 대기열에 넣고 다음 렌더링 중에 msgs 인수를 제공합니다.
이 때문에 Effect 자체는 더 이상 메시지에 의존할 필요가 없습니다.
이 수정으로 인해 채팅 메시지를 수신해도 더 이상 채팅이 다시 연결되지 않습니다.


Translated with www.DeepL.com/Translator (free version)

```

반응하지 않길 원하는 반응형값, 함수는 effectEvent로 보낸다 

```
함수 ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent(receivedMessage => {
    setMessages(msgs => [...msgs, receivedMessage]);
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
onMessage( receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 모든 의존성 선언됨
  // ...

Translated with www.DeepL.com/Translator (free version)
```
이펙트 이벤트는 리 랜더링이 되어도 변화되지 않는다? 의존성이 변경되지 않으면 리렌더 안됨


```
함수 Chat({ roomId, notificationCount }) {
  const onVisit = useEffectEvent(visitedRoomId => {
    logVisit(visitedRoomId, notificationCount);
  });

  useEffect(() => {
    onVisit(roomId); //roomId 가 변경될 때마다?
  }, [roomId]); // ✅ 모든 의존성 선언됨
  // ...
}
```

```
const serverUrl = 'https://localhost:1234'; // 외부에 선언

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId // 내부에 선언하여 roomId를 반응형값으로
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared 
  // ...
```

```
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // 이렇게 함수로 만들고 
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions(); // 적용하여도 종속성을 가진다.
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```
props를 의존성에 두면 부모 컴포넌트가 렌더링 될때마다 리렌더링 된다.
이펙트 외부의 객체에서 정보를 읽고 객체 및 함수 종속성을 피해야 한다.
```
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options; // 값을 복사.
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared 이경우 부모 컴포넌트가 렌더링 되어도 재실행 되지않고, 값이 변경될때만 재실행된다.
  // ...
```
```
function ChatRoom({ getOptions }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions(); // 의존성을 피하기위해 외부에서 선언
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

  요약
종속성은 항상 코드와 일치해야 합니다.
종속성이 마음에 들지 않으면 코드를 수정해야 합니다.
린터를 억제하면 매우 혼란스러운 버그가 발생하므로 항상 피해야 합니다.
종속성을 제거하려면 해당 종속성이 필요하지 않다는 것을 린터에게 "증명"해야 합니다.
특정 상호작용에 대한 응답으로 일부 코드가 실행되어야 하는 경우 해당 코드를 이벤트 핸들러로 이동하세요.
이펙트의 다른 부분이 다른 이유로 다시 실행되어야 하는 경우 여러 개의 이펙트로 분할하세요.
이전 상태를 기반으로 일부 상태를 업데이트하려면 업데이터 함수를 전달하세요.
"반응"하지 않고 최신 값을 읽으려면 효과에서 효과 이벤트를 추출하세요.
자바스크립트에서 객체와 함수는 서로 다른 시간에 생성된 경우 서로 다른 것으로 간주됩니다.
객체와 함수의 종속성을 피하세요. 컴포넌트 외부나 Effect 내부로 이동하세요.


1.https://codesandbox.io/s/kaunteuyi-jongsogseong-eobsaego-sete-gabs-eobsaem-m0dz74
2.https://codesandbox.io/s/gocyeojinge-majneunji-provlemsga-ddeuneunde-m5el7p 고쳐진게 맞나?
3.https://codesandbox.io/s/nn1n7l?file=%2FChatRoom.js&utm_medium=sandpack
