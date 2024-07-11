import LinkedList from "./linked-list.mjs";
/* 
Use the following snippet whenever you access a bucket through an index. 
We want to throw an error if we try to access an out of bound index:
if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
}
*/
class HashMap {
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

  // ** TODO: implement growing of buckets later **
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
}

export default HashMap;
