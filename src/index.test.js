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
  });

  describe('Inserts an initial value', () => {
    beforeAll(() => doublyLinkedList.insert(1));

    test('Inserts the new value as \'head\'', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Inserts the new value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.head.next).toBe(undefined);
    });

    test('Has no \'previous\'', () => {
      expect(doublyLinkedList.head.previous).toBe(undefined);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(1);
    });
  });

  describe('Inserts a second value', () => {
    beforeAll(() => doublyLinkedList.insert(2));

    test('Inserts the new value as \'head\'', () => {
      expect(doublyLinkedList.head.value).toBe(2);
    });

    test('Keeps the initial value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(1);
    });

    test('Has the initial value as \'next\'', () => {
      expect(doublyLinkedList.head.next.value).toBe(1);
    });

    test('Has no \'previous\'', () => {
      expect(doublyLinkedList.head.previous).toBe(undefined);
    });

    test('Adds the second value as the initial value\'s \'previous\'', () => {
      expect(doublyLinkedList.tail.previous.value).toBe(2);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(2);
    });
  });
});

describe('.insertAfter()', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
  });

  describe('inserts a value if no values exist in the list', () => {
    beforeAll(() => doublyLinkedList.insertAfter(1, 1000));

    test('Adds the value as \'head\'', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Adds the value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.head.next).toBe(undefined);
    });

    test('Has no \'previous\'', () => {
      expect(doublyLinkedList.head.previous).toBe(undefined);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(1);
    });
  });

  describe('Inserts a value at the end of the list', () => {
    beforeAll(() => doublyLinkedList.insertAfter(2, 1000));

    test('Adds the value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(2);
    });

    test('Keeps the original \'head\' as it was', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.tail.next).toBe(undefined);
    });

    test('Adds the initial value as \'previous\'', () => {
      expect(doublyLinkedList.tail.previous.value).toBe(1);
    });

    test('Adds the new value as \'next\' to the one before it', () => {
      expect(doublyLinkedList.head.next.value).toBe(2);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(2);
    });
  });

  describe('Inserts a value after the first one', () => {
    beforeAll(() => doublyLinkedList.insertAfter(3, 1));

    test('Keeps the original \'tail\' as it was', () => {
      expect(doublyLinkedList.tail.value).toBe(2);
    });

    test('Keeps the original \'head\' as it was', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.tail.next).toBe(undefined);
    });

    test('Adds the new value as \'previous\' to the one after it', () => {
      expect(doublyLinkedList.tail.previous.value).toBe(3);
    });

    test('Adds the new value as \'next\' to the one before it', () => {
      expect(doublyLinkedList.head.next.value).toBe(3);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(3);
    });
  });

  describe('Inserts a value with a custom comparator', () => {
    beforeAll(() => doublyLinkedList.insertAfter(4, value => value === 2));

    test('Adds the value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(4);
    });

    test('Keeps the original \'head\' as it was', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.tail.next).toBe(undefined);
    });

    test('Adds the value before it as \'previous\'', () => {
      expect(doublyLinkedList.tail.previous.value).toBe(2);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(4);
    });
  });
});

describe('.insertBefore()', () => {
  let doublyLinkedList;

  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
  });

  describe('inserts a value if no values exist in the list', () => {
    beforeAll(() => doublyLinkedList.insertBefore(1, 1000));

    test('Adds the value as \'head\'', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Adds the value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.head.next).toBe(undefined);
    });

    test('Has no \'previous\'', () => {
      expect(doublyLinkedList.head.previous).toBe(undefined);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(1);
    });
  });

  describe('Inserts a value at the end of the list', () => {
    beforeAll(() => doublyLinkedList.insertBefore(2, 1000));

    test('Adds the value as \'tail\'', () => {
      expect(doublyLinkedList.tail.value).toBe(2);
    });

    test('Keeps the original \'head\' as it was', () => {
      expect(doublyLinkedList.head.value).toBe(1);
    });

    test('Has no \'next\'', () => {
      expect(doublyLinkedList.tail.next).toBe(undefined);
    });

    test('Adds the initial value as \'previous\'', () => {
      expect(doublyLinkedList.tail.previous.value).toBe(1);
    });

    test('Adds the new value as \'next\' to the one before it', () => {
      expect(doublyLinkedList.head.next.value).toBe(2);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(2);
    });
  });

  describe('Inserts a value before the first one', () => {
    beforeAll(() => doublyLinkedList.insertBefore(3, 1));

    test('Keeps the original \'tail\' as it was', () => {
      expect(doublyLinkedList.tail.value).toBe(2);
    });

    test('Adds the value as \'head\'', () => {
      expect(doublyLinkedList.head.value).toBe(3);
    });

    test('Add the initial value as \'next\'', () => {
      expect(doublyLinkedList.head.next.value).toBe(1);
    });

    test('Has no \'previous\'', () => {
      expect(doublyLinkedList.head.previous).toBe(undefined);
    });

    test('Adds the new value as \'previous\' to the one after it', () => {
      expect(doublyLinkedList.tail.previous.previous.value).toBe(3);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(3);
    });
  });

  describe('Inserts a value with a custom comparator', () => {
    beforeAll(() => doublyLinkedList.insertBefore(4, value => value === 2));

    test('Keeps the original \'tail\' as it was', () => {
      expect(doublyLinkedList.tail.value).toBe(2);
    });

    test('Keeps the original \'head\' as it was', () => {
      expect(doublyLinkedList.head.value).toBe(3);
    });

    test('Adds the value after it as \'next\'', () => {
      expect(doublyLinkedList.tail.previous.next.value).toBe(2);
    });

    test('Adds the value before it as \'previous\'', () => {
      expect(doublyLinkedList.tail.previous.previous.value).toBe(1);
    });

    test('Updates the length of the list correctly', () => {
      expect(doublyLinkedList.length).toBe(4);
    });
  });
});


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
