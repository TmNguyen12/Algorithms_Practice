require_relative 'binary_search_tree' 
require 'byebug'

def kth_largest(tree_node, k)
  arr = reverse_in_order_traversal(tree_node) 
  node_value = arr[(k-1)]
  find(node_value, tree_node)
end

def reverse_in_order_traversal(tree_node = @root, arr = [])
  return arr if tree_node.nil? 

  reverse_in_order_traversal(tree_node.right, arr) 
  arr << tree_node.value 
  reverse_in_order_traversal(tree_node.left, arr) 
end

def find(value, tree_node = @root)
  return nil if tree_node.nil?
  if value == tree_node.value 
    return tree_node
  elsif value <= tree_node.value 
    return find(value, tree_node.left) 
  else 
    return find(value, tree_node.right) 
  end 
end