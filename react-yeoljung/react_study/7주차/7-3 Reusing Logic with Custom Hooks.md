# Reusing Logic with Custom Hooks

학습 내용은 다음과 같습니다.
커스텀 Hook이란 무엇이며, 직접 작성하는 방법
컴포넌트 간에 로직을 재사용하는 방법
커스텀 Hook의 이름을 짓고 구조화하는 방법
커스텀 Hook을 추출해야 하는 시기와 이유

hook의 이름은 useState 또는 useOnlineStatus 페이지 앞부분과 같은 사용자 정의)와 같이 대문자 사용으로 시작해야 합니다. 

use가 붙으면 react state일 가능성이 높아지겠쥬?


hook을 사용하지 않으면 use 안붙인다. (hook이 있는 커스텀훅은 조건문을 달면안됨?)

커스텀훅은 실행된 시점마다 값이 다르다.(독립적이다.)

```
import { useFormInput } from './useFormInput.js';

export default function Form() {
  const firstNameProps = useFormInput('Mary'); //두개의 값이 달라서 출력되는 값도 다르다.
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}

```
커스텀 훅도 순수해야한다.


```
function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`); //usedata로 api저장?
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  // ...
```

effect를 커스텀훅으로 래핑한느게 좋은이유

이펙트를 오가는 데이터 흐름을 매우 명확하게 만들 수 있습니다.
컴포넌트가 Effect의 정확한 구현보다는 의도에 집중할 수 있습니다.
React에 새로운 기능이 추가되면 컴포넌트를 변경하지 않고도 해당 효과를 제거할 수 있습니다.


1. 커스텀 훅을 사용하면 컴포넌트 간에 로직을 공유할 수 있습니다.
2. 커스텀 훅의 이름은 사용으로 시작하고 대문자로 끝나야 합니다.
3. 커스텀 Hook은 state 저장 로직만 공유하며 상태 자체는 공유하지 않습니다.
4. 한 Hook에서 다른 Hook으로 반응형 값을 전달할 수 있으며, 반응형 값은 최신 상태로 유지됩니다.
5. 컴포넌트가 다시 렌더링될 때마다 모든 Hook이 다시 실행됩니다.
6. 커스텀 Hook의 코드는 컴포넌트의 코드와 같이 순수해야 합니다.
7. 커스텀 Hook이 수신한 이벤트 핸들러를 Effect Event로 래핑하세요.
8. useMount와 같은 커스텀 Hook을 만들지 마세요. 용도를 명확히 하세요.
9. 코드의 경계를 선택하는 방법과 위치는 여러분에게 달려 있습니다.

1. https://codesandbox.io/s/kaunteo-mandeulgi-ml77ox
2. https://codesandbox.io/s/dilrei-cuga-kh6dbg
