require_relative "static_array"
require 'byebug'

class DynamicArray
  attr_reader :length

  def initialize
    self.length = 0 
    self.store = StaticArray.new(8)
    self.capacity = 8 
  end

  # O(1)
  def [](index)
    if self.length == 0 || index >= self.length || index < 0 
      raise "index out of bounds" 
    else 
      return store[index] 
    end

  end

  # O(1)
  def []=(index, value)
    if self.length == 0 || index >= self.length || index < 0 
      raise "index out of bounds" 
    else 
      store[index] = value
      return value
    end 
  end

  # O(1)
  def pop
    if self.length == 0 
      raise "index out of bounds" 
    else 
      # debugger
      return_value = self.store[self.length - 1]
      self.store[self.length - 1] = nil 
      self.length -= 1
      return return_value 
    end 
  end

  # O(1) ammortized; O(n) worst case. Variable because of the possible
  # resize.
  def push(val)
    # debugger 
    if self.length == capacity 
      resize! 
    end 
    store[self.length] = val 
    self.length += 1 
  end

  # O(n): has to shift over all the elements.
  def shift
    if self.length == 0 
      raise "index out of bounds"
    end 
    return_value = self.store[0]
    temp_store = StaticArray.new(capacity) 
    (1...self.length).each do |i| 
      temp_store[i - 1] = self.store[i] 
    end 
    self.store = temp_store
    self.length -= 1 
    return return_value 
  end

  # O(n): has to shift over all the elements.
  def unshift(val)
    if self.length == capacity 
      resize! 
    end 
    temp_store = StaticArray.new(capacity)
    temp_store[0] = val 
    (0...self.length).each do |i| 
      temp_store[i + 1] = self.store[i] 
    end 
    self.store = temp_store
    self.length += 1 
    return val 
  end

  protected
  attr_accessor :capacity, :store
  attr_writer :length

  def check_index(index)
  end

  # O(n): has to copy over all the elements to the new store.
  def resize!
    new_capacity = self.capacity * 2 
    temp_store = StaticArray.new(new_capacity)

    (0...self.length - 1).each do |i|
      temp_store[i] = self.store[i]
    end 

    self.capacity = new_capacity
    self.store = temp_store
  end
end
