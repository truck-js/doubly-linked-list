[![Build Status](https://travis-ci.org/truck-js/doubly-linked-list.svg?branch=master)](https://travis-ci.org/truck-js/doubly-linked-list)
[![Coverage Status](https://coveralls.io/repos/github/truck-js/doubly-linked-list/badge.svg?branch=master)](https://coveralls.io/github/truck-js/doubly-linked-list?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Doubly Linked-List

A JavaScript _Doubly Linked-List_ data structure.

## Installation

Install `@truck/doubly-linked-list` via npm:

```sh
$ npm install --save @truck/doubly-linked-list
```

## Methods

### `constructor()`

Build a new _Doubly Linked-List_.

### `delete(value: any): boolean`

**O(n)**. Deletes a value from the _Doubly Linked-List_. The default `===` comparator is used.

### `delete(comparator: (value: any) => boolean): boolean`

**O(n)**. Deletes a value from the _Doubly Linked-List_. Uses the `comparator` to determine whether
the `value` should be deleted.

### `insert(value: any): void`

**O(1)**. Inserts a value at the beginning of the _Doubly Linked-List_.

### `insertAfter(value: any, after: any): void`

**O(n)**. Inserts `value` after `after`. If `after` is not found `value` is inserted at the end of
the _Doubly Linked-List_.

### `insertAfter(value: any, comparator: (value: any) => boolean): void`

**O(n)**. Inserts `value` after `after` comparator returns `true`. If `after` does not return `true`
then `value` is inserted at the end of the _Doubly Linked-List_.

### `insertBefore(value: any, before: any): void`

**O(n)**. Inserts `value` before `before`. If `before` is not found `value` is inserted at the end
of the _Doubly Linked-List_.

### `insertBefore(value: any, comparator: (value: any) => boolean): void`

**O(n)**. Inserts `value` before `before` comparator returns `true`. If `before` does not return
`true` then `value` is inserted at the end of the _Doubly Linked-List_.

### `search(value: any): Node|undefined`

**O(n)**. Returns the first `value` in the _Doubly Linked-List_ that matches `value`. The default
`===` comparator is used.

### `search(comparator: (value: any) => boolean): Node|undefined`

**O(n)**. Returns the first `value` in the _Doubly Linked-List_ that matches. Uses `comparator` to
determine whether the `value` matches.

### `toArray(): any[]`

**O(n)**. Converts the _Doubly Linked-List_'s values to an array.

## Properties

### `.length: number`

Returns the current length of the _Doubly Linked-List_.

## Examples

A _Doubly Linked-List_ is a standard class which can be instantiated with the `new` keyword:

```js
// Build a new Doubly Linked-List
const doublyLinkedList = new DoublyLinkedList();
// Get the length of the Doubly Linked-List
let length = doublyLinkedList.length; // 0
// Add some values to the Doubly Linked-List
doublyLinkedList.insert(1);
doublyLinkedList.insert('two');
doublyLinkedList.insert({ three: 'three' });
doublyLinkedList.insert(false);
doublyLinkedList.insert('FIVE');
// Get the length of the Doubly Linked-List
length = doublyLinkedList.length; // 5
// Search for a Node by value
const node = doublyLinkedList.search(false);
/*
  Node {
    next: Node {
      next: undefined;
      value: 'FIVE';
    };
    value: false;
  }
*/
// Delete some values from the Doubly Linked-List
doublyLinkedList.delete(1);
doublyLinkedList.delete('two');
doublyLinkedList.delete({ three: 'three' }, (a, b) => a.three === b.three);
doublyLinkedList.delete(false);
doublyLinkedList.delete('FIVE');
// Get the length of the Doubly Linked-List
length = doublyLinkedList.length; // 0
```

## Testing

Use the following command to run all the tests described below together:

```sh
$ docker-compose run --rm app npm test
```

### Commit messages

Commit messages are linted through the use of [husky](https://www.npmjs.com/package/husky) and
[@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) using the
[@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)
commit convention.

Please read through the
[AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
to get a better understanding of how commit messages are formatted.

After doing an `npm install` the required git hooks wil be added automatically and commit messages
will be linted automatically.

### Linting

Linting is done using [eslint](https://eslint.org/) using the
[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) configuration
with very few alterations, all of which can be seen in the [.eslintrc](.eslintrc) file in the root
of this repository.

Linting can be run in isolation through the command:

```sh
$ docker-compose run --rm app npm run test:lint
```

### Auditing

Auditing of dependencies is done through the [npm audit](https://docs.npmjs.com/cli/audit)
command-line tool.

Auditing can be run in isolation through the command:

```sh
$ docker-compose run --rm app npm run test:vulnerabilities
```

### Unit testing

Unit testing is done with [jest](https://jestjs.io). The test file for each file to be tested is to
be placed alongside the file in testing and marked with the `.test.js` extension.

Unit testing can be run in isolation through the command:

```sh
$ docker-compose run --rm app npm run test:scripts
```

## Contributing

Contributions are always welcome, just submit a PR to get the conversation going. Please make sure
all tests pass before submitting a PR.

### Releases

The moment a PR is merged into the `master` branch
[semantic-release](https://github.com/semantic-release/semantic-release) will kick-off a new
release, thus the importance of clear commit messages.
