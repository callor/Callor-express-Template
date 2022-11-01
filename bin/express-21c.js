#!/usr/bin/env node
/**
 * ES6+ module grammer create code
 * author callor@callor.com
 */
import ejs from "ejs";
import fs from "fs";
import minimatch from "minimatch";
import parseArgs from "minimist";
import mkdirp from "mkdirp";
import path from "path";
import readline from "readline";
import sortedObject from "sorted-object";
import util from "util";

// import packageJSON from "../package.json";
// const VERSION = packageJSON.version;
// console.log(VERSION);

const jsonFile = fs.readFileSync(
  "./package.json",
  "utf8",
  (error, jsonFile) => {}
);
const VERSION = JSON.parse(jsonFile).version;

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
    f: "force",
    h: "help",
    H: "hogan",
    v: "view",
  },
  boolean: ["ejs", "force", "git", "hbs", "help", "hogan", "pug", "version"],
  default: { css: true, view: true, pug: true, version: VERSION },
  string: ["css", "view"],
  unknown: function (s) {
    if (s.charAt(0) === "-") {
      unknown.push(s);
    }
  },
});

args["!"] = unknown;

const error = (message) => {
  console.error();
  message.split("\n").forEach(function (line) {
    console.error("  error: %s", line);
  });
  console.error();
};

const main = (options, done) => {
  // top-level argument direction
  if (options["!"].length > 0) {
    // usage();
    error(`unknown option '${options["!"][0]}' `);
    done(1);
  } else if (args.help) {
    // usage();
    done(0);
  } else if (args.version) {
    console.log(args.version);
    done(0);
  } else if (options.css === "") {
    // usage();
    error(`option '-c, --css <engine>' argument missing`);
    done(1);
  } else if (options.view === "") {
    // usage();
    error(`option '-v, --view <engine>' argument missing`);
    done(1);
  } else {
    // Path
    var destinationPath = options._[0] || ".";

    // App name
    var appName = createAppName(path.resolve(destinationPath)) || "hello-world";

    // View engine
    if (options.view === true) {
      if (options.ejs) {
        options.view = "ejs";
        warning(`option '--ejs' has been renamed to '--view=ejs'`);
      }

      if (options.hbs) {
        options.view = "hbs";
        warning("option `--hbs' has been renamed to `--view=hbs'");
      }

      if (options.hogan) {
        options.view = "hjs";
        warning("option `--hogan' has been renamed to `--view=hjs'");
      }

      if (options.pug) {
        options.view = "pug";
        warning("option `--pug' has been renamed to `--view=pug'");
      }
    }

    // Default view engine
    if (options.view === true) {
      warning(
        "the default view engine will not be jade in future releases\n" +
          "use `--view=jade' or `--help' for additional options"
      );
      options.view = "jade";
    }

    //   // Generate application
    //   emptyDirectory(destinationPath, function (empty) {
    //     if (empty || options.force) {
    //       createApplication(appName, destinationPath, options, done);
    //     } else {
    //       confirm("destination is not empty, continue? [y/N] ", function (ok) {
    //         if (ok) {
    //           process.stdin.destroy();
    //           createApplication(appName, destinationPath, options, done);
    //         } else {
    //           console.error("aborting");
    //           done(1);
    //         }
    //       });
    //     }
    //   });
  }
};

const exit = (arg) => {};
main(args, exit);

// around(program, "optionMissingArgument", (fn, args) => {
//   program.outputHelp();
//   fn.apply(this, args);
//   return { args: [], unknown: [] };
// });

// before(program, "outputHelp", function () {
//   // track if help was shown for unknown option
//   this._helpShown = true;
// });

// before(program, "unknownOption", function () {
//   // allow unknown options if help was shown, to prevent trailing error
//   this._allowUnknownOption = this._helpShown;

//   // show help if not yet shown
//   if (!this._helpShown) {
//     program.outputHelp();
//   }
// });

// // prettier-ignore
// program
// .name('express')
// .version(VERSION, '    --version')
// .usage('[options] [dir]')
// .option('-e, --ejs', 'add ejs engine support', renamedOption('--ejs', '--view=ejs'))
// .option('    --pug', 'add pug engine support', renamedOption('--pug', '--view=pug'))
// .option('    --hbs', 'add handlebars engine support', renamedOption('--hbs', '--view=hbs'))
// .option('-H, --hogan', 'add hogan.js engine support', renamedOption('--hogan', '--view=hogan'))
// .option('-v, --view <engine>', 'add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)')
// .option('    --no-view', 'use static html instead of view engine')
// .option('-c, --css <engine>', 'add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)')
// .option('    --git', 'add .gitignore')
// .option('-f, --force', 'force on non-empty directory')
// .parse(process.argv)
// if (!exit.exited) {
//   main();
// }

