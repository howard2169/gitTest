var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');



gulp.task('clean', function() {
    return gulp.src(['app/build/scripts/*'])
        .pipe(clean());
});

gulp.task('cleanCss', function() {
    return gulp.src(['app/build/css/*'])
        .pipe(clean());
});

gulp.task('cleanImage', function() {
    return gulp.src(['app/build/images/*'])
        .pipe(clean());
});


// depend on clean
gulp.task('minify', ['clean', 'build:js', 'build:css', 'build:vendor'], function() {
    // js
    console.log('build minify complete !!');
});


gulp.task('build:vendor', function() {
    // js
    return gulp.src(['bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-ui-router/angular-ui-router.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/tessera/tessera.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('app/build/scripts/'));

});

gulp.task('build:css', ['cleanCss'], function() {
    return gulp.src('app/styles/*.css')
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('app/build/css/'));
});

gulp.task('build:js', function() {
    // js
    return gulp.src(['app/scripts/controllers/*.js', 'app/scripts/utils/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(concat('builds.js'))
        .pipe(gulp.dest('app/build/scripts/'));
});

gulp.task('build:imageMin', ['cleanImage'], function () {
    return gulp.src('app/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/build/images'));
});

gulp.task('default', function() {
    console.log('123');


});

var watcher = gulp.task("watch", function() {
    gulp.watch('app/scripts/**/*.js', ['minify', 'default']);
});

watcher.on('change', function(event) {
    console.log(event.path);
    console.log(event.type);
});
