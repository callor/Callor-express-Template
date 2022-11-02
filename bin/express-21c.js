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
  mkdir(dir, "modules");
  mkdir(dir, "public");
  mkdir(dir, "public/javascripts");
  mkdir(dir, "public/images");
  mkdir(dir, "public/stylesheets");

  // app.js.ejs file open
  const app = loadTemplate("js/app.js");

  // app.js.ejs file Rendering Values
  app.locals.localModules = {};
  app.locals.modules = {};
  app.locals.mounts = [];
  app.locals.uses = [];

  app.locals.view = { engine: "ejs" };
  console.log(app.render());

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
    console.log("else", destinationPath);

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

      // 설정이 없으면 pug 를 기본 view 로 설정
      options.view = options.view || "pug";
    }
    if (options.view === true) {
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
