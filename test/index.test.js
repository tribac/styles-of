const stylesOf = require('../index');
const assert = require('assert');

const styles = { a: 'foo', b: 'bar' };
const $of = stylesOf(styles);

describe('negative cases', () => {
  it('styles of null', () => {
    assert(!$of(null));
  });

  it('styles of undefined', () => {
    assert(!$of());
  });

  it('styles of empty array', () => {
    assert.equal($of([]), '');
  });

  it('styles of empty string', () => {
    assert.equal($of(''), '');
  });
});

describe('positive cases', () => {
  it('styles of array', () => {
    assert.equal($of(['a', 'b']), 'foo bar');
  });

  it('styles of string', () => {
    assert.equal($of('a b'), 'foo bar');
  });
});
