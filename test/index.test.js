const styles_of = require('../index');
const assert = require('assert');

const styles = { a: 'foo', b: 'bar' };

[
  { name: 'currying', _of: styles_of(styles) },
  {
    name: 'direct',
    _of(cls) {
      return styles_of(styles, cls);
    },
  },
].forEach(function({ name, _of }) {
  describe(`${name} mode`, function() {
    describe('negative cases', function() {
      it('styles_of null', function() {
        assert(!_of(null));
      });

      it('styles_of undefined', function() {
        assert(!_of());
      });

      it('styles_of empty array', function() {
        assert.equal(_of([]), '');
      });

      it('styles_of empty string', function() {
        assert.equal(_of(''), '');
      });
    });

    describe('positive cases', function() {
      const _of = styles_of(styles);
      it('styles_of array', function() {
        assert.equal(_of(['a', 'b']), 'foo bar');
      });

      it('styles_of string', function() {
        assert.equal(_of('a b'), 'foo bar');
      });

      it('styles_of variable args', function() {
        assert.equal(_of('a', 'b'), 'foo bar');
      });
    });
  });
});
