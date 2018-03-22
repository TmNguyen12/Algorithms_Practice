require_relative 'graph'

# Implementing topological sort using both Khan's and Tarian's algorithms
# 1. Queue up all vertics with no edges 
# 2. Pop off vertices from queue
#   a. Remove vertex & it's outedges from the graph 
#   b. Push vertex into sorted results array 
#   c. Examine each destination vertices, push onto queue if no it has more in edges


def topological_sort(vertices)
  sorted = []
  top = new Queue() 
  graph.vertices.each do |vertex|
    if vertex.in_edges.empty? 
      top.enqueue(vertex)
    end 
  end 
d
  until top.empty? 
    current = top.pop 
    sorted << current 
    current.out_edges.each do |edge|
      if edge.destination.in_edges.empty? 
        top.enqueue(edges)
      end 
    end 
    graph.delete_edge(edge)
    graph.delete_vertex(current);  
  end 

   

end
