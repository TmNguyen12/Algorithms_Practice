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
    debugger;
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

module.export = BinaryMinHeap;

// child and parent indices
// let heap = new BinaryMinHeap();
// heap.values = [1, 2, 3, 4, 5, 6];
// console.log("heap.values", heap.values);
// console.log("count", heap.count());
// console.log("child indices", heap.childIndices(1, heap.count()));
// console.log("parent index", heap.parentIndex(5));
// console.log("parent index", heap.parentIndex(4));
// console.log("parent index", heap.parentIndex(3));
// console.log("parent index", heap.parentIndex(2));
// console.log("parent index", heap.parentIndex(1));

// //heapifyUp and Down
// let heap2 = new BinaryMinHeap();
// heap2.values = [7, 4, 5, 6, 8];
// console.log("child indices", heap2.childIndices(1, heap2.count()));
// console.log(heap2.heapifyDown(heap2.values, 0, heap2.count()));

//heapifyUp
let heap3 = new BinaryMinHeap();
heap3.values = [3, 4, 5, 1];
// console.log("parent index", heap3.parentIndex(3));
// console.log(
//   "heapifyUp = [1, 3, 5, 4]",
//   heap3.heapifyUp(heap3.values, 3, heap3.count())
// );

heap3.heapifyUp(heap3.values, 3, heap3.count());
console.log(heap3);
heap3.push(7);
