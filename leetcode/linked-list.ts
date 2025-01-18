class MyNode {
   public next: MyNode | null = null
   public prev: MyNode | null = null

   constructor(public value: unknown) {}
}

class DoublyLinkedList {
   public head: MyNode | null = null
   public tail: MyNode | null = null

   addToFront(value: unknown) {
      const newNode = new MyNode(value)
      newNode.next = this.head

      if (this.head !== null) {
         this.head.prev = newNode
      } else {
         this.tail = newNode
      }

      this.head = newNode
   }

   addToEnd(value: unknown) {
      const newNode = new MyNode(value)
      newNode.prev = this.tail

      if (this.tail !== null) {
         this.tail.next = newNode
      } else {
         this.head = newNode
      }

      this.tail = newNode
   }

   removeFromFront() {
      if (this.head === null) {
         return null
      }

      let removedValue = this.head.value
      this.head = this.head.next

      if (this.head !== null) {
         this.head.prev = null
      } else {
         this.tail = null
      }

      return removedValue
   }

   removeFromEnd() {
      if (this.tail === null) {
         return null
      }

      let removedValue = this.tail.value
      this.tail = this.tail.prev

      if (this.tail !== null) {
         this.tail.next = null
      } else {
         this.head = null
      }

      return removedValue
   }
}

class NNode {
   public next: NNode | null = null
   constructor(public value: unknown) {}
}

class LinkedList {
   public head: NNode | null = null

   constructor() {}

   addNode(value: unknown) {
      const newNode = new NNode(value)

      if (this.head !== null) {
         this.head.next = this.head
      }

      this.head = newNode
   }

   removeNode() {
      if (this.head === null) {
         return this.head
      }

      const removed = this.head.value
      this.head = this.head.next

      return removed
   }
}

const dll = new DoublyLinkedList()

dll.addToFront(3)
dll.addToFront(2)
dll.addToFront(1)
dll.addToEnd(4)
dll.addToEnd(5)

console.log(dll.removeFromFront()) // Removes 1
console.log(dll.removeFromEnd()) // Removes 5
console.log(dll.removeFromFront()) // Removes 2
console.log(dll.removeFromEnd()) // Removes 4
