class Vertex
  attr_accessor :in_edges, :out_edges, :value 
  def initialize(value)
   @value = value; 
   @in_edges = []; 
   @out_edges = []; 
  end
end

class Edge
  attr_accessor :from_vertex, :to_vertex, :cost 
  def initialize(from_vertex, to_vertex, cost = 1)
   
  end

  def destroy!
   
  end
end
