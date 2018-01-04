require_relative "heap"
require 'byebug'

class Array
  def heap_sort!
    # debugger 
    # //heapify up first, then down
    # reverse at the end since we're not using a MaxHeap
    (2..self.length).each do |sort_size|
      child_idx = sort_size - 1 
      BinaryMinHeap.heapify_up(self, child_idx, sort_size)
    end 

    self.length.downto(2).each do |sort_size|
      self[0], self[sort_size - 1] = self[sort_size - 1], self[0]
      BinaryMinHeap.heapify_down(self, 0, sort_size - 1)
    end 
    self.reverse!
  end

end
