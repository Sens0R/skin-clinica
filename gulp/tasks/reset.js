import del from 'del';

export const reset = () => {
  return del(app.path.clean);
};

export const resetKeepImages = () => {
  return del([app.path.clean, app.path.keepImages]);
};
