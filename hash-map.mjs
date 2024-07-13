import LinkedList from "./linked-list.mjs";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = Array.from(Array(this.capacity));
    this.entries = 0;
  }

  // Uses multiplication by a prime number to help distribute entries evenly across all available buckets
  // Uses modulo to avoid an edge case where JS can't handle precision when dealing with very large numbers
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCodeIndex = this.hash(key);
    if (hashCodeIndex < 0 || hashCodeIndex >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.buckets[hashCodeIndex]) {
      const list = this.buckets[hashCodeIndex];
      const entry = list.search(key);
      if (entry) {
        entry.value = value;
        return;
      } else {
        list.append(key, value);
      }
    } else {
      const list = new LinkedList();
      list.append(key, value);
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
        return entry.value;
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

  // create new array with capacity set back to starting value of 16 buckets to reduce wasted space
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

  values() {
    const valuesArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        valuesArray.push(...bucket.getListData("value"));
      }
    });
    return valuesArray;
  }

  getEntries() {
    const entriesArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        entriesArray.push(...bucket.getListEntries());
      }
    });
    return entriesArray;
  }

  growBuckets() {
    const currentEntries = this.getEntries();
    this.capacity = this.capacity * 2;
    this.buckets = Array.from(Array(this.capacity));
    this.entries = 0;
    currentEntries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }
}

export default HashMap;
