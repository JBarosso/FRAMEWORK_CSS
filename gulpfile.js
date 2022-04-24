//! DEPENDANCE
const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');

//? compile, prefix, and min scss
function scssTask(){

  console.log('\x1b[33m%s\x1b[0m', 'Compilation en cours...');

  return src('./styles/styles-noPurge/style.scss', { sourcemaps: true }) 
    .pipe(sass()) //* Compile le fichier sass en css
    .pipe(prefix('last 2 versions')) //* Autoprefixer le fichier css
    .pipe(dest('./styles/styles-noPurge', { sourcemaps: '.' })) //* Créer le fichier css

    .on('end', function(){ console.log('\x1b[96m%s\x1b[0m', 'Compilation Done !'); });
};

//? Purge css
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
      safelist: ['menu-open']
    }))
    .pipe(minify())
    .pipe(dest('./styles/styles-purge')) //* Créer le fichier css purgé

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