var postcss = require('gulp-postcss');
var gulp = require('gulp');
var rename= require('gulp-rename');
var autoprefixer = require('autoprefixer');
var flexbox= require('postcss-flexbox')
gulp.task('css', function () {
    var processors = [

        flexbox,
        autoprefixer,
    ];
    return gulp.src('./public/cssin/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/cssout'));
});