# Passing Data Deeply with Context


학습 내용
'프롭 드릴링'이란 무엇인가요?
반복적인 props 전달을 컨텍스트로 대체하는 방법
컨텍스트의 일반적인 사용 예시
컨텍스트에 대한 일반적인 대안

props로 너무많은 컴포넌트를 지나치는것이 비효율적이다.

context는 그 아래 모든 컴포넌트가 데이터값을 받을 수 있게 해준다.

## context생성방법


1. 컨텍스트를 생성합니다. (제목 레벨에 대한 컨텍스트이므로 LevelContext라고 부를 수 있습니다.)
2. 데이터가 필요한 컴포넌트에서 해당 컨텍스트를 사용합니다. (헤딩은 LevelContext를 사용합니다.)
3. 데이터를 지정하는 컴포넌트에서 해당 컨텍스트를 제공합니다. (섹션은 LevelContext를 제공합니다.)
4. 컨텍스트를 사용하면 부모(멀리 떨어져 있는 부모라도!)가 그 안에 있는 전체 트리에 일부 데이터를 제공할 수 있습니다.

## step 1 context 생성
```
Step 1: Create the context 
First, you need to create the context. You’ll need to export it from a file so that your components can use it:
```
## step 2 context hook import

```
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
```
```
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}

```
```
export default function Section({ level, children }) {
  반환 (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```
이는 React에게 "이 <Section> 안에 있는 컴포넌트가 LevelContext를 요청하면, 
이 level을 제공하라"고 지시합니다.
  
컴포넌트는 그 위에 있는 UI 트리에서 가장 가까운 <LevelContext.Provider> 값을 사용합니다.
  

 순서
1. level 프로퍼티를 <Section>에 전달합니다.
2. <Section>은 그 자식들을 <LevelContext.Provider 값={level}>으로 래핑합니다.
3. Heading은 useContext(LevelContext)를 사용하여 위의 LevelContext에서 가장 가까운 값을 묻습니다.
  
  
  아래와 같이 작성하면 level의 값을 계속가져올 필요가 없다.
  ```
  export default 함수 Section({ children }) {
  const level = useContext(LevelContext);
  반환 (
    <section className="section">
      <LevelContext.Provider value={level + 1}>> //level을 통해 얼마나 깊은 수준에 있는지 파악 가능하다.
        {children}
      </LevelContext.Provider>
    </section>
  );
}
  ```
  
% 가까운 component 는 props를 이용하자.
  
  
 1. 테마: 앱에서 사용자가 앱의 모양을 변경할 수 있는 경우(예: 다크 모드) 앱 상단에 컨텍스트 제공업체를 배치하고 시각적 모양을 조정해야 하는 컴포넌트에서 해당 컨텍스트를 사용할 수 있습니다.
2. 현재 계정: 많은 컴포넌트가 현재 로그인한 사용자를 알아야 할 수 있습니다. 이를 컨텍스트에 넣으면 트리의 어느 곳에서나 편리하게 읽을 수 있습니다. 또한 일부 앱에서는 여러 계정을 동시에 조작할 수 있습니다(예: 다른 사용자로 댓글을 남기는 경우). 이러한 경우 UI의 일부를 다른 현재 계정 값으로 중첩된 공급자로 래핑하는 것이 편리할 수 있습니다.
3. 라우팅: 대부분의 라우팅 솔루션은 내부적으로 컨텍스트를 사용하여 현재 경로를 유지합니다. 이것이 모든 링크가 활성 상태인지 아닌지를 '아는' 방식입니다. 자체 라우터를 구축하는 경우에도 이 방식을 사용할 수 있습니다.
4. 상태 관리: 앱이 성장함에 따라 앱 상단에 더 많은 상태가 있을 수 있습니다. 아래에 있는 많은 멀리 떨어진 컴포넌트에서 이를 변경하고 싶을 수 있습니다. 컨텍스트와 함께 리듀서를 사용하면 복잡한 상태를 관리하고 멀리 떨어진 컴포넌트에 큰 번거로움 없이 전달할 수 있습니다.
  
컨텍스트는 정적 값에만 국한되지 않습니다. 다음 렌더링에서 다른 값을 전달하면 React는 아래에서 이를 읽는 모든 컴포넌트를 업데이트합니다! 이것이 컨텍스트가 state와 함께 자주 사용되는 이유입니다.

일반적으로 트리의 다른 부분에 있는 멀리 떨어진 컴포넌트에서 일부 정보가 필요한 경우 컨텍스트가 도움이 될 수 있다는 좋은 신호입니다.


  요약
1. 컨텍스트는 컴포넌트가 그 아래 전체 트리에 일부 정보를 제공할 수 있게 해줍니다.
2. 컨텍스트를 전달하려면:
   1) export를 사용하여 생성하고 내보냅니다. const MyContext = createContext(defaultValue).
   2) 이를 사용Context(MyContext) Hook에 전달하면 깊이에 상관없이 모든 하위 컴포넌트에서 컨텍스트를 읽을 수 있습니다.
   3) 자식 컴포넌트를 <MyContext.Provider value={...}>로 래핑하여 부모로부터 제공받습니다.
3. 컨텍스트는 중간에 있는 모든 컴포넌트를 통과합니다.
4. 컨텍스트를 사용하면 "주변 환경에 적응"하는 컴포넌트를 작성할 수 있습니다.
5. 컨텍스트를 사용하기 전에 소품을 전달하거나 JSX를 자식으로 전달해 보세요.

  1 번 문제
  https://codesandbox.io/s/context-zqycwv?file=/Context.js 
  
  콘텍스트로 component 전체를 감싸준다
