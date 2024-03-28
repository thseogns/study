# Server Actions  
서버 액션(Server Actions)은 React 액션을 기반으로 구축된 Next.js의 알파 기능입니다.   
서버 측 데이터 변경, 클라이언트 측 자바스크립트 감소, 점진적으로 개선된 폼을 지원합니다.  
![image](https://github.com/ddp-study/nextjs/assets/99688960/396c90d0-c8a7-45dd-8890-aa06b65b0926)   
#### 규칙
Next.js 프로젝트에서 서버 액션을 활성화하려면 실험적인 serverActions 플래그를 활성화하면 됩니다.  
![image](https://github.com/ddp-study/nextjs/assets/99688960/a03abab7-3ec0-4937-965c-75608c4de1e9)  
#### 생성
함수 본문 상단에 "use server" 지시문을 사용하여 비동기 함수를 정의하여 서버 액션을 생성합니다.   
이 함수는 직렬화 가능한 인자와 React 서버 컴포넌트 프로토콜에 기반한 직렬화 가능한 반환값을 가져야 합니다.

![image](https://github.com/ddp-study/nextjs/assets/99688960/a43b0ad5-5e8f-4b82-8f1c-6e0d95ea8632)   
  
  
파일 위에 최상위 " use server " 지시문을 사용할 수도 있습니다.  
이 방법은 여러 서버 액션을 내보내는 단일 파일이 있는 경우 유용할 수 있으며,  
클라이언트 컴포넌트에서 서버 액션을 가져올 때 필요합니다.  

![image](https://github.com/ddp-study/nextjs/assets/99688960/a6086c4c-bb71-4670-8021-236b3b171c22)  
참고: 최상위 " use server " 지시문을 사용하는 경우 모든 내보내기는 서버 작업으로 간주됩니다.
#### 호출
다음 방법을 사용하여 서버 작업을 호출할 수 있습니다:  
1. action 사용하기: React의 액션 프로퍼티를 사용하면 <form> 엘리먼트에서 서버 액션을 호출할 수 있습니다.  
2. formAction 사용하기: React의 formAction 프로퍼티를 사용하면 다음을 처리할 수 있습니다.   
```  <button>, <input type="submit">, ``` 그리고 ``` <input type="image"> ``` 의 요소를 ``` <form>```에 넣을 수 있습니다.   
 #### action
React의 액션 프로퍼티를 사용해 폼 엘리먼트에서 서버 액션을 호출할 수 있습니다.    
    액션 프로퍼티와 함께 전달된 서버 액션은 사용자 상호작용에 대한 응답으로 비동기 사이드 이펙트로 작동합니다.  
    ![image](https://github.com/ddp-study/nextjs/assets/99688960/81d4dddd-f7de-4564-be40-ab76f988c921)  

#### formAction
formAction 프로퍼티를 사용하여 button, input type="submit", input type="image"와  
같은 요소에 대한 form Action을 처리할 수 있습니다.  
 formAction 프로퍼티는 양식의 액션보다 우선합니다  
    ![image](https://github.com/ddp-study/nextjs/assets/99688960/42c094a9-c405-4c34-ad7d-250bffa4699d)  
    참고: formAction은 HTML의 기본 폼액션입니다.  
    이제 React에서 이 어트리뷰트에 함수를 전달할 수 있습니다.  


    
     #### startTransition을 사용한 사용자 지정 호출
action 또는 formAction을 사용하지 않고 서버 액션을 호출할 수도 있습니다.  
    이 경우 사용 트랜지션 후크에서 제공하는 startTransition을 사용하면 forms, button 또는 input 외부에서  
    서버 액션을 사용하려는 경우에 유용할 수 있습니다.  
    

참고: startTransition을 사용하면 즉시 사용 가능한 프로그레시브 향상 기능이 비활성화됩니다.  
![image](https://github.com/ddp-study/nextjs/assets/99688960/7c41100f-32d1-4a7d-a05e-6b90ee80a359)  
![image](https://github.com/ddp-study/nextjs/assets/99688960/b231bb81-fb10-499a-bd49-7eda5ff00a80)   
      
    
#### startTransition 없이 사용자 정의 호출   
서버 변형을 수행하지 않는 경우 다른 함수처럼 함수를 직접 프로퍼티로 전달할 수 있습니다.  
      
    
![image](https://github.com/ddp-study/nextjs/assets/99688960/6b590d36-5901-47f3-b0fd-0d08247a4e0f)  
![image](https://github.com/ddp-study/nextjs/assets/99688960/7652a716-032d-4f21-a314-58e7716ccd65)  
      
  #### 향상된 기능
Experimental useOptimistic  
Experimental useOptimistic 훅은 애플리케이션에서 Optimistic 업데이트를 구현하는 방법을 제공합니다.  
    Optimistic 업데이트는 앱의 반응성을 높여 사용자 경험을 향상시키는 기술입니다.  

서버 액션이 호출되면 서버 액션의 응답을 기다리지 않고 예상 결과를 반영하여 UI가 즉시 업데이트됩니다.  
 ####    app/thread.js
```
    'use client';
 
import { experimental_useOptimistic as useOptimistic } from 'react';
import { send } from './_actions.js';
 
export function Thread({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { message: newMessage, sending: true }],
  );
  const formRef = useRef();
 
  return (
    <div>
      {optimisticMessages.map((m) => (
        <div>
          {m.message}
          {m.sending ? 'Sending...' : ''}
        </div>
      ))}
      <form
        action={async (formData) => {
          const message = formData.get('message');
          formRef.current.reset();
          addOptimisticMessage(message);
          await send(message);
        }}
        ref={formRef}
      >
        <input type="text" name="message" />
      </form>
    </div>
  );
}
 ```
#### Experimental useFormStatus

![image](https://github.com/ddp-study/nextjs/assets/99688960/2b98419d-54fc-43bb-af7d-89e122347324)  
    

    
 ##### 점진적 향상
점진적 향상 기능을 사용하면 자바스크립트가 없거나 자바스크립트가 비활성화된 상태에서도 <form>이 제대로 작동할 수 있습니다.  
    이를 통해 사용자는 양식의 JavaScript가 아직 로드되지 않았거나 로드에 실패하더라도 양식과 상호 작용하고 데이터를 제출할 수 있습니다.  

서버 양식 액션과 클라이언트 양식 액션 모두 두 가지 전략 중 하나를 사용하여 점진적 향상 기능을 지원합니다:  

서버 액션이 <form>에 직접 전달되는 경우 자바스크립트가 비활성화되어 있어도 폼은 대화형?입니다.  
클라이언트 액션이 <form>으로 전달되는 경우 양식은 여전히 대화형이지만 양식이 수화될 때까지 액션이 대기열에 배치됩니다.  
    <form>은 선택적 Hydration으로 우선순위가 지정되므로 빠르게 처리됩니다.
![image](https://github.com/ddp-study/nextjs/assets/99688960/2f3cf05c-2b38-444a-834e-fe177d5d2d88)   
      두 경우 모두 양식은 하이드레이션이 발생하기 전에 대화형입니다.  
      서버 액션은 클라이언트 자바스크립트에 의존하지 않는다는 추가적인 이점이 있지만,  
      원하는 경우 상호 작용을 유지하면서 클라이언트 액션으로 추가 동작을 구성할 수 있습니다.   
#### 예제
Client Components와 함께 사용   

##### Import  
      
서버 액션은 클라이언트 컴포넌트 내에서 정의할 수는 없지만 가져올 수는 있습니다.  
      클라이언트 컴포넌트에서 서버 액션을 사용하려면 최상위 "서버 사용" 지시문이 포함된 파일에서 액션을 가져올 수 있습니다.
      
 
![image](https://github.com/ddp-study/nextjs/assets/99688960/af02425e-86c3-4fcf-9328-988449570461)   
     ##### Props
서버 액션을 가져오는 것이 권장되지만, 경우에 따라 서버 액션을  
      클라이언트 컴포넌트에 프롭으로 전달하고 싶을 수도 있습니다.  
      

예를 들어 액션 내에서 동적으로 생성된 값을 사용하고 싶을 수 있습니다.  
      이 경우 서버 액션을 프로퍼티로 전달하는 것이 좋은 해결책이 될 수 있습니다.  
      ![image](https://github.com/ddp-study/nextjs/assets/99688960/0ef802ae-d6a2-415a-bd2c-7535bb2d6a98)  
      
##### On-demand Revalidation (??)
서버 작업을 사용하여 경로(revalidatePath) 또는 캐시 태그(revalidateTag)를 기준으로 주문형 데이터의 유효성을 재검증할 수 있습니다.  
![image](https://github.com/ddp-study/nextjs/assets/99688960/f3b51521-dd3a-4d5f-a15c-2f20472e9891)   
   ##### Validation (유효성 검사)
서버 액션에 전달된 데이터는 액션을 호출하기 전에 유효성을 검사하거나 위생 처리할 수 있습니다. 예를 들어 액션을 인수로 받고 유효한 경우 액션을 호출하는 함수를 반환하는 래퍼 함수를 만들 수 있습니다.  
      ![image](https://github.com/ddp-study/nextjs/assets/99688960/f217e906-ace3-4f67-b74c-9c50da71017e)  
      
##### 헤더 사용
서버 액션 내에서 쿠키 및 헤더와 같은 수신 요청 헤더를 읽을 수 있습니다.  
      ![image](https://github.com/ddp-study/nextjs/assets/99688960/83badc84-39c5-4d60-8b8d-806cf9f7eb65)

      또한 서버 액션 내에서 쿠키를 수정할 수 있습니다.   
      ![image](https://github.com/ddp-study/nextjs/assets/99688960/33d1ca60-4fa7-4741-9bf8-a0d8d03d33cd)  
     ## 용어집
### Action
오류 처리 및 낙관적 업데이트를 위한 기본 제공 솔루션과 함께 사용자 상호 작용에 대한 응답으로 비동기 부수 효과를 수행합니다. HTML 프리미티브 액션과 유사합니다.

### Form Actions
웹 표준 <form> API에 통합된 액션으로, 즉시 사용 가능한 점진적 향상 및 로딩 상태를 활성화합니다. HTML 기본 폼액션과 유사합니다.

### Server Functions
서버에서 실행되지만 클라이언트에서 호출할 수 있는 함수입니다.

### Server Actions
액션으로 호출되는 서버 함수입니다.  

### Server Mutations
데이터를 변경하고 redirect, revalidatePath 또는 revalidateTag를 호출하는 서버 작업입니다.

 
    
  

  
