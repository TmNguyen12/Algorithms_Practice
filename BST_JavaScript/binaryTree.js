const printNode = require('../print_node');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.hd = null; 
  }
}

class BinaryTree {
  constructor() {
    this.root = null; 
  }

  isLeaf(node){
    if (node.left === null && node.right === null) return true; 
  }

  // 
  minDepth(node){
    // edge case, shouldn't be hit unless the root is null; 
    if (this.root === null) return 0; 

    // base case
    if (this.isLeaf(node)) return 1; 


    if (node.left === null) {
      return this.minDepth(node.right); 
    }

    if (node.right === null) {
      return this.minDepth(node.left); 
    }

    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1; 

  }

  maxDepth(node){
    if (node === null) return 0; 

    return Math.max(this.maxDepth(node.left), this.maxDepth(node.right)) + 1; 
  }

  // For each node, there can be 4 ways that hte max path goes through: 
  // 1. Node only 
  // 2. Maxpath through left Child + node
  // 3. Maxpath through Right Child + node
  // 4. Max path through Left child + node + right child 
  // We are going to keep track of the four paths and pick the largest in the end
  // Root of every subtree needs to return maximum path sum such that at most, one child 
  // of root is involved. This is neded for a paretn fucntion call. 
  // we'll be storing this in maxSingle and returned by the recursive function 
  // Time complexity O(n)
  findMaxUtil(node, max){
    // Base case
    if (node === null) return 0; 

    // l and r store maximum path sum going through left and right 
    // child of root respectively
    let leftSum = this.findMaxUtil(node.left, max); 
    let rightSum = this.findMaxUtil(node.right, max); 

    // Max path for parent call of root. This must include at-most one child of root
    let maxSingle = Math.max(Math.max(leftSum, rightSum) + node.data, node.data); 


    // Max top represents the sum when the Node under consideration is the root of the 
    // maxsum path and no ancestors of root are there in max sum path 
    let maxTop = Math.max(maxSingle, leftSum + rightSum + node.data); 

    // Store the maximum results
    max[0] = Math.max(max[0], maxTop); 

    return maxSingle; 
  }  

  maxPathSum(root){
    // so we have something to pass around the multiple recursive calls
    const max = []; 

    max[0] = 0; 
    this.findMaxUtil(root, max); 

    return max[0]; 
  }

  // Tree is full if all nodes have either zero or two children 
  isFullTree(node){
    if (node === null) return true; 

    if (node.left === null && node.right === null) return true; 

    if (node.left !== null && node.right !== null) {
      return (this.isFullTree(node.left) && this.isFullTree(node.right)); 
    }

    return false; 
  }

  // Binary Trees are balanced when the height of the left adn right subtree is a difference of 1
  // This includes all subtrees
  isBalanced(node){
    if (node === null) return true; 

    let leftDepth = this.maxDepth(node.left);
    let rightDepth = this.maxDepth(node.right); 

    if (Math.abs(leftDepth - rightDepth) <=1 && this.isBalanced(node.left) && this.isBalanced(node.right)) 
      return true; 
      
    return false; 
  }


  // Bottom View of Tree 
  // adding an hd (horizontal distance) value to the node class 
  
  bottomView(){
    if (root === null) return; 

    let hd = 0; 
    let treeMap = {}; 
    const queue = []; 

    this.root.hd = hd; 
    queue.push(this.root); 

    // this is essentially a breadth first traversal (level order traversal)
    while (queue.length > 0) {
      let tempNode = queue.shift(); 
      hd = tempNode.hd; 
      // everytime we find another node with same horizontal distance we'll 
      // replace it in the treeMap 
      treeMap[hd] = tempNode.data; 

      if (tempNode.left !== null){
        tempNode.left.hd = hd-1; 
        queue.push(tempNode.left); 
      }

      if (tempNode.right !== null){
        tempNode.right.hd = hd+1; 
        queue.push(tempNode.right); 
      } 

    }
    const sortedKeys = Object.keys(treeMap).map(e => parseInt(e));
    console.log(sortedKeys); 
    sortedKeys.sort(((a,b) => a - b));  
    console.log(sortedKeys); 
    
    
    sortedKeys.forEach( e => console.log(treeMap[e])); 


  }

