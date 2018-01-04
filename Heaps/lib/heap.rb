require 'byebug'

class BinaryMinHeap
  attr_reader :store, :prc

  def initialize(&prc)
    @store = []
    @prc = prc || Proc.new { |i,j| i <=> j }
  end

  def count
    store.length 
  end

  def extract
    val = store[0]

    if self.count > 1
      store[0] = store.pop
      self.class.heapify_down(store, 0, &prc)
    else
      store.pop
    end

    val
  end

  def peek
    store[0]
  end

  def push(val)
    @store << val 
    self.class.heapify_up(store, self.count - 1, &prc)
    val 
  end

  public
  def self.child_indices(len, parent_index)
    left = 2 * parent_index + 1 
    right = 2 * parent_index + 2 

    children = [] 
    children << left if left < len 
    children << right if right < len 

    return children 
  end

  def self.parent_index(child_index)
    raise "root has no parent" if child_index == 0 
    (child_index - 1) / 2 
  end

  def self.heapify_down(array, parent_idx, len = array.length, &prc)
    prc ||= Proc.new { |i, j| i <=> j }
    child_idxs = self.child_indices(len, parent_idx) 
    child_values = [] 
    child_values << array[child_idxs[0]]  if child_idxs[0]# add left value 
    child_values << array[child_idxs[1]]  if child_idxs[1]# add right value 

    parent_val = array[parent_idx]
    # debugger 

    if child_values.all? { |child| prc.call(parent_val, child) <= 0 }
      return array 
    end 

    swap_idx = 0
    if child_values.length == 1
      swap_idx = child_idxs[0]
    else
      if prc.call(child_values[0], child_values[1]) == -1
        swap_idx = child_idxs[0]
      else
        swap_idx = child_idxs[1]
      end
    end

    array[parent_idx], array[swap_idx] = array[swap_idx], array[parent_idx]
    self.heapify_down(array, swap_idx, len, &prc)
  end

  def self.heapify_up(array, child_idx, len = array.length, &prc)
    prc ||= Proc.new { |i, j| i <=> j }
    return array if child_idx == 0 

    parent_idx = self.parent_index(child_idx)

    if prc.call(array[child_idx], array[parent_idx]) >= 0 
      return array 
    else 
      array[child_idx], array[parent_idx] = array[parent_idx], array[child_idx]
      self.heapify_up(array, parent_idx, len, &prc) 
    end 
  end
end
