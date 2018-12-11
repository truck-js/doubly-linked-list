import DoublyLinkedList from './index';

describe('Basic usage', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
    doublyLinkedList.insert(1);
    doublyLinkedList.insert(2);
    doublyLinkedList.insert(3);
    doublyLinkedList.insert(4);
    doublyLinkedList.insert(5);
  });

  test('Adds the last value as \'head\'', () => {
    expect(doublyLinkedList.head.value).toBe(5);
  });

  test('Adds the first value as \'tail\'', () => {
    expect(doublyLinkedList.tail.value).toBe(1);
  });

  test('Holds a reference to the next value in the first', () => {
    expect(doublyLinkedList.head.next.value).toBe(4);
  });

  test('Holds a reference to the previous value in the last', () => {
    expect(doublyLinkedList.tail.previous.value).toBe(2);
  });
});

describe('.length', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
  });

  test('Returns \'0\' upon construction of the DoublyLinkedList', () => {
    expect(doublyLinkedList.length).toBe(0);
  });

  test('Returns the length of the DoublyLinkedList after adding values', () => {
    const expected = 5;

    doublyLinkedList.insert(1);
    doublyLinkedList.insert(2);
    doublyLinkedList.insert(3);
    doublyLinkedList.insert(4);
    doublyLinkedList.insert(5);
    const actual = doublyLinkedList.length;

    expect(actual).toBe(expected);
  });

  test('Returns the length of the DoublyLinkedList after removing values', () => {
    const expected = 2;

    doublyLinkedList.delete(1);
    doublyLinkedList.delete(2);
    doublyLinkedList.delete(3);
    const actual = doublyLinkedList.length;

    expect(actual).toBe(expected);
  });

  test('Returns \'0\' again after all values are deleted', () => {
    const expected = 0;

    doublyLinkedList.delete(4);
    doublyLinkedList.delete(5);
    const actual = doublyLinkedList.length;

    expect(actual).toBe(expected);
  });
});

describe('.delete()', () => {
  describe('When there is nothing to delete', () => {
    let doublyLinkedList;

    beforeAll(() => {
      doublyLinkedList = new DoublyLinkedList();
    });

    test('Returns \'false\' as the delete was unsuccessful', () => {
      expect(doublyLinkedList.delete(1)).toBe(false);
    });

    test('Does not affect the length of the list', () => {
      expect(doublyLinkedList.length).toBe(0);
    });
  });

  describe('When there are items to delete', () => {
    let doublyLinkedList;

    beforeAll(() => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList.insert(5);
      doublyLinkedList.insert(4);
      doublyLinkedList.insert({ three: 'three' });
      doublyLinkedList.insert(2);
      doublyLinkedList.insert(1);
    });

    describe('Successfully deletes the last value', () => {
      let result;

      beforeAll(() => {
        result = doublyLinkedList.delete(5);
      });

      test('Returns \'true\' as the delete was successful', () => {
        expect(result).toBe(true);
      });

      test('Moves the second-last item to the \'tail\'', () => {
        expect(doublyLinkedList.tail.value).toBe(4);
      });

      test('Updates the length of the list', () => {
        expect(doublyLinkedList.length).toBe(4);
      });
    });

    describe('Successfully deletes the first value', () => {
      let result;

      beforeAll(() => {
        result = doublyLinkedList.delete(1);
      });

      test('Returns \'true\' as the delete was successful', () => {
        expect(result).toBe(true);
      });

      test('Moves the second item to the \'head\'', () => {
        expect(doublyLinkedList.head.value).toBe(2);
      });

      test('Updates the length of the list', () => {
        expect(doublyLinkedList.length).toBe(3);
      });
    });

    describe('Successfully deletes the middle value', () => {
      let result;

      beforeAll(() => {
        result = doublyLinkedList.delete(value => value.three === 'three');
      });

      test('Returns \'true\' as the delete was successful', () => {
        expect(result).toBe(true);
      });

      test('Updates the \'next\' value of the node before', () => {
        expect(doublyLinkedList.head.next.value).toBe(4);
      });

      test('Updates the \'previous\' value of the node after', () => {
        expect(doublyLinkedList.tail.previous.value).toBe(2);
      });

      test('Updates the length of the list', () => {
        expect(doublyLinkedList.length).toBe(2);
      });
    });

    describe('When the value to delete is not found', () => {
      let result;

      beforeAll(() => {
        result = doublyLinkedList.delete(1000);
      });

      test('Returns \'false\' as the delete was unsuccessful', () => {
        expect(result).toBe(false);
      });

      test('Does not affect the length of the list', () => {
        expect(doublyLinkedList.length).toBe(2);
      });
    });
  });
});

describe('.insert()', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
    doublyLinkedList.insert(1);
    doublyLinkedList.insert(2);
    doublyLinkedList.insert(3);
  });

  test('Inserts the correct amount of nodes', () => {
    expect(doublyLinkedList.length).toBe(3);
  });

  test('Adds the correct value as \'head\'', () => {
    expect(doublyLinkedList.head.value).toBe(3);
  });

  test('Pushes the correct value to \'tail\'', () => {
    expect(doublyLinkedList.tail.value).toBe(1);
  });
});

