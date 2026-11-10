import Tree from "./index.js";

function randomArray(size = 10, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const tree = new Tree(randomArray(15));

console.log("Balanced:", tree.isBalanced());

function collect(method) {
    const out = [];
    tree[method](v => out.push(v));
    return out;
}

console.log("Level:", collect("levelOrderForEach"));
console.log("Pre:  ", collect("preOrderForEach"));
console.log("Post: ", collect("postOrderForEach"));
console.log("In:   ", collect("inOrderForEach"));

[101, 102, 103, 104, 105].forEach(v => tree.insert(v));

console.log("Balanced:", tree.isBalanced());

tree.rebalance();

console.log("Balanced:", tree.isBalanced());

console.log("Level:", collect("levelOrderForEach"));
console.log("Pre:  ", collect("preOrderForEach"));
console.log("Post: ", collect("postOrderForEach"));
console.log("In:   ", collect("inOrderForEach"));