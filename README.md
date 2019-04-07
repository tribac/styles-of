# styles-of

Ease the adoption of `CSS Modules` inside `create-react-app`s.

(https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)

Documentations of `CSS Modules` talk about how we must use `className`s in `camelCase` (https://github.com/gajus/react-css-modules) unless using `styleName` as provided by `babel` (https://github.com/gajus/babel-plugin-react-css-modules).

But with `styles-of` (just a simple helper function), it is easy to support any CSS `className`s, and by the same token make use of multiple `className`s & conditional formatting of `className`s a breeze, or at least as painless as possible.

Let's use the same `CSS Modules` example as the one used in both links above:

```javascript
import React from 'react';
import styles from './table.css';

export default class Table extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.cell}>A0</div>
          <div className={styles.cell}>B0</div>
        </div>
      </div>
    );
  }
}
```

## Use case 1: don't repeat styles

```javascript
import React from 'react';
import styles from './table.css';
import stylesOf from 'styles-of';

const _of = stylesOf(styles);

export default class Table extends React.Component {
  render() {
    return (
      <div className={_of('table')}>
        <div className={_of('row')}>
          <div className={_of('cell')}>A0</div>
          <div className={_of('cell')}>B0</div>
        </div>
      </div>
    );
  }
}
```

OK, we've replaced `styles.xyx` by `_of('xyz')`, not necessary a fantastic trade-of, but wait, the use of `styles-of` makes a lot more sense with the more complex composition of `className`s.

## Use case 2: non-camelCase

Let's say for the first `cell` A0 we want to use another className, say `cell-first`.

Without `styles-of`:

```javascript
<div className={styles['cell-first']}>A0</div>
```

With `styles-of`:

```javascript
<div className={_of['cell-first']}>A0</div>
```

Pretty much a tie there.

## Use case 3: multiple class names

Or maybe even some conditional logical when inside a loop say, for styling the first `row` differently.

Without `styles-of`:

```javascript
      <div className={styles.table}>
      {rows.map((row, index) => (
        <div className={`${styles.row} ${index ? '' : styles.first}`}>
          {...}
        </div>
      )}
      </div>
```

With `styles-of`:

```javascript
      <div className={styles.table}>
      {rows.map((row, index) => (
        <div className={_of(['row', (index ? '' : 'first')])}>
          {...}
        </div>
      )}
      </div>
```

## Use case 4: multiple non-camelCase class names

You get the picture ;-)

As we can see, the more complex the expressions to compose the `className`, the more using `styles-of` makes sense.

But for my personal use, the ultimate use case was:

## Ease of adoption of CSS Modules

Without `CSS Modules`:

```javascript
import React from 'react';

export default class Table extends React.Component {
  const rows = [...];
  render() {
    return (
      <div className="table">
      {rows.map((row, index) => (
        <div className={`row ${index ? '' : 'first'}`}>
          {...}
        </div>
      )}
      </div>
    );
  }
}
```

With `CSS Modules` with `styles-of`:

```javascript
import React from 'react';

export default class Table extends React.Component {
  const rows = [...];
  render() {
    return (
      <div className={_of("table")}>
      {rows.map((row, index) => (
        <div className={_of(`row ${index ? '' : 'first'}`)}>
          {...}
        </div>
      )}
      </div>
    );
  }
}
```

So the conversion is quite simple: change `className="xyz"` to `className={_of("xyz")}` (add `{_of()}`), whereas without `styles-of`, it maybe less straight forward for conditional `className`s and such cases:

With `CSS Modules` without `styles-of`:

```javascript
import React from 'react';
import styles from './table.css';

export default class Table extends React.Component {
  const rows = [...];
  render() {
    return (
      <div className={styles.table}>
      {rows.map((row, index) => (
        <div className={`${styles.row} ${index ? '' : styles.first}`}>
          {...}
        </div>
      )}
      </div>
    );
  }
}
```
