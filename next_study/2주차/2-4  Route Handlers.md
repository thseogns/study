# Route Handlers

라우트 핸들러를 사용하면 웹 요청 및 응답 API를 사용하여 지정된 라우트에 대한 사용자 지정 요청 핸들러를 만들 수 있습니다.


1.라우트 핸들러는 앱 디렉토리 내에서만 사용할 수 있습니다.  
2.라우트 핸들러는 페이지 디렉터리 내의 API 경로와 동일하므로 API 경로와 라우트 핸들러를 함께 사용할 필요가 없습니다.

```
app/api/route.ts
export async function GET(request: Request) {}
```
  
  라우트 핸들러는 page.js 및 layout.js와 유사하게 앱 디렉터리 내에 중첩될 수 있습니다.  
  하지만 page.js와 동일한 경로 세그먼트 level에는 route.js 파일이 있을 수 없습니다.???  
  
    지원되는 HTTP 메서드
    
    지원되는 HTTP 메서드는 다음과 같습니다: GET, POST, PUT, PATCH, DELETE, HEAD 및 OPTIONS.  
    지원되지 않는 메서드가 호출되면 Next.js는 405 메서드 허용되지 않음 응답을 반환합니다  
   
## 동작
  Extended NextRequest and NextResponse APIs
 ####  정적 라우트 핸들러
라우트 핸들러는 기본적으로 response 객체와 함께 GET 메서드를 사용할 때 정적으로 평가됩니다 

```
app/items/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data })
}

```

##### 동적 라우트 핸들러
라우트 핸들러는 다음과 같은 경우에 동적으로 평가됩니다:  
  
1.GET 메서드와 함께 Request 객체를 사용하는 경우.
2.다른 HTTP 메서드를 사용하는 경우.
3.쿠키 및 헤더와 같은 동적 함수를 사용하는 경우.
  
  
예를 들어

```
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  });
  const product = await res.json();

  return NextResponse.json({ product })
}
```

page.js와 같은 경로에 route.js 파일이 있을 수 없습니다.

```
Page               	Route           	Result
app/page.js        	app/route.js	    ❌ Conflict
app/page.js        	app/api/route.js	✅ Valid
app/[user]/page.js	app/api/route.js	✅ Valid
```
  
```
// `app/page.js`
export default 함수 Page() {
  return <h1>Hello, Next.js!</h1>;
}

// ❌ 충돌 (주소가 겹친다.)
// `app/route.js`
export async 함수 POST(request) {}
```  
다음 예제는 라우트 핸들러를 다른 Next.js API 및 기능과 결합하는 방법을 보여줍니다.  
 next.revalidate 옵션을 사용하여 스태틱 데이터 fetch 유효성을 재검증할 수 있습니다:   
    
    
 app/items/route.ts  
```   

import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    next: { revalidate: 60 } // 60초마다 재검증
  });
  const data = await res.json();

  return NextResponse.json(data)
}
```

```
export const revalidate = 60;
```  

동적 함수
라우트 핸들러는 쿠키 및 헤더와 같은 Next.js의 동적 함수와 함께 사용할 수 있습니다.  
  
  Cookies
next / headers의 Cookies로 Cookies를 읽을 수 있습니다. 이 서버 함수는 Route Handler에서 직접 호출하거나 다른 함수 내부에 중첩할 수 있습니다.

이 Cookie 인스턴스는 읽기 전용입니다. 쿠키를 설정하려면 Set-Cookie 헤더를 사용하여 새 응답을 반환해야 합니다.

  
  ```
  app/api/route.ts
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}` }
  });
}
```
app/api/route.ts
```

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
}
```
header
next/headers에서 headers로 headers를 읽을 수 있습니다.  
이 서버 함수는 라우트 핸들러에서 직접 호출하거나 다른 함수 내부에 중첩할 수 있습니다.

이 헤더 인스턴스는 읽기 전용입니다. 헤더를 설정하려면 새 헤더가 포함된 새 응답을 반환해야 합니다.  

app/api/route.ts

```
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = headers();
  const referer = headersList.get('referer');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'referer': referer }
  });
}
```
(헤더?? 쿠키??)
또는 기본 웹 API 위에 추상화를 사용하여 헤더를 읽을 수 있습니다(NextRequest):  
```
app/api/route.ts
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
}
```

#### Dynamic Route Segments (동적경로 세그먼트)  
라우트 핸들러 동적 세그먼트 사용할 수있다.
app/items/[slug]/route.js
```
export async function GET(request: Request, { params }: {
  params: { slug: string }
}) {
  const slug = params.slug; // 'a', 'b', or 'c'
}
```
  
  Non-UI Responses  
  라우트 핸들러를 사용하여 UI가 아닌 콘텐츠를 반환할 수 있습니다. 
  sitemap.xml, robots.txt, favicon.ico, 오픈 그래프 이미지에는 모두 SEO 지원이 내장되어 있다는 점에 유의하세요
  ```
  export async function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Next.js Documentation</title>
  <link>https://nextjs.org/docs</link>
  <description>The React Framework for the Web</description>
</channel>

</rss>`);
}
  
  세그먼트 구성 옵션
  
  ```
  app/items/route.ts
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

라우트 핸들러는 페이지 및 레이아웃과 동일한 라우트 세그먼트 구성을 사용합니다.??
  ```
