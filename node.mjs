class Node {
  constructor({ ...data } = {}) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
    this.next = null;
  }
}

export default Node;
