//! DEPENDANCE
const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');

// Custom extractor for purgeCSS, to avoid stripping classes with `:` prefixes
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

//? compile, prefix, and min scss
function scssTask(){

  console.log('\x1b[33m%s\x1b[0m', 'Compilation en cours...');

  return src('./styles/style.scss', { sourcemaps: false }) 
    .pipe(sass()) //* Compile le fichier sass en css
    .pipe(prefix('last 2 versions')) //* Autoprefixer le fichier css
    .pipe(dest('./styles')) //* Créer le fichier css

    .on('end', function(){ console.log('\x1b[96m%s\x1b[0m', 'Compilation Done !'); });
};

//? Purge css
function purgeTask(){

  console.log('\x1b[33m%s\x1b[0m', 'Purge css en cours...');

  return src('./styles/style.css', { sourcemaps: true }) 
    .pipe(purgecss({
      content: [
        './*.html'
      ],
      extractors: [
          {
              extractor: content => {
                  return content.match(/[A-z0-9-:\/]+/g) || []
              },
              extensions: ['css', 'html']
          }
      ],
    }))
    .pipe(dest('./')) //* Créer le fichier css

    .on('end', function(){ console.log('\x1b[96m%s\x1b[0m', 'Purge Done !'); });
};

//? Watch
function watchTask(){
  watch(['./styles/style.scss'], series(scssTask, purgeTask));
  watch('./*.html', purgeTask);
}

//? Default Gulp task 
exports.default = series(
  watchTask
);