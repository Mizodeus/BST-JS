class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));

    return root;
}

export default class Tree {
    constructor(array) {
        const sorted = [...new Set([...array].sort((a, b) => a - b))];
        this.root = buildTree(sorted);
    }

    includes(value) {
        return this.#findNode(this.root, value) !== null;
    }

    #findNode(node, value) {
        if (node === null) return null;
        if (value === node.data) return node;
        if (value < node.data) return this.#findNode(node.left, value);
        return this.#findNode(node.right, value);
    }

    insert(value) {
        this.root = this.#insertNode(this.root, value);
    }

    #insertNode(node, value) {
        if (node === null) return new Node(value);
        if (value === node.data) return node;
        if (value < node.data) {
            node.left = this.#insertNode(node.left, value);
        } else {
            node.right = this.#insertNode(node.right, value);
        }
        return node;
    }

    deleteItem(value) {
        this.root = this.#deleteItem(this.root, value);
    }

    #deleteItem(node, value) {
        if (node === null) return null;

        if (value < node.data) {
            node.left = this.#deleteItem(node.left, value);
        } else if (value > node.data) {
            node.right = this.#deleteItem(node.right, value);
        } else {
            if (node.left === null && node.right === null) return null;
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.data = successor.data;
            node.right = this.#deleteItem(node.right, successor.data);
        }

        return node;
    }

    levelOrderForEach(callback) {
        this.#assertCallback(callback);
        if (this.root === null) return;

        const queue = [this.root];

        for (let i = 0; i < queue.length; i++) {
            const node = queue[i];
            callback(node.data);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }

    inOrderForEach(callback) {
        this.#assertCallback(callback);
        this.#inOrder(this.root, callback);
    }

    #inOrder(node, callback) {
        if (node === null) return;
        this.#inOrder(node.left, callback);
        callback(node.data);
        this.#inOrder(node.right, callback);
    }

    preOrderForEach(callback) {
        this.#assertCallback(callback);
        this.#preOrder(this.root, callback);
    }

    #preOrder(node, callback) {
        if (node === null) return;
        callback(node.data);
        this.#preOrder(node.left, callback);
        this.#preOrder(node.right, callback);
    }

    postOrderForEach(callback) {
        this.#assertCallback(callback);
        this.#postOrder(this.root, callback);
    }

    #postOrder(node, callback) {
        if (node === null) return;
        this.#postOrder(node.left, callback);
        this.#postOrder(node.right, callback);
        callback(node.data);
    }

    #assertCallback(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
    }

    height(value) {
        const node = this.#findNode(this.root, value);
        if (node === null) return undefined;
        return this.#nodeHeight(node);
    }

    #nodeHeight(node) {
        if (node === null) return -1;
        return 1 + Math.max(this.#nodeHeight(node.left), this.#nodeHeight(node.right));
    }

    depth(value) {
        return this.#depthOf(this.root, value, 0);
    }

    #depthOf(node, value, level) {
        if (node === null) return undefined;
        if (value === node.data) return level;
        if (value < node.data) return this.#depthOf(node.left, value, level + 1);
        return this.#depthOf(node.right, value, level + 1);
    }

    isBalanced() {
        return this.#checkHeight(this.root) !== -1;
    }

    #checkHeight(node) {
        if (node === null) return 0;

        const left = this.#checkHeight(node.left);
        if (left === -1) return -1;

        const right = this.#checkHeight(node.right);
        if (right === -1) return -1;

        if (Math.abs(left - right) > 1) return -1;

        return Math.max(left, right) + 1;
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(v => values.push(v));
        this.root = buildTree(values);
    }
}