// describe('.insertAfter()', () => {
//   const VALUE_ONE = 'VALUE_ONE';
//   const VALUE_TWO = 'VALUE_TWO';
//   const VALUE_THREE = { three: 'three' };
//   const VALUE_FOUR = 'VALUE_FOUR';
//   const VALUE_FIVE = 'VALUE_FIVE';
//
//   let doublyLinkedList;
//
//   beforeAll(() => {
//     doublyLinkedList = new DoublyLinkedList();
//   });
//
//   test('Adds the value as \'head\' if no value exists', () => {
//     const expected = VALUE_ONE;
//
//     doublyLinkedList.insertAfter(VALUE_ONE, 12);
//     const actual = doublyLinkedList.head.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Adds the value at the end if the given \'before\' is not found', () => {
//     const expected = VALUE_TWO;
//
//     doublyLinkedList.insertAfter(VALUE_TWO, 12);
//     const actual = doublyLinkedList.head.next.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Adds the value after the given value if \'after\' is found', () => {
//     const expected = VALUE_THREE;
//
//     doublyLinkedList.insertAfter(VALUE_THREE, VALUE_TWO);
//     const actual = doublyLinkedList.head.next.next.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Adds the value after the given value if \'after\' is a comparator that returns \'true\'', () => {
//     const expected = VALUE_FIVE;
//
//     doublyLinkedList.insertAfter(VALUE_FOUR, value => value.three === 'three');
//     doublyLinkedList.insertAfter(VALUE_FIVE, value => value.three === 'three');
//     const actual = doublyLinkedList.head.next.next.next.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Increments the list length correctly', () => {
//     expect(doublyLinkedList.length).toBe(5);
//   });
// });

// describe('.insertBefore()', () => {
//   const VALUE_ONE = 'VALUE_ONE';
//   const VALUE_TWO = 'VALUE_TWO';
//   const VALUE_THREE = { three: 'three' };
//   const VALUE_FOUR = 'VALUE_FOUR';
//   const VALUE_FIVE = { five: 'five' };
//
//   let doublyLinkedList;
//
//   beforeAll(() => {
//     doublyLinkedList = new DoublyLinkedList();
//   });
//
//   test('Adds the value as \'head\' if no values exist', () => {
//     const expected = VALUE_ONE;
//
//     doublyLinkedList.insertBefore(VALUE_ONE, 12);
//     const actual = doublyLinkedList.head.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Adds the value at the end if the given \'before\' is not found', () => {
//     const expected = VALUE_TWO;
//
//     doublyLinkedList.insertBefore(VALUE_TWO, 12);
//     const actual = doublyLinkedList.head.next.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Adds the value before the given value if \'before\' is found', () => {
//     const expected = VALUE_THREE;
//
//     doublyLinkedList.insertBefore(VALUE_THREE, VALUE_TWO);
//     const actual = doublyLinkedList.head.next.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Adds the value before the given value if \'before\' is a comparator that returns \'true\'', () => {
//     const expected = VALUE_FOUR;
//
//     doublyLinkedList.insertBefore(VALUE_FIVE, VALUE_TWO);
//     doublyLinkedList.insertBefore(VALUE_FOUR, value => value.five === 'five');
//     const actual = doublyLinkedList.head.next.next.value;
//
//     expect(actual).toBe(expected);
//   });
//
//   test('Increments the list length correctly', () => {
//     expect(doublyLinkedList.length).toBe(5);
//   });
// });

describe('.search()', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
    doublyLinkedList.insert(1);
    doublyLinkedList.insert('two');
    doublyLinkedList.insert({ name: 3 });
  });

  test('Finds a primitive value without a custom comparator', () => {
    expect(doublyLinkedList.search('two').value).toBe('two');
  });

  test('Finds an object with a custom comparator', () => {
    const expected = { name: 3 };

    const actual = doublyLinkedList.search(value => value.name === 3).value;

    expect(actual).toEqual(expected);
  });

  test('Returns \'undefined\' when a value could not be found', () => {
    expect(doublyLinkedList.search(2000)).toBe(undefined);
  });
});

describe('.toArray()', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
  });

  test('Returns an empty array when no values have been inserted', () => {
    expect(doublyLinkedList.toArray()).toEqual([]);
  });

  test('Returns an array of items inside the DoublyLinkedList', () => {
    const VALUE_A = 'VALUE_A';
    const VALUE_B = 'VALUE_B';
    const VALUE_C = 'VALUE_C';
    const expected = [VALUE_A, VALUE_B, VALUE_C];

    doublyLinkedList.insert(VALUE_C);
    doublyLinkedList.insert(VALUE_B);
    doublyLinkedList.insert(VALUE_A);
    const actual = doublyLinkedList.toArray();

    expect(actual).toEqual(expected);
  });
});
