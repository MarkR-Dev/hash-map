import LinkedList from "./linked-list.mjs";

class HashSet {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = Array.from(Array(this.capacity));
    this.entries = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key) {
    const hashCodeIndex = this.hash(key);
    if (hashCodeIndex < 0 || hashCodeIndex >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.buckets[hashCodeIndex]) {
      const list = this.buckets[hashCodeIndex];
      const entry = list.search(key);
      if (entry) {
        return;
      } else {
        list.append(key);
      }
    } else {
      const list = new LinkedList();
      list.append(key);
      this.buckets[hashCodeIndex] = list;
    }

    this.entries++;

    if (this.entries > this.capacity * this.loadFactor) {
      this.growBuckets();
    }
  }

  get(key) {
    const hashCodeIndex = this.hash(key);

    if (hashCodeIndex < 0 || hashCodeIndex >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.buckets[hashCodeIndex]) {
      const list = this.buckets[hashCodeIndex];
      const entry = list.search(key);
      if (entry) {
        return entry.key;
      }
    }

    return null;
  }

  has(key) {
    const hashCodeIndex = this.hash(key);

    if (hashCodeIndex < 0 || hashCodeIndex >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.buckets[hashCodeIndex]) {
      const list = this.buckets[hashCodeIndex];
      return list.contains(key);
    }
    return false;
  }

  remove(key) {
    const hashCodeIndex = this.hash(key);

    if (hashCodeIndex < 0 || hashCodeIndex >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }

    const list = this.buckets[hashCodeIndex];

    if (list) {
      const hasRemoved = list.remove(key);
      if (hasRemoved) {
        this.entries--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.entries;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array.from(Array(this.capacity));
    this.entries = 0;
  }

  keys() {
    const keysArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        keysArray.push(...bucket.getListData("key"));
      }
    });
    return keysArray;
  }

  growBuckets() {
    const currentKeys = this.keys();
    this.capacity = this.capacity * 2;
    this.buckets = Array.from(Array(this.capacity));
    this.entries = 0;
    currentKeys.forEach((key) => {
      this.set(key);
    });
  }
}

export default HashSet;
