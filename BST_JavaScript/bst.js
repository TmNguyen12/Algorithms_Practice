// On average Access, Search, Insertion, Deletion => O(log n)
// Worst case it's O(n)

// Used for hierarchical data (i.e filesystem)

const printNode = require('../print_node');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  //inserts data into the node
  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // it moves over the tree and inserts node into the correct location
  insertNode(node, newNode) {
    // checks to see if it's less than the current node
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // if node has 1 child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // if node has 2 children
      let temp = this.findMinNode(node.right);
      node.data = temp.data;

      node.right = this.removeNode(node.right, temp.data);
      return node;
    }
  }

  findMinNode(node = this.root) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
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

  preorder(node) {
    // Visit the root
    // Traverse the left subtree i.e perform inorder on left subtree
    // Traverse the right subtree i.e perform inorder on right subtree
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  postorder(node) {
    // Traverse the left subtree i.e perform inorder on left subtree
    // Traverse the right subtree i.e perform inorder on right subtree
    // Visit the root
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  // Breadth First Search
  levelOrder() {
    // 1. Create an empty queue
    // 2. temp_node starts at root
    // 3. Loop while temp node is not null
    //    A. Print temp_node.data
    //    B. Enqueue tempNode's children (leftnode then right node)
    //    C. Dequeue a node from q and assign it's value to tempNode

    const queue = [];
    let tempNode = this.root;

    while (tempNode) {
      console.log(tempNode.data);
      if (tempNode.left) queue.push(tempNode.left);
      if (tempNode.right) queue.push(tempNode.right);
      tempNode = queue.shift();
      if (tempNode === null) break;
    }
  }

  inOrderIterative() {
    // 1. Create an empty stack
    // 2. Current node = root node
    // 3. Push current node to stack and set current = current.left until current is Null
    // 4. If current is NULL and stack is not empty
    //    a. Pop the top item from stack and print it
    //    b. current = poppedItem.right
    //    c. go back to 3
    // 5. If current === NULL && stack is empty, exit

    const stack = [];
    let currentNode = this.root;
    let done = false;

    while (!done) {
      if (currentNode !== null) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        if (stack.length > 0) {
          let ejectedNode = stack.pop();
          console.log(ejectedNode.data);
          currentNode = ejectedNode.right;
        } else {
          done = true;
        }
      }
    }
  }

  getRootNode() {
    return this.root;
  }

  search(node, data) {
    if (node === null) {
      return false;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return true;
    }
  }
}

// function to be implemented
// insert(data)
// remove(data)

// Helper function
// findMinNode()
// getRootNode()
// inorder(node)
// preorder(node)
// postorder(node)
// search(node, data)
let BST = new BinarySearchTree();

BST.insert(9);
BST.insert(4);
BST.insert(17);
BST.insert(3);
BST.insert(6);
BST.insert(22);
BST.insert(5);
BST.insert(7);
BST.insert(20);

let root = BST.getRootNode();
// BST.inorder(root);
BST.remove(7);
let root2 = BST.getRootNode();
console.log('inorder Recursive');
BST.inorder(root2);
console.log('inorder Iterative');
BST.inOrderIterative();
// console.log('postorder traversal');
// BST.postorder(root2);
// console.log('preorder traversal');
// BST.preorder(root2);
// var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
// displayTree(BST);

// console.log(BST.findMinNode());
// console.log(BST.getRootNode());
// BST.levelOrder();
// let a = BST.search(BST.root, 24);
// console.log(a);

printNode(BST.root, 'bst.dot');
