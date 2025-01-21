// The problem can be found on https://leetcode.com/problems/binary-tree-level-order-traversal/description/
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

// Runtime: 1ms, Memory: 57.42MB
function levelOrder(root: TreeNode | null): number[][] {
   if (root === null) return []

   const resp: number[][] = []
   const q: TreeNode[] = []
   q.push(root)

   while (q.length > 0) {
      const level: number[] = []
      const levelSize = q.length

      for (let i = 0; i < levelSize; i++) {
         const node = q.shift()
         if (node) {
            level.push(node.val)
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
         }
      }
      if (level.length > 0) {
         resp.push(level)
      }
   }
   return resp
}
