(BE)

1. Model은 Controller와 View에 의존하지 않아야 한다.
   (Model내부에 Controller와 View에 관련된 코드가 있으면 안된다.)
2. View는 Model에만 의존해야하고, Controller에는 의존하면 안된다.
   (View 내부에 Modle의 코드만 있을 수 있고, Controller의 코드가 있으면 안된다.)
3. View가 Model로부터 데이터를 받을 때는, 사용자마다 다르게 보여주어야 하는 데이터에대해서만 받아야 한다. (사용자들이 동일하게 보게되는 데이터는 제외)
4. Controller는 Model과 View에 의존해도 된다.(Controller내부에는 Model과 View의 코드가 있을 수 있다.)
5. View가 Model로부터 데이터를 받을 때, 반드시 Controller에서 받아야 한다.

(FE)
View가 아주많다.
양방향처리가 필요.
View간의 계층처리가 필요

데이터 바인딩.
MVVM패턴,
FLUX아키텍쳐

(React)

Presentation & Container
React 디자인 패턴 중 가장 기본적인 패턴, 데이터 로직을 수행하는 Container 컴포넌트와 데이터를 출력하는 presentation 컴포넌트로 구분한다.

Container 컴포넌트
API호출, State관리, 이벤트 처리등의 작업을 수행하는 컴포넌트 입니다.
변경된 상태 값을 props를 통해 Presentation 컴포넌트로 전달.

presentation 컴포넌트
UI를 표시하는 컴포넌트
직접 상태값을 관리하지 않고 presentation 컴포넌트가 전달해준 props를 받아 출력한다.
