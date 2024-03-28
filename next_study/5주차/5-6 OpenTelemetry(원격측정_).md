# OpenTelemetry  
참고: 이 기능은 실험적 기능으로, 다음.config.js에 실험용.instrumentationHook = true; 를 제공하여 명시적으로 옵트인해야 합니다.  
통합 관찰 기능(Observability)은 Next.js 앱의 동작과 성능을 이해하고 최적화하는 데 매우 중요합니다.
  
애플리케이션이 점점 더 복잡해짐에 따라 발생할 수 있는 문제를 식별하고 진단하는 것이 점점 더 어려워지고 있습니다.  
개발자는 logging 및 metrics과 같은 통합 가시성 도구를 활용하여 애플리케이션의 동작에 대한 인사이트를 얻고 최적화할 영역을 식별할 수 있습니다.  
통합 가시성을 통해 개발자는 문제가 큰 문제로 발전하기 전에 선제적으로 문제를 해결하고 더 나은 사용자 경험을 제공할 수 있습니다.  
따라서 성능을 개선하고, 리소스를 최적화하고, 사용자 경험을 향상시키기 위해 Next.js 애플리케이션에서 통합 가시성을 사용하는 것이 좋습니다.  
(데이터 같은것을 가시성있게 표시할 수 있다??)  
  
  
앱 계측을 위해 OpenTelemetry를 사용하는 것이 좋습니다.  
이는 플랫폼에 구애받지 않는 앱 계측 방법으로, 코드를 변경하지 않고도 통합 가시성 제공업체를 변경할 수 있습니다.  
OpenTelemetry와 그 작동 방식에 대한 자세한 내용은 공식 OpenTelemetry 문서를 참조하세요.  
  
이 문서에서는 이 문서 전체에서 스팬, 추적 또는 내보내기와 같은 용어를 사용하며,  
이 모든 용어는 OpenTelemetry 통합 가시성 입문서에서 찾을 수 있습니다.  
  
Next.js는 기본적으로 OpenTelemetry 계측을 지원하므로, 이미 Next.js 자체에 계측이 되어 있습니다.  
OpenTelemetry를 활성화하면 getStaticProps와 같은 모든 코드가 유용한 속성으로 스팬으로 자동 래핑됩니다.  
참고: 현재 서버리스 함수에서만 OpenTelemetry 바인딩을 지원합니다. 엣지 또는 클라이언트 측 코드에는 제공하지 않습니다.

#### 시작하기
OpenTelemetry는 확장이 가능하지만 제대로 설정하는 것은 상당히 장황할 수 있습니다.  
그렇기 때문에 빠르게 시작할 수 있는 @vercel/otel 패키지를 준비했습니다.  
이 패키지는 확장할 수 없으며 사용자 지정에 필요한 설정을 수동으로 구성해야 합니다.  
#### Vercel/otel 사용하기
시작하려면 @vercel/otel을 설치해야 합니다:  
``` .Terminal  
npm install @vercel/otel
```


