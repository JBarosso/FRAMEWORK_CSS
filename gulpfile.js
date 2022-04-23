//! DEPENDANCE
const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');


//? compile, prefix, and min scss
function compilescss(filePath) {
  
  console.log('\x1b[33m%s\x1b[0m', 'Compilation en cours sur le fichier: '+ filePath);
  console.log('\x1b[33m%s\x1b[0m', '... ');

  return src(filePath, { sourcemaps: true }) 
    .pipe(sass()) //* Compile le fichier sass en css
    .pipe(prefix('last 2 versions')) //* Autoprefixer le fichier css
    // .pipe(minify()) //* Minify le fichier css

    .pipe(rename(function(filePath) {
      filePath.dirname = filePath.dirname.replace(/SASS$/, "./"); //* Permet d'avoir le dossier du fichier .scss
    }))

    .pipe(dest('./', { sourcemaps: '.' })) //* Créer le fichier css

    .on('end', function(){ console.log('\x1b[96m%s\x1b[0m', 'Compilation Done !'); });
};

//? watchtask
function watchTask(){

  console.log('\x1b[96m%s\x1b[0m', 'Watching...');
  console.log('\x1b[31m%s\x1b[0m', 'Ctrl + C pour stop le watching');
  // watch('**/SASS/*.scss', compilescss); 

  const watcher = watch(['**/SASS/*.scss']); //* Chemin vers les fichiers à regarder

  watcher.on('change', function(path, stats) {
    compilescss(path); //* Au changement d'un fichier prend un paramètre le chemin
  });
}

//? Default Gulp task 
exports.default = series(
  watchTask
);