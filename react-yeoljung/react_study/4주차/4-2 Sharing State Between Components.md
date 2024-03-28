# Sharing State Between Components

두 컴포넌트의 상태가 항상 함께 변경되기를 원할 때에는 가장 가까운 공통 부모로 이동시키고 props로 값을 내려받으면 된다.

배우게 될 내용
1. 리프팅 업을 통해 컴포넌트 간에 state를 공유하는 방법
2. 제어되는 컴포넌트와 제어되지 않는 컴포넌트
3. 예제로 상태 올리기 
4. 이 예제에서는 부모 아코디언 컴포넌트가 두 개의 개별 패널을 렌더링합니다:

아래의 경우 컴포넌트가 2개 생성되어 2개의 state를 갖는다.
```

import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```
### 부모에서 하위컴포넌트 제어

1 하위 컴포넌트에서의 상태제거 후 props 만들기
2 공통된 부모에서 props전달
3 공통된 부모에 상태추가
```
const [activeIndex, setActiveIndex] = useState(0); //activeIndex가 0이면 첫 번째 패널이 활성화되고, 1이면 두 번째 패널이 활성화된다.

```
각각의 컴포넌트는 단인 소스를 갖는다? 
상태마다 고유한 값을 가진다.

요약

1. 두 컴포넌트를 조정하고 싶을 때는 상태를 공통 부모로 이동합니다.
2. 그런 다음 공통 부모로부터 프로퍼티를 통해 정보를 전달합니다.
3. 마지막으로 이벤트 핸들러를 전달해 자식들이 부모의 상태를 변경할 수 있도록 합니다.
4. 컴포넌트를 "제어되는"(프로퍼티에 의해 구동되는) 또는 "제어되지 않는"(상태에 의해 구동되는) 것으로 간주하는 것이 유용합니다.

1번 문제 
https://codesandbox.io/s/inpute-textgabs-ilci-p5vepn?file=/App.js
2번 문제
https://codesandbox.io/s/elastic-brook-uuh4vv?file=/App.js
