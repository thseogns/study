# Scaling Up with Reducer and Context

1. context 생성
2. reducer로 반환된 값을 context로 하위 컴포넌트에 전달한다.
3. eventHandler도 깊은component는 props 하지않고 dispach함수를 전달하여 하위 컴포넌트에서 실행 시킨다.



### 값 가져오기

```
export default function TaskList() {
  const tasks = useContext(TasksContext);
```


### dispatch 실행
```
<TasksContext.Provider value={tasks}>
  <TasksDispatchContext.Provider value={dispatch}>
    <h1>Day off in Kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksDispatchContext.Provider>
</TasksContext.Provider>
```

```
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
  ```
  
  
  아래의 코드는
  ```
  export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

이런식으로 간결하게 할 수 있다.
```
export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
  ```
  
  ```
  export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

아래처럼 함수를 전달하여(useXXX로 작성하면 사용자 정의 hook으로 인식한다)
```
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```
함수형식으로 쓸 수 도 있다. (더깔끔하다.)
```
const tasks = useTasks();
const dispatch = useTasksDispatch();
```

요약
1. Reducer와 Context를 결합하면 모든 컴포넌트가 그 위에 있는 상태를 읽고 업데이트할 수 있습니다.
2. 아래 컴포넌트에 state와 dispatch 함수를 제공할 수 있습니다:
  1) state와 dispatch 함수에 대한 컨텍스트 두 개를 생성합니다.
  2) Reducer를 사용하는 컴포넌트에서 두 컨텍스트를 모두 제공합니다.
  3) Context를 읽어야 하는 컴포넌트에서 두 Context 중 하나를 사용합니다.
3. 모든 배선을 하나의 파일로 이동하여 컴포넌트를 더욱 깔끔하게 정리할 수 있습니다.
  1) Context를 제공하는 TasksProvider와 같은 컴포넌트를 내보낼 수 있습니다.
  2) 또한, useTask나 useTaskDispatch 같은 사용자 정의 훅을 내보내서 읽을 수도 있습니다.
4. 앱에서 이와 같은 Context Reducer 쌍을 여러 개 가질 수 있습니다.
