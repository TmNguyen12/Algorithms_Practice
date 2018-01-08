class BSTNode

  attr_accessor :left, :right, :parent, :value 

  def initialize(value)
    @value = value 
  end

  def insert(value) 
    if self.value.nil? 
      self.value = value  
      return value 
    elsif value <= self.value 
      if self.left 
        self.left.insert(value)
      else 
        self.left = BSTNode.new(value)
      end 
      self.left.parent = self 
    else   # value is > self 
      if self.right
        self.right.insert(value) 
      else 
        self.right = BSTNode.new(value)
      end 
      self.right.parent = self 
    end 
  end 

  def which_child(value)
    if self.left.value == value 
      return 'left'
    elsif self.right.value == value 
      return 'right' 
    end 
  end 

  def child_count
    count = 0 
    count += 1 if self.left 
    count += 1 if self.right 
    count 
  end 

end
