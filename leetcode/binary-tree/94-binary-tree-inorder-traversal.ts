// The problem can be found on https://leetcode.com/problems/binary-tree-inorder-traversal/
// Runtime: 0ms, Memory: 51.46MB
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

function inorderTraversal(root: TreeNode | null): number[] {
   const result: number[] = []
   inorderTraversalRecursive(root, result)
   return result
}

function inorderTraversalRecursive(root: TreeNode | null, result: number[]) {
   if (root) {
      inorderTraversalRecursive(root.left, result)
      result.push(root.val)
      inorderTraversalRecursive(root.right, result)
   }
}
