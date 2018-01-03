require_relative "static_array"
require 'byebug'

class RingBuffer
  attr_reader :length

  def initialize
    self.length = 0 
    self.store = StaticArray.new(8) 
    self.capacity = 8
    @count = 0 
    self.start_idx = 0 
  end

  # O(1)
  def [](index)
    if index >= self.length 
      raise "index out of bounds" 
    end 
    return self.store[logical_index(index)]
  end

  # O(1)
  def []=(index, val)
    if index >= self.length 
      raise "index out of bounds" 
    end 
    self.store[logical_index(index)] = val 
    return self.store
  end

  # O(1)
  def pop
    if @count > 0 
      returning_value = self.store[logical_index(@count - 1)]
      self.store[logical_index(@count - 1)] = nil 
      @count -= 1 
      self.length -=1 
      return returning_value 
    else 
      raise "index out of bounds"
    end 
  end

  # O(1) ammortized
  def push(val)
    if @count == self.capacity 
      self.resize!
    end
    self.store[logical_index(@count)] = val 
    @count +=1 
    self.length +=1 
  end

  # O(1)
  def shift
    returning_value = self.store[self.start_idx]
    if @count > 0 
      self.store[self.start_idx] = nil 
      @count -= 1
      self.length -= 1
      if self.start_idx == (self.capacity - 1)
        self.start_idx = 0 
      else 
        self.start_idx += 1 
      end 
    else 
      raise "index out of bounds"
    end 
    return returning_value 

  end

  # O(1) ammortized
  def unshift(val)
    if @count == self.capacity 
      self.resize!
    end
    if self.start_idx != 0 && self.store[self.start_idx - 1] == nil 
      self.store[self.start_idx - 1] = val 
      self.start_idx -= 1 
    elsif self.start_idx == 0 && self.store[self.capacity - 1] == nil  
      self.store[self.capacity - 1] = val 
      self.start_idx = self.capacity - 1 
    end 
    @count += 1 
    self.length += 1 
    
    # find where the start is and see if there's room to input before
    # if there isn't, see if there's room at the end of the static array 
    # add count
    # add length 
  end

  protected
  attr_accessor :capacity, :start_idx, :store
  attr_writer :length

  # this will output the index of the physical index 
  # takes the index inputted from the user 
  def logical_index(index)
    log_index = (index + self.start_idx) % self.capacity 
    return log_index 
  end

  def resize!
    # get length of current store and double it
    # copy things from the start_idx to index 0 
    # copy all the other ones and make that the store
    new_capacity = self.capacity * 2 
    temp_store = StaticArray.new(new_capacity) 

    temp_idx = start_idx 
    (0...self.length).each do |idx| 
      if temp_idx == self.capacity 
        temp_idx = 0 
      end 
      temp_store[idx] = self.store[temp_idx] 
      temp_idx += 1 
    end 

    self.store = temp_store 
    self.capacity = new_capacity
    self.start_idx = 0  
  end
end
