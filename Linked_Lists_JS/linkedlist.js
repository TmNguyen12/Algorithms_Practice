// Access:    O(n)
// Search:    O(n)
// Insertion: O(1)
// Deletion:  O(1)

// Advantage over arrays is the insertion and deletion time
// worst than arrays at Access which arrays have O(1)
// a) You need constant-time insertions/deletions from the list (such as in real-time computing where time predictability is absolutely critical)

// b) You don't know how many items will be in the list. With arrays, you may need to re-declare and copy memory if the array grows too big

// c) You don't need random access to any elements

// d) You want to be able to insert items in the middle of the list (such as a priority queue)

// this is a doubly linked list

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // insertion is O(1)
  addToHead(value) {
    let newNode = new Node(value, this.head, null);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
  }

  // removal is O(1)
  removeHead() {
    if (!this.head) return null;
    let value = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    return value;
  }

  addToTail(value) {
    let newNode = new Node(value, this.head, null);
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;
    this.tail = newNode;
  }

  removeTail() {
    if (!this.tail) return null;
    let value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    return value;
  }
}

class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
