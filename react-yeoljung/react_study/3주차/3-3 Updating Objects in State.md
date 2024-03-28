# State에서 객체 업데이트하기

State는 객체를 포함한 모든 종류의 자바스크립트 값을 저장할 수 있다.
React state에 있는 객체를 직접 변경해서는 안된다. 
대신 객체를 업데이트하려면 새 객체를 생성하거나 기존 객체의 복사본을 만든 다음 해당 복사본을 사용하도록 state를 설정해야 합니다.
객체를 업데이트 하려면 새 객체를 생성하거나 기존객체의 복사본을 만든다음 해당복사본을 사용하도록 state를 설정해야한다.

React 상태에서 객체를 올바르게 업데이트하는 방법
중첩된 객체를 변경하지 않고 업데이트하는 방법
불변성이란 무엇이고 어떻게 깨뜨리지 않는가?
Immer로 객체 복사를 덜 반복적으로 만드는 방법

읽기전용으로 취급하라??

 렌더링에서 액세스할 수 있는 상태 값은 읽기 전용으로 취급해야 한다.
 useState를 직접적으로 수정하지 말고 set을 통해 전달하라는 뜻(이렇게하면 재렌더링 되면서 값이변경되고 실행됨)
 기존객체를 변경해서 사용할 수 있는 경우도 있지만 권장하지 않는다.
 
 새로운 개체를 만들면 다른 값들도 복사해줘야한다. 
 객체가 새로 만들어지기 떄문
 
 ...people << 개체를 복사함
 
 스프레드 구문은 "얕은" 구문으로 깊은 객체를 복사하지 못한다.      
  ```
 setPerson({
  ...person, // 다른 필드 복사
  artwork: { // 하지만 아트웍을
    ...person.artwork, // 같은 것으로 바꿉니다.
    city: '뉴델리' // 하지만 뉴델리에서!
  }
  ```
  위의방식 외에도
  useImmer로 업데이트할 수 있다.
  ```
   function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }
  
  ```
  
  요약
React의 모든 state는 불변으로 취급
state에 객체를 저장하면 객체를 변경해도 렌더링이 시작되지 않고 이전 렌더링 "스냅샷"의 상태가 변경됩니다.(새로운값이전달된다)**
객체를 변경하는 대신 새 버전을 생성하고 state를 설정하여 다시 렌더링을 시도하세요.
오브젝트 스프레드 구문 {...obj, something: 'newValue'}를 사용하여 오브젝트의 복사본을 만들 수 있습니다.
스프레드 구문은 한 수준 깊이만 복사하는 얕은 구문입니다.
중첩된 객체를 업데이트하려면 업데이트하려는 위치에서 위쪽까지 복사본을 만들어야 합니다.
반복적인 코드 복사를 줄이려면 Immer를 사용하세요.
  
  1번 https://codesandbox.io/s/3-1-seupeuredeu-vpi0q3 스프레드
  
  2번 https://codesandbox.io/s/3-2-jungceobgaegce-seupeuredeusayong-iq0gwl 중첩객체 스프레드
  
  3번 https://codesandbox.io/s/useimmersayonghayeo-sangtaeeobdeiteu-jscnf3 immer사용
