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
}

export default HashMap;
