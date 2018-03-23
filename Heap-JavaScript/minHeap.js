class BinaryMinHeap {
  constructor() {
    this.values = [];
  }

  count() {
    return this.values.length;
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
    const childIdx = this.childIndices(parentIndex, length);
    const parentValue = array[parentIndex];
    const childValues = [array[childIdx[0]], array[childIdx[1]]];
    if (childValues.every(e => e >= parentValue)) return array;

    var lowestIdx = childValues[0] < childValues[1] ? childIdx[0] : childIdx[1];
    [array[parentIndex], array[lowestIdx]] = [array[lowestIdx], array[parentIndex]];

    return this.heapifyDown(array, lowestIdx, length);
  }

  heapifyUp(array, childIndex, length) {
    let parentIdx = this.parentIndex(childIndex);
    let parentValue = array[parentIdx];
    if (array[childIndex] < parentValue) {
      [array[childIndex], array[parentIdx]] = [array[parentIdx, array[childIndex]]];
      return self.heapifyUp(array, parentIdx, length);
    } else {
      return array;
    }
  }

  push(val) {
    this.values.push(val);
    this.heapifyUp(this.values, this.count - 1, this.count);
  }

  peek() {
    return this.values[0];
  }

  extract() {
    let value = this.values[0];
    if (this.count > 1) {
      this.values[0] = this.pop;
      this.heapifyUp(this.values, this.count - 1, this.count);
    } else {
      return value;
    }
  }


}

