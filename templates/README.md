# express-21c

- 21세기를 통과하는 express-generator  
  express-generator through the 21st century

## express generator 설치하기 : express generator install
- old version : `npm install -g express-21c`
- new version : `Not install`

## express 프로젝트 생성하기 : express create project
- old version : `express my_project --view=pug && cd my_project` : `Not used`

## new version
- 기존에 설치된 express-21c 가 있으면 삭제 후 실행 : If you have an existing express-21c installed, delete it and then run it.
- old version uninstall

```sh
npm uninstall -g express-21c
```
- new version create project

```sh
npx express-21c my_project --view=pug 
cd my_project
npm install
nodemon
```

### 추가 수정사항 : PS

- app.js 파일에 다음 코드 추가  
  Add the following code to your app.js file

```javascript
// Disable the fingerprinting of this web technology. 경고 방지(avoid warning)  
app.disable("x-powered-by");
```   

## :carousel_horse: History

### Since : 2020-12-10

### V2.0.1( 2022. 11. 04 )

- Source Code refactoring

### V2.1.0( 2022. 11. 11 )

- MySQL and Sequelize init sample
- `npx express-21c [project] --pug --sequelize`

### V2.1.10( 2022. 11. 26 )

- Mac and Linux Bug Patch

### V2.4.6( 2023. 05. 23 )

- helmet Security Setting
