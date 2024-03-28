# Parallel Routes  
병렬 경로를 사용하면 독립적으로 탐색할 수 있는 하나 이상의 페이지를 동일한 보기에서 동시에 렌더링할 수 있습니다.    
소셜 사이트의 대시보드 및 피드와 같이 앱에서 매우 동적인 섹션의 경우 병렬 경로를 사용하여 복잡한 라우팅 패턴을 구현할 수 있습니다.  

규칙
병렬 경로는 명명된 슬롯을 사용하여 생성됩니다. 슬롯은 @폴더 규칙으로 정의됩니다.

예를 들어, 다음 파일 구조는 비디오 분석 대시보드에 대한  
두 개의 명시적 슬롯인 @audience 및 @views를 정의합니다:
```
dashboard
├── @audience
│   ├── demographics
│   │   └── page.js
│   ├── subscribers
│   │   └── page.js
│   └── page.js
├── @views
│   ├── impressions
│   │   └── page.js
│   ├── view-duration
│   │   └── page.js
│   └── page.js
├── layout.js
└── page.js
```

위의 폴더 구조는 이제 레이아웃 컴포넌트에서 @audience 및 @views   
슬롯을 소품으로 받아들이고 하위 소품과 함께 병렬로 렌더링할 수 있다는 의미입니다:

```
app/dashboard/layout.tsx
function AudienceNav() {
  return <nav>...</nav>;
}

function ViewsNav() {
  return <nav>...</nav>;
}

export default function Layout({
  children,
  audience,
  views,
}: {
  children: React.ReactNode;
  audience: React.ReactNode;
  views: React.ReactNode;
}) {
  return (
    <>
      <h1>Tab Bar Layout</h1>
      {children}

      <h2>Audience</h2>
      <AudienceNav />
      {audience}

      <h2>Views</h2>
      <ViewsNav />
      {views}
    </>
  );
}

```
하위 프로퍼티는 폴더에 매핑할 필요가 없는 암시적 슬롯입니다.  
즉, dashboard/page.js는 dashboard/@children/page.js와 동일합니다  

  
행동  
URL  
슬롯은 URL 구조에 영향을 주지 않습니다. file 경로 /dashboard/@audience/subscribers는 /dashboard/subscribers에서 접근할 수 있습니다.  
 
탐색  
앞뒤로 탐색할 때( soft navigation 사용) URL이 업데이트되고 브라우저는 이전에 활성화된 슬롯을 복원합니다.  

예를 들어, 사용자가 /dashboard/subscribers로 이동한 다음 /dashboard/impressions로 이동하는 경우, 다시 이동할 때 URL이 dashboard/subscribers로 업데이트됩니다.  

default.js  
새로 고침(또는 하드 탐색) 시 브라우저는 현재 URL과 일치하는 슬롯을 렌더링하지만 어떤 다른 병렬 슬롯이 활성화되었는지 알 수 없습니다.  

브라우저가 이전 상태로 복원할 수 없을 때 대체로 렌더링할 default.js 파일을 정의할 수 있습니다.  

```
dashboard
├── @team
│   └── ...
├── @user
│   └── ...
├── default.js
├── layout.js
└── page.js
```
  
  예제
조건부 경로
병렬 경로를 사용하여 조건부 라우팅을 구현할 수 있습니다. 예를 들어 현재 사용자 유형에 따라 @사용자 및 @팀 경로를 렌더링할 수 있습니다: (몬소리지?)
```
app/dashboard/layout.tsx
import { getCurrentUserType } from 'lib/user';

export default async function Layout({
  children,
  user,
  team,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  team: React.ReactNode;
}) {
  const userType: 'user' | 'team' = getCurrentUserType();

  return (
    <>
      {/* Render the user or team slot depending on the current user type */}
      {userType === 'user' ? user : team}
      {children}
    </>
  );
}
```
