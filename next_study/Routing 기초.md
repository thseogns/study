## Routing Fundamentals

tree: 계층 구조를 시각화하기 위한 규칙입니다. 예를 들어 부모 및 자식 컴포넌트가 있는 컴포넌트 트리, 폴더 구조 등이 있습니다.
Subtree: 트리의 일부로, 새 루트(첫 번째)에서 시작하여 잎(마지막)에서 끝나는 트리의 일부입니다.
root: 루트 레이아웃과 같은 트리 또는 하위 트리의 첫 번째 노드입니다.
Leaf: 하위 트리의 노드 중 자식이 없는 노드(예: URL 경로의 마지막 세그먼트)입니다..

&& 디렉터리 간 경로는 동일한 URL 경로로 확인되어서는 안 되며 충돌을 방지하기 위해 빌드 시간 오류가 발생.

폴더의 깊이가 segment가 되는듯?

파일 규칙
Next.js는 중첩된 경로에서 특정 동작을 하는 UI를 생성하기 위한 특수 파일 세트를 제공합니다:

page.js: 경로의 고유한 UI를 생성하고 경로를 공개적으로 액세스할 수 있도록 합니다.
route.js: 경로에 대한 서버 측 API 엔드포인트를 생성합니다.
layout.js: 세그먼트와 그 하위 세그먼트에 대한 공유 UI를 만듭니다. 레이아웃은 페이지 또는 하위 세그먼트를 래핑합니다.
template.js: 탐색에 새 컴포넌트 인스턴스가 마운트된다는 점을 제외하면 layout.js와 유사합니다. 이 동작이 필요하지 않으면 레이아웃을 사용하십시오.
loading.js: 세그먼트와 그 하위 세그먼트에 대한 로딩 UI를 생성합니다. loading.js는 페이지 또는 하위 세그먼트를 React 서스펜스 바운더리에서 래핑하여 로딩하는 동안 로딩 UI를 표시합니다.
error.js: error.js: 세그먼트와 그 자식에 대한 오류 UI를 생성합니다. error.js는 페이지 또는 자식 세그먼트를 React Error Boundary로 감싸고, 오류가 발생하면 오류 UI를 표시합니다.
global-error.js: error.js와 비슷하지만, 특히 루트 layout.js에서 오류를 포착하는 데 사용됩니다.
not-found.js: 경로 세그먼트 내에서 notFound 함수가 발생하거나 URL이 어떤 경로와도 일치하지 않을 때 표시되는 UI를 생성합니다.

새로고침 되지않는다. 경로찾는게 더 최적화 되어있다?

서버에서 가져온다.

두개이상의 페이지 함께보기 : 병렬
페이지 보면서 다른페이지 작업 : 가로채기
조건 걸기: 조건부

괄호안의 url은 경로에서 제외?(경로에 나타나지 않는다.)
layout 폴더 만들어서 각각 레이아웃 만들수 있다.

app
  layout.js   
  (괄호있는폴더)  
      layout.js   ->@/account  
      account  
          page.js  
      cart  
  layout.js     
 괄호업는폴더  
 layout.js   ->@/괄호없는폴더  
  page.js  
  
  괄호 없으면 그대로 경로표시된다는뜻
  괄호시 이름은 의미가없어짐.(경로에서 제외)
  괄호는 구분을 위한 표시의 기능이지 별다른 기능은 없다  
  
  layout을 사용시 최상위 주소의 위치가 조정됨
  
  동적 세그먼트(주소)
  값에 의해 동적으로 정의되는 주소는 [폴더이름] 안에 page  
  [...폴더이름]이 폴더의 경우 여러개의 주소를 포함  
  
  app/shop/[...slug]/page.js는  
  /shop/a 뿐만 아니라 /shop/a/b, /shop/a/b/c 등과도 일치합니다.  
  app/shop/[[...slug]]/page.js는  
  /shop/a , /shop/a/b, /shop/a/b/c  뿐만 아니라 /shop과도 일치합니다.  
  
  ### 타입 스크립트를 사용하면 경로 세그먼트마다 매개변수 유형을 추가할 수 있다.
  ```
    app/blog/[slug]/page.js	{ slug: string }  
app/shop/[...slug]/page.js	{ slug: string[] }  
app/[categoryId]/[itemId]/page.js	{ categoryId: string, itemId: string }  

  ```
  
