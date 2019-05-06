const   gulp=require('gulp'),
        uglify=require('gulp-uglify'),
        minifyCss=require('gulp-minify-css'),
        gulpSass=require('gulp-sass'),
        htmlmin=require('gulp-htmlmin');
//js
const  babel=require('gulp-babel');
//服务器
const  connect=require('gulp-connect');


//制定css任务   
        /*
            1.编译SCSS
            2.压缩CSS
        */ 
gulp.task('css',()=>{
    /*
        src     :取源文件
        pipe    :管道（文件传输的过程)，可以在过程中对文件处理
        dest    :destination (目的地)管道中处理完后放到目标文件夹dest里
    */
    gulp.src('src/css/*.scss')
        .pipe(gulpSass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())

})
//制定html任务
gulp.task('html',()=>{
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS:true,//压缩页面JS
            minifyCSS:true//压缩页面CSS
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())

})
//制定js任务
gulp.task('js',()=>{
    /*
       ES6转ES5
    */
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())

})
//制定libs任务
gulp.task('libs',()=>{
    //libs中是文件移动到dist里
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'));


})
//制定images任务
gulp.task('images',()=>{
    //libs中是文件移动到dist里
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
})

// gulp.watch :制定一个监听任务(耗费资源)
gulp.task('watch',()=>{
    //监听所有的html文件，一旦修改html,就执行
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/css/**/*.scss',['css']);
})

//制定一个开启服务器的任务
gulp.task('server',()=>{
    connect.server({
        root:"dist",
        port:2222,//配置端口号
        livereload:true//实时更新
    });
})
//把任务集中执行 default必须有，是默认要执行的任务
gulp.task('default',["html","css","js","libs","images","server","watch"]);
