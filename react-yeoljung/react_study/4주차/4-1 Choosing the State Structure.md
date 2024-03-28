# Choosing the State Structure

state의 구조화

학습 내용
단일 상태 변수와 다중 상태 변수를 사용해야 하는 경우
상태를 구성할 때 피해야 할 사항
상태 구조와 관련된 일반적인 문제를 해결하는 방법





상태 구조화 원칙 
 더 나은 선택을 할 수 있도록 안내하는 몇 가지 원칙이 있습니다:

state를 가지는 컴포넌트를 작성할 때는 얼마나 많은 state변수를 사용할 지 데이터 형태는 어떤 것이 좋을지 선택해놓고 프로그램을 만들어야 한다.


1.  state를 그룹화 하라 - 항상 두개 이상의 상태변수를 동시에 업데이트 하는 경우 단일상태변수로 병합하는 것을 고려,
2. 상태의 모순을 피하라 - 여러개의 상태가 서로 모순되거나 불일치 될수 있는 방식을 피해야 한다.
3. 중복상태를 피하라 - 렌더링중 컴포넌트의 소품이나 기존상태 변수에서 일부 정보를 계산할 수 있는 경우 해당 정보를 해당 컴포넌트 상태에 넣으면 안됀다.
4. 상태 중복을 피하라 - 동일한 데이터가 여러 상태 변수간에 또는 중첩된 오브젝트 내에 중복되면 동기화 상태를 유지하기 어렵다. 
5. 깊게 중첩된 상태를 피하라 - 깊게 계층화된 상태는 업데이트하기가 쉽지않다, 가능하면 상태를 평평한 방식으로 구조화 해야한다. 






const [x, setX] = useState(0);
const [y, setY] = useState(0);


const [position, setPosition] = useState({ x: 0, y: 0 });
기술적으로는 이 두 가지 접근법 중 하나를 사용할 수 있습니다.
하지만 두 개의 상태 변수가 항상 "함께" 변경되는 경우에는 하나의 상태 변수로 통합하는 것이 좋습니다.






### 1. 그룹화 하라!
데이터를 객체나 배열로 그룹화 해야하는 경우

데이터를 객체나 배열로 그룹화하는 또 다른 경우는 얼마나 많은 다른 상태가 필요한지 모를 때입니다.
예를 들어, 사용자가 사용자 정의 필드를 추가할 수 있는 양식이 있을 때 유용합니다.
xx상태변수가 객체인경우 다른필드를 명시적으로 복사하지 않고는 그 안의 한 필드만 업데이트 할 수 없다.
 setPosition({ ...position, x: 100 }) < 복사하고 새로운 값을 넣거나
 분할하여 setX(100) <를 넣어야 한다.


### 2. 상태모순을 피하라!

const isSending = status === 'sending';
const isSent = status === 'sent';
하나의 state가 변화하게 함으로써 모순이 생기는 점을 피한다.

### 3. 중복상태를 방지하라!

state의 중복 사용을 피해야 한다?
예제에서는 
const fullName = firstName + ' ' + lastName; 로 렌더링시 계산이되게함
```
function Message({ messageColor }) { //이상태의 경우 부모에서 준 props값이 변경되어도 값이 변하지않는다.
  const [color, setColor] = useState(messageColor);
```
```
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(  // items에 있는 같은객체를 사용하고있다. select변경시 변경되기 전값이 출력된다.
    items[0]
  );

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title}
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0); 

  const selectedItem = items.find(item => //클릭한 id와 일치하는 정보를 찾아서 새롭게 만듦
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id); //클릭시 클릭했던 곳의 id값을 보냄
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

```
재귀컴포넌트 좀 헷갈렸다.


요약
두 개의 상태 변수가 항상 함께 업데이트되는 경우, 두 변수를 하나로 병합하는 것이 좋습니다.
"불가능한" 상태를 만들지 않도록 상태 변수를 신중하게 선택하세요.
업데이트 실수를 줄일 수 있는 방식으로 상태를 구성하세요.
상태를 동기화할 필요가 없도록 중복 및 중복 상태를 피하세요.
특별히 업데이트를 방지하려는 경우가 아니라면 소품을 상태에 넣지 마세요.
선택과 같은 UI 패턴의 경우 개체 자체 대신 ID 또는 인덱스를 상태로 유지하세요.
깊게 중첩된 상태를 업데이트하는 것이 복잡하다면 플랫화하세요.요약

1번 색 조정 시계
https://codesandbox.io/s/sigye-saegjojeong-jzykmr?file=/Clock.js
2번 
장바구니
https://codesandbox.io/s/cekeudoengeo-jiugi-lto5pg?file=/PackingList.js
3번 클릭하이라이트
https://codesandbox.io/s/keulrighamyeon-hairaiteu-kntjbj?file=/Letter.js:357-366
4번 문제 보류
https://codesandbox.io/s/xxrgl4?file=/App.js&utm_medium=sandpack
