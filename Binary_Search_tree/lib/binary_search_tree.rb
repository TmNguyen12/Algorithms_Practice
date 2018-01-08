# There are many ways to implement these methods, feel free to add arguments 
# to methods as you see fit, or to create helper methods.
require_relative 'bst_node' 
require 'byebug'

class BinarySearchTree
  attr_reader :root 

  def initialize
    @root = nil 
  end

  def insert(value)
    if @root.nil? 
      @root = BSTNode.new(value)
      return value 
    else 
      @root.insert(value)
    end 
  end

  def find(value, tree_node = @root)
    return nil if tree_node.nil?
    if value == tree_node.value 
      return tree_node
    elsif value <= tree_node.value 
      return self.find(value, tree_node.left) 
    else 
      return self.find(value, tree_node.right) 
    end 
  end

  def delete(value)
    del_node = self.find(value)
    parent_node = del_node.parent

    # node is root 
    if parent_node.nil? && del_node.left.nil? && del_node.right.nil? 
      @root = nil 
      return @root 
    end 
    
    # no children 
    if del_node.left.nil? && del_node.right.nil? 
      child = parent_node.which_child(value) 
      if child == 'right'  
        parent_node.right = nil 
      elsif child == 'left' 
        parent_node.left = nil 
      end 
    end 

    # 1 child 
    if del_node.child_count == 1 
      child = parent_node.which_child(value)       
      if del_node.left 
        debugger 
        del_node.left.parent = del_node.parent 
        if child == 'right'  
          parent_node.right = del_node.right  
        elsif child == 'left' 
          parent_node.left = del_node.left 
        end 
      else 
        del_node.right.parent = del_node.parent 
        if child == 'right'  
          parent_node.right = del_node.right  
        elsif child == 'right' 
          parent_node.left = del_node.left 
        end 
      end 
    end
    
    # 2 children 
    if del_node.child_count == 2 
      # debugger
      max_node = maximum(del_node.left)
      replace(del_node, max_node)

    end 
  end
  
  def replace(old_node, new_node)
    # promotes it's child to it's place 
    if new_node.left 
      replace(new_node, new_node.left)
    end 

    if old_node.parent.left == old_node 
      old_node.parent.left = new_node 
    elsif old_node.parent.right == old_node
      old_node.parent.right = new_node 
    end 

    new_node.left = old_node.left 
    new_node.right = old_node.right 
    old_node.parent = new_node.parent 
    
  end 

  # helper method for #delete:
  def maximum(tree_node = @root)
    if tree_node.right 
      self.maximum(tree_node.right)
    else
      return tree_node 
    end 
  end

  def minimum(tree_node = @root)
    if tree_node.left 
      self.minimum(tree_node.left)
    else
      return tree_node 
    end 
  end

  def depth(tree_node = @root)
    if tree_node.nil? 
      return 0 
    end 
    
    if tree_node.child_count == 0 
      return 0
    end 

    right = 1 + depth(tree_node.right)   
    left = 1 + depth(tree_node.left) 

    if left > right 
      return left  
    else 
      return right 
    end 

  end 

  def is_balanced?(tree_node = @root)
    return true unless tree_node 
    
    if tree_node.left
      left = depth(tree_node.left) 
    else 
      left = 0 
    end 

    if tree_node.right
      right = depth(tree_node.right) 
    else 
      right = 0 
    end 
    
    if ((left - right).abs) <= 1 && is_balanced?(tree_node.left) && is_balanced?(tree_node.right) 
      return true 
    else 
      return false 
    end 

  end

  def in_order_traversal(tree_node = @root, arr = [])
    return arr if tree_node.nil? 

    in_order_traversal(tree_node.left, arr) 
    arr << tree_node.value 
    in_order_traversal(tree_node.right, arr) 
  end

  

  private
  # optional helper methods go here:


end
