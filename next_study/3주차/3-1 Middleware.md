# Middleware

미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있습니다.  
그런 다음 들어오는 요청에 따라 요청 또는 응답 헤더를 재작성, 리디렉션,  
수정하거나 직접 응답하여 응답을 수정할 수 있습니다.
  
   Middleware사용하기
   1. 설치 
![image](https://user-images.githubusercontent.com/99688960/236353682-212427d5-0f80-4ef5-895a-77401046df1b.png)
  
  2. 미들웨어 파일 생성
프로젝트의 루트 디렉터리(앱 또는 페이지 디렉터리와 같은 수준)에 middleware.ts(또는 .js) 파일을 만듭니다.  
참고: src 디렉터리를 사용하는 경우 미들웨어 파일을 그 안에 넣으세요. ??

  3. 미들웨어 내보내기  

![image](https://user-images.githubusercontent.com/99688960/236355983-84ea55d3-55af-4a0c-8331-21374c816638.png)
   
   
   경로 일치
프로젝트의 모든 경로에 대해 미들웨어가 호출됩니다. 실행 순서는 다음과 같습니다: 

1. next.config.js 의 headers
2. next.config.js 의 redirects 
3. Middleware (rewrites, redirects, etc.)
4. next.config.js 의 전 파일들 (rewrites)
5. 파일 시스템 경로 (public/, _next/static/, Pages, etc.)
6. next.config.js 의 후의 파일들 (rewrites) 
7. 동적경로 (/blog/[slug])
8. next.config.js 의 fallback (rewrites)  

미들웨어가 실행될 경로를 정의하는 방법에는 두 가지가 있습니다:

1.사용자 지정 매처 구성  
2.조건문  
  
 ##  Matcher
matcher를 사용하면 특정 경로에서 실행할 미들웨어를 필터링할 수 있습니다.  
![image](https://user-images.githubusercontent.com/99688960/236357230-95eb86a7-d4c6-49be-a15a-edcdf898af45.png)   
배열 구문을 사용하여 단일 경로 또는 여러 경로를 일치시킬 수 있습니다:  
![image](https://user-images.githubusercontent.com/99688960/236357297-0ba22e20-24aa-4df2-9bdf-6de84f8b7dc9.png)  
matcher 구성은 전체 정규식을 허용하므로  negative lookaheads 또는 문자 일치와 같은 매칭이 지원됩니다. 특정 경로를 제외한 모든 경로를 일치시키는  negative lookaheads의 예는 여기에서 확인할 수 있습니다:

```
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```
참고:  matcher 값은 빌드 시 정적으로 분석할 수 있도록 상수여야 합니다. 변수와 같은 동적 값은 무시된다.  


matcher 구성  
1. 반드시 /로 시작해야 합니다.
2. 명명된 매개변수를 포함할 수 있습니다: /about/:ath matches  /about/a 및 /about/b와 일치하지만 /about/a/c와는 일치하지 않습니다.
3. 명명된 매개변수에 수정자를 포함할 수 있습니다(~로 시작): /about/:path*는 *가 0 이상이기 때문에 /about/a/b/c와 일치합니다. ?는 0 또는 1이고 +는 하나 이상입니다.
4. 괄호로 묶인 정규식을 사용할 수 있습니다: /about/(.*)는 /about/:path*와 동일합니다.
경로 정규식 문서에서 자세한 내용을 확인하세요.

참고: 이전 버전과의 호환성을 위해 Next.js는 항상 /public을 /public/index로 간주합니다. 따라서 /public/::path의 matcher가 일치합니다.

## 조건문  

![image](https://user-images.githubusercontent.com/99688960/236358365-b2b49c2d-f62f-42b9-ad22-43dce2720e9c.png)   

## NextResponse  
NextResponse API를 사용하면 다음을 수행할 수 있습니다:

1. 들어오는 요청을 다른 URL로 리디렉션합니다.
2. 지정된 URL을 표시하여 응답을 다시 작성합니다.
3. API 경로, getServerSideProps 및 재작성 대상에 대한 요청 헤더 설정
4. 응답 쿠키 설정
5. 응답 헤더 설정  

미들웨어에서 응답을 생성하려면 다음을 수행할 수 있습니다:

1. 응답을 생성하는 경로(페이지 또는 엣지 API 경로)로 재작성합니다.
2. NextResponse를 직접 반환합니다. 응답 생성하기를 참조하세요.

#### 쿠키 사용
쿠키는 일반 헤더입니다. 요청 시에는 쿠키 헤더에 저장됩니다. 응답 시에는 Set-Cookie 헤더에 저장됩니다. Next.js는 NextRequest 및 NextResponse의 쿠키 확장을 통해 이러한 쿠키에 액세스하고 조작할 수 있는 편리한 방법을 제공합니다.

들어오는 요청의 경우 쿠키에는 다음과 같은 메서드가 제공됩니다: get, getAll, 설정 및 삭제 쿠키. has를 사용하여 쿠키의 존재 여부를 확인하거나 clear를 사용하여 모든 쿠키를 제거할 수 있습니다.
발신 응답의 경우 쿠키에는 get, getAll, set, delete 메서드가 있습니다.  

  
  
middleware.ts
```
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  //  들어오는 요청에 "Cookie:nextjs=fast" 헤더가 있다고 가정합니다.
  // `RequestCookies` API를 사용하여 요청에서 쿠키 가져오기
  let cookie = request.cookies.get('nextjs')?.value;
  console.log(cookie); // => 'fast'
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]
 
  request.cookies.has('nextjs'); // => true
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs'); // => false
 
  // ResponseCookies` API를 사용하여 응답에 쿠키 설정하기
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast');
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/test',
  });
  cookie = response.cookies.get('vercel');
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/test' }
  // 발신 응답에는 `Set-Cookie:vercel=fast;path=/test` 헤더가 있습니다.
 
 
  return response;
}
```  
## Setting Headers  
NextResponse API를 사용하여 요청 및 응답 헤더를 설정할 수 있습니다(요청 헤더 설정은 Next.js v13.0.0부터 가능).  


middleware.ts  

```

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  // requestHeaders를 복제하고 새 헤더 `x-hello-from-middleware1`을 설정합니다.
  const request headers = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');
 
  // NextResponse.rewrite에서 request 헤더를 설정할 수도 있습니다.
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
 
  // 새 응답 헤더 `x-hello-from-middleware2`를 설정합니다.
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}


```
  
  Response 생성하기  
  미들웨어에서 Response 또는 NextResponse 인스턴스를 반환하여 직접 응답할 수 있습니다.   
  
  middleware.ts  
  ```
  import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@lib/auth';
 
// 미들웨어를 `/api/`로 시작하는 경로로 제한합니다.
export const config = {
  matcher: '/api/:function*',
};
 
export function middleware(request: NextRequest) {
  //  request 을 확인하려면 인증 기능을 호출하세요.
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } },
    );
  }
}
  ```  
  ### 고급 미들웨어 플래그 
  Next.js v13.1에서는 고급 사용 사례를 처리하기 위해  
   미들웨어에 대한 두 가지 추가 플래그인 skipMiddlewareUrlNormalize 및 skipTrailingSlashRedirect가 도입되었습니다.  
   
   
   skipTrailingSlashRedirect를 사용하면 후행 슬래시를 추가하거나 제거하기 위한 Next.js 기본 리디렉션을 비활성화하여 미들웨어 내부에서 사용자 지정 처리를 할 수 있으므로 일부 경로에는 후행 슬래시를 유지하지만 다른 경로에는 유지하지 않아 증분 마이그레이션을 쉽게 할 수 있습니다.  
   ![image](https://user-images.githubusercontent.com/99688960/236359734-af4f150e-f545-45b6-8474-f95ef8fa6997.png)  
   
   middleware.js
   ```
   
   const legacyPrefixes = ['/docs', '/blog'];
 
export default async function middleware(req) {
  const { pathname } = req.nextUrl;
 
  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }
 
  // 후행 슬레시 처리적용
  if (
    !pathname.endsWith('/') &&
    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
  ) {
    req.nextUrl.pathname += '/';
    return NextResponse.redirect(req.nextUrl);
  }
}

```  
skipMiddlewareUrlNormalize를 사용하면 Next.js가 수행하는 URL 정규화를 비활성화하여 직접 방문과 클라이언트 전환을 동일하게 처리할 수 있습니다.  
원본 URL을 사용하여 완전한 제어가 필요한 고급 사례가 있는데, 이 기능을 사용하면 잠금이 해제됩니다.
![image](https://user-images.githubusercontent.com/99688960/236359843-dae7e5e8-27e9-4057-8263-2915ae4d6c87.png)

middleware.js  
```
export default async function middleware(req) {
  const { pathname } = req.nextUrl;
 
  // GET /_next/data/build-id/hello.json
 
  console.log(pathname);
  // 이 플래그를 사용하면 이제 /_next/data/build-id/hello.json이 됩니다.
  // 플래그가 없으면 /hello로 정규화됩니다.
}
```
