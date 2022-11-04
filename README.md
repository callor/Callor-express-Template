## NodeJS, Express, Pug, ES6+ module Template

- ES6+ 문법을 사용할 수 있도록 설정
- 기본 view를 pug로 설정
- ES6+ 문법에 맞도록 Template 소스 코드 변경

- Enable ES6+ syntax
- Set default view to pug
- Change the template source code to conform to ES6+ grammar

## 설치(install) : global install

npm install -g express-21c

## express 프로젝트 생성하기 : express project create

express my_project --view=pug && cd my_project

### 추가 수정사항 : PS

- app.js 파일에 다음 코드 추가
- Add the following code to your app.js file

  // Disable the fingerprinting of this web technology. 경고 방지(avoid warning)  
  app.disable("x-powered-by");

## 참조 원본출처 : Reference original source

- https://github.com/expressjs/generator
