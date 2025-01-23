// The problem can be found on https://leetcode.com/problems/maximum-depth-of-binary-tree
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

// Runtime: 1ms, Memory: 53.66MB
// First attempt
function maxDepth(root: TreeNode | null): number {
   if (root === null) return 0

   let resp = 0
   const q: TreeNode[] = []
   q.push(root)

   while (q.length > 0) {
      resp++
      const levelSize = q.length

      for (let i = 0; i < levelSize; i++) {
         const node = q.shift()
         if (node) {
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
         }
      }
   }
   return resp
}

// Not my solution
function maxDepth2(root: TreeNode | null): number {
   if (!root) return 0
   let max = 0

   function down(node: TreeNode | null, i: number) {
      if (!node) return
      down(node.left, i + 1)
      down(node.right, i + 1)
      max = Math.max(i, max)
   }

   down(root, 1)
   return max
}

// One line solution
// Not my solution
function maxDepth3(root: TreeNode | null): number {
   return !root ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}
