let base = ".";
const setting = {
    server:{
        port: 4000,
        base: base
    },
    php: {
        src: base + "/**/*.php",
    },    
    css: {
        src: base + "/assets/scss/**/*.scss",
        dest: base + "/assets/css",
    },
    js: {
        src: base + "/assets/js/**/*.js"
    }
};


const gulp         = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require("browser-sync");
const del          = require('del');
const phpConnect   = require('gulp-connect-php');

let server = new phpConnect();

//Php connect
function connectsync() {
    server.server({        
        port: setting.server.port,
        keepalive: true,
        base: setting.server.base,
    }, function (){
        browserSync({
            url: "localhost",
            port: setting.server.port,
            //proxy: "localhost:" + setting.server.port
            proxy: "jetro.cd"
        });
    });  
}

function disconnect() {
    server.closeServer();
}

// BrowserSync Reload
function browserReload(done) {
    browserSync.reload();
    done();
}

//compile scss into css
function style() {
    return gulp.src(setting.css.src)
    .pipe(sass().on('error', sass.logError)) 
    .pipe(gulp.dest(setting.css.dest))
    .pipe(browserSync.stream());
}

// Watch files
function backEnd() {
    gulp.watch(setting.css.src, style);
    gulp.watch(setting.php.src, browserReload);
    gulp.watch(setting.js.src, browserReload);
}

// define complex tasks
const BackEnd = gulp.parallel([backEnd, connectsync, disconnect]);
exports.default = BackEnd;