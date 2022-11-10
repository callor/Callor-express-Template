#!/usr/bin/env node
/**
 * ES6+ module grammer create code
 * author callor@callor.com
 */
import fs from "fs";
import parseArgs from "minimist";
import path from "path";
import {
  defaultDependency,
  sequelizeOption,
  cssOptions,
  viewOptions,
} from "../config/package_options.js";

import sortedObject from "sorted-object";
import helpMessage from "../modules/help.js";
import {
  VERSION,
  confirm,
  mkdir,
  fileWrite,
  finish,
  loadTemplate,
  copyTemplate,
  copyTemplateMulti,
} from "../modules/public_module.js";

const MODE_0755 = parseInt("0755", 8);

// CLI
const unknown = [];
const args = parseArgs(process.argv.slice(2), {
  alias: { c: "css", e: "ejs", p: "pug", f: "force", h: "help", v: "view" },
  boolean: [
    "ejs",
    "pug",
    "hbs",
    "hogan",
    "force",
    "sequelize",
    "git",
    "help",
    "version",
  ],
  default: { css: true, view: true },
  string: ["css", "view"],
  unknown: function (s) {
    if (s.charAt(0) === "-") {
      unknown.push(s);
    }
  },
});

args["!"] = unknown;
const consoleMessage = (type, message) => {
  console.error();
  message.split("\n").forEach(function (line) {
    console.error(`  ${type}: %s`, line);
  });
  console.error();
};
// const warning = (message) => {
//   console.error();
//   message.split("\n").forEach(function (line) {
//     console.error("  warning: %s", line);
//   });
//   console.error();
// };

const createAppName = (pathName) => {
  return path
    .basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, "-")
    .replace(/^[-_.]+|-+$/g, "")
    .toLowerCase();
};
const createApplication = (appArgs) => {
  const { appName, dir, options, done } = appArgs;
  if (dir !== ".") {
    mkdir(dir, ".");
  }

  // project directory create
  mkdir(dir, "bin");
  mkdir(dir, "routes");
  mkdir(dir, "views");
  mkdir(dir, "public");

  mkdir(dir, "public/js");
  mkdir(dir, "public/images");
  mkdir(dir, "public/css");

  // Package
  const packages = {
    name: appName,
    version: "0.0.0",
    private: true,
    type: "module",
    scripts: {
      start: "node ./bin/www.js",
    },
    dependencies: {},
  };

  // app.js.ejs file open
  const app = loadTemplate("ejs/app.js");
  const www = loadTemplate("ejs/www.js");

  // middleWare import and setting
  app.locals.importModulesList = {};
  app.locals.middleWareList = [];
  app.locals.sequelizeModuesList = {};

  // Request logger
  app.locals.importModulesList.logger = "morgan";
  app.locals.middleWareList.push("logger('dev')");

  // Body parsers
  app.locals.middleWareList.push("express.json()");
  app.locals.middleWareList.push("express.urlencoded({ extended: false })");

  // Cookie parser
  app.locals.importModulesList.cookieParser = "cookie-parser";
  app.locals.middleWareList.push("cookieParser()");

  // basic dependency add
  for (let dep of Object.keys(defaultDependency)) {
    packages.dependencies[dep] = defaultDependency[dep];
  }
  app.locals.middleWareList.push(`express.static(path.join("public"))`);

  // sample Router Setting
  app.locals.routerModules = {}; // routes import list
  app.locals.routerMounts = []; // router use setting list

  // Index router mount
  app.locals.routerModules.indexRouter = "../routes/index.js";
  app.locals.routerMounts.push({ path: "/", module: "indexRouter" });

  // User router mount
  app.locals.routerModules.usersRouter = "../routes/users.js";
  app.locals.routerMounts.push({ path: "/users", module: "usersRouter" });

  app.locals.view = { engine: options.view };
  packages.dependencies[options.view] = viewOptions[options.view];

  www.locals.appName = appName;

  // mysql sequelize enable
  if (options.sequelize) {
    app.locals.sequelizeModuesList.DB = "../models/index.js";
    packages.dependencies["sequelize"] = sequelizeOption.sequelize;
    packages.dependencies["mysql2"] = sequelizeOption.mysql2;

    mkdir(dir, "models");
    mkdir(dir, "config");
    copyTemplateMulti("models", dir + "/models", "*.js");
    copyTemplateMulti("models/config", dir + "/config", "*.js");
  }

  // package.json create
  packages.dependencies = sortedObject(packages.dependencies);

  // www.js, app.js write
  fileWrite(path.join(dir, "bin/app.js"), app.render());
  fileWrite(path.join(dir, "bin/www.js"), www.render(), MODE_0755);
  fileWrite(
    path.join(dir, "package.json"),
    JSON.stringify(packages, null, 2) + "\n"
  );

  // router copy
  copyTemplateMulti("routes", dir + "/routes", "*.js");

  // view copy
  if (options.view)
    copyTemplateMulti("views", dir + "/views", `*.${options.view}`);
  else copyTemplate("views/index.html", path.join(dir, "public/index.html"));

  copyTemplateMulti("javascript", dir + "/public/js", "*.js");
  copyTemplateMulti("images", dir + "/public/images", "*.*");

  // css templage copy
  if (options.css === true)
    copyTemplateMulti("css", dir + "/public/css", `*.css`);
  else if (typeof options.css === "string")
    copyTemplateMulti("css", dir + "/public/css", `*.${options.css}`);

  // CSS Engine support
  switch (options.css) {
    case "compass":
      app.locals.importModulesList.compass = "node-compass";
      app.locals.middleWareList.push("compass({ mode: 'expanded' })");
      packages.dependencies["node-compass"] = cssOptions.nodeCompass;
      break;
    case "less":
      app.locals.importModulesList.lessMiddleware = "less-middleware";
      app.locals.middleWareList.push(
        "lessMiddleware(path.join(__dirname, 'public'))"
      );
      packages.dependencies["less-middleware"] = cssOptions.lessMiddleware;
      break;
    case "sass":
      app.locals.importModulesList.sassMiddleware = "node-sass-middleware";
      app.locals.middleWareList.push(
        "sassMiddleware({\n  src: path.join(__dirname, 'public'),\n  dest: path.join(__dirname, 'public'),\n  indentedSyntax: true, // true = .sass and false = .scss\n  sourceMap: true\n})"
      );
      packages.dependencies["node-sass-middleware"] =
        cssOptions.nodeSassMmiddleware;
      break;
    case "stylus":
      app.locals.importModulesList.stylus = "stylus";
      app.locals.middleWareList.push(
        "stylus.middleware(path.join(__dirname, 'public'))"
      );
      packages.dependencies.stylus = cssOptions.stylus;
      break;
  }

  finish(dir, appName, app);
};

