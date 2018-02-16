var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var log = require('fancy-log')
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function() {
    gulp.src(
        ['src/assets/scss/**/*.scss','!' + 'src/assets/scss/**/_*.scss']
    )
    .pipe(sass()).on('error', sass.logError)  //.on('error', sass.logError)を追加
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('ejs', function() {
    gulp.src(
        ['src/assets/ejs/**/*.ejs','!' + 'src/assets/ejs/**/_*.ejs'] //冒頭_のファイルは除外
    )
    .pipe(ejs({
        msg: 'ejs Error!'
    }).on('error', log))
    .pipe(rename(function (path) {
        path.extname = ".html"
      }))
    .pipe(gulp.dest('src'))
});


// src 配下の *.html, *.css ファイルが変更されたリロード。
gulp.task('default', ['sass', 'ejs'], function () {
    gulp.watch('src/assets/scss/**/*.scss', ['sass']);
    gulp.watch('src/assets/ejs/**/*.ejs', ['ejs']);
});