// /**
//  * Install an around function; AOP.
//  */

// function around(obj, method, fn) {
//   const old = obj[method];

//   obj[method] = function () {
//     const args = new Array(arguments.length);
//     for (const i = 0; i < args.length; i++) args[i] = arguments[i];
//     return fn.call(this, old, args);
//   };
// }

// /**
//  * Install a before function; AOP.
//  */

// function before(obj, method, fn) {
//   const old = obj[method];

//   obj[method] = function () {
//     fn.call(this);
//     old.apply(this, arguments);
//   };
// }

// /**
//  * Prompt for confirmation on STDOUT/STDIN
//  */

// function confirm(msg, callback) {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   rl.question(msg, function (input) {
//     rl.close();
//     callback(/^y|yes|ok|true$/i.test(input));
//   });
// }

// /**
//  * Copy file from template directory.
//  */

// function copyTemplate(from, to) {
//   write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), "utf-8"));
// }

// /**
//  * Copy multiple files from template directory.
//  */

// function copyTemplateMulti(fromDir, toDir, nameGlob) {
//   fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
//     .filter(minimatch.filter(nameGlob, { matchBase: true }))
//     .forEach(function (name) {
//       copyTemplate(path.join(fromDir, name), path.join(toDir, name));
//     });
// }

// /**
//  * Create application at the given directory.
//  *
//  * @param {string} name
//  * @param {string} dir
//  */

// function createApplication(name, dir) {
//   console.log();

//   // Package
//   const pkg = {
//     name: name,
//     version: "0.0.0",
//     type: "module",
//     scripts: {
//       start: "node ./bin/www.js",
//     },
//     dependencies: {
//       debug: "~4.3.4",
//       express: "~4.18.1",
//     },
//   };

//   // JavaScript
//   const app = loadTemplate("js/app.js");
//   const www = loadTemplate("js/www.js");

//   // App name
//   www.locals.name = name;

//   // App modules
//   app.locals.localModules = Object.create(null);
//   app.locals.modules = Object.create(null);
//   app.locals.mounts = [];
//   app.locals.uses = [];

//   // Request logger
//   app.locals.modules.logger = "morgan";
//   app.locals.uses.push("logger('dev')");
//   pkg.dependencies.morgan = "~1.10.0";

//   // Body parsers
//   app.locals.uses.push("express.json()");
//   app.locals.uses.push("express.urlencoded({ extended: false })");

//   // Cookie parser
//   app.locals.modules.cookieParser = "cookie-parser";
//   app.locals.uses.push("cookieParser()");
//   pkg.dependencies["cookie-parser"] = "~1.4.6";

//   if (dir !== ".") {
//     mkdir(dir, ".");
//   }

//   mkdir(dir, "public");
//   mkdir(dir, "public/javascripts");
//   mkdir(dir, "public/images");
//   mkdir(dir, "public/stylesheets");

//   // copy css templates
//   switch (program.css) {
//     case "less":
//       copyTemplateMulti("css", dir + "/public/stylesheets", "*.less");
//       break;
//     case "stylus":
//       copyTemplateMulti("css", dir + "/public/stylesheets", "*.styl");
//       break;
//     case "compass":
//       copyTemplateMulti("css", dir + "/public/stylesheets", "*.scss");
//       break;
//     case "sass":
//       copyTemplateMulti("css", dir + "/public/stylesheets", "*.sass");
//       break;
//     default:
//       copyTemplateMulti("css", dir + "/public/stylesheets", "*.css");
//       break;
//   }

//   // copy route templates
//   mkdir(dir, "routes");
//   copyTemplateMulti("js/routes", dir + "/routes", "*.js");

