// The problem can be found on https://leetcode.com/problems/path-sum/
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

// Runtime: 0ms, Memory: 54.56MB
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
   if (root === null) {
      return false
   }

   if (!root.right && !root.left) {
      return targetSum === root.val
   }

   return (
      hasPathSum(root.left, targetSum - root.val) ||
      hasPathSum(root.right, targetSum - root.val)
   )
}
