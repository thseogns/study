# Environment Variables  
.env.local을 사용하여 환경 변수를 로드합니다.??  
접두사 앞에 NEXT_PUBLIC_를 추가하여 환경 변수를 브라우저에 노출합니다.??  

### 환경 변수 로드
Next.js에는 .env.local에서 process.env로 환경 변수를 로드하는 기능이 기본으로 지원됩니다.  
```.Terminal

DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword

```  

이렇게 하면 process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS가 Node.js 환경에 자동으로 로드되어 라우트 핸들러에서 사용할 수 있습니다.   

  
  
참고: Next.js는 .env* 파일 내부의 변수($VAR)를 자동으로 확장합니다. 이를 통해 다음과 같이 다른 시크릿을 참조할 수 있습니다:  
```.Terminal

# .env
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT
```  
실제 값에 $가 있는 변수를 사용하려는 경우 다음과 같이 이스케이프 처리해야 합니다: \$.   

```.Terminal

# .env
A=abc
 
# becomes "preabc"
WRONG=pre$A
 
# becomes "pre$A"
CORRECT=pre\$A
```  
참고: /src 폴더를 사용하는 경우 Next.js는 상위 폴더에서만 .env 파일을 로드하고 /src 폴더에서는 로드하지 않습니다.  
(이해는 잘 안가지만 대략 터미널을 이용해 환경변수를, 서버를 조정할 수 있고 그 변수를 사용 하려면 $이걸앞에 붙여라 이런말인듯?)  
## 환경 변수를 브라우저에 노출하기
기본적으로 환경 변수는 Node.js 환경에서만 사용할 수 있으므로 브라우저에 노출되지 않습니다.

변수를 브라우저에 노출하려면 변수 앞에 NEXT_PUBLIC_를 붙여야 합니다. 

(기본적으로 브라우저에 변수는 노출안된다. 그걸 가능하게 하는방법은 아래에)

```.Terminal

NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```  
이렇게 하면 process.env.NEXT_PUBLIC_ANALYTICS_ID가 Node.js 환경에 자동으로 로드되어 코드의 어느 곳에서나 사용할 수 있습니다.  
이 값은 NEXT_PUBLIC_ 접두사 때문에 브라우저로 전송되는 JavaScript에 인라인 처리됩니다.  
이 인라인은 빌드 시점에 발생하므로 프로젝트를 빌드할 때 다양한 NEXT_PUBLIC_ 환경을 설정해야 합니다.  
```pages/index.js

import setupAnalyticsService from '../lib/my-analytics-service';
 
// 'NEXT_PUBLIC_ANALYTICS_ID' can be used here as it's prefixed by 'NEXT_PUBLIC_'.
// It will be transformed at build time to `setupAnalyticsService('abcdefghijk')`.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);
 
function HomePage() {
  return <h1>Hello World</h1>;
}  
 
export default HomePage;
```  
동적 조회는 다음과 같이 인라인으로 처리되지 않습니다.  
```.js
// 이것은 변수를 사용하기 때문에 인라인이 아닙니다.
const varName = 'NEXT_PUBLIC_ANALYTICS_ID';
setupAnalyticsService(process.env[varName]);
 
// 이것은 변수를 사용하기 때문에 인라인이 아닙니다.  
const env = process.env;
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID);
```  
#### Default Environment Variables  
일반적으로 .env.local 파일은 하나만 필요합니다. 그러나 개발(next dev) 또는 프로덕션(next start) 환경에 대한 기본값을 추가하고 싶을 때가 있습니다.  

Next.js를 사용하면 .env(모든 환경), .env.development(개발 환경), .env.production(프로덕션 환경)에서 기본값을 설정할 수 있습니다.  

.env.local은 항상 설정된 기본값을 재정의합니다.  

참고: .env, .env.development 및 .env.production 파일은 기본값을 정의하므로 리포지토리에 포함되어야 합니다.  
.env*.local은 무시해야 하는 파일이므로 .gitignore에 추가해야 합니다. .env.local은 시크릿을 저장할 수 있는 위치입니다.  
## Vercel의 환경 변수
Next.js 애플리케이션을 Vercel에 배포할 때 프로젝트 설정에서 환경 변수를 구성할 수 있습니다.  

모든 유형의 환경 변수는 여기에서 구성해야 합니다. 나중에 로컬 장치에 다운로드할 수 있는 개발 환경 변수도 설정할 수 있습니다.  

개발 환경 변수를 구성한 경우 다음 명령을 사용하여 로컬 머신에서 사용할 수 있도록 .env.local 파일로 가져올 수 있습니다:  
```.Terminal

vercel env pull .env.local
```  
## 테스트 환경 변수
개발 및 프로덕션 환경 외에도 세 번째 옵션인 테스트 환경이 있습니다.   
개발 환경이나 프로덕션 환경에 대한 기본값을 설정하는 것과 같은 방식으로 테스트 환경에 대한  
.env.test 파일을 사용하여 동일한 작업을 수행할 수 있습니다(앞의 두 가지만큼 일반적이지는 않지만).  
Next.js는 테스트 환경의 .env.development 또는 .env.production에서 환경 변수를 로드하지 않습니다.   
  
  
이 기능은 테스트 목적으로만 특정 환경 변수를 설정해야 하는 jest 또는 cypress와 같은 도구로 테스트를 실행할 때 유용합니다.  
NODE_ENV를 테스트용으로 설정하면 테스트 기본값이 로드되지만, 일반적으로 테스트 도구가 이를 자동으로 처리하므로 수동으로 설정할 필요는 없습니다.  
테스트 환경과 개발 및 프로덕션 환경에는 약간의 차이가 있는데, 테스트가 모든 사용자에게 동일한 결과를 생성할 것으로 기대하기 때문에  
.env.local은 로드되지 않는다는 점을 염두에 두어야 합니다.  
이렇게 하면 모든 테스트 실행이 .env.local을 무시하여 여러 실행에서 동일한 환경 기본값을 사용하게 됩니다(기본값 집합을 재정의하기 위한 것임).
{동일한 환경에서 실행하기 위해 .env.local이 실행되지 않는다.}
  
단위 테스트를 실행하는 동안 @next/env 패키지의 loadEnvConfig 함수를 활용하여 Next.js와 동일한 방식으로 환경 변수를 로드할 수 있습니다.  
```.js
// 아래는 테스트 설정을 위해 Jest 글로벌 설정 파일 또는 이와 유사한 파일에서 사용할 수 있습니다.
import { loadEnvConfig } from '@next/env';
 
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
```  
## 환경 변수 로드 순서
환경 변수는 다음 위치에서 순서대로 조회되며, 변수가 발견되면 중지됩니다.

1. process.env
2. .env.$(NODE_ENV).local
3. .env.local (NODE_ENV가 테스트 상태일 때는 확인되지 않음.)
4. .env.$(NODE_ENV)
5. .env
예를 들어 NODE_ENV가 개발이고 .env.development.local과 .env 모두에 변수를 정의한 경우 .env.development.local의 값이 사용됩니다.

