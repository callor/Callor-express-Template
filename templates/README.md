# express-21c

- 21세기를 통과하는 express-generator  
  express-generator through the 21st century

`npm install -g express-21c`

## express 프로젝트 생성하기 : express project create

`express my_project --view=pug && cd my_project`

### 추가 수정사항 : PS

- app.js 파일에 다음 코드 추가  
  Add the following code to your app.js file

  // Disable the fingerprinting of this web technology. 경고 방지(avoid warning)  
   `app.disable("x-powered-by");`

## :carousel_horse: History

### Since : 2020-12-10

### V2.0.1( 2022. 11. 04 )

- Source Code refactoring

### V2.1.0( 2022. 11. 11 )

- MySQL and Sequelize init sample
- `express project --pug --sequelize`

### V2.1.10( 2022. 11. 26 )

- Mac and Linux Bug Patch

### V2.4.6( 2023. 05. 23 )

- helmet Security Setting
