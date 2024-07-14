import Node from "./node.mjs";

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  append(data) {
    if (typeof data !== "object") {
      data = { key: data };
    }
    const newNode = new Node(data);
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

  prepend(data) {
    if (typeof data !== "object") {
      data = { key: data };
    }
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

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
  insertAt(data, targetIndex) {
    if (typeof data !== "object") {
      data = { key: data };
    }
    const newNode = new Node(data);
    if (this.head === null || targetIndex > this.length - 1) {
      this.append(data);
      return;
    } else if (targetIndex === 0) {
      this.prepend(data);
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

  getListData(property) {
    const propertyArray = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      propertyArray.push(currentNode[property]);
      currentNode = currentNode.next;
    }
    return propertyArray;
  }

  getListEntries() {
    const entries = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      entries.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.next;
    }
    return entries;
  }
}

export default LinkedList;