//   if (program.view) {
//     // Copy view templates
//     mkdir(dir, "views");
//     pkg.dependencies["http-errors"] = "~1.8.0";
//     switch (program.view) {
//       case "dust":
//         copyTemplateMulti("views", dir + "/views", "*.dust");
//         break;
//       case "ejs":
//         copyTemplateMulti("views", dir + "/views", "*.ejs");
//         break;
//       case "hbs":
//         copyTemplateMulti("views", dir + "/views", "*.hbs");
//         break;
//       case "hjs":
//         copyTemplateMulti("views", dir + "/views", "*.hjs");
//         break;
//       case "jade":
//         copyTemplateMulti("views", dir + "/views", "*.jade");
//         break;
//       case "pug":
//         copyTemplateMulti("views", dir + "/views", "*.pug");
//         break;
//       case "twig":
//         copyTemplateMulti("views", dir + "/views", "*.twig");
//         break;
//       case "vash":
//         copyTemplateMulti("views", dir + "/views", "*.vash");
//         break;
//     }
//   } else {
//     // Copy extra public files
//     copyTemplate("js/index.html", path.join(dir, "public/index.html"));
//   }

//   // CSS Engine support
//   switch (program.css) {
//     case "compass":
//       app.locals.modules.compass = "node-compass";
//       app.locals.uses.push("compass({ mode: 'expanded' })");
//       pkg.dependencies["node-compass"] = "0.2.4";
//       break;
//     case "less":
//       app.locals.modules.lessMiddleware = "less-middleware";
//       app.locals.uses.push("lessMiddleware(path.join('./public'))");
//       pkg.dependencies["less-middleware"] = "~3.1.1";
//       break;
//     case "sass":
//       app.locals.modules.sassMiddleware = "node-sass-middleware";
//       app.locals.uses.push(
//         "sassMiddleware({\n  src: path.join('./public'),\n dest: path.join('./public'),\n  indentedSyntax: true, // true = .sass and false = .scss\n  sourceMap: true\n})"
//       );
//       pkg.dependencies["node-sass-middleware"] = "0.11.0";
//       break;
//     case "stylus":
//       app.locals.modules.stylus = "stylus";
//       app.locals.uses.push("stylus.middleware(path.join('./public'))");
//       pkg.dependencies["stylus"] = "0.54.8";
//       break;
//   }

//   // Index router mount
//   app.locals.localModules.indexRouter = "./routes/index.js";
//   app.locals.mounts.push({ path: "/", code: "indexRouter" });

//   // User router mount
//   app.locals.localModules.usersRouter = "./routes/users.js";
//   app.locals.mounts.push({ path: "/users", code: "usersRouter" });

//   // Template support
//   switch (program.view) {
//     case "dust":
//       app.locals.modules.adaro = "adaro";
//       app.locals.view = {
//         engine: "dust",
//         render: "adaro.dust()",
//       };
//       pkg.dependencies.adaro = "~1.0.4";
//       break;
//     case "ejs":
//       app.locals.view = { engine: "ejs" };
//       pkg.dependencies.ejs = "~3.1.5";
//       break;
//     case "hbs":
//       app.locals.view = { engine: "hbs" };
//       pkg.dependencies.hbs = "~4.1.1";
//       break;
//     case "hjs":
//       app.locals.view = { engine: "hjs" };
//       pkg.dependencies.hjs = "~0.0.6";
//       break;
//     case "jade":
//       app.locals.view = { engine: "jade" };
//       pkg.dependencies.jade = "~1.11.0";
//       break;
//     case "pug":
//       app.locals.view = { engine: "pug" };
//       pkg.dependencies.pug = "3.0.2";
//       break;
//     case "twig":
//       app.locals.view = { engine: "twig" };
//       pkg.dependencies.twig = "~0.10.3";
//       break;
//     case "vash":
//       app.locals.view = { engine: "vash" };
//       pkg.dependencies.vash = "~0.12.6";
//       break;
//     default:
//       app.locals.view = false;
//       break;
//   }

//   // Static files
//   app.locals.uses.push("express.static(path.join('./public'))");

//   if (program.git) {
//     copyTemplate("js/gitignore", path.join(dir, ".gitignore"));
//   }

//   // sort dependencies like npm(1)
//   pkg.dependencies = sortedObject(pkg.dependencies);

//   // write files
//   write(path.join(dir, "app.js"), app.render());
//   write(path.join(dir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
//   mkdir(dir, "bin");
//   write(path.join(dir, "bin/www.js"), www.render(), MODE_0755);

//   const prompt = launchedFromCmd() ? ">" : "$";

//   if (dir !== ".") {
//     console.log();
//     console.log("   change directory:");
//     console.log("     %s cd %s", prompt, dir);
//   }

//   console.log();
//   console.log("   install dependencies:");
//   console.log("     %s npm install", prompt);
//   console.log();
//   console.log("   run the app:");

//   if (launchedFromCmd()) {
//     console.log("     %s SET DEBUG=%s:* & npm start", prompt, name);
//   } else {
//     console.log("     %s DEBUG=%s:* npm start", prompt, name);
//   }

