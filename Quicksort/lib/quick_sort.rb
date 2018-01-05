require 'byebug'

class QuickSort
  # Quick sort has average case time complexity O(nlogn), but worst
  # case O(n**2).

  # Not in-place. Uses O(n) memory.
  def self.sort1(array)
    return self if self.length <= 1
    
    let pivot = array[0]
    left = self.drop(1).select { |el| el < pivot }
    right = self.drop(1).select { |el| el >= pivot }

    QuickSort.sort1(left) + [pivot] + QuickSort.sort1(right)
  end

  # In-place.
  def self.sort2!(array, start = 0, length = array.length, &prc)
    prc ||= Proc.new { |i, j| i <=> j}
    
    if start < length - 1
      pivot_idx = partition(array, start, length, &prc)

      left_end = pivot_idx - start 
      right_end = array.length - (left_end + 1) 
      self.sort2!(array, start, left_end, &prc)
      self.sort2!(array, pivot_idx + 1, right_end, &prc)
    end 
    array 
  end

  def self.partition(array, start, length, &prc)
    prc ||= Proc.new { |i, j| i <=> j}
    pivot = array[start]
    # barrier is at the end of the idx 
    pivot_idx = start

    (start+1...(start+length)).each do |i| 
      if prc.call(array[i], pivot) == -1 
        array[i], array[pivot_idx + 1] = array[pivot_idx + 1], array[i]
        pivot_idx += 1
      end
    end 
    # swap pivot with the value directly to the left of the partition 
    array[start], array[pivot_idx] = array[pivot_idx], array[start] 
    pivot_idx 
  end
end
