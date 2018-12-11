import isFunction from 'lodash.isfunction';

import Node from './node';

const defaultComparator = a => b => a === b;

class DoublyLinkedList {
  constructor() {
    this.head = undefined;
    this.listSize = 0;
    this.tail = undefined;
  }

  get length() {
    return this.listSize;
  }

  delete(value) {
    const comparator = isFunction(value) ? value : defaultComparator(value);
    let current = this.head;
    while (current) {
      if (comparator(current.value)) {
        const { next, previous } = current;
        if (next) {
          next.previous = previous;
        }
        if (previous) {
          previous.next = next;
        }
        if (current === this.head) {
          this.head = next;
        }
        if (current === this.tail) {
          this.tail = previous;
        }
        this.listSize -= 1;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  insert(value) {
    const node = new Node(value);
    const { head } = this;
    if (this.head) {
      node.next = head;
      head.previous = node;
    } else {
      this.tail = node;
    }
    this.head = node;
    this.listSize += 1;
  }

  insertAfter(value, after) {
    const comparator = isFunction(after) ? after : defaultComparator(after);
    const node = new Node(value);
    let current = this.head;
    if (!current) {
      this.head = node;
      this.tail = node;
    } else {
      while (current) {
        const { next } = current;
        if (!next) {
          current.next = node;
          node.previous = current;
          this.tail = node;
          break;
        } else if (comparator(current.value)) {
          node.next = next;
          next.previous = node;
          current.next = node;
          node.previous = current;
          break;
        }
        current = next;
      }
    }
    this.listSize += 1;
  }

  insertBefore(value, after) {
    const comparator = isFunction(after) ? after : defaultComparator(after);
    const node = new Node(value);
    let current = this.head;
    if (!current) {
      this.head = node;
      this.tail = node;
      this.listSize += 1;
      return;
    }
    while (current) {
      const { next, previous, value: currentValue } = current;
      if (comparator(currentValue)) {
        node.next = current;
        node.previous = previous;
        if (previous) {
          previous.next = node;
        }
        current.previous = node;
        if (this.head === current) {
          this.head = node;
        }
        this.listSize += 1;
        return;
      }
      current = next;
    }
    current = this.tail;
    current.next = node;
    node.previous = current;
    this.tail = node;
    this.listSize += 1;
  }

  search(value) {
    const comparator = isFunction(value) ? value : defaultComparator(value);
    let current = this.head;
    while (current) {
      if (comparator(current.value)) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  toArray() {
    const returnArray = [];
    let current = this.head;
    while (current) {
      returnArray.push(current.value);
      current = current.next;
    }
    return returnArray;
  }
}

export default DoublyLinkedList;
