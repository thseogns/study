# BigO of Objects

Insertion - O(1)
Removal - O(1)
Searching - O(N)
Access - O(1)

## BigO of Objects 메소드들

Object.keys - O(N)
Object.value - O(N)
Object.entries - O(N)
hasOwnProperty - O(1)

### BigO의 배열 메소드

push- O(1)
pop- O(1)
shift- O(N)
unshift- O(N)
concat- O(N) 배열합치기
slice- O(N) 배열의 일부 가져오기 (복사하기)
splice- O(N) 제거, 추가 (중간 추가라면 O(N))
sort- O(N\*logN) 정렬
forEach/map/filter/reduce/etc - O(N)

#### Array안의 데이터 접근이 느린이유

1. 배열을 읽으려면 기본적으로 O(n)이다
2. 배열의 끝에 데이터를 추가하는 것과 다르게 배열의 첫 째 열에 추가하면 모든 index가 바뀌게 된다. (삭제도 마찬가지)
3.
