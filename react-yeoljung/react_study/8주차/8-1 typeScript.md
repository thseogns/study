# typeScript
타입스크립트 개발환경을 우선지원?한다? (타입스크립트 지원이 내장돼있다.)  
에디터용 TypeScript 플러그인도 제공됩니다.  
https://youtu.be/pqMqn9fKEf8 <내장된 TS플러그인에 대한 유튜브 영상  

## 새 프로젝트

터미널

npx create-next-app@latest <이거쓰면 타입스크립트도 같이 깔림.  
파일 이름을 .ts/.tsx로 변경 한뒤 Run next dev 나 next build 하면 자동으로 타스가 깔린후 권장 구성 옵션이 포함된 tsconfig.json 파일을 추가한다.
#### TypeScript 플러그인
Next.js에는 사용자 지정 TypeScript 플러그인 및 유형 검사기가 포함되어 있으며,  
VSCode 및 기타 코드 편집기에서 고급 유형 검사 및 자동 완성을 위해 사용할 수 있습니다.  

  
TypeScript 파일을 열어 놓은 상태에서 next run dev하면? 실행하면 플러그인을 활성화하라는 메시지가 표시됩니다.  
![image](https://github.com/ddp-study/react/assets/99688960/16b1dfef-6186-4d91-8c5b-e446b9f30d05)  
  
  
  
위의 그림에 있는 프롬프트를 놓친 경우 다음과 같이 수동으로 플러그인을 활성화할 수 있다.

1.명령 팔레트 열기(Ctrl/⌘ + Shift + P)  
2."TypeScript"를 검색합니다: 타입스크립트 버전 선택"  
3."워크스페이스 버전 사용" 선택  
![image](https://github.com/ddp-study/react/assets/99688960/8724191c-6b05-423a-8f3e-b45ffb16af2f)  
이후엔 파일을 편집할 때 사용자 정의 플러그인이 활성화  
next build 를 실행할 때 사용자 정의 유형 검사기가 사용된다.  
또한 이 프로세스를 자동화할 수 있도록 VSCode 설정 파일을 자동으로 생성한다.  
#### ts플러그인 기능


세그먼트 구성 옵션에 대해 잘못된 값을 전달할 경우 경고.  
사용 가능한 옵션 및 컨텍스트 내 문서 표시.  
사용 클라이언트 지시어가 올바르게 사용되었는지 확인.  
클라이언트 훅(예: 사용 상태)이 클라이언트 컴포넌트에서만 사용되는지 확인합니다.   
## 정적으로 입력된 링크
Next.js는 링크를 정적으로 입력하여 next/link 사용 시 오타 및 기타 오류를 방지하고  
페이지 간 탐색 시 유형 안전성을 향상시킬 수 있습니다.(정적 입력해서 정해주기떄문에 안정성이 향상된다 라는뜻?)  
이 기능을 사용하려면 experimental..typedRoutes를 활성화해야 하며 프로젝트에서 TypeScript를 사용해야 합니다.(아래처럼 사용할 수 있다)  

![image](https://github.com/ddp-study/react/assets/99688960/e517abcb-b910-47f0-a1fa-2d30584bb50b)(예시)  
Next.js는 애플리케이션의 모든 기존 경로에 대한 정보가 포함된 link 정의를 .next/types에 생성하며,   
TypeScript는 이를 사용하여 편집기에서 유효하지 않은 링크에 대한 피드백을 제공할 수 있습니다.  
(기존 경로에 대한 정보를 저장하고 ts는 그것을 이용해서 유요하지 않은 링크에 대한 경고? 를 할 수 있는듯)  
  
  
  
현재 실험적으로 지원되는 문자열에는 동적 세그먼트를 포함한 모든 문자열 리터럴이 포함됩니다.  
리터럴이 아닌 문자열의 경우 현재로서는 href를 Route로 수동으로 캐스팅해야 합니다:  
```.ts 
import type { Route } from 'next';
import Link from 'next/link'
 
// No TypeScript errors if href is a valid route
<Link href="/about" />
<Link href="/blog/nextjs" />
<Link href={`/blog/${slug}`} />
<Link href={('/blog' + slug) as Route} />
 
// TypeScript errors if href is not a valid route
<Link href="/aboot" />
```  

next/link를 래핑하는 사용자 정의 컴포넌트에서 href를 허용하려면 제네릭을 사용합니다:  
![image](https://github.com/ddp-study/react/assets/99688960/ddaccf53-299e-45b1-9f0e-60877d06227b)  
#### 작동 방식  

next dev , next build 실행 ->  Next.js가 모든 기존경로의 정보가 있는 .d.ts 파일을 .next폴더내에 생성(이파일은 tsconfig.json에 포함)  
-> ts가 .d.ts를 검사하여 경로에대한 유효성을 검사한다. -> 사용자에게 피드백 제공  
  
  
#### End-to-End Type Safety  
next.js 13버전은 안정성이 강화되었습니다.  
@직렬화: 데이터를 사용하기 위해 변환하는것???  


fetching 함수와 page 사이에 데이터 직렬화가 없습니다: 서버의 컴포넌트, 레이아웃, 페이지에서 직접 가져올 수 있습니다.  
 이 데이터는 React에서 사용하기 위해 클라이언트 측으로 전달하기 위해 직렬화(문자열로 변환)할 필요가 없습니다.   
 
대신 앱이 기본적으로 서버 컴포넌트를 사용하기 때문에 추가 단계 없이 날짜, 맵, 세트 등의 값을 사용할 수 있습니다.  
이전에는 서버와 클라이언트 사이의 경계를 Next.js 전용 타입으로 수동으로 입력해야 했습니다.(대신 변환해 주어 변환할 필요가 없다.)  

이제 Next.js의 데이터 Fetching은 데이터베이스 또는 콘텐츠 제공업체 선택에 대한 규범적 제한 없이 가능한 end-to-end type safety 을 제공합니다.
end-to-end type safety => 보안에 관한것?

일반적인 타입스크립트에서 예상할 수 있는 대로 응답 데이터를 입력할 수 있습니다. 예를 들어  
```.tsx 
async function getData() {
  const res = await fetch('https://api.example.com/...');
 // 반환값은 *직렬화되지* 않습니다.
  // 날짜, 맵, 세트 등을 반환할 수 있습니다.
  return res.json();
}
 
export default async function Page() {
  const name = await getData();
 
  return '...';
  
}   
  ```  
완벽한 end-to-end type safety를 위해서는 데이터베이스 또는 콘텐츠 제공업체가 TypeScript를 지원해야 합니다 .    
이는 ORM 또는 유형 안전 쿼리 빌더를 사용하는 것을 통해 이루어질 수 있습니다.   

#### 비동기 서버 컴포넌트 타입스크립트 오류
비동기 서버 컴포넌트가 사용된 곳에서 ```'Promise<Element>'```가 유효한 JSX 엘리먼트 유형이 아니라는 오류를 발생시킵니다.(비동기서버 컴포넌트가 사용된 곳에서 발생하는 오류)    
이는 TypeScript의 알려진 문제이며 업스트림에서 작업 중입니다.  
임시 해결 방법으로 컴포넌트 위에 {/* @ts-expect-error Async Server Component */} 를 추가하여 해당 컴포넌트에 대한 유형 검사를 비활성화할 수 있습니다. (이렇게하면 검사를 비활성화)    

##### 예시  
  ![image](https://github.com/ddp-study/react/assets/99688960/224101cd-9417-42f1-96ce-c91a7478bc93)   
  

#### 서버와 클라이언트 컴포넌트 사이에 데이터 전달  
  

props를 통해 서버와 클라이언트 컴포넌트 사이에 데이터를 전달할 때에도 데이터를 브라우저에서 사용할 수 있도록 데이터가 직렬화(문자열로 변환)됩니다.  
  하지만 특별한 유형이 필요하지 않습니다.   
  컴포넌트 간에 다른 프로퍼티를 전달할 때와 동일한 유형으로 전달됩니다.

또한 렌더링되지 않은 데이터는 서버와 클라이언트 사이에서 이동?하지 않으므로(서버에 남아 있음) 직렬화할 코드가 더 적습니다.  
  이 기능은 이제 서버 컴포넌트 지원을 통해서만 가능합니다.(렌더링 안된 데이터는 직렬화 안댐(서버에 있어서) 따라서 효율적)  
(Next.js는 tsconfig.json "경로" 및 "baseUrl" 옵션을 자동으로 지원합니다.)  
 #### next.config.js 유형 검사
다음.config.js 파일은 바벨이나 타입스크립트에서 구문 분석되지 않으므로 자바스크립트 파일이어야 하지만,  
아래 와 같이 JSDoc을 사용하여 IDE에서 타입 검사를 추가할 수 있습니다:  
![image](https://github.com/ddp-study/react/assets/99688960/a6ce121f-a680-48e6-8b03-80fc4dbef44c)  
#### TypeScript 오류 무시
프로젝트에 TypeScript 오류가 있는 경우 Next.js는 프로덕션 빌드( Next build)에 실패합니다.  

애플리케이션에 오류가 있는 경우에도 Next.js가 프로덕션 코드를 위험하게 생성하지 않게 하려면  
기본 제공 유형 검사 단계를 비활성화할 수 있습니다.(않게하려면?)  

비활성화할 경우 빌드 또는 배포 프로세스의 일부로서 유형 검사를 실행해야 하며,  
그렇지 않으면 매우 위험할 수 있습니다.  

next.config.js를 열고 타입스크립트 구성에서 ignoreBuildErrors 옵션을 활성화하세요:  

  

 ``` .js
 
 module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
```
  

