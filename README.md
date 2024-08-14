# express-21c, Express Generator
- NodeJS + Express Back-End Server Generator
- express-generator through the 21st century
  
## NodeJS, Express, Pug, ES5+ module Template

- `Enable ES5+ module syntax`
- `Set default view to pug`
- `Change the template source code to conform to ES5+ grammar`

### Create a Back-End project using express-21c : 프로젝트 생성 
- `If you have an existing express-21c installed, delete it and then run it.`  

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

## :carousel_horse: History

### Since : 2020-12-10
### V21.1.1( 2022. 11. 04 )

- Source Code refactoring
- Add the following code to your app.js file
 
```js
// Disable the fingerprinting of this web technology. 경고 방지(avoid warning)  
`app.disable("x-powered-by");`
```   

### V21.2.0( 2022. 11. 11 )

- MySQL and Sequelize init sample
```sh
npx express-21c [project] --pug --sequelize
```

### V21.2.1( 2022. 11. 26 )

- Mac and Linux Bug Patch

### V21.2.30( 2024. 01. 19)

- Dependency Upgrade

### V21.2.31( 2024. 01. 19)

- `npx create project`

#### 참조 출처 : Reference source

- <https://github.com/expressjs/generator>
