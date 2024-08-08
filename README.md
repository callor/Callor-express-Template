# express-21c

- express-generator through the 21st century: 21세기를 통과하는 express-generator  
  
## NodeJS, Express, Pug, ES5+ module Template

- Enable ES6+ syntax : ES5+ 문법을 사용할 수 있도록 설정  
- Set default view to pug : 기본 view를 pug로 설정  
- Change the template source code to conform to ES6+ grammar: ES6+ 문법에 맞도록 Template 소스 코드 변경  

### Create a Back-End project using express-21c : 프로젝트 생성 
- 기존에 설치된 express-21c 가 있으면 삭제 후 실행
```sh
npm uninstall -g express-21c
npx express-21c my_project --view=pug 
cd my_project
npm install
nodemon
```

## :carousel_horse: History

### Since : 2020-12-10
### V21.1.1( 2022. 11. 04 )

- Source Code refactoring
- Add the following code to your app.js file: app.js 파일에 다음 코드 추가  
 
```js
// Disable the fingerprinting of this web technology. 경고 방지(avoid warning)  
`app.disable("x-powered-by");`
```   

### V21.2.0( 2022. 11. 11 )

- MySQL and Sequelize init sample
- `express project --pug --sequelize`

### V21.2.1( 2022. 11. 26 )

- Mac and Linux Bug Patch

### V21.2.30( 2024. 01. 19)

- Dependency Upgrade

### V21.2.31( 2024. 01. 19)

- `npx 설치 방법 추가`

#### 참조 출처 : Reference source

- <https://github.com/expressjs/generator>
