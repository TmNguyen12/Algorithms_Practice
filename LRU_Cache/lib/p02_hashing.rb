
class Fixnum
  # Fixnum#hash already implemented for you
end

class Array
  def hash
    final_hash = 0
    self.each_with_index do |num, index|
      final_hash += (num.hash * index + 1)
    end 
    final_hash 
  end
end

class String
  def hash
    final_hash = 0
    self.each_char.with_index do |char, idx|
      final_hash += (char.ord + idx).hash 
    end 
    final_hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    final_hash = 0
    new_array = []
    self.to_a.sort { |a,b| a <=> b}.hash 
  end
end