//   console.log();
// }

// /**
//  * Create an app name from a directory path, fitting npm naming requirements.
//  *
//  * @param {String} pathName
//  */

// function createAppName(pathName) {
//   return path
//     .basename(pathName)
//     .replace(/[^A-Za-z0-9.-]+/g, "-")
//     .replace(/^[-_.]+|-+$/g, "")
//     .toLowerCase();
// }

// /**
//  * Check if the given directory `dir` is empty.
//  *
//  * @param {String} dir
//  * @param {Function} fn
//  */

// function emptyDirectory(dir, fn) {
//   fs.readdir(dir, function (err, files) {
//     if (err && err.code !== "ENOENT") throw err;
//     fn(!files || !files.length);
//   });
// }

// /**
//  * Graceful exit for async STDIO
//  */

// function exit(code) {
//   // flush output for Node.js Windows pipe bug
//   // https://github.com/joyent/node/issues/6247 is just one bug example
//   // https://github.com/visionmedia/mocha/issues/333 has a good discussion
//   function done() {
//     if (!draining--) _exit(code);
//   }

//   const draining = 0;
//   const streams = [process.stdout, process.stderr];

//   exit.exited = true;

//   streams.forEach(function (stream) {
//     // submit empty write request and wait for completion
//     draining += 1;
//     stream.write("", done);
//   });

//   done();
// }

// /**
//  * Determine if launched from cmd.exe
//  */

// function launchedFromCmd() {
//   return process.platform === "win32" && process.env._ === undefined;
// }

// /**
//  * Load template file.
//  */

// function loadTemplate(name) {
//   const contents = fs.readFileSync(
//     path.join(__dirname, "..", "templates-module", name + ".ejs"),
//     "utf-8"
//   );
//   const locals = Object.create(null);

//   function render() {
//     return ejs.render(contents, locals, {
//       escape: util.inspect,
//     });
//   }

//   return {
//     locals: locals,
//     render: render,
//   };
// }

// /**
//  * Main program.
//  */

// function main() {
//   // Path
//   const destinationPath = program.args.shift() || ".";

//   // App name
//   const appName = createAppName(path.resolve(destinationPath)) || "hello-world";

//   console.log(program.view);
//   // View engine
//   if (program.view === true) {
//     if (program.ejs) program.view = "ejs";
//     if (program.hbs) program.view = "hbs";
//     if (program.hogan) program.view = "hjs";
//     if (program.jade) program.view = "jade";
//     if (program.pug) program.view = "pug";
//   }

//   // Default view engine
//   if (program.view === true) {
//     warning(
//       "the default view engine will not be pug in future releases\n" +
//         "use `--view=pug' or `--help' for additional options"
//     );
//     program.view = "pug";
//   }

//   // Generate application
//   emptyDirectory(destinationPath, function (empty) {
//     if (empty || program.force) {
//       createApplication(appName, destinationPath);
//     } else {
//       confirm("destination is not empty, continue? [y/N] ", function (ok) {
//         if (ok) {
//           process.stdin.destroy();
//           createApplication(appName, destinationPath);
//         } else {
//           console.error("aborting");
//           exit(1);
//         }
//       });
//     }
//   });
// }

// /**
//  * Make the given dir relative to base.
//  *
//  * @param {string} base
//  * @param {string} dir
//  */

// function mkdir(base, dir) {
//   const loc = path.join(base, dir);

//   console.log("   \x1b[36mcreate\x1b[0m : " + loc + path.sep);
//   mkdirp.sync(loc, MODE_0755);
// }

// /**
//  * Generate a callback function for commander to warn about renamed option.
//  *
//  * @param {String} originalName
//  * @param {String} newName
//  */

// function renamedOption(originalName, newName) {
//   return function (val) {
//     warning(
//       util.format("option `%s' has been renamed to `%s'", originalName, newName)
//     );
//     return val;
//   };
// }

// /**
//  * Display a warning similar to how errors are displayed by commander.
//  *
//  * @param {String} message
//  */

// function warning(message) {
//   console.error();
//   message.split("\n").forEach(function (line) {
//     console.error("  warning: %s", line);
//   });
//   console.error();
// }

// /**
//  * echo str > file.
//  *
//  * @param {String} file
//  * @param {String} str
//  */

// function write(file, str, mode) {
//   fs.writeFileSync(file, str, { mode: mode || MODE_0666 });
//   console.log("   \x1b[36mcreate\x1b[0m : " + file);
// }
