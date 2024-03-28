# Reacting to Input with State

선언적 UI 프로그래밍과 명령형 UI 프로그래밍의 차이점
컴포넌트가 있을 수 있는 다양한 시각적 상태를 열거하는 방법
코드에서 다양한 시각적 상태 사이의 변경을 트리거하는 방법


UI를 직접 조작하지않고 React가 계산하고 표시할 내용을 전달한다.

상태 변경을 트리거하는 요소 결정하기 

상태가 변경될떄 사용자에게 알려주기?

시각적으로 확인 할 수 있는 여러 state (상태)들을 만들어라

ex)_
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);

중복되는 상태는 제거하라


5-2 리엑트로 변경하기 
https://codesandbox.io/s/5-2-riegteuro-byeongyeonghagi-f3gg1w

5-3 
https://codesandbox.io/s/yqlz3l?file=/index.js:4-13&utm_medium=sandpack
