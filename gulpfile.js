import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

// extraer sass y usarlo
const sass = gulpSass(dartSass);

// compilar js
export function js(done) {
  src("src/js/app.js").pipe(dest("build/js"));

  done();
}

// compilar sass
export function css(done) {
  src("src/scss/app.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("build/css", { sourcemaps: true }));

  done();
}

// observa el archivo y cuando haya cambios ejecuta la funcion de css
export function dev() {
  watch("src/scss/**/*.scss", css); // ** -> buscar en todas las carpetas que esten dentro de scss.  * -> todos los archivos que tengan la extension scss
  watch("src/js/**/*.js", js);
}

export default series(js, css, dev);
