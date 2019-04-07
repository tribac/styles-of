exports = module.exports = function stylesOf(styles) {
  return function(classNames) {
    return (
      classNames &&
      (typeof classNames === 'string' ? classNames.split(' ') : classNames)
        .map(className => styles[className])
        .join(' ')
    );
  };
};
