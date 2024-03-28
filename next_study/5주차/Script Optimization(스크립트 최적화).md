# Script Optimization
스크립트 컴포넌트란?? :https://themarketer.tistory.com/82
### layout scriptㅣ
여러 경로에 대한 third-party script를 로드하려면 next/script를  
가져와서 레이아웃 컴포넌트에 직접 스크립트를 포함하세요:  


```app/dashboard/layout.tsx
import Script from 'next/script';
 
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://example.com/script.js" />
    </>
  );
}
``` 
third-party script는 사용자가 폴더 경로(예: dashboard/page.js) 또는  
중첩된 경로(예: dashboard/settings/page.js)에 액세스할 때 가져옵니다.??  
Next.js는 사용자가 동일한 레이아웃에서 여러 경로를 탐색하는 경우에도 스크립트가 한 번만 load되도록 합니다. (스크립트  

### Application Scripts  

모든 경로에 대해 third-party script를 로드하려면 next/script를 가져와서 루트 레이아웃에 직접 스크립트를 포함하세요:  
``` app/layout.tsx

TypeScript

import Script from 'next/script';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  );
}  
```  
이 스크립트는 애플리케이션의 모든 경로에 액세스할 때 로드되고 실행됩니다.  
Next.js는 사용자가 여러 페이지 사이를 이동하더라도 스크립트가 한 번만 로드되도록 합니다.  

권장 사항: 성능에 대한 불필요한 영향을 최소화하기 위해 특정  
페이지나 레이아웃에만 third-party script를 포함시키는 것이 좋습니다.  

### Strategy   
strategy  
next/script의 기본 동작을 사용하면 모든 페이지 또는 레이아웃에서 third-party scripts를 로드할 수 있지만, strategy property를 사용하여 로드 동작을 미세 조정할 수 있습니다:  
     ``` 하이드레이션이란?: https://helloinyong.tistory.com/315 ```
 
beforeInteractive: Next.js 코드 이전과 페이지 하이드레이션이 발생하기 전에 스크립트를 로드합니다.(하이드레이션 발생전)  
afterInteractive: (기본값) 스크립트를 일찍 로드하지만 페이지에 일부 하이드레이션이 발생한 후에 로드합니다.(발생후)  
lazyOnload: 브라우저 유휴 시간 동안 스크립트를 나중에 로드합니다.(유휴시간?)  
worker: (실험적) 웹 워커에서 스크립트를 로드합니다.  

### 웹 워커에 스크립트 오프로드 (실험적)  
Worker strategy 을 사용하는 스크립트는 Partytown과 함께 Web Worker에서 오프로드되어 실행됩니다. 이렇게 하면 메인 스레드를 나머지 애플리케이션 코드에 전용하여 사이트의 성능을 향상시킬 수 있습니다. 
Worker strategy 을 사용하는 스크립트는 Partytown과 함께 Web Worker에서 오프로드 되고 실행됩니다.  
이렇게 하면 메인 스레드를 나머지 애플리케이션 코드에 할당하여 사이트 성능을 향상시킬 수 있습니다.  

이 전략은 아직 실험 단계이며 next.config.js에서 nextScriptWorkers 플래그가 활성화된 경우에만 사용할 수 있습니다:  (실험단계란다.)
![image](https://github.com/ddp-study/nextjs/assets/99688960/ac0dbc05-189c-40c8-8367-16f532eb4556)  
그런 다음 Next.js를 실행하면(일반적으로 npm run dev 또는 yarn dev) 필요한 패키지를 설치하는 과정을 안내하여 설정을 완료할 수 있습니다:   
  
    
    
다음과 같은 지침이 표시됩니다: npm install @builder.io/partytown을 실행하여 Partytown을 설치하세요.  

설치가 완료되면 전략="worker" 설정을 통해 애플리케이션에서 자동으로 파티타운을 인스턴스화하고 스크립트를 웹 워커로 오프로드합니다.  
![image](https://github.com/ddp-study/nextjs/assets/99688960/f91cd9a3-1aba-4355-8924-0a4eb89e45da)  

### Inline Scripts  
인라인 스크립트
Inline Scripts 또는 외부 파일에서 로드되지 않은 스크립트도 스크립트 컴포넌트에서 지원됩니다.  
중괄호 안에 JavaScript를 배치하여 작성할 수 있습니다:  
``` 
<Script id="show-banner">
  {`document.getElementById('banner').classList.remove('hidden')`}
</Script>
``` 
또는 위험하게 SetInnerHTML 속성을 사용합니다:  
```
<Script
  id="show-banner"
  dangerouslySetInnerHTML={{
    __html: `document.getElementById('banner').classList.remove('hidden')`,
  }}
/>
```  
경고: Next.js가 스크립트를 추적하고 최적화하려면 인라인 스크립트에 id 속성을 할당해야 합니다.  
  #### 추가 코드 실행
이벤트 핸들러는 스크립트 컴포넌트와 함께 특정 이벤트가 발생한 후 추가 코드를 실행하는 데 사용할 수 있습니다:

onLoad: 스크립트 로딩이 완료된 후 코드를 실행합니다.  
onReady: 스크립트 로딩이 완료된 후 컴포넌트가 마운트될 때마다 코드를 실행합니다.  
onError: 스크립트 로딩에 실패하면 코드를 실행합니다.  
이러한 핸들러는 다음/스크립트를 임포트하여 코드의 첫 줄에 "use client"가 정의된 클라이언트 컴포넌트 내부에서 사용할 때만 작동합니다:



![image](https://github.com/ddp-study/nextjs/assets/99688960/cdec45b1-adcf-4084-a150-d34b720786fc)  
#### 추가 속성
논스 또는 사용자 정의 데이터 속성처럼 스크립트 컴포넌트에서 사용하지 않는  
<script> 요소에 할당할 수 있는 DOM 속성이 많이 있습니다. 추가 속성을 포함하면 HTML에   
 포함된 최적화된 최종 <script> 요소로 자동으로 전달됩니다.  
 ![image](https://github.com/ddp-study/nextjs/assets/99688960/ad95dd8d-26a1-4b02-a7f1-2680ee960751)  
 





