require_relative 'p02_hashing'
require 'byebug'

class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    return false if include?(key)
    self[key.hash].push(key)
    @count += 1
    resize! if num_buckets < @count 
  end

  def include?(key)
    self[key.hash].include?(key)
  end

  def remove(key)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num & num_buckets]
  end

  def bucket(num)
    return num % 20 
  end 

  def num_buckets
    @store.length
  end

  def resize!
  end
end
