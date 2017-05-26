import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import path from 'path';
const $ = gulpLoadPlugins();

gulp.task("ajaxData", () => {
  gulp.src(['src/ajaxData.js'])
    .pipe($.babel({
      "presets": ["es2015"]
    }))
    .pipe($.replace("'use strict'", ''))
  	.pipe($.umd({
      dependencies: function(file) {
        return [{
          name: "",
          amd: ""
        }];
      },
      exports: function(file) {
        return 'ajaxData';
      },
      namespace: function(file) {
        return 'ajaxData';
      },
      template: path.join(__dirname, 'umd/umd.js')
    }))
    .pipe(gulp.dest(''))
    .pipe($.replace("'use strict'", ''))
    .pipe($.uglify())
    .pipe($.rename(function(path) {
      path.extname = ".min.js"
    }))
    .pipe(gulp.dest(''));
});

// 重新加载
const reload = browserSync.reload;

gulp.task('serve', ['ajaxData'], () => {
  browserSync({
    port: 900, //端口
    host: 'localhost',
    browser: ["chrome"], // 在chrome、firefix下打开该站点
    server: {
      baseDir: [''],
      index: 'index.html',
      routes: {}
    }
  })

  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('src/ajaxData.js', ['ajaxData']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server', ['serve'], () => {});
