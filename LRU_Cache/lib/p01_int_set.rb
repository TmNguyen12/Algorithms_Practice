require 'byebug'

class MaxIntSet
  def initialize(max)
    @max = max
    @store = Array.new(max)
  end

  def insert(num)
    raise 'Out of bounds' if num > @max || num < 0

    @store[num] = true 
  end

  def remove(num)
    @store[num] = false 
  end

  def include?(num)
    if @store[num] == true 
      return true
    else 
      return false 
    end 
  end

  private

  def is_valid?(num)
  end

  def validate!(num)
  end
end

# i = n % 20 
class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    bucket = num % 20 
    @store[bucket] << num  
    return true 
  end

  def remove(num)
    @store[bucket(num)].delete(num)
  end

  def include?(num)
    return @store[bucket(num)].index(num) 
  end

  private

  def bucket(num)
    return num % 20 
  end 

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    return num % 20 
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    resize! if @count >= num_buckets 
    @store[bucket(num)] << num 
    @count+= 1
    return true 
  end

  def remove(num)
    @store[bucket(num)].delete(num)
  end

  def include?(num)
    return @store[bucket(num)].index(num)
  end

  private
  def bucket(num)
    return num % 20 
  end 

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end

  def resize!
      old = @store 
      @count = 0
      @store = Array.new(num_buckets * 2) {Array.new}
      old.flatten.each { |num| insert(num) } 
  end
end
