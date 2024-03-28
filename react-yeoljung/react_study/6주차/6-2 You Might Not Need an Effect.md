# You Might Not Need an Effect

학습 내용
1. 컴포넌트에서 불필요한 효과를 제거하는 이유와 방법
2. 이펙트 없이 값비싼 계산을 캐시하는 방법
3. 이펙트 없이 컴포넌트 상태를 리셋하고 조정하는 방법
4. 이벤트 핸들러 간에 로직을 공유하는 방법
5. 이벤트 핸들러로 이동해야 하는 로직
6. 부모 컴포넌트에 변경 사항을 알리는 방법

1.불필요한 Effect를 제거하는 방법 (굳이 안써도될곳에 쓰지마라)

## useMemo (수식? 함수? 계산을 저장?) 
```
  const visibleTodos = useMemo(() => {
// ✅ Todos 또는 필터가 변경되지 않는 한 재실행하지 않습니다.
    반환 getFilteredTodos(ㅁㅁ, ㅠㅠ);
  }, [ㅁㅁ, ㅠㅠ]);
  ```
  아래의 방법으로 시간을 측정할 수도 있다.
  ```
  console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
```
아래의 상태는 if문으로 관리해주자
```
useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```
아래같이 X 
```
함수 ProductPage({ product, addToCart }) {
  // 🔴 피하세요: Effect 내부의 이벤트별 로직
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`${product.name}을 장바구니에 추가했습니다!`);
    }
  }, [product]);

  함수 handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}

```

수동으로 정의할 수 있을 때에는 set함수가 아닌 수동으로 작성하라 
setRound(round + 1) X 불필요한 랜더링 발생
const nextRound = round + 1 O

한번만 실행되어야하는 경우 Effect사용시 랜더링할때마다 실행될 수 있기 때문에 Effect사용을 지양해야한다. 

상태(state)변경은 Effect 사용이 지양되는 경우가 많은듯?

effect에서 props 항목변경으로 인한 상태조정은 좋지않다.

## 오래된 응답 무시하기
```
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(쿼리, 페이지).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [쿼리, 페이지]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

렌더링 중에 무언가를 계산할 수 있다면 Effect가 필요하지 않습니다.
비용이 많이 드는 계산을 캐시하려면 useEffect 대신 useMemo를 추가하세요.
전체 컴포넌트 트리의 상태를 재설정하려면 다른 키를 전달하세요.
소품 변경에 대한 응답으로 특정 상태 비트를 재설정하려면 렌더링 중에 설정하세요.
컴포넌트가 표시되어 실행되는 코드는 Effects에 있어야 하고, 나머지는 이벤트에 있어야 합니다.
여러 컴포넌트의 상태를 업데이트해야 하는 경우 단일 이벤트 중에 수행하는 것이 좋습니다.
여러 컴포넌트의 상태 변수를 동기화하려고 할 때마다 상태 리프팅을 고려하세요.
Effects로 데이터를 가져올 수 있지만 경쟁 조건을 피하기 위해 정리를 구현해야 합니다.

1문2문 뭔소린지?
3문https://codesandbox.io/s/ipegteu-ansseugi-l4ofe3
4문https://codesandbox.io/s/keulrig-doelddyaeman-silhaeng-1m8yxl
