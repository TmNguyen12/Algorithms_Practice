# This class just dumbs down a regular Array to be statically sized.
class StaticArray
  def initialize(length)
    self.store = Array.new(length) 
  end

  # O(1)
  def [](index)
    if index < self.store.length && index >=0 
      return self.store[index] 
    else 
      return "undefined" 
    end 
  end

  # O(1)
  def []=(index, value)
    if index < self.store.length && index >=0 
      self.store[index] = value 
      return value
    else 
      print "index out of bounce"
    end 
  end

  protected
  attr_accessor :store
end
