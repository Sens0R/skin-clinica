import sharpResponsive from 'gulp-sharp-responsive';

export const images = () => {
  return app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.newer(app.path.build.images)))
    .pipe(
      sharpResponsive({
        includeOriginalFile: true,
        formats: [
          { includeOriginalFile: true },
          // jpeg
          {
            width: 320,
            format: 'jpeg',
            rename: { suffix: '-320' },
            jpegOptions: { quality: 70, progressive: true },
          },
          {
            width: 640,
            format: 'jpeg',
            rename: { suffix: '-640' },
            jpegOptions: { quality: 70, progressive: true },
          },
          {
            width: 960,
            format: 'jpeg',
            rename: { suffix: '-960' },
            jpegOptions: { quality: 70, progressive: true },
          },
          {
            width: 1280,
            format: 'jpeg',
            rename: { suffix: '-1280' },
            jpegOptions: { quality: 70, progressive: true },
          },
          {
            width: 1920,
            format: 'jpeg',
            rename: { suffix: '-1920' },
            jpegOptions: { quality: 70, progressive: true },
          },
          {
            width: 2560,
            format: 'jpeg',
            rename: { suffix: '-2560' },
            jpegOptions: { quality: 70, progressive: true },
          },
          // webp
          {
            width: 320,
            format: 'webp',
            rename: { suffix: '-320' },
            webpOptions: { quality: 70, progressive: true },
          },
          {
            width: 640,
            format: 'webp',
            rename: { suffix: '-640' },
            webpOptions: { quality: 70, progressive: true },
          },
          {
            width: 960,
            format: 'webp',
            rename: { suffix: '-960' },
            webpOptions: { quality: 70, progressive: true },
          },
          {
            width: 1280,
            format: 'webp',
            rename: { suffix: '-1280' },
            webpOptions: { quality: 70, progressive: true },
          },
          {
            width: 1920,
            format: 'webp',
            rename: { suffix: '-1920' },
            webpOptions: { quality: 70, progressive: true },
          },
          {
            width: 2560,
            format: 'webp',
            rename: { suffix: '-2560' },
            webpOptions: { quality: 70, progressive: true },
          },
          // avif
          {
            width: 320,
            format: 'avif',
            rename: { suffix: '-320' },
            avifOptions: { quality: 50, progressive: true },
          },
          {
            width: 640,
            format: 'avif',
            rename: { suffix: '-640' },
            avifOptions: { quality: 50, progressive: true },
          },
          {
            width: 960,
            format: 'avif',
            rename: { suffix: '-960' },
            avifOptions: { quality: 50, progressive: true },
          },
          {
            width: 1280,
            format: 'avif',
            rename: { suffix: '-1280' },
            avifOptions: { quality: 50, progressive: true },
          },
          {
            width: 1920,
            format: 'avif',
            rename: { suffix: '-1920' },
            avifOptions: { quality: 50, progressive: true },
          },
          {
            width: 2560,
            format: 'avif',
            rename: { suffix: '-2560' },
            avifOptions: { quality: 50, progressive: true },
          },
        ],
      })
    )
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};

//FIX isDev > isBuild
