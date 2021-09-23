const { src, dest, series, watch } = require("gulp");
const gulpTcm = require("gulp-typed-css-modules");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const path = require("path");
const clean = require("gulp-clean");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const reporter = require("postcss-reporter");
const syntaxScss = require("postcss-scss");
const stylelint = require("stylelint");
const cssnano = require("cssnano");

// // Stylelint config rules
const stylelintConfig = require("./.stylelintrc.json");

const basePaths = {
  src: path.resolve(__dirname, "src"),
  lib: path.resolve(__dirname, "lib"),
  node: path.resolve(__dirname, "**/node_modules/**/*"),
};

function clear() {
  return src([`${basePaths.lib}/*`]).pipe(clean());
}

clear.displayName = "Clear lib folder";

function compileSCSSModules() {
  return src(`${basePaths.src}/**/*.s+(a|c)ss`)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename((_path) => {
        _path.dirname = "";
        _path.basename = `${_path.basename}.module`;
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(dest(`${basePaths.lib}`));
}

function lintCssTask(cb) {
  const processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: true,
    }),
  ];

  return src([`${basePaths.src}/**/*.scss`]).pipe(
    postcss(processors, { syntax: syntaxScss })
  );
}

function typedCssModules() {
  return src([`${basePaths.lib}/**/*.css`], { base: "." })
    .pipe(
      gulpTcm({
        camelCase: true,
      })
    )
    .pipe(dest(`./`));
}

const defaultTask = series(clear, lintCssTask, compileSCSSModules);

exports.watch = function () {
  watch(
    `${basePaths.src}/**/*.s+(a|c)ss`,
    { ignoreInitial: false, ignored: basePaths.node },
    series(defaultTask, typedCssModules)
  );
};
exports.build = defaultTask;
exports.default = defaultTask;
