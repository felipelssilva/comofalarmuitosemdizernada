const { series, src, dest, watch } = require('gulp');
const del = require('del');
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function clean(callback) {
    callback();
    return del.sync([
        'public/*'
    ]);
}

function js(callback) {
    callback();

    if (process.argv[3] === '--dev') {
        return src('src/js/**/*.js', { ignoreInitial: false })
            .pipe(jshint({ esversion: 9 }))
            .pipe(jshint.reporter('default', { verbose: true }))
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(concat('bundle.min.js'))
            .pipe(dest('public/js'))
    } else {
        return src('src/js/**/*.js', { ignoreInitial: false })
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(uglify())
            .pipe(concat('bundle.min.js'))
            .pipe(dest('public/js'))
    }
}

function css(callback) {
    callback();
    if (process.argv[3] === '--dev') {
        return src('src/scss/index.scss')
            .pipe(sass().on("error", sass.logError))
            .pipe(concat('bundle.min.css'))
            .pipe(dest('public/css'));
    } else {
        return src('src/scss/index.scss')
            .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
            .pipe(concat('bundle.min.css'))
            .pipe(dest('public/css'));
    }
}

function watcherCss(callback) {
    callback();
    return watch('src/scss/**/*', { ignoreInitial: false }, series(css));
}

function watcherJs(callback) {
    callback();
    return watch('src/js/**/*', { ignoreInitial: false }, series(js));
}

exports.watch = series(clean, watcherJs, watcherCss);
exports.default = series(clean, js, css);