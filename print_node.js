var fs = require('fs');

exports = module.exports = print = function(node, filename) {
  var write = function(str) {
    console.log(str);
  };

  if (filename != null) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename);
    }
    write = function(str) {
      fs.appendFileSync(filename, str + '\n');
    };
  }

  write('digraph BST {');
  print_connections(node, write);
  write('}');
};

function print_connections(node, write) {
  var null_left = 'null_' + node.data + '_left';
  var null_right = 'null_' + node.data + '_right';

  write('  ' + node.data + ' -> ' + (node.left ? node.left.data : null_left));
  write(
    '  ' + node.data + ' -> ' + (node.right ? node.right.data : null_right)
  );

  if (node.left) {
    print_connections(node.left, write);
  } else {
    write('  ' + null_left + ' [shape=point]');
  }
  if (node.right) {
    print_connections(node.right, write);
  } else {
    write('  ' + null_right + ' [shape=point]');
  }
}

// dot -Tpdf filename.dot -o outfile.pdf