  // Remove nodes on root to leaf paths of length < K
  // Use post order traversal of the tree. 
  // 1. This node becomes a leaf node in which case it needs to be deleted
  // 2. This node has other child on a path with path length >=k and doesn't get deleted 

  removeShortPathNodes(node, k, level=1){
    if (node === null) return null; 

    // Traverse the tree in postorder fashion so that if a leaf node path length
    // is shorter than k, then that node and all of its descendants till the node
    // which are not on som eothe rpath are removed
    node.left = this.removeShortPathNodes(node.left, k, level + 1); 
    node.right = this.removeShortPathNodes(node.right, k, level + 1); 


    // if root is a leaf node, and it's level is less than k, then remove this node
    // this goes up and checks for the ancestor nodes also for the same condition
    // till it finds a node which is a part of other paths
    if (node.left == null && node.right == null && level < k) return null; 


    return node; 
  }

  inorder(node) {
    // Traverse the left subtree i.e perform inorder on left subtree
    // Visit the root
    // Traverse the right subtree i.e perform inorder on right subtree
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  largestUniquePath(node) {
    if (!node) return 0;
  
    let hash = {};
    return this.largestUniquePathUtil(node, hash);
  }
  
  largestUniquePathUtil(node, hashmap) {
    if (!node) return Object.keys(hashmap).length;
  
    if (!hashmap[node.data]) {
      hashmap[node.data] = 0;
    }
    hashmap[node.data] += 1;
    console.log('node', node.data);
    console.log('hashmap', hashmap[node.data]);
  
    let left = this.largestUniquePathUtil(node.left, hashmap);
    console.log('left', left);
    let right = this.largestUniquePathUtil(node.right, hashmap);
    console.log('right', right);
    let maxPath = Math.max(left, right);
    console.log('maxPath', maxPath);
  
    hashmap[node.data] -= 1;
    console.log('hashmap', hashmap);
    if (hashmap[node.data] === 0) delete hashmap[node.data];
  
    return maxPath;
  }

}

// testing MinDepth
// const main = () => {
//   let Tree = new BinaryTree(); 
//   Tree.root = new Node(1); 
//   Tree.root.left = new Node(2); 
//   Tree.root.right = new Node(3); 
//   Tree.root.left.left = new Node(4); 
//   Tree.root.left.right = new Node(5); 
//   console.log('is Full Tree', Tree.isFullTree(Tree.root));   
//   console.log('minimun Depth', Tree.minDepth(Tree.root)); 
//   console.log('max depth', Tree.maxDepth(Tree.root)); 
//   console.log('is balanced', Tree.isBalanced(Tree.root)); 
//   printNode(Tree.root, 'BinaryTree.dot'); 
// }


// const main = () => {
//   let Tree = new BinaryTree(); 
//   Tree.root = new Node(10);
//   Tree.root.left = new Node(2);
//   Tree.root.left.left = new Node(20);
//   Tree.root.left.right = new Node(1);
//   Tree.root.right = new Node(10); 
//   Tree.root.right.right = new Node(-25); 
//   Tree.root.right.right.left = new Node(3); 
//   Tree.root.right.right.right = new Node(4); 
//   let a = Tree.maxPathSum(Tree.root); 
//   console.log('is Full Tree', Tree.isFullTree(Tree.root)); 
//   console.log('maxpathsum',a); 
//   printNode(Tree.root, 'BT_MaxPathSum.dot'); 
//   console.log('is balanced', Tree.isBalanced(Tree.root));   
// }; 

// to Test bottomView 
const main = () => {
  let Tree = new BinaryTree(); 
  Tree.root = new Node(20);
  Tree.root.left = new Node(8);
  Tree.root.left.left = new Node(5);
  Tree.root.left.right = new Node(3);
  Tree.root.left.right.left = new Node(10);
  Tree.root.left.right.right = new Node(14);
  Tree.root.right = new Node(22); 
  Tree.root.right.right = new Node(25); 
  Tree.root.right.left = new Node(4); 
  // Tree.bottomView();
  Tree.inorder(Tree.root);
  Tree.removeShortPathNodes(Tree.root, 2);
  Tree.inorder(Tree.root);
}; 

main();