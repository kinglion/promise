var gulp = require('gulp');
var filter = require('gulp-filter');
var kclean = require('gulp-kclean');
var modulex = require('gulp-modulex');
var path = require('path');
var rename = require('gulp-rename');
var packageInfo = require('./package.json');
var src = path.resolve(process.cwd(), 'lib');
var build = path.resolve(process.cwd(), 'build');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var replace = require('gulp-replace');

gulp.task('lint', function () {
    return gulp.src('./lib/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('clean', function () {
    return gulp.src(build, {
        read: false
    }).pipe(clean());
});

gulp.task('build', ['lint'], function () {
    var tag = 'promise';
    return gulp.src('./lib/' + tag + '.js')
        .pipe(modulex({
            modulex: {
                packages: {
                    'promise': {
                        base: path.resolve(src, tag)
                    }
                }
            }
        }))
        .pipe(kclean({
            files: [
                {
                    src: './lib/' + tag + '-debug.js',
                    outputModule:  tag
                }
            ]
        }))
        .pipe(replace(/@VERSION@/g, packageInfo.version))
        .pipe(gulp.dest(path.resolve(build)))
        .pipe(filter(tag + '-debug.js'))
        .pipe(replace(/@DEBUG@/g, ''))
        .pipe(uglify())
        .pipe(rename(tag + '.js'))
        .pipe(gulp.dest(path.resolve(build)));
});

gulp.task('build-standalone', ['build'], function () {
    return gulp.src('./build/promise-debug.js')
        .pipe(kclean({
            files: [
                {
                    src: './build/promise-debug.js',
                    wrap: {
                        start: 'var XPromise = (function(){ var module = {};\n',
                        end: '\nreturn __promise__;\n})();'
                    }
                }
            ]
        }))
        .pipe(rename('promise-standalone-debug.js'))
        .pipe(replace(/@VERSION@/g, packageInfo.version))
        .pipe(gulp.dest(path.resolve(build)))
        .pipe(filter('promise-standalone-debug.js'))
        .pipe(replace(/@DEBUG@/g, ''))
        .pipe(uglify())
        .pipe(rename('promise-standalone.js'))
        .pipe(gulp.dest(path.resolve(build)));
});

gulp.task('default', ['build','build-standalone']);