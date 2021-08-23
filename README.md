# nodejs + express + pug ES6+ Template

- ES6+ 문법을 사용할 수 있도록 설정
- 기본 view를 pug로 설정
- ES6+ 문법에 맞도록 Template 소스 코드 변경

# express 탬플릿 프로젝트 생성하기

express-21c --view=pug my_project

# 프로젝트 생성

- express 프로젝트명

### 추가 수정사항

- app.js 다음 코드 추가

  // Disable the fingerprinting of this web technology. 경고 방지  
   app.disable("x-powered-by");

## 원본출처

- https://github.com/expressjs/generator
