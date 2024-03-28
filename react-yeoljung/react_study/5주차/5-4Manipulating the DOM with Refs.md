# Manipulating the DOM with Refs

1. ref 어트리뷰트를 사용해 React가 관리하는 DOM 노드에 접근하는 방법
2. ref JSX 어트리뷰트가 useRef Hook과 관련되는 방법
3. 다른 컴포넌트의 DOM 노드에 접근하는 방법
4. 어떤 경우에 React가 관리하는 DOM을 수정해도 안전한가?

## 노드에 대한 참조 얻기

1. useRef hook 가져오기 import { useRef } from 'react';

2. 컴포넌트 내 ref선언 const myRef = useRef(null);
3. ref 속성을 DOM노드에 전달 <div ref={myRef}>
  
 ## input의 노드를 저장
  useRef 훅과 함께 inputRef를 선언
<input ref={inputRef}>로 전달하십시오. 이렇게하면 React가  이<input>의 DOM 노드를 inputRef.current에 넣도록 지시됩니다.
  
  <MyInput />과 같은 사용자 정의 컴포넌트에 ref를 넣으려고하면 기본적으로 null을 얻게된다.
  
  react는 컴포넌트가 다른 컴포넌트의 DomNode에 접근하는것을 허용하지 않는다.
  이것을 사용하기 위해서는 ref를 props로 내려주고 그값을 참조하면 된다.
  
1. Ref는 일반적인 개념이지만 대부분의 경우 DOM 엘리먼트를 보관하는 데 사용됩니다.
2. <div ref={myRef}>를 전달하여 React에 DOM 노드를 myRef.current에 넣도록 지시합니다.
3. 보통 포커스 맞추기, 스크롤, DOM 엘리먼트 측정과 같은 비파괴적인 동작에 ref를 사용합니다.
4. 컴포넌트는 기본적으로 DOM 노드를 노출하지 않습니다. forwardRef를 사용하고 두 번째 ref 인수를 특정 노드에 전달하여 DOM 노드를 노출하도록 선택할 수 있습니다.
  (forwardRef((props, ref))  <=이런식으로 2번째 인수에ref전달
5. React가 관리하는 DOM 노드를 변경하지 마세요.
6. React가 관리하는 DOM 노드를 수정해야 하는 경우 React가 업데이트할 이유가 없는 부분만 수정하세요.

1문 https://codesandbox.io/s/epic-minsky-ltkpp1?file=/App.js:303-307 답봄
2문 https://codesandbox.io/s/pokeoseu-hagi-zorc4q 포커스 하기
3문 못함
4문 https://codesandbox.io/s/6sh42h?file=/App.js:131-144&utm_medium=sandpack
                                 
