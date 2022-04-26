//! DEPENDANCE
const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');

//? COMPILE SCSS, AUTOPREFIXER, CSSMAP
function scssTask(){

  console.log('\x1b[33m%s\x1b[0m', 'Compilation en cours...');

  return src('./styles/styles-noPurge/style.scss', { sourcemaps: true }) 
    .pipe(sass()) //* Compile SCSS
    .pipe(prefix('last 2 versions')) //* Autoprefixer CSS file
    .pipe(dest('./styles/styles-noPurge', { sourcemaps: '.' })) //* Create css file

    .on('end', function(){ console.log('\x1b[96m%s\x1b[0m', 'Compilation Done !'); });
};

//? PURGECSS, MINIFY CSS
function purgeTask(){

  console.log('\x1b[31m%s\x1b[0m', 'Purge css en cours...');

  return src('./styles/styles-noPurge/style.css', { sourcemaps: false }) 
    .pipe(purgecss({
      content: [
        './pages/*.html'
      ],
      extractors: [
          {
              extractor: content => {
                  return content.match(/[A-z0-9-:\/]+/g) || []
              },
              extensions: ['css', 'html']
          }
      ],
      safelist: ['/*! purgecss start ignore */', '/*! purgecss end ignore */']
    })) //* PURGE css file
    .pipe(minify()) //* Minify css file
    .pipe(dest('./styles/styles-purge')) //* Creat purge css file

    .on('end', function(){ console.log('\x1b[96m%s\x1b[0m', 'Purge Done !'); });
};

//? Watch
function watchTask(){
  watch(['./styles/styles-noPurge/style.scss'], series(scssTask, purgeTask));
  watch('./pages/*.html', purgeTask);
}

//? Default Gulp task 
exports.default = series(
  watchTask
);