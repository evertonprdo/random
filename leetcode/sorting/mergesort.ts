function findMiddle(head: NNode) {
   let slow: NNode | null = head
   let fast: NNode | null = head.next

   while (fast && fast.next) {
      slow = slow!.next
      fast = fast.next.next
   }
   return slow
}

function merge(l1: NNode | null, l2: NNode | null) {
   let head = new NNode()
   let tail = head

   while (l1 && l2) {
      if (l1.value < l2.value) {
         tail!.next = l1
         l1 = l1.next
      } else {
         tail!.next = l2
         l2 = l2.next
      }

      tail = tail!.next
   }

   tail!.next = l1 ? l1 : l2
   return head.next
}

function mergesort(head: NNode | null) {
   if (head === null || head.next === null) {
      return head
   }

   const middle = findMiddle(head)
   const afterMiddle = middle!.next
   middle!.next = null

   const left = mergesort(head)
   const right = mergesort(afterMiddle)

   const sortedList = merge(left, right)

   return sortedList
}

class NNode {
   public value: number
   public next: NNode | null

   constructor(value: number = 0, next: NNode | null = null) {
      this.value = value
      this.next = next
   }
}

const node7 = new NNode(7)
const node1 = new NNode(1, node7)
const node3 = new NNode(3, node1)
const node9 = new NNode(9, node3)

const myList = mergesort(node9)
console.log(myList)
