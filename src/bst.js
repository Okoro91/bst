class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedUniqueArray);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      node.left = this._insertRec(node.left, value);
    } else {
      node.right = this._insertRec(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this._deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteRec(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this._minValue(node.right);

      node.right = this._deleteRec(node.right, node.data);
    }

    return node;
  }

  _minValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  find(value) {
    return this._findRec(this.root, value);
  }

  _findRec(node, value) {
    if (node === null) return null;

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this._findRec(node.left, value);
    } else {
      return this._findRec(node.right, value);
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  levelOrderForEachRecursive(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const height = this.height(this.root?.data) || 0;
    for (let i = 1; i <= height + 1; i++) {
      this._levelOrderRec(this.root, i, callback);
    }
  }

  _levelOrderRec(node, level, callback) {
    if (node === null) return;
    if (level === 1) {
      callback(node);
    } else if (level > 1) {
      this._levelOrderRec(node.left, level - 1, callback);
      this._levelOrderRec(node.right, level - 1, callback);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    this._inOrderRec(this.root, callback);
  }

  _inOrderRec(node, callback) {
    if (node === null) return;

    this._inOrderRec(node.left, callback);
    callback(node);
    this._inOrderRec(node.right, callback);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    this._preOrderRec(this.root, callback);
  }

  _preOrderRec(node, callback) {
    if (node === null) return;

    callback(node);
    this._preOrderRec(node.left, callback);
    this._preOrderRec(node.right, callback);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    this._postOrderRec(this.root, callback);
  }

  _postOrderRec(node, callback) {
    if (node === null) return;

    this._postOrderRec(node.left, callback);
    this._postOrderRec(node.right, callback);
    callback(node);
  }

  height(value) {
    const node = this.find(value);
    if (node === null) return null;

    return this._calculateHeight(node);
  }

  _calculateHeight(node) {
    if (node === null) return -1;

    const leftHeight = this._calculateHeight(node.left);
    const rightHeight = this._calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    if (this.root === null) return null;

    return this._calculateDepth(this.root, value, 0);
  }

  _calculateDepth(node, value, currentDepth) {
    if (node === null) return null;

    if (value === node.data) {
      return currentDepth;
    }

    if (value < node.data) {
      return this._calculateDepth(node.left, value, currentDepth + 1);
    } else {
      return this._calculateDepth(node.right, value, currentDepth + 1);
    }
  }

  isBalanced() {
    return this._checkBalanced(this.root) !== -1;
  }

  _checkBalanced(node) {
    if (node === null) return 0;

    const leftHeight = this._checkBalanced(node.left);
    const rightHeight = this._checkBalanced(node.right);

    if (leftHeight === -1 || rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }

  getValuesInOrder() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    return values;
  }

  getValuesLevelOrder() {
    const values = [];
    this.levelOrderForEach((node) => values.push(node.data));
    return values;
  }

  getValuesPreOrder() {
    const values = [];
    this.preOrderForEach((node) => values.push(node.data));
    return values;
  }

  getValuesPostOrder() {
    const values = [];
    this.postOrderForEach((node) => values.push(node.data));
    return values;
  }
}

export default Tree;
