// generated on 2015-11-17 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('uglify',  () => {
  return gulp.src(['app/js/**/*.js'])
    .pipe(gulp.dest('./dist'))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.rename({extname: ".min.js"})))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({stream: true}));
});

gulp.task('html',  () => {
  return gulp.src(['app/**/*.html'])
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

// 压缩全局JS文件并指向dist
gulp.task("json", () => {
  return gulp.src(['./app/json/**/*.json'])
    .pipe(gulp.dest('dist/json/'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', [ 'uglify',  'html', 'json'], () => {
  browserSync({
    notify: false,
    open:true,
    port: 9000,
    browser: "google chrome",
    //reloadDelay: 20000, // 延迟20000毫秒重新加载
    server: {
      baseDir: ['dist'],
      routes: {
        '/bower_components': '../../../../bower_components'
      }
    }
  });

  gulp.watch([
    'app/**/*.html'
  ]).on('change', reload);

  gulp.watch(['app/**/*.html', 'app/js/**/*.js'], [ 'html', 'uglify']);
  gulp.watch('app/json/**/*.json', ['json']);
});







