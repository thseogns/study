# Metadata 

#### Dynamic Image Generation(동적이미지 생성)  
ImageResponse 생성자를 사용하면 JSX 및 CSS를 사용하여 동적 이미지를 생성할 수 있습니다.  
이는 오픈 그래프 이미지, 트위터 카드 등과 같은 소셜 미디어 이미지를 생성할 때 유용합니다.  

  
    
    
ImageResponse은 Edge Runtime(클라이언트측에서 실행되는 js코드?)을 사용하며, Next.js는 엣지에서 캐시된  
이미지에 올바른 헤더를 자동으로 추가하여 성능을 개선하고 재계산을 줄입니다.  
이를 사용하려면 next/server에서 ImageResponse를 임포트하면 됩니다:  
![image](https://github.com/ddp-study/nextjs/assets/99688960/190daf27-be19-46f5-be17-95d2441d2668)   
ImageResponse는 라우트 핸들러 및 파일 기반 메타데이터를 포함한 다른 Next.js API와 잘 통합됩니다. 예를 들어,  
opengraph-image.tsx 파일에서 ImageResponse를 사용하여  
빌드 시점에 또는 요청 시점에 동적으로 오픈 그래프 이미지를 생성할 수 있습니다.
#### 스타일링
ImageResponse는 Flexbox 및 absolute positioning, custom fonts, text wrapping,  
centering, nested images등 일반적인 CSS 속성을 지원합니다. 지원되는 CSS 속성 전체 목록을 참조하세요.  


#### 알아두면 좋습니다:  

1.ImageResponse는 @vercel/og, Satori, Resvg를 사용하여 HTML과 CSS를 PNG로 변환합니다.  
2.엣지 런타임만 지원됩니다. 기본 Node.js 런타임은 작동하지 않습니다.  
3.플렉스박스와 CSS 속성의 하위 집합만 지원됩니다. 고급 레이아웃(예: 표시: 그리드)은 작동하지 않습니다.  
4.최대 번들 크기는 500KB입니다. 번들 크기에는 JSX, CSS, 글꼴, 이미지 및 기타 모든 자산이 포함됩니다.  
제한을 초과하는 경우 에셋의 크기를 줄이거나 런타임에 가져오는 것을 고려하세요.  
5.글꼴 형식은 ttf, otf, woff만 지원됩니다. 글꼴 구문 분석 속도를 최대화하려면 woff보다 ttf 또는 otf가 선호됩니다.  

#### SEO
Next.js를 사용하면 레이아웃이나 페이지에서 명시적인 메타데이터 구성을 통해  
메타데이터(예: HTML 헤드 요소 내부의 메타 및 링크 태그)를 정의할 수 있습니다.  


예시  

생성 메타데이터를 통한 정적 메타데이터와 동적 메타데이터는 모두 서버 컴포넌트에서만 지원됩니다.  
Static Metadata(정적 메타데이터)  
![image](https://github.com/ddp-study/nextjs/assets/99688960/d0e9afe8-ea71-4ef6-8412-fa5f7b4192a3)  
Dynamic Metadata(동적 메타데이터)   
생성 메타데이터를 사용하여 동적 값이 필요한 메타데이터를 가져올 수 있습니다.  
![image](https://github.com/ddp-study/nextjs/assets/99688960/41668b21-cff6-4d37-8fb4-d0f3dd52aaf6)  
경로를 렌더링할 때 Next.js는 generateMetadata, generateStaticParams, Layouts, Pages, Server Components.에서  
동일한 데이터에 대한 가져오기 요청을 자동으로 중복 제거합니다. 불러오기를 사용할 수 없는 경우 React 캐시를 사용할 수 있습니다.
Next.js는 클라이언트에 UI를 스트리밍하기 전에 generateMetadata 내부의 데이터 불러오기가 완료될 때까지 기다립니다.   
이렇게 하면 스트리밍된 응답의 첫 부분에 <head> 태그가 포함되도록 보장합니다.  
  
  
##### JSON-LD
JSON-LD는 검색 엔진이 콘텐츠를 이해하는 데 사용할 수 있는 구조화된 데이터 형식입니다.  
예를 들어 person,  event,  organization,movie,  book, recipe 및 기타 여러 유형의 개체를 설명하는 데 사용할 수 있습니다. (설명한다고???)

현재 JSON-LD에 대한 권장 사항은 레이아웃.js 또는 페이지.js 컴포넌트에서 구조화된 데이터를 <script> 태그로 렌더링하는 것입니다. 예를 들어  
  ``` 
  export default async function Page({ params }) {
  const product = await getProduct(params.id);
 
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  };
 
  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  );
}
  ```  
  Google용 Rich Results Test 또는 일반 Schema Markup Validator를 사용하여  
  구조화된 데이터의 유효성을 검사하고 테스트할 수 있습니다.

schema-dts와 같은 커뮤니티 패키지를 사용하여 TypeScript로 JSON-LD를 입력할 수 있습니다:  
  ```
  import { Product, WithContext } from 'schema-dts';
 
const jsonLd: WithContext<Product> = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Next.js Sticker',
  image: 'https://nextjs.org/imgs/sticker.png',
  description: 'Dynamic at the speed of static.',
};
  ```  
  

 

