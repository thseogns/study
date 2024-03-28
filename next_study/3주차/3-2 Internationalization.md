# Internationalization 
Next.js를 사용하면 여러 언어를 지원하도록 콘텐츠 라우팅 및 렌더링을 구성할 수 있습니다.  
사이트를 다양한 로캘에 맞게 조정하려면 번역된 콘텐츠(로컬라이제이션)와 국제화된 경로가 포함됩니다.  


용어  
locale: 언어 및 서식 기본 설정 집합에 대한 식별자입니다. 여기에는 일반적으로 사용자가 선호하는 언어와 해당 지역이 포함됩니다.  
    en-US: 미국에서 사용되는 영어  
    nl-NL: 네덜란드에서 사용되는 네덜란드어  
    nl: 네덜란드어, 특정 지역 없음  

Routing Overview   
브라우저에서 사용자의 언어 기본 설정을 사용하여 사용할 언어를 선택하는 것이 좋습니다.   
기본 언어를 변경하면 애플리케이션으로 들어오는 Accept-Language 헤더가 수정됩니다.   

예를 들어 다음 라이브러리를 사용하면 수신 요청을 살펴보고 헤더, 지원하려는 locale 기본 locale에 따라 선택할 locale을 결정할 수 있습니다.  
![image](https://user-images.githubusercontent.com/99688960/236365676-790d1f6f-6d35-4dec-88bd-56504638c60a.png)   
라우팅은 하위 경로(/fr/products) 또는 도메인(my-site.fr/products)을 통해 국제화할 수 있습니다.  
이 정보를 사용하면 이제 미들웨어 내부의 locale에 따라 사용자를 리디렉션할 수 있습니다.  
  
  
middleware.js
 ```
 
 import { NextResponse } from 'next/server'
 
let locales = ['en-US', 'nl-NL', 'nl']
 
// 위와 유사하게 또는 라이브러리를 사용하여 기본 로케일을 가져옵니다.
function getLocale(request) { ... }
 
export function middleware(request) {
  // 경로명에 지원되는 로캘이 있는지 확인합니다.
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
 
  // 로캘이 없는 경우 리디렉션
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
 
    // 예: 수신 요청이 /products인 경우
    // 이제 새 URL은 /en-US/products입니다.
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
```  
마지막으로 app/ 내의 모든 특수 파일이 app/[lang] 아래에 중첩되도록 합니다.   
이렇게 하면 Next.js 라우터가 경로에서 다양한 로캘을 동적으로 처리하고 모든 레이아웃과 페이지에 lang 매개 변수를 전달할 수 있습니다.  
예를 들어  

  
  app/[lang]/page.js
  ```
  // 이제 현재 로캘에 액세스할 수 있습니다.
//예: /en-US/products -> `lang`은 "en-US"
export default async function Page({ params: { lang } }) {
  return ...
}
  ```   
  루트 레이아웃은 새 폴더(예: app/[lang]/layout.js)에 중첩할 수도 있습니다.   
  
  
  #### 현지화  
  
  
사용자가 선호하는 로캘에 따라 표시되는 콘텐츠를 변경하는 것, 즉 로컬라이제이션은 Next.js에만 국한된 것이 아닙니다.  
아래에 설명된 패턴은 모든 웹 애플리케이션에서 동일하게 작동합니다.  

애플리케이션 내에서 영어와 네덜란드어 콘텐츠를 모두 지원하고자 한다고 가정해 보겠습니다.  
일부 키에서 현지화된 문자열로의 매핑을 제공하는 객체인 두 개의 서로 다른 "dictionaries"을 유지할 수 있습니다.  
예를 들어  
![image](https://user-images.githubusercontent.com/99688960/236366275-c520c8c6-55e2-433c-9e42-23f33e320bb3.png)
  
  그런 다음 요청된 로캘에 대한 번역을 로드하는 getDictionary 함수를 만들 수 있습니다:  
![image](https://user-images.githubusercontent.com/99688960/236366343-044dea6c-87ec-45cf-8b29-b85a8f8428b3.png)  
현재 선택된 언어가 주어지면 레이아웃이나 페이지 내에서 사전을 가져올 수 있습니다.   
![image](https://user-images.githubusercontent.com/99688960/236366370-22a8df95-01bc-469f-9567-57c7a2510b57.png)  
앱/디렉토리의 모든 레이아웃과 페이지는 기본적으로 서버 컴포넌트를 사용하므로 번역 파일의 크기가 클라이언트 측 JavaScript 번들 크기에 영향을 미치는 것에 대해 걱정할 필요가 없습니다.  
이 코드는 오직 서버에서만 실행되며 결과 HTML만 브라우저로 전송됩니다.  
#### 정적 생성
특정 로캘 집합에 대한 정적 경로를 생성하려면 페이지 또는 레이아웃에 generateStaticParams를 사용할 수 있습니다.  
예를 들어 루트 레이아웃에서 전역으로 사용할 수 있습니다:  
![image](https://user-images.githubusercontent.com/99688960/236366540-cdd06d59-8402-40c6-9780-2c246030cebd.png)




