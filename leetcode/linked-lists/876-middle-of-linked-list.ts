// The problem can be found on https://leetcode.com/problems/middle-of-the-linked-list/
// Definition for singly-linked list.
class ListNode {
   val: number
   next: ListNode | null
   constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val
      this.next = next === undefined ? null : next
   }
}

// Runtime: 0ms, Memory: 50.97MB
function middleNode(head: ListNode | null): ListNode | null {
   if (head === null || head.next === null) return head

   let node: ListNode | null = head
   let count = 0

   while (head !== null) {
      head = head.next
      count++
   }

   const middle = count >>> 1

   for (let i = 0; i <= middle; i++) {
      if (i === middle) {
         return node
      }
      node = node!.next
   }

   return null
}

// Runtime: 0ms, Memory: 51.18MB
function middleNode2(head: ListNode | null): ListNode | null {
   let node: ListNode | null = head
   while (node !== null && node.next !== null) {
      node = node.next.next
      head = head!.next
   }
   return head
}
