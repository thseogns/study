# Preserving and Resetting State (상태보존 및 재설정)

React가 컴포넌트 구조를 "보는" 방법
React가 상태를 보존하거나 재설정하도록 선택하는 경우
React가 컴포넌트의 state를 재설정하도록 강제하는 방법
키와 타입이 상태 보존 여부에 영향을 미치는 방법


componentA                        A

componentB  = react =>    B               C  = reactDom =>     WEB

componentC


state는 컴포넌트가 아닌 react내부에서 유지된다.


React는 컴포넌트가 UI 트리의 해당 위치에서 렌더링되는 동안 컴포넌트의 상태를 유지합니다.

컴포넌트가 제거되거나 같은 위치에 다른 컴포넌트가 렌더링되면 React는 해당 컴포넌트의 상태를 삭제합니다.


```

 <div>
      <Counter />
      {showB && <Counter />}  // 두 카운터는 다른카운터다 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label>
    </div>
```

```
<div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} />  // 이 카운터는 같은 위치에 있어서 같은 카운터고 동일한 state값을 가진다.
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
```
###react에서 중요한 것은 jsx마크업이 아닌 UI트리에서의 위치다!


```
 <div>
      {isPaused ? (
        <p>See you later!</p> // 이경우 <p>태그가 들어감과 동시에 Counter컴포넌트가 UI트리에서 삭제되기 때문에 그 값도 지워지게 된다.
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label>
    </div>
```

```
 <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} />  //이경우 하위 컴포넌트는 재설정 되기때문에 state값이 남지않는다.
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
```

컴포넌트 함수는 최상위에 두자.

### 두 카운터 사이를 전환할 때 상태를 재설정하는 방법

1 컴포넌트를 서로 다른 위치에 렌더링
2 각 컴포넌트에 key값을 주기

```
{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
```

요약
React는 동일한 컴포넌트가 동일한 위치에서 렌더링되는 한 상태를 유지합니다.
상태는 JSX 태그에 보관되지 않습니다. JSX를 넣은 트리 위치와 연관되어 있습니다.
하위 트리에 다른 키를 지정하여 강제로 상태를 재설정할 수 있습니다.
컴포넌트 정의를 중첩하지 않으면 실수로 상태가 초기화될 수 있습니다.

1번 https://codesandbox.io/s/showhint-u6hkuw

2번 https://codesandbox.io/s/keygabseuro-tegteuseu-ddarabaggwige-6wkll4?file=/App.js:650-660


3번 https://codesandbox.io/s/keygabseuro-ireum-imeil-keonteurol-gfiv1i
4번 https://codesandbox.io/s/keygabseuro-imiji-jojeong-qto1yj?file=/App.js
5번 뭔소린지 잘,..
https://codesandbox.io/s/j7swnf?file=/App.js&utm_medium=sandpack
