import path from "path";
import fs from "fs";
import readline from "readline";
import mkdirp from "mkdirp";

// ejs file render
import ejs from "ejs";
// ESCAPE
import util from "util";

const MODE_0666 = parseInt("0666", 8);
const MODE_0755 = parseInt("0755", 8);

// console confirm blocking input
const confirm = async (msg, cb) => {
  const keyInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  keyInput.question(msg, (key) => {
    keyInput.close();
    cb(/^y|yes|ok|true$/i.test(key));
  });
};

const mkdir = (base, dir) => {
  const loc = path.join(base, dir);

  // Ansi Console Text
  console.log("   \x1b[36mcreate\x1b[0m : " + loc + path.sep);
  mkdirp.sync(loc, MODE_0755);
};

const loadTemplate = (tempName) => {
  const contents = fs.readFileSync(
    path.join("templates", tempName + ".ejs"),
    "utf-8"
  );
  const locals = {}; // Object.create(null);
  const render = () => {
    return ejs.render(contents, locals, {
      escape: util.inspect,
    });
  };

  return {
    locals: locals,
    render: render,
  };
};

const fileWrite = (file, str, mode) => {
  fs.writeFileSync(file, str, { mode: mode || MODE_0666 });
  console.log("   \x1b[36mcreate\x1b[0m : " + file);
};

const finish = (dir, appName) => {
  const launchedCmd =
    process.platform === "win32" && process.env._ === undefined;

  const prompt = launchedCmd ? ">" : "$";

  if (dir !== ".") {
    console.log();
    console.log("   change directory:");
    console.log("     %s cd %s", prompt, dir);
  }

  console.log();
  console.log("   install dependencies:");
  console.log("     %s npm install", prompt);
  console.log();
  console.log("   run the app:");

  if (launchedCmd) {
    console.log("     %s SET DEBUG=%s:* & npm start", prompt, appName);
  } else {
    console.log("     %s DEBUG=%s:* npm start", prompt, appName);
  }
};

export { confirm, mkdir, loadTemplate, fileWrite, finish };
