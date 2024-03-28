## Separating Events from Effects

effect는 마지막 렌더링 때와 다른 경우 다시 동기화한다.

학습 내용은 다음과 같습니다.
이벤트 핸들러와 이펙트 중에서 선택하는 방법
이펙트는 반응형이고 이벤트 핸들러는 그렇지 않은 이유
이펙트 코드의 일부가 반응하지 않도록 하려면 어떻게 해야 할까요?
이펙트 이벤트가 무엇이며, 이펙트에서 추출하는 방법
이펙트 이벤트를 사용하여 이펙트에서 최신 프롭과 상태를 읽는 방법





아래의 이팩트 사용시 
사용자가 앱을 열기만 했든, 다른 방을 선택했든, 다른 화면으로 이동했다가 다시 돌아왔든, 
이펙트는 컴포넌트가 현재 선택된 방과 동기화된 상태를 유지하고 필요할 때마다 다시 연결되도록 합니다.(ud값이 변화 할때만 바뀐다.)
```
function ChatRoom({ roomId }) {
  // ...
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```


직관적으로 이벤트 핸들러는 버튼을 클릭하는 등 항상 '수동'으로 트리거된다고 말할 수 있습니다.
반면에 이펙트는 "자동"으로 동기화 상태를 유지하는 데 필요한 만큼 자주 실행되고 다시 실행됩니다.


자동= effect 수동= event

리액티브값은 랜더링 데이터 흐름에 참여한다.
 
 
 ## useEffectEvent
 ```
   const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  
  ```
useEffectEvent = 자동
event = 수동

```
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => { //전달된 url값
    logVisit(visitedUrl, numberOfItems);  //따로 실행될 numverOf 
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared //item의 변경이 url에 영향을 미치지 않게 하고싶을떄!
  // ...
}
```
url 변경이 일어날때 numberOfItems의 변경이 일어난다면 실행된다? 인듯?

요약
이벤트 핸들러는 특정 상호작용에 대한 응답으로 실행됩니다.
이펙트는 동기화가 필요할 때마다 실행됩니다.
이벤트 핸들러 내부의 로직은 반응하지 않습니다.
효과 내부의 로직은 반응적입니다.
비반응형 로직을 효과에서 효과 이벤트로 이동할 수 있습니다.
효과 내부에서만 효과 이벤트를 호출하세요.
효과 이벤트를 다른 컴포넌트나 Hook에 전달하지 마세요.

1.https://codesandbox.io/s/increment-ywqs47
2.https://codesandbox.io/s/happy-bessie-5xp5pv?file=/App.js
3.https://codesandbox.io/s/affectionate-cookies-z7xsu3?file=/App.js:418-468
4 번
```
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      setTimeout(() => {
        onConnected(roomId); // 종속성?
      }, 2000);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```
