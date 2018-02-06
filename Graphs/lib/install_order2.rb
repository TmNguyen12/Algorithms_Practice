# In this verison fo the problem, all packages will be listed, (independent packages have nil value or no entry fo rtheir dependencies),
#  but the package ids are no tnumbers. Do not use your notes. 

# arr = [[3,1], [2,1], [6,5],
#        [3,6], [3,2] [4,3],
#        [9,1], [1, nil], [5, nil]]

# install_order2(arr) #=> [1, 5, 2, 9, 6, 3, 4] 

# just like install_order 1 without finding max_id, 
# 1. iterate through the array and only store the uniq first digit (make a new vertex for it)
# 2. go through the array and make new edges based on the array 
# 3. called topo sort 
require_relative 'topological_sort'
require_relative 'graph'
require 'byebug'

def install_order2(arr)
  
 
end 

arr = [[3,1], [2,1], [6,5],
       [3,6], [3,2], [4,3],
       [9,1], [1, nil], [5, nil]]

install_order2(arr) #=> [1, 5, 2, 9, 6, 3, 4] 

# Bonus 
# 
