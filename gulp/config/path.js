//Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/assets/images/**/*.svg`,
    scss: `${srcFolder}/css/style.scss`,
    html: `${srcFolder}/*.html`,
    svgSpriteMono: `${srcFolder}/assets/svgicons/mono/**/*.svg`,
    svgSpriteMulti: `${srcFolder}/assets/svgicons/multi/**/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/css/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    svgSpriteMono: `${srcFolder}/assets/svgicons/mono/**/*.svg`,
    svgSpriteMulti: `${srcFolder}/assets/svgicons/multi/**/*.svg`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: '',
};
