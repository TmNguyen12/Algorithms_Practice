class BinaryMinHeap {
  constructor() {
    this.values = [];
  }

  count() {
    return this.values.length;
  }

  childIndices(parentIndex, length) {
    let left = Math.floor(2 * parentIndex + 1);
    let right = Math.floor(2 * parentIndex + 2);
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
    const childIdx = this.childIndices(parentIndex, length);
    const parentValue = array[parentIndex];
    const childValues = [];
    // needs to be done this way so that we don't put in a value of undefined
    childIdx.forEach(idx => childValues.push(array[idx]));
    if (childValues.every(e => e >= parentValue)) return array;

    var lowestIdx = childValues[0] < childValues[1] ? childIdx[0] : childIdx[1];
    [array[parentIndex], array[lowestIdx]] = [
      array[lowestIdx],
      array[parentIndex]
    ];

    return this.heapifyDown(array, lowestIdx, length);
  }

  heapifyUp(array, childIndex, length) {
    if (childIndex === 0) return array;

    let parentIdx = this.parentIndex(childIndex);
    let parentValue = array[parentIdx];

    if (array[childIndex] >= parentValue) {
      return array;
    } else {
      [array[childIndex], array[parentIdx]] = [
        array[parentIdx],
        array[childIndex]
      ];
      return this.heapifyUp(array, parentIdx, length);
    }
  }

  push(val) {
    this.values.push(val);
    this.heapifyUp(this.values, this.count() - 1, this.count());
  }

  peek() {
    return this.values[0];
  }

  extract() {
    var value = this.values[0];
    if (this.count() > 1) {
      this.values[0] = this.values.pop();
      this.heapifyDown(this.values, 0, this.count());
    } else {
      return value;
    }
    return value;
  }
}

module.exports = BinaryMinHeap;
