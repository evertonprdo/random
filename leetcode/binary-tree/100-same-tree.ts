// The problem can be found on https://leetcode.com/problems/same-tree
// Definition for a binary tree node.
class TreeNode {
   val: number
   left: TreeNode | null
   right: TreeNode | null
   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val === undefined ? 0 : val
      this.left = left === undefined ? null : left
      this.right = right === undefined ? null : right
   }
}

// Runtime: 0ms, Memory: 51.84MB
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
   if (p === null && q === null) return true
   if (p === null || q === null) return false

   if (p.val !== q.val) {
      return false
   }

   return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}
