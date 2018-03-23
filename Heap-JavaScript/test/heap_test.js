var assert = require("assert");
var BinaryMinHeap = require("../minHeap");

// import BinaryMinHeap from "../minHeap";

describe("BinaryMinHeap", function() {
  describe("indexing functions", function() {
    beforeEach("setting newHeap", function() {
      newHeap = new BinaryMinHeap();
      newHeap.values = [1, 2, 3, 4, 5, 6];
    });
    it("calculates child indices correctly", function() {
      assert.deepEqual(newHeap.childIndices(0, 6), [1, 2]);
      assert.deepEqual(newHeap.childIndices(1, 6), [3, 4]);
      assert.deepEqual(newHeap.childIndices(2, 6), [5]);
    });
    it("calculates parent indices correctly", function() {
      assert.equal(newHeap.parentIndex(5), 2);
      assert.equal(newHeap.parentIndex(4), 1);
      assert.equal(newHeap.parentIndex(3), 1);
      assert.equal(newHeap.parentIndex(2), 0);
      assert.equal(newHeap.parentIndex(1), 0);
    });
  });

  describe("heapify down and up", () => {
    before("setting newHeap", function() {
      heap1 = new BinaryMinHeap();
      heap1.values = [7, 4, 5];
      heap2 = new BinaryMinHeap();
      heap2.values = [7, 4, 5, 6, 8];
      heap3 = new BinaryMinHeap();
      heap3.values = [4, 5, 1];
      heap4 = new BinaryMinHeap();
      heap4.values = [3, 4, 5, 1];
    });
    it("heapifyDowns correctly", () => {
      // prettier-ignore
      assert.deepEqual(heap1.heapifyDown(heap1.values, 0, heap1.count()), [4, 7, 5]);
      // prettier-ignore
      assert.deepEqual(heap2.heapifyDown(heap2.values, 0, heap2.count()), [4, 6, 5, 7, 8]);
    });

    it("heapifyUps correctly", () => {
      // prettier-ignore
      assert.deepEqual(heap3.heapifyUp(heap3.values, 2, heap3.count()), [1, 5, 4]);
      // prettier-ignore
      assert.deepEqual(heap4.heapifyUp(heap4.values, 3, heap4.count()), [1,3, 5,4]);
    });
  });

  describe("heap operation", () => {
    beforeEach("create new heap", () => {
      newHeap = new BinaryMinHeap();
    });
    it("has a store that starts empty", () => {
      assert.deepEqual(newHeap.values, []);
    });
    it("pushes correctly", () => {
      newHeap.push(7);
      assert.deepEqual(newHeap.values, [7]);

      newHeap.push(5);
      assert.deepEqual(newHeap.values, [5, 7]);

      newHeap.push(6);
      assert.deepEqual(newHeap.values, [5, 7, 6]);

      newHeap.push(4);
      assert.deepEqual(newHeap.values, [4, 5, 6, 7]);
    });
    it("extracts correctly", () => {
      let a = [7, 5, 6, 4];
      a.forEach(e => newHeap.push(e));
      assert.equal(newHeap.extract(), 4);
      assert.deepEqual(newHeap.values, [5, 7, 6]);
      assert.equal(newHeap.extract(), 5);
      assert.deepEqual(newHeap.values, [6, 7]);
    });
  });
});
