# Extracting State Logic into a Reducer

###상태 로직을 리듀서로 추출하기

많은 상태 업데이트가 여러 이벤트 핸들러에 분산되어 있는 컴포넌트는 과부하가 걸릴 수 있습니다. 
이러한 경우 컴포넌트 외부의 모든 상태 업데이트 로직을 리듀서라는 단일 함수로 통합할 수 있습니다.

학습 내용은 다음과 같습니다.
리듀서 함수는 무엇인가요?
state를 리팩터링하는 방법감속기를 사용하는 방법
언제 감속기를 사용해야 할까요?
잘 작성하는 방법

세 단계로 useState에서 useReducer로 마이그레이션할 수 있습니다:

상태 설정에서 액션 디스패치로 이동합니다.
리듀서 함수를 작성합니다.
컴포넌트에서 리듀서를 사용합니다.


1 모든 state지우기.

```
function handleAddTask(text) {
  dispatch({
    type: '추가된',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    유형: '삭제됨',
    id: taskId,
  });
}
dispatch에 전달하는 객체를 "action"이라고 합니다:

function handleDeleteTask(taskId) {
  dispatch(
    // "action" 객체:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}

Translated with www.DeepL.com/Translator (free version)
```

```
dispatch({
  // 컴포넌트에만 해당
  type: 'what_happened',
  // 다른 필드는 여기로
});

```

2 리듀서 함수 작성
.

```
function yourReducer(state, action) {
  // React가 설정할 다음 state를 반환합니다.
}
```
### 이런식으로 작성
```
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
          return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('알 수 없는 작업: ' + action.type);
  }
}

Translated with www.DeepL.com/Translator (free version)
```

1. 위의 함수는 switch로 작성하는 것이 보기좋긴하다.
2. 케이스는 일반적으로 반환으로 끝나야 합니다.
3. 반환을 잊어버리면 코드가 다음 케이스로 '넘어가' 실수로 이어질 수 있습니다!


useReducer = 기본 코드가 길다, 복잡한 코드를 깔끔하게 , 오류의 위치를 판단하기 쉬워 디버깅에 용이하다(하지만 useState보다 더많은 코드를 보아야 한다.),

useState = 읽기 쉽다 (readucer 반대)


useReducer 는 순수해야한다.(렌더링중 실행되기 때문에)

요약
useState에서 useReducer로 변환합니다:
이벤트 핸들러에서 액션을 디스패치합니다.
주어진 상태와 액션에 대해 다음 상태를 반환하는 리듀서 함수를 작성합니다.
useState를 useReducer로 바꿉니다.
리듀서는 코드를 조금 더 작성해야 하지만 디버깅과 테스트에 도움이 됩니다.
리듀서는 순수해야 합니다.
각 액션은 단일 사용자 상호작용을 설명합니다.
뮤팅 스타일로 감속기를 작성하려면 Immer를 사용하세요.

1  리듀서에 값넣기 https://codesandbox.io/s/ridyuseoe-gabsneohgi-yesjzk?file=/Chat.js
2 택스트 에어리어 https://codesandbox.io/s/tegseuteu-eeorieoe-gongbaeg-gyeonggomun-ddeugehagi-xrfu0w
