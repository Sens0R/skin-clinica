import fs from 'fs-extra';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ['ttf'],
        })
      )
      // Выгружаем в исходную папку
      .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ['woff'],
        })
      )
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontsStyle = () => {
  // Файлы стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/0-styles/2-base/_fonts.scss`;

  // Проверяем существует ли файл стилей шрифтов
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fs.existsSync(fontsFile)) {
      fs.unlinkSync(fontsFile);
      console.log('File removed:', fontsFile);
    }
    // Проверяем существует ли файл стилей для подключения шрифтов
    if (!fs.existsSync(fontsFile)) {
      // Если файла нет - создаем его
      fs.writeFile(fontsFile, '', cb);
      let newFileOnly;
      for (var i = 0; i < fontsFiles.length; i++) {
        // Записываем подключение шрифтов в файл стилей
        let fontFileName = fontsFiles[i].split('.')[0];
        if (newFileOnly !== fontFileName) {
          let fontName = fontFileName.split('-')[0]
            ? fontFileName.split('-')[0]
            : fontFileName;
          let fontWeight = fontFileName.split('-')[1]
            ? fontFileName.split('-')[1]
            : fontFileName;
          if (fontWeight.toLowerCase() === 'thin') {
            fontWeight = 100;
          } else if (fontWeight.toLowerCase() === 'extralight') {
            fontWeight = 200;
          } else if (fontWeight.toLowerCase() === 'light') {
            fontWeight = 300;
          } else if (fontWeight.toLowerCase() === 'medium') {
            fontWeight = 500;
          } else if (fontWeight.toLowerCase() === 'semibold') {
            fontWeight = 600;
          } else if (fontWeight.toLowerCase() === 'bold') {
            fontWeight = 700;
          } else if (
            fontWeight.toLowerCase() === 'extrabold' ||
            fontWeight.toLowerCase() === 'heavy'
          ) {
            fontWeight = 800;
          } else if (fontWeight.toLowerCase() === 'black') {
            fontWeight = 200;
          } else {
            fontWeight = 400;
          }
          fs.appendFile(
            fontsFile,
            `@font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                 font-weight: ${fontWeight};
                 font-style: normal;
                }\r\n`,
            cb
          );
          newFileOnly = fontFileName;
        }
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
