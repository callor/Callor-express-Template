export default () => {
  console.log("");
  console.log("  Usage: express-21c [options] [dir]");
  console.log("");
  console.log("  Options:");
  console.log("");
  console.log("    -e, --ejs            add ejs engine support");
  console.log("    -p  --pug            add pug engine support");
  console.log("    -H  --html           add ejs engine & html file  support");
  console.log("        --hbs            add handlebars engine support");
  console.log("        --hogan          add hogan.js engine support");
  console.log(
    "    -v, --view <engine>  add view <engine> support (dust|ejs|html|pug|hbs|hogan) (defaults to pug)"
  );
  console.log(
    "        --no-view        use static html instead of view engine"
  );
  console.log(
    "    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)"
  );
  console.log("        --git            add .gitignore");
  console.log("    -f, --force          force on non-empty directory");
  console.log("    --version            output the version number");
  console.log("    -h, --help           output usage information");
};
