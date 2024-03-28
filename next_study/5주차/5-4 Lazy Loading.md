# Lazy Loading (지연로딩)  
Next.js의 지연 로딩은 경로를 렌더링하는 데 필요한 JavaScript의 양을 줄여 애플리케이션의 초기 로딩 성능을 개선하는 데 도움이 됩니다.  


이를 통해 Client Components와 가져온 라이브러리의 로딩을 지연시키고 필요할 때만 Client Bundle에 포함할 수 있습니다.  
예를 들어 사용자가 클릭하여 모달을 열 때까지 로딩을 지연시키고 싶을 수 있습니다.

Next.js에서 지연 로딩을 구현하는 방법에는 두 가지가 있습니다:  

1.next/ dynamic과 함께 dynamic import 사용   
2.Suspense와 함께 React.lazy() 사용   
기본적으로 서버 컴포넌트는 자동으로 코드 분할되며, 스트리밍을 사용하여 서버에서 클라이언트로 UI 조각을 점진적으로 전송할 수 있습니다.   
지연 로딩은 클라이언트 컴포넌트에 적용됩니다.   


#### next/dynamic  

next/dynamic은 React.lazy()와 Suspense의 합성어입니다.  
앱과 페이지 디렉토리에서 동일한 방식으로 동작하여 점진적인 마이그레이션을 허용합니다.  

예제
#### 클라이언트 컴포넌트 import하기

``` .js
'use client';
 
import { useState } from 'react';
import dynamic from 'next/dynamic';
 
// Client Components:
const ComponentA = dynamic(() => import('../components/A'));
const ComponentB = dynamic(() => import('../components/B'));
const ComponentC = dynamic(() => import('../components/C'), { ssr: false });
 
export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false);
 
  return (
    <div>
      {/* Load immediately, but in a separate client bundle */}
      <ComponentA />
 
      {/* Load on demand, only when/if the condition is met */}
      {showMore && <ComponentB />}
      <button onClick={() => setShowMore(!showMore)}>Toggle</button>
 
      {/* Load only on the client side */}
      <ComponentC />
    </div>
  );
}
```
#### SSR 건너뛰기 
React.lazy() 및 Suspense를 사용할 때, 클라이언트 컴포넌트는 기본적으로 사전 렌더링(SSR)됩니다.  

클라이언트 컴포넌트에 대해 사전 렌더링을 사용하지 않으려면 ssr 옵션을 false로 설정하면 됩니다:  
```.tsx 
const ComponentC = dynamic(() => import('../components/C'), { ssr: false });
```
#### 서버 컴포넌트 import하기  

서버 컴포넌트를 동적으로 임포트하는 경우 서버 컴포넌트 자체가 아닌   
서버 컴포넌트의 자식인 클라이언트 컴포넌트만 지연 로드됩니다.  (자식이 지연된다. 본인x)
```.js
import dynamic from 'next/dynamic';
 
// Server Component:
const ServerComponent = dynamic(() => import('../components/ServerComponent'));
 
export default function ServerComponentExample() {
  return (
    <div>
      <ServerComponent />
    </div>
  );
}
```

#### 외부 라이브러리 로드  
외부 라이브러리는 import() 함수를 사용하여 필요에 따라 로드할 수 있습니다.  
이 예에서는 퍼지 검색을 위해 외부 라이브러리 fuse.js를 사용합니다. 이 모듈은 사용자가 검색 입력을 입력한 후에만 클라이언트에 로드됩니다.  
```.js
'use client';
 
import { useState } from 'react';
 
const names = ['Tim', 'Joe', 'Bel', 'Lee'];
 
export default function Page() {
  const [results, setResults] = useState();
 
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default;
          const fuse = new Fuse(names);
 
          setResults(fuse.search(value));
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
```
#### 사용자 정의 로딩 컴포넌트 추가  
```.js
import dynamic from 'next/dynamic';
 
const WithCustomLoading = dynamic(
  () => import('../components/WithCustomLoading'),
  {
    loading: () => <p>Loading...</p>,
  },
);
 
export default function Page() {
  return (
    <div>
      {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}
      <WithCustomLoading />
    </div>
  );
}
```  
#### 명명된 내보내기 가져오기
명명된 내보내기를 동적으로 가져오려면 import() 함수가 반환하는 Promise에서 반환하면 됩니다:  
![image](https://github.com/ddp-study/nextjs/assets/99688960/4365ce40-3a9c-415e-bdec-119e2ecffcd1)  

