const BinaryMinHeap = require("../minHeap");

// import BinaryMinHeap from "../minHeap";

var assert = require("assert");

describe("BinaryMinHeap", () => {
  describe("indexing functions", () => {
    it("calculates child indices correctly", () => {
      var newHeap = new BinaryMinHeap();
      newHeap.values = [1, 2, 3, 4, 5, 6];
      console.log(newHeap.values);
      assert.deepEqual(newHeap.childIndices(0, 6), [1, 2]);
    });
  });
});
