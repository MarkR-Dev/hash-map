import Node from "./node.mjs";

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Point head to new node if the list is empty or loop until the tail and append
  append(key, value) {
    const newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
    this.length++;
  }

  // Assign the new node's next pointer to the current head and point the head at the new node
  prepend(key, value) {
    const newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  // Returns the current length of the list, increments an object instance length property over traversing the list and counting repeatedly
  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    if (this.head === null) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  // Check to see if the list is empty or if the targeted index is below/above the bounds of the list
  // List index begins at 0, and an empty list has a 0 length property so minus 1 to account for that
  at(targetIndex) {
    if (targetIndex < 0 || targetIndex > this.length - 1) {
      return null;
    }

    let currentIndex = 0;
    let currentNode = this.head;

    while (currentIndex < targetIndex) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode;
  }

  pop() {
    if (this.head !== null) {
      if (this.length === 1) {
        this.head = null;
      } else {
        let prevNode = null;
        let currentNode = this.head;
        while (currentNode.next !== null) {
          prevNode = currentNode;
          currentNode = currentNode.next;
        }
        prevNode.next = null;
      }
      this.length--;
    }
  }

  contains(targetKey) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === targetKey) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  find(targetKey) {
    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode !== null) {
      if (currentNode.key === targetKey) {
        return currentIndex;
      }
      currentNode = currentNode.next;
      currentIndex++;
    }
    return null;
  }

  toString() {
    let currentNode = this.head;
    let listString = "";

    while (currentNode !== null) {
      listString += `( ${currentNode.key} ) -> `;
      currentNode = currentNode.next;
    }
    listString += "null";

    return listString;
  }

  log() {
    console.log("List:", this.toString());
    console.log("Size:", this.size());
  }

  // Check for empty list or trying to insert out of upper bounds first,
  // otherwise traverse until before the insertion index and swap next node referencess for respective nodes
  insertAt(key, value, targetIndex) {
    const newNode = new Node(key, value);
    if (this.head === null || targetIndex > this.length - 1) {
      this.append(key, value);
      return;
    } else if (targetIndex === 0) {
      this.prepend(key, value);
      return;
    }
    let prevNode = null;
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < targetIndex) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    newNode.next = currentNode;
    prevNode.next = newNode;
    this.length++;
  }

  search(targetKey) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === targetKey) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  remove(targetKey) {
    if (this.head.key === targetKey) {
      this.head = this.head.next;
      this.length--;
      return true;
    }

    let currentNode = this.head;
    let prevNode = null;

    while (currentNode !== null) {
      if (currentNode.key === targetKey) {
        prevNode.next = currentNode.next;
        currentNode.next = null;
        this.length--;
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    return false;
  }

  removeAt(targetIndex) {
    if (this.head === null || targetIndex > this.length - 1) {
      return;
    } else if (targetIndex === 0) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let currentNode = this.head;
    let prevNode = null;
    let currentIndex = 0;

    while (currentIndex < targetIndex) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    prevNode.next = currentNode.next;
    currentNode.next = null;
    this.length--;
  }
}

export default LinkedList;
