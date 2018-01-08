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
    # return nil 
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

  end
 

  # helper method for #delete:
  def maximum(tree_node = @root)
    if tree_node.right 
      self.maximum(tree_node.right)
    else
      return tree_node 
    end 
  end

  def depth(tree_node = @root)
    debugger 
    if tree_node.nil? 
      return 0 
    end 
    
    if tree_node.child_count == 0 
      return 0
    end 

    if tree_node.right 
      right = 1 + depth(tree_node.right)   
    end 

    if tree_node.left
      left = 1 + depth(tree_node.left) 
    end 

    if left.nil? 
      return right 
    elsif right.nil? 
      return left 
    end 

    


  end 

  def is_balanced?(tree_node = @root)
  end

  def in_order_traversal(tree_node = @root, arr = [])
  end


  private
  # optional helper methods go here:


end
