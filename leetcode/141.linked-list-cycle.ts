// The problem can be found on https://leetcode.com/problems/linked-list-cycle/description/
// Definition for singly-linked list.
class ListNode {
   val: number
   next: ListNode | null
   constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val
      this.next = next === undefined ? null : next
   }
}

// Runtime: 66ms, Memory: 53.01MB
function hasCycle(head: ListNode | null): boolean {
   if (head === null || head.next === null) return false

   let ahead: ListNode | null = head

   while (ahead !== null && ahead.next !== null) {
      head = head!.next
      ahead = ahead.next.next
      if (head === ahead) return true
   }
   return false
}

// Runtime: 63ms, Memory: 54.63MB
function hasCycle2(head: ListNode | null) {
   if (head === null || head.next === null) return false

   const map = new Set<ListNode>()

   while (head !== null) {
      if (map.has(head)) {
         return true
      }

      map.add(head)
      head = head.next
   }

   return false
}
