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

  set(key, value) {
    const hashCodeIndex = this.hash(key);

    if (hashCodeIndex < 0 || hashCodeIndex >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }
  }
}

export default HashMap;