그런 다음 프로젝트의 루트에 사용자 지정 instrumentation.ts 파일을 만듭니다:    
![image](https://github.com/ddp-study/nextjs/assets/99688960/7de0f3e3-b104-4613-9354-ab958f27acef)  
참고: 사용할 수 있는 기본 opentelemetry  사용 예제를 만들었습니다.   
  
#### 매뉴얼 OpenTelemetry 수동 구성  
@vercel/otel 래퍼가 사용자의 요구에 적합하지 않은 경우 OpenTelemetry를 수동으로 구성할 수 있습니다.  
   
먼저 OpenTelemetry 패키지를 설치해야 합니다:  
```.Terminal
npm install @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-base @opentelemetry/exporter-trace-otlp-http
```
이제 instrumentation.ts에서 NodeSDK를 초기화할 수 있습니다.  
OpenTelemetry API는 엣지 런타임과 호환되지 않으므로 process.env.NEXT_RUNTIME === 'nodejs'일 때만 가져오도록 해야 합니다.  
node를 사용할 때만 조건부로 가져오는 instrumentation.node.ts 파일을 새로 생성하는 것이 좋습니다:
![image](https://github.com/ddp-study/nextjs/assets/99688960/ad94c0d4-27ac-4d93-9981-9db28f71bce0)  

``` .ts
import { trace, context } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
 
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
});
sdk.start();
```  
이렇게 하는 것은 @vercel/otel을 사용하는 것과 동일하지만 수정 및 확장이 가능합니다.  
예를 들어, @opentelemetry/exporter-trace-otlp-http 대신 @opentelemetry/exporter-trace-otlp-grpc를 사용하거나 더 많은 리소스 속성을 지정할 수 있습니다.
  
 #### instrumentation(아까만든거) 테스트
로컬에서 OpenTelemetry 추적을 테스트하려면 호환되는 백엔드가 있는 OpenTelemetry 수집기가 필요합니다. OpenTelemetry 개발 환경을 사용하는 것이 좋습니다.  
   
모든 것이 정상적으로 작동하면 GET /requested/pathname으로 레이블이 지정된 루트 서버 범위를 볼 수 있어야 합니다. 해당 특정 추적의 다른 모든 스팬은 그 아래에 중첩됩니다.   
   
Next.js는 기본적으로 방출되는 것보다 더 많은 스팬을 추적합니다. 더 많은 스팬을 보려면 NEXT_OTEL_VERBOSE=1로 설정해야 합니다.  
  
## 배포
OpenTelemetry Collector 사용  
OpenTelemetry Collector를 사용하여 배포하는 경우, @vercel/otel을 사용할 수 있습니다. Vercel과 자체 호스팅 모두에서 작동합니다.  

#### Vercel에 배포하기
OpenTelemetry가 Vercel에서 바로 작동하는지 확인했습니다.  

Vercel 설명서를 따라 프로젝트를 통합 가시성 제공자에 연결하세요.  

#### 자체 호스팅 
다른 플랫폼에 배포하는 것도 간단합니다. Next.js 앱에서 원격 분석 데이터를 수신하고 처리하려면 자체 OpenTelemetry 수집기를 스핀업해야 합니다.  
  
이를 위해 수집기를 설정하고 Next.js 앱에서 데이터를 수신하도록 구성하는 방법을 안내하는 OpenTelemetry 수집기 시작하기 가이드를 따르세요.  
  
수집기를 설정하고 실행한 후에는 각각의 배포 가이드에 따라 선택한 플랫폼에 Next.js 앱을 배포할 수 있습니다.  
  
#### 사용자 지정 내보내기
OpenTelemetry 수집기를 사용하는 것이 좋습니다.  
사용 중인 플랫폼에서 이 기능을 사용할 수 없는 경우, 수동으로 OpenTelemetry를 구성하여 사용자 지정 OpenTelemetry 내보내기를 사용할 수 있습니다.  
  
### 사용자 지정 스팬
사용자 지정 스팬을 추가할 수 있는 오픈텔레메트리 API를 사용할 수 있습니다.  
```.Terminal 
npm install @opentelemetry/api
```
다음 예시는 GitHub Stars를 가져오고 사용자 정의 fetchGithubStars 스팬을 추가하여 가져오기 요청의 결과를 추적하는 함수를 보여줍니다:  
  


``` .js
import { trace } from '@opentelemetry/api';
 
export async function fetchGithubStars() {
  return await trace
    .getTracer('nextjs-example')
    .startActiveSpan('fetchGithubStars', async (span) => {
      try {
        return await getValue();
      } finally {
        span.end();
      }
    });
}
``` 
등록 함수는 새 환경에서 코드가 실행되기 전에 실행됩니다.  
새 스팬 생성을 시작할 수 있으며, 내보낸 추적에 올바르게 추가되어야 합니다.  
### Default Spans in Next.js()

