# Github

## config

git config user.email

### SSH key

https://docs.github.com/en/authentication/connecting-to-github-with-ssh

#### 여러가지 명령어

##### 원격 연결하기

git remote add <name> <url> === 이 url을 name으로 기억하라는 뜻

(기본적으로 origin)
git remote rename <old> <new> === 이름바꾸기
git remote remove <name> === 지우기

##### clone 복제하기

git clone <레포지토리 주소>
git clone -b <브랜치 이름> <레포지토리 주소> 특정브랜치 복사

##### push하기

git push <remote> <branch>
git push origin <로컬브랜치이름>:<원격브랜치이름> === 로컬브랜치를 원격브랜치에 push한다.

-u 로 upstream branch를 만들어줘야 git push만으로 push가 가능하다.

https://plum-poppy-0ea.notion.site/Github-Basics-Exercise-1c12200326db47d7890702017602d698
