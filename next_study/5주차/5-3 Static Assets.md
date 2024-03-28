# Static Assets  
Next.js는 이미지와 같은 정적 파일을 루트 디렉터리의 public이라는 폴더 아래에 제공할 수 있습니다.  
그러면 기본 URL(/)에서 시작하는 코드에서 public 내부의 파일을 참조할 수 있습니다.  
예를 들어 public에 me.png를 추가하면 다음 코드를 통해 이미지에 액세스할 수 있습니다:   
``` .ts
import Image from 'next/image';
 
function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />;
}
 
export default Avatar; 
```
이 폴더는 robots.txt, favicon.ico, Google 사이트 인증 및 기타 정적 파일(.html 포함)에도 유용합니다!  

디렉터리 이름이 public인지 확인하세요. 이 이름은 변경할 수 없으며  static assets 제공 시 사용되는 유일한 디렉토리입니다.  
page/디렉토리에 파일과 같은 이름의 static file이 있으면 오류가 발생할 수 있으므로 이 디렉토리에 static file을 두지 마세요.   
빌드 시점에 public 디렉터리에 있는 에셋만 Next.js에서 제공됩니다. 런타임에 추가된 파일은 사용할 수 없습니다. 영구 파일 저장을 위해 AWS S3와 같은 타사 서비스를 사용하는 것이 좋습니다.  
