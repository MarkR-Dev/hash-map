import HashMap from "./hash-map.mjs";
import HashSet from "./hash-set.mjs";

// const test = new HashMap();
// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");

// console.log(test);
// test.set("moon", "silver");
// console.log(test);
// console.log(test.getEntries());

const test2 = new HashSet();
console.log(test2);
test2.set("apple");
test2.set("pear");
test2.set("orange");
test2.set("blueb");
test2.set("banana");
test2.set("plum");
test2.set("1");
test2.set("2");
test2.set("3");
test2.set("4");
test2.set("5");
test2.set("6");

console.log(test2);
test2.set("bear");
console.log(test2);
console.log(test2.keys());
