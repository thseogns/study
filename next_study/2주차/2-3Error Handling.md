# Error 다루기  

1. Route 세그먼트와 그 중첩된 자식들을 React 에러 바운더리에서 자동으로 래핑합니다.
2. 파일 시스템 계층 구조를 사용하여 특정 세그먼트에 맞춘 오류 UI를 생성하여 세분성을 조정할 수 있습니다.
3. 앱의 나머지 기능은 유지하면서 영향을 받는 세그먼트에 대한 오류를 격리합니다.
4. 전체 페이지를 다시 로드하지 않고 오류에서 복구를 시도하는 기능을 추가합니다.

 #### 만들기 
라우트 세그먼트에 error파일을 만든다(오류를 나타내는 ui생성)

  
  
  ```
  'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
```

#### 에러의 작동방식  
폴백?
React Error Boundary생성 -> error.js에서 보낸 react컴포넌트가 fallback컴포넌트로 사용 -> error경계 내에서 error발생시 fallback컴포넌트 렌더링 -> 오류 복구

오류 복구
오류의 원인은 일시적인 것일 수 있습니다. 이러한 경우 다시 시도하면 문제가 해결될 수 있습니다.  

오류 컴포넌트는 reset() 함수를 사용하여 사용자에게 오류에서 복구를 시도하라는 메시지를 표시할 수 있습니다. 
이 함수가 실행되면 오류 경계의 내용을 다시 렌더링하려고 시도합니다. 성공하면 폴백 오류 컴포넌트가 다시 렌더링한 결과로 대체됩니다.  

app/dashboard/error.tsx
```
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

error.js가 미치는 범위?
1. 중첩된 모든 하위 세그먼트(경로의 중첩된 폴더에서 error 파일을 서로다른 레벨에 배치하면 다소 세분화된 오류UI를 구현할 수 있다.)
2. 오류 경계가 해당 레이아웃 컴포넌트 내부에 중첩되어 있기 때문에 error.js 경계는 동일한 세그먼트의 layout.js 컴포넌트에서 발생한 오류를 처리하지 않습니다.  


  layout.js 또는 template.js 컴포넌트에서 발생한 오류를 포착하려면 특정 레이아웃 상위 세그먼트에 error.js파일을 배치해야 한다  
  루트 레이아웃 또는 템플릿 내에서 오류를 처리하려면 global-error.js라는 error.js의 변형을 사용합니다.
    
    error
데이터 Fetch 실패시 화면으로 사용됩니다
반드시 Clilent Component 로 만들어야 합니다.
props로 error, reset() 을 기본적으로 전달받습니다. reset() 함수를 통해 오류 복구를 시도 할 수 있습니다.
그러나 루트 레이아웃의 오류를 처리해주지는 않습니다. 그래서 /app/global-error.js 를 만들어서 전역 에러 바운더리를 설정해주어야 합니다.
![image](https://user-images.githubusercontent.com/99688960/235056569-a67b65c6-4594-4876-92a7-41941a6bb0ec.png)
  global-error.js는 자체 <html> 및 <body> 태그를 정의해야 한다는 점에 유의해야 합니다.
  
  ```
  app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```
서버 오류 처리
데이터 불러오기 중 또는 서버 컴포넌트 내부에서 오류가 발생하면 Next.js는 결과 오류 객체를  
오류 프로퍼티로 가장 가까운 error.js 파일로 전달합니다.

Next dev를 실행하면 서버에서 발생한 오류가 클라이언트 error.js로 전달, 오류가 직렬화 된다? (차례로 실행?)
