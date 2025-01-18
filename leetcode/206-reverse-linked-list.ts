// The problem can be found on https://leetcode.com/problems/two-sum

// * Definition for singly-linked list.
class ListNode {
   val: number
   next: ListNode | null
   constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val
      this.next = next === undefined ? null : next
   }
}

/**
 * Runtime: 0ms, Memory: 52.74MB
 *
 * Time: O(n), Space: O(n).
 * First attempt:
 */
function reverseList(head: ListNode | null): ListNode | null {
   if (head === null || !head.next) {
      return head
   }

   let prev: ListNode | null = null

   while (head !== null) {
      prev = new ListNode(head.val, prev)
      head = head.next
   }

   return prev
}

/**
 * Time: O(n), Space: O(1)
 * Note: Not my solution
 */
function reverseList2(head: ListNode | null): ListNode | null {
   if (head === null || !head.next) {
      return head
   }

   let prev: ListNode | null = null
   while (head) {
      let next = head.next
      head.next = prev
      prev = head
      head = next
   }
   return prev
}
