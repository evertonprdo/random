// Definition for singly-linked list.
class ListNode {
   val: number
   next: ListNode | null
   constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val
      this.next = next === undefined ? null : next
   }
}

/**
 * Runtime: 2ms, Memory: 53.24MB
 */
function mergeTwoLists(
   list1: ListNode | null,
   list2: ListNode | null,
): ListNode | null {
   if (list1 === null && list2 === null) {
      return null
   }

   const tempResult: number[] = []

   while (list1 !== null || list2 !== null) {
      if (list1 === null) {
         tempResult.unshift(list2!.val)
         list2 = list2!.next
         continue
      }

      if (list2 === null) {
         tempResult.unshift(list1!.val)
         list1 = list1!.next
         continue
      }

      if (list1.val < list2!.val) {
         tempResult.unshift(list1.val)
         list1 = list1.next
      } else {
         tempResult.unshift(list2.val)
         list2 = list2.next
      }
   }

   let result: ListNode | null = null
   for (const value of tempResult) {
      result = new ListNode(value, result)
   }
   return result
}

// Not my solution
function mergeTwoLists2(list1: ListNode | null, list2: ListNode | null) {
   let resHead = new ListNode()
   let resNode = resHead

   while (list1 && list2) {
      if (list1.val > list2.val) {
         resNode.next = list2
         list2 = list2.next
      } else {
         resNode.next = list1
         list1 = list1.next
      }

      resNode = resNode.next
   }

   if (list1) {
      resNode.next = list1
   } else {
      resNode.next = list2
   }

   return resHead.next
}

// Not my solution
function mergeTwoLists3(
   l1: ListNode | null,
   l2: ListNode | null,
): ListNode | null {
   if (l1 === null) {
      return l2
   }
   if (l2 === null) {
      return l1
   }

   if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2)
      return l1
   } else {
      l2.next = mergeTwoLists(l1, l2.next)
      return l2
   }
}

const l1 = new ListNode(1, new ListNode(2, new ListNode(4)))
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)))

let r = mergeTwoLists2(l1, l2)
while (r !== null) {
   console.log(r.val)
   r = r.next
}
