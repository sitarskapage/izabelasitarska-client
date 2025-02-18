export default class Queue {
  items: unknown[];

  constructor() {
    this.items = [];
  }

  enqueue(element: unknown) {
    this.items.push(element);
  }

  dequeue() {
    return this.isEmpty() ? "Queue is empty" : this.items.shift();
  }

  peek() {
    return this.isEmpty() ? "Queue is empty" : this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.join(" -> "));
  }

  rotate() {
    if (this.isEmpty()) return;
    const lastItem = this.dequeue();
    console.log("dequeue", lastItem);
    this.items.unshift(lastItem);
  }
}
