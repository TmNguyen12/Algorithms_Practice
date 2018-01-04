require_relative 'heap'
require_relative 'heap_sort'

def k_largest_elements(array, k)
  sorted_array = array.heap_sort! 
  sorted_array.reverse!
  sorted_array.take(k)
end
