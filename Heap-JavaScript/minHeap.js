class BinaryMinHeap {
  constructor() {
    this.values = [];
  }

  childIndices(parentIndex, length) {
    let left = Math.floor((2 * parentIndex) + 1);
    let right = Math.floor((2 * parentIndex) + 2);
    const children = [];
    if (left < length) children.push(left);
    if (right < length) children.push(right);
    return children;
  }

  parentIndex(childIndex) {
    if (childIndex === 0) return "child has no parent";
    return Math.floor((childIndex - 1) / 2);
  }

  heapifyDown(array, parentIndex, length) {

  }
}

