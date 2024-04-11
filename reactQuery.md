<!-- @format -->

## React Query

client는 상태관리 라이브러리로 관리(redux, recoill등), ReactQuery로 서버데이터를
관리함.

### ReactQuery의 라이프 사이클

1. fetching : 요청 상태인 쿼리. 대기중

2. fresh : 새롭게 추가된 쿼리 인스턴스이며, 만료되지 않은 쿼리. 컴포넌트의
   mount, update 시에 데이터를 재요청하지 않음(항상 캐시된 데이터를 가져옴)

3. stale : 데이터 패칭이 완료되어 만료된 쿼리. stale 상태의 같은 쿼리를 useQuery
   로 재호출하여 컴포넌트 마운트를 한다면 캐싱된 데이터가 반환됨.

4. inactive : 비활성 쿼리로써 사용하지 않음. 5분 뒤에 가비지 콜렉터가 캐시에서제
   거함.

5. delete : 가비지 콜렉터에 의하여 캐시에서 제거된 쿼리.

query가 데이터를 업데이트 하는 기준.

```.js
refetchOnWindowFocus, //default: true
refetchOnMount, //default: true
refetchOnReconnect, //default: true
staleTime, //default: 0
cacheTime, //default: 5분 (60 * 5 * 1000)
```

브라우저에 포커스가 들어온 경우(refetchOnWindowFocus)  
새로운 컴포넌트 마운트가 발생한 경우(refetchOnMount)  
네트워크 재연결이 발생한 경우(refetchOnReconnect)

npm install react-query 로 설치

```.js
   import { QueryClient, QueryClientProvider } from 'react-query' // 쿼리에서 프로바이더 , 클라이언트 가져옴
    const queryClient = new QueryClient() // 인스턴스 생성
    function App() {
      return
        <QueryClientProvider client={queryClient}> //프로바이더에 props로 인스턴스를 보냄
        ... //root 컴포넌트
        </QueryClientProvider>
    }
```

### 대표적 기능

기본적으로 GET 에는 useQuery가, PUT, UPDATE, DELETE에는 useMutation이 사용됨.

### useQuery()

    const {data, error, isError, isSuccess} = useQuery(queryKey, queryFn)  // 쿼리키, 쿼리펑션을 가져옴
    queryKey 란 쿼리 키마다 부여되는 고유한 키값. 4버젼 부터는 배열로 선언되어야 한다.

```.js
  // String => 자동으로 길이가 1인 배열로 인식
     const { data } = useQuery('users', queryFn);

     // Array1
          const { data } = useQuery(['users'], queryFn);

     // Array2
          const { data } = useQuery(['users1', 'users2'], queryFn);
```

react-query는 캐싱으로 관리된다. (가져온 데이터를 저장한다.)

```.js
    const { data: data1 } = useQuery(['users1'], queryFn1);

     const { data: data2 } = useQuery(['users1'], queryFn2);
```

queryFn1과 queryFn2는 다르지만 한번만 요청되고 data2에 같은 값이 저장된다.(캐상
되어있기 때문)

### queryFn

Promis가 처리하는 함수, fatch하는 코드,axios와 같이 서버에 api를 요청하는 함수다
.

```.js

    import { useQuery } from 'react-query'

     //queryFn
          const fetchUserList = () => {
              return axios.get("https://jsonplaceholder.typicode.com/users");
          }

     function App() {
             const { data } = useQuery(['users'], () => fetchUserList);
         }


```

### useQuery 동기적으로 실행

useQuery에서 enabled 옵션을 사용하면 비동기 함수인 useQuery를 동기적으로 사용 가
능하다. useQuery의 세 번째 인자로 다양한 옵션 값들이 들어가는데, 여기서 enabled
에 값을 대입하면 해당 값이 true일 때 useQuery를 동기적으로 실행한다.

```.js
const { data: todoList, error, isFetching } = useQuery({
	queryKey: ["todos"],
  	queryFn: fetchTodoList,
});
const { data: nextTodo, error, isFetching } = useQuery({
  queryKey: ["nextTodos"],
  queryFn: fetchNextTodoList,
  enabled: !!todoList // true가 되면 fetchNextTodoList를 실행한다
});
```

### useQueries

여러 개의 useQuery를 한 번에 실행하고자 하는 경우, 기존의 Promise.all()처럼 묶어
서 실행할 수 있도록 도와준다!

```.js
const ids = [1, 2, 3]
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
})

// 두 query에 대한 반환값이 배열로 묶여 반환된다.

// 만일 반환된 배열에 대해 통합된 값을 불러오고 싶다면, 아래와 같이 combine 설정을 통해 데이터를 한 번에
 반환할 수 있다. 이외에도 배열을 다루는 메서드들을 이용해 반환값에 대한 전처리를 수행할 수 있다.

const ids = [1, 2, 3]
const combinedQueries = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })),
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    }
  },
})
```

### useMutation

PUT, UPDATE, DELETE 와 같이 값을 변경할 때 사용하는 API다. 반환값은 useQuery와동
일하다.

```.js

function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })

  return (
    <div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}
```

위의 코드에서 볼 수 있듯이 반환값은 useQuery와 동일하지만, 처음 사용 시에 post
비동기 함수를 넣어주었다. 이때 useMutation의 첫 번째 파라미터에 비동기 함수가 들
어가고, 두 번째 인자로 상황 별 분기 설정이 들어간다는 점이 차이이다.

실제 사용 시에는 mutation.mutate 메서드를 사용하고, 첫 번째 인자로 API 호출 시에
전달해주어야하는 데이터를 넣어주면 된다.
