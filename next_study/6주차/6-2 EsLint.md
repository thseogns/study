# ESLint
Next.js는 바로 사용할 수 있는 통합 ESLint 환경을 제공합니다. package.json에 next lint를 스크립트로 추가하세요:  
![image](https://github.com/ddp-study/react/assets/99688960/e793adb8-eabd-483f-bd49-8c04931ef3ef)  
![image](https://github.com/ddp-study/react/assets/99688960/7195ef51-0f25-4374-a4d7-796500fe0a2b)  
다음과같이 표시됨  
![image](https://github.com/ddp-study/react/assets/99688960/4378b753-83ca-45d5-adb0-089deb63055d)  
다음 세 가지 옵션중 하나를 선택 할 수 있다.


Strict: 보다 엄격한 코어 웹 바이탈 규칙 세트와 함께 Next.js의 기본 ESLint 구성을 포함합니다.  
ESLint를 처음 설정하는 개발자에게 권장되는 구성입니다.    
```.js
{
  "extends": "next/core-web-vitals"
}
```

Base: Next.js의 기본 ESLint 구성을 포함합니다.  
```.js
{
  "extends": "next"
}
```
Cancel: ESLint 구성을 포함하지 않습니다. 사용자 지정 ESLint 구성을 직접 설정하려는 경우에만 이 옵션을 선택합니다.  
  
두 가지 구성 옵션 중 하나를 선택하면 Next.js가 애플리케이션의 개발 종속 요소로 eslint 및 eslint-config-next를 자동으로 설치하고  
프로젝트 루트에 선택한 구성이 포함된 .eslintrc.json 파일을 생성합니다.    
이제 ESLint를 실행할 때마다  next lint를 실행하여 오류를 포착할 수 있습니다. ESLint를 설정하면 모든 빌드( next lint) 시에도 자동으로 실행됩니다.    
오류는 빌드에 실패하지만 경고는 실패하지 않습니다.  next build중에 eslint를 실행하지 않게 무시하기 설정을 할 수 있다.  
#### ESLint Config
기본 구성(eslint-config-next)에는 Next.js에서 최적의 린팅 out-of-the-box  환경을 구현하는 데 필요한 모든 것이 포함되어 있습니다.  
애플리케이션에 ESLint가 아직 구성되지 않은 경우 next lint를 사용하여 이 구성과 함께 ESLint를 설정하는 것이 좋습니다.  

다음 ESLint 플러그인의 권장 rule-set은 모두 eslint-config-next 내에서 사용됩니다:  
eslint-config-next:  

- eslint-plugin-react  
- eslint-plugin-react-hooks  
- eslint-plugin-next  
이 설정은 next.config.js의 설정보다 우선합니다.  

### ESLint 플러그인
Next.js는 기본 구성에 이미 번들로 제공되는 ESLint 플러그인 eslint-plugin-next를 제공하여   
Next.js 애플리케이션의 일반적인 이슈와 문제를 포착할 수 있도록 합니다. 전체 규칙 세트는 다음과 같습니다:  
https://nextjs.org/docs/app/building-your-application/configuring/eslint <<플러그인 규칙들 참고  
  
  
애플리케이션에 ESLint가 이미 구성되어 있는 경우 몇 가지 조건이 충족되지 않는 한  
eslint-config-next를 포함하지 않고 이 플러그인에서 직접 확장하는 것이 좋습니다.   

### 사용자 지정 설정
rootDir
루트 디렉터리에 Next.js가 설치되지 않은 프로젝트(예: monorepo???이게뭐임??)에서 eslint-plugin-next를  
사용하는 경우, .eslintrc의 설정 속성을 사용하여 eslint-plugin-next에 Next.js 애플리케이션을 찾을 위치를 지정할 수 있습니다:  
```.eslintrc
{
  "extends": "next",
  "settings": {
    "next": {
      "rootDir": "packages/my-app/"
    }
  }
}
```
rootDir은 경로(상대 또는 절대), 글로브(예: "packages/#/") 
또는 경로 및/또는 글로브의 배열일 수 있습니다. <<이게 뭔소리임???
### 사용자 정의 디렉토리 및 파일 린팅
기본적으로 Next.js는 pages/, app(실험적인 appDir 기능이 활성화된 경우에만), components/, lib/, src/ 디렉터리의 모든 파일에 대해 ESLint를 실행합니다.   
그러나 프로덕션 빌드의 경우 다음.config.js의 eslint 구성에서 dirs 옵션을 사용하여 실행할 디렉터리를 지정할 수 있습니다:  

  ```.js
  module.exports = {
  eslint: {
    dirs: ['pages', 'utils'], //프로덕션 빌드(next build) 중에는 'pages' 및 'utils' 디렉터리에서만 ESLint를 실행합니다.
  },
};
```  
마찬가지로 --dir 및 --file 플래그를 사용하여 next lint에 특정 디렉터리 및 파일을 린트할 수 있습니다:  
```.Terminal
next lint --dir pages --dir utils --file bar.js
```
### 캐싱(Caching)
성능 향상을 위해 ESLint가 처리하는 파일 정보는 기본적으로 캐시됩니다.  
이 정보는 .next/cache 또는 정의한 빌드 디렉터리에 저장됩니다.  
단일 소스 파일의 내용보다 더 많은 것에 의존하는 ESLint 규칙을 포함하고 캐시를 비활성화해야 하는 경우,  
next lint와 함께 --no-cache 플래그를 사용하세요.  
```.Terminal
next lint --no-cache
```  
### 규칙 비활성화하기
지원되는 플러그인(반응, 반응-후크, 다음)에서 제공하는 규칙을 수정하거나 비활성화하려면  
.eslintrc의 규칙 속성을 사용하여 직접 변경할 수 있습니다:  
```..eslintrc

{
  "extends": "next",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
}
```  

## Core Web Vitals
next/core-web-vitals 룰셋은 next lint가 처음으로 실행되고 strict 옵션이 선택될 때 활성화됩니다.  
```.js
{
  "extends": "next/core-web-vitals"
}
```  

next/core-web-vitals는 Core Web Vitals에 영향을 미치는 경우경고하는 여러 규칙에 대한 오류에 대해 eslint-plugin-next를 업데이트합니다.
### 다른 도구와 함께 사용
Prettier
ESLint에는 코드 서식 지정 규칙이 포함되어 있어 기존 Prettier 설정과 충돌할 수 있습니다.  
ESLint와 Prettier가 함께 작동하도록 ESLint 구성에 eslint-config-prettier를 포함할 것을 권장합니다.  


먼저 의존성을 설치합니다:  
```.Terminal
npm install --save-dev eslint-config-prettier
 
yarn add --dev eslint-config-prettier

```
그후 구성요소에 프리터를 추가
```.js
{
  "extends": ["next", "prettier"]
}
```  
lint-staged
next lint를 lint-staged와 함께 사용하여 스테이징된 git 파일에서 린트를 실행하려면  
프로젝트 루트에 있는 .lintstagedrc.js 파일에 다음을 추가하여 --file flag의 사용을 지정해야 합니다.  
![image](https://github.com/ddp-study/react/assets/99688960/70f10fd7-b13d-4e5c-8d32-d20ba4268ca5)  
## 기존 구성 마이그레이션
#### 권장 플러그인 규칙 집합
애플리케이션에 이미 ESLint가 구성되어 있고 다음 조건 중 하나라도 해당되는 경우:  

다음 플러그인 중 하나 이상이 이미 설치되어 있습니다(개별적으로 또는 airbnb 또는 react-app과 같은 다른 구성을 통해):  
react  
react-hooks   
jsx-a11y  
import  
Next.js 내에서 Babel이 구성되는 방식과 다른 특정 parserOptions을 정의한 경우(Babel 구성을 사용자 정의하지 않은 경우 권장하지 않음).  
가져오기를 처리하도록 정의된 Node.js 및/또는 TypeScript 리졸버와 함께 eslint-plugin-import가 설치되어 있습니다.   
그런 다음 이러한 프로퍼티가 eslint-config-next 내에서 구성되는 방식을 선호하는 경우  
이러한 설정을 제거하거나 대신 Next.js ESLint 플러그인에서 직접 확장하는 것이 좋습니다:  
```.js
module.exports = {
  extends: [
    //...
    'plugin:@next/next/recommended',
  ],
};
```  
플러그인은 next lint를 실행할 필요 없이 프로젝트에 정상적으로 설치할 수 있습니다  
```.Terminal
npm install --save-dev @next/eslint-plugin-next
 
yarn add --dev @next/eslint-plugin-next
```   
이렇게 하면 여러 구성에서 동일한 플러그인이나 구문 분석기를 가져올 때 발생할 수 있는 충돌이나 오류의 위험이 사라집니다.(일케하면좋다.)  

#### 추가 구성
이미 별도의 ESLint 구성을 사용하고 있고 eslint-config-next를 포함하려는 경우 다른 구성 다음에 마지막으로 확장해야 합니다. 예를 들어  
```.js
{
  "extends": ["eslint:recommended", "next"]  
}
```    
next 구성에서는 parser, plugins and settings에 대한 기본값 설정을 이미 처리하고 있습니다.  
사용 사례에 따라 다른 구성이 필요한 경우가 아니라면 이러한 속성을 수동으로 다시 선언할 필요가 없습니다.  


다른 공유 가능한 구성을 포함하는 경우 이러한 속성을 덮어쓰거나 수정하지 않았는지 확인해야 합니다.  
그렇지 않으면 다음 구성과 동작을 공유하는 구성을 모두 제거하거나 위에서 언급한 대로 Next.js ESLint 플러그인에서 직접 확장하는 것이 좋습니다.  

