# zustand 기본사용법

JS버젼

```.js
import { create } from 'zustand'  // 크리에이트로 가져온다.

const useStore = create((set) => ({  // 유즈 스토어로 변수 저장
count: 1,   // 상태를 만들어준다.
inc: () => set((state) => ({ count: state.count + 1 })), //inc는 count 상태에 접근해서 값을 1증가시키는 함수다. (set으로만 변경가능하다.)
}))

function Counter() {
const { count, inc } = useStore()  // 여기서 count와 inc를 가져옴
return (
<div>
<span>{count}</span>  // count를 출력하고
<button onClick={inc}>one up</button>  //여기서 값을 증가시킨다.
</div>
)
}
```

TS버젼

```.ts
import { create } from 'zustand'

type Store = {  //타입은 넘버와 리턴값이 없는 함수void로 작성
  count: number
  inc: () => void
}

const useStore = create<Store>()((set) => ({  //create의 타입을 지정해줌
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })), //나머지는 js와 같다.
}))

function Counter() {
  const { count, inc } = useStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}
```

```.js
import {devtools}from "zustand/middleware" // 데브툴스 사용해서 디버깅 할 수 있다. (리덕스 데브툴스를 인스톨후 사용)
import {persist}from "zustand/middleware" // 로컬스토리지에 저장할 수 있다.
```
