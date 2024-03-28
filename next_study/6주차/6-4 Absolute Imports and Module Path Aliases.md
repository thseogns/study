# Absolute Imports and Module Path Aliases. 
Next.js에는 tsconfig.json 및 jsconfig.json 파일의 "경로" 및 "baseUrl" 옵션이 기본으로 지원됩니다.  


이 옵션을 사용하면 프로젝트 디렉터리를 절대 경로로 별칭을 지정할 수 있으므로 모듈을 더 쉽게 가져올 수 있습니다. 예를 들어  
```.js
// before
import { Button } from '../../../components/button';
 
// after
import { Button } from '@/components/button';
```  
create-next-app<< 이걸 실행하면 이 옵션을 설정하는 창이 나온다.  


