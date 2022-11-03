#!/usr/bin/env node
/**
 * ES6+ module grammer create code
 * author callor@callor.com
 */
import ejs from "ejs";
import fs from "fs";
import minimatch from "minimatch";
import parseArgs from "minimist";
import path from "path";

import sortedObject from "sorted-object";

import helpMessage from "../modules/help.js";
import {
  confirm,
  mkdir,
  fileWrite,
  finish,
  loadTemplate,
  copyTemplate,
  copyTemplateMulti,
} from "../modules/public_module.js";

// import packageJSON from "../package.json";
// const VERSION = packageJSON.version;
// console.log(VERSION);

const jsonFile = fs.readFileSync(
  "./package.json",
  "utf8",
  (error, jsonFile) => {}
);
const VERSION = JSON.parse(jsonFile).version;
console.log("VERSION", VERSION);

const MODE_0666 = parseInt("0666", 8);
const MODE_0755 = parseInt("0755", 8);
const TEMPLATE_DIR = path.join("..", "templates-module");

// const _exit = process.exit;

// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
// process.exit = exit;

// CLI

const unknown = [];
const args = parseArgs(process.argv.slice(2), {
  alias: {
    c: "css",
    e: "ejs",
    p: "pug",
    H: "html",
    f: "force",
    h: "help",
    v: "view",
  },
  boolean: [
    "ejs",
    "force",
    "git",
    "hbs",
    "help",
    "hogan",
    "pug",
    "html",
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

console.log("View", args.view, args.ejs, args.pug);

args["!"] = unknown;
const consoleMessage = (type, message) => {
  console.error();
  message.split("\n").forEach(function (line) {
    console.error(`  ${type}: %s`, line);
  });
  console.error();
};
const warning = (message) => {
  console.error();
  message.split("\n").forEach(function (line) {
    console.error("  warning: %s", line);
  });
  console.error();
};

const createAppName = (pathName) => {
  return path
    .basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, "-")
    .replace(/^[-_.]+|-+$/g, "")
    .toLowerCase();
};
const createApplication = (appArgs) => {
  const { appName, dir, options, done } = appArgs;
  console.log("dir", dir);
  if (dir !== ".") {
    mkdir(dir, ".");
  }

  // project directory create
  mkdir(dir, "bin");
  mkdir(dir, "routes");
  mkdir(dir, "views");
  mkdir(dir, "public");
  mkdir(dir, "modules");

  mkdir(dir, "public/js");
  mkdir(dir, "public/images");
  mkdir(dir, "public/css");

  // Package
  const packages = {
    name: appName,
    version: "0.0.0",
    private: true,
    scripts: {
      start: "node ./bin/www",
    },
    dependencies: {
      debug: "~2.6.9",
      express: "~4.17.1",
    },
  };

  // app.js.ejs file open
  const app = loadTemplate("js/app.js");
  const www = loadTemplate("js/www.js");

  // app.js.ejs file Rendering Values

  // middleWare import and setting
  app.locals.importModulesList = {};
  app.locals.middleWareList = [];

  // Request logger
  app.locals.importModulesList.logger = "morgan";
  app.locals.middleWareList.push("logger('dev')");
  packages.dependencies.morgan = "~1.10.0";

  // Body parsers
  app.locals.middleWareList.push("express.json()");
  app.locals.middleWareList.push("express.urlencoded({ extended: false })");

  // Cookie parser
  app.locals.importModulesList.cookieParser = "cookie-parser";
  app.locals.middleWareList.push("cookieParser()");
  packages.dependencies["cookie-parser"] = "~1.4.5";

  // sample Router Setting
  app.locals.routerModules = {}; // routes import list
  app.locals.routerMounts = []; // router use setting list

  // Index router mount
  app.locals.routerModules.indexRouter = "./routes/index";
  app.locals.routerMounts.push({ path: "/", module: "indexRouter" });

  // User router mount
  app.locals.routerModules.usersRouter = "./routes/users";
  app.locals.routerMounts.push({ path: "/users", module: "usersRouter" });

  app.locals.view = { engine: options.view };

  www.locals.appName = appName;

  // www.js, app.js write
  fileWrite(path.join(dir, "bin/app.js"), app.render());
  fileWrite(path.join(dir, "bin/www.js"), www.render(), MODE_0755);

  // css templage copy
  if (options.css === true)
    copyTemplateMulti("css", dir + "/public/css", `*.css`);
  else if (typeof options.css === "string")
    copyTemplateMulti("css", dir + "/public/css", `*.${options.css}`);

  // router copy
  copyTemplateMulti("js/routes", dir + "/routes", "*.js");

  // view copy
  console.log("View", options.view);
  if (options.view)
    copyTemplateMulti("views", dir + "/views", `*.${options.view}`);
  else copyTemplate("views/index.html", path.join(dir, "public/index.html"));

  finish(dir, appName);
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

    // --ejs, --pug, --html, --hbs or --pug option
    if (options.view === true) {
      options.view = options.ejs && "ejs";
      options.view = options.pug && "pug";
      options.view = options.html && "html";
      options.view = options.hjs && "hjs";
      options.view = options.hbs && "hbs";
      options.view = options.hogan && "hogan";
    } else {
      options.view = "pug";
    }
    if (options.view === true) {
      // 설정이 없으면 pug 를 기본 view 로 설정
      options.view = "pug";
      consoleMessage(
        "warning",
        `option '--${options.view}' has been renamed to '--view=${options.view}'`
      );
    }
    console.log(options.view);

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
