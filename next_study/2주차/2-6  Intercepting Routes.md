# Intercepting Routes

경로 가로채기
경로 가로채기를 사용하면 브라우저 URL을 마스킹하면서 현재 레이아웃 내에서 새 경로를 로드할 수 있으므로 현재 페이지의 컨텍스트를 유지하는 것이 중요할 때 유용합니다.  
예를 들어, 하나의 작업을 편집하는 동안 모든 작업을 보거나 사이드 모달에서 카트를 열거나 피드에서 사진을 펼칠 수 있습니다.  

규칙
상대 경로 ../와 유사하게 (..) 규칙을 사용하여 가로채기 경로를 정의할 수 있습니다.  
(...) 규칙을 사용하여 앱 디렉터리를 기준으로 경로를 만들 수도 있습니다. 

```
[feed]
├── (..)photo/[id]
│   └── page.tsx
└── layout.tsx
photo/[id]
├── page.tsx
└── layout.tsx

```
위의 예에서 사용자 피드에서 사진을 클릭하면 클라이언트 측 탐색을 사용하여 사진이 열립니다.   
그러나 페이지를 새로 고치거나 공유하면 기본 레이아웃 및 페이지로 사진이 로드됩니다.  

  
  모달
인터셉팅 경로를 병렬 경로와 함께 사용하여 모달을 만들 수 있습니다.

모달을 만들 때 다음과 같은 몇 가지 일반적인 문제를 알고 있어야 하는 경우가 많습니다:

1. URL을 통해 모달에 액세스할 수 없는 경우
2. 페이지가 새로고침될 때 모달이 닫히는 경우.
3. 모달 뒤의 경로가 아닌 이전 경로로 이동하는 뒤로 탐색.
4. 모달을 다시 열지 않는 앞으로 탐색.
5. 경로를 가로채면 URL을 통해 모달 콘텐츠를 공유할 수 있도록 하고, 페이지를 새로 고칠 때 컨텍스트가 손실되지 않도록 하며,  
6. 뒤로 및 앞으로 탐색을 통해 모달을 닫았다가 다시 여는 등 모달을 만들 때 발생할 수 있는 문제를 해결할 수 있습니다.
```
shop
├── @products
│   └── page.tsx
├── @modal/(..)cart
│   └── page.tsx
└── layout.tsx
cart
├── page.tsx
└── layout.tsx
```
  
  위의 예에서 제품 페이지에서 카트 버튼을 클릭하면 카트가 모달로 열립니다.  
  그러나 카트는 결제 시와 같이 고유한 경로와 레이아웃에서도 액세스할 수 있습니다.
