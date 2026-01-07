import Tree from "./bst.js";
import { prettyPrint } from "./prettier.js";

function generateRandomNumbers(count, max) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * max));
}

const randomNumbers = generateRandomNumbers(15, 100);
console.log("1. Creating BST from random numbers (< 100):");
console.log("   Random numbers:", randomNumbers);

const bst = new Tree(randomNumbers);
console.log("   Tree created successfully!");
console.log("\n   Tree structure:");
prettyPrint(bst.root);

console.log("\n2. Checking if tree is balanced:");
console.log(`   Is balanced: ${bst.isBalanced() ? "Yes ✓" : "No ✗"}`);

console.log("\n3. Printing elements in different orders:");
console.log("   Level order:", bst.getValuesLevelOrder().join(", "));
console.log("   Pre-order:  ", bst.getValuesPreOrder().join(", "));
console.log("   Post-order: ", bst.getValuesPostOrder().join(", "));
console.log("   In-order:   ", bst.getValuesInOrder().join(", "));

console.log("\n4. Unbalancing the tree by adding numbers > 100:");
const largeNumbers = [150, 200, 175, 125, 300];
console.log("   Adding:", largeNumbers.join(", "));

largeNumbers.forEach((num) => bst.insert(num));

console.log("\n   Tree structure after adding large numbers:");
prettyPrint(bst.root);

console.log("\n5. Checking if tree is unbalanced:");
console.log(`   Is balanced: ${bst.isBalanced() ? "Yes ✗" : "No ✓"}`);

console.log("\n6. Rebalancing the tree...");
bst.rebalance();
console.log("   Tree rebalanced!");
console.log("\n   Tree structure after rebalancing:");
prettyPrint(bst.root);

console.log("\n7. Checking if tree is balanced after rebalancing:");
console.log(`   Is balanced: ${bst.isBalanced() ? "Yes ✓" : "No ✗"}`);

console.log("\n8. Printing elements in different orders after rebalancing:");
console.log("   Level order:", bst.getValuesLevelOrder().join(", "));
console.log("   Pre-order:  ", bst.getValuesPreOrder().join(", "));
console.log("   Post-order: ", bst.getValuesPostOrder().join(", "));
console.log("   In-order:   ", bst.getValuesInOrder().join(", "));

console.log("\n=== Additional Method Tests ===\n");

const testValue = randomNumbers[Math.floor(randomNumbers.length / 2)];
console.log(
  `Testing find(${testValue}):`,
  bst.find(testValue) ? "Found ✓" : "Not found ✗"
);

const rootValue = bst.root.data;
console.log(`Height of root (${rootValue}):`, bst.height(rootValue));
console.log(`Depth of root (${rootValue}):`, bst.depth(rootValue));

console.log("\nTesting insert and delete methods:");
bst.insert(999);
console.log(
  "After inserting 999, contains 999:",
  bst.find(999) ? "Yes ✓" : "No ✗"
);

bst.deleteItem(999);
console.log(
  "After deleting 999, contains 999:",
  bst.find(999) ? "Yes ✗" : "No ✓"
);

console.log("=== Example Usage with Provided Array ===\n");

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log("Original array (with duplicates):", array);

const createTree = new Tree(array);
console.log("\nBuilt balanced BST:");
prettyPrint(createTree.root);

console.log("\nTree properties:");
console.log("Root:", createTree.root.data);
console.log("Is balanced:", createTree.isBalanced());
console.log("Height of root:", createTree.height(createTree.root.data));
console.log("In-order traversal:", createTree.getValuesInOrder().join(", "));

console.log("\nFinding values:");
console.log(
  "Find 23:",
  createTree.find(23)
    ? `Found (node.data = ${createTree.find(23).data})`
    : "Not found"
);
console.log("Find 100:", createTree.find(100) ? "Found" : "Not found");

console.log("\nDepth of values:");
console.log("Depth of 23:", createTree.depth(23));
console.log("Depth of 5:", createTree.depth(5));
