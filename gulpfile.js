// gulp load (gulp modules 호출)
var gulp = require('gulp');

// gulp 의 concat 패키지 로드
var concat = require('gulp-concat');

// uglify 플러그인 로드(호출)
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');

// gulp.task()를 사용해 gulp-concat 업무 수행을 정의
gulp.task('concat:js', function () {
    return gulp
        .src('src/ae.js')
        .pipe(sourcemaps.init())
        .pipe(concat('ae.js'))
        .pipe(gulp.dest('dist'))
        .pipe(concat('ae.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['concat:js']);