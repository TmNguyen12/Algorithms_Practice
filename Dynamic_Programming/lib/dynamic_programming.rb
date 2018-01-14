class DynamicProgramming

  def initialize
    @blair_cache = {1 => 1, 2 => 2}
    @frog_cache = [[[]], [[1]], [[1, 1], [2]]]
  end

  def blair_nums(n)
    # The first Blair number, b1, is 1,
    # The second Blair number, b2, is 2,
    # The kth Blair number is the sum of the previous two 
    # Blair numbers plus the k - 1st odd number. For example,
    # b3 = b2 + b1 + 2nd odd = 1 + 2 + 3 = 6.

    return @blair_cache[n] if @blair_cache[n] 
    result = blair_nums(n - 1) + blair_nums(n - 2) + ((n -1) * 2 - 1) 
    @blair_cache[n] = result 
  end

  def frog_hops_bottom_up(n)
    cache = frog_cache_builder(n)
    cache[n] 
  end

  def frog_cache_builder(n)
    cache = [ [[]], [[1]], [[1, 1], [2]] ]
    return cache if n < 3


    (3..n).each do |i| 
      

  end

  def frog_hops_top_down(n)
    # follow n all the way down 
    # compare with each previous step to see if it is larger or smaller 
  end

  def frog_hops_top_down_helper(n)

  end


  def super_frog_hops(n, k)

  end

  # 
  def knapsack(weights, values, capacity)

  end

  # Helper method for bottom-up implementation
  def knapsack_table(weights, values, capacity)

  end

  def maze_solver(maze, start_pos, end_pos)
  end
end
