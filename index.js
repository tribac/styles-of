exports = module.exports = function stylesOf(styles) {
  function of() {
    return (arguments.length === 1 && typeof arguments[0] === 'string'
      ? arguments[0].split(' ')
      : Array.isArray(arguments[0])
      ? arguments[0]
      : Array.from(arguments)
    )
      .map(className => styles[className])
      .join(' ');
  }
  return arguments.length > 1
    ? of(...Array.prototype.slice.call(arguments, 1))
    : of;
};