const isEmptyDir = (dir, cb) => {
  let fileContents;
  try {
    fileContents = fs.readdirSync(dir);
  } catch (err) {
    if (err && err.code !== "ENOENT") throw err;
  }
  return !fileContents || !fileContents.length;
};

const main = async (options, done) => {
  // top-level argument direction
  if (options["!"].length > 0) {
    helpMessage();
    consoleMessage("error", `unknown option '${options["!"][0]}' `);
  } else if (options.help) {
    helpMessage();
  } else if (options.version) {
    console.log("version:", VERSION);
  } else if (!options.css) {
    helpMessage();
    consoleMessage("error", `option '-c, --css <engine>' argument missing`);
  } else if (!options.view) {
    helpMessage();
    consoleMessage("error", `option '-v, --view <engine>' argument missing`);
  } else {
    // Path
    const destinationPath = options._[0] || ".";

    // App name
    const appName =
      createAppName(path.resolve(destinationPath)) || "hello-world";

    // --ejs, --pug, --hjs or--hbs option
    if (options.view === true) {
      options.view = options.ejs && "ejs";
      options.view = options.view || (options.pug && "pug");
      options.view = options.view || (options.hjs && "hjs");
      options.view = options.view || (options.hbs && "hbs");
      options.view = options.view || (options.hogan && "hogan");

      // 선택된 view 가 없으면 options.view 가 false 가 되므로
      // 기본값 설정을 위하여 true 로 다시 복귀한다
      options.view = options.view || true;
    }
    // 설정이 없으면 pug 를 기본 view 로 설정
    if (options.view === true) {
      options.view = "pug";
      consoleMessage(
        "warning",
        `option '--${options.view}' has been renamed to '--view=${options.view}'`
      );
    }

    // 이미 있는 디렉토리인지 검사
    const dirExists = isEmptyDir(destinationPath);
    const appArgs = {
      appName,
      dir: destinationPath,
      options,
      done,
    };

    if (dirExists || options.force) {
      createApplication(appArgs);
    } else {
      confirm("directory is not empty, continue? [y/N] ", (ok) => {
        ok || console.error("aborting");
        ok && createApplication(appArgs);
      });
    }
  }
};
const exit = (arg) => {};
main(args, exit);
