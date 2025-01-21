class NNode {
   public left: NNode | null
   public right: NNode | null
   constructor(public data: number) {
      this.left = null
      this.right = null
   }
}

class BinaryTree {
   public root: NNode | null = null

   insert(data: number) {
      if (this.root === null) {
         this.root = new NNode(data)
      } else {
         this.insertRecursive(data, this.root)
      }
   }

   private insertRecursive(data: number, node: NNode) {
      if (data < node.data) {
         if (node.left === null) {
            node.left = new NNode(data)
         } else {
            this.insertRecursive(data, node.left)
         }
      } else {
         if (node.right === null) {
            node.right = new NNode(data)
         } else {
            this.insertRecursive(data, node.right)
         }
      }
   }

   search(data: number) {
      return this.searchRecursive(this.root, data)
   }

   dfs(data: number) {
      return this.dfsRecursive(this.root, data)
   }

   bfs(data: number) {
      if (this.root === null) {
         return false
      }

      const queue: NNode[] = []
      queue.push(this.root)

      while (queue.length > 0) {
         let node = queue.shift() as NNode
         if (node.data === data) {
            return true
         }
         if (node.left !== null) {
            queue.push(node.left)
         }
         if (node.right !== null) {
            queue.push(node.right)
         }
      }

      return false
   }

   private searchRecursive(node: NNode | null, data: number) {
      if (node === null) {
         return false
      }

      if (node.data === data) {
         return true
      }

      if (data < node.data) {
         return this.searchRecursive(node.left, data)
      }

      return this.searchRecursive(node.right, data)
   }

   private dfsRecursive(node: NNode | null, data: number) {
      if (node === null) {
         return false
      }
      if (node.data === data) {
         return true
      }

      if (this.dfsRecursive(node.left, data)) {
         return true
      }
      if (this.dfsRecursive(node.right, data)) {
         return true
      }
   }

   preOrderTraversal() {
      const result = []
      this.preOrderRecursive(this.root, result)
      return result
   }

   inOrderTraversal() {
      const result = []
      this.inOrderRecursive(this.root, result)
      return result
   }

   postOrderTraversal() {
      const result = []
      this.postOrderRecursive(this.root, result)
      return result
   }

   private preOrderRecursive(node: NNode | null, result: number[]) {
      if (node) {
         result.push(node.data)
         this.preOrderRecursive(node.left, result)
         this.preOrderRecursive(node.right, result)
      }
   }

   private inOrderRecursive(node: NNode | null, result: number[]) {
      if (node) {
         this.inOrderRecursive(node.left, result)
         result.push(node.data)
         this.inOrderRecursive(node.right, result)
      }
   }

   private postOrderRecursive(node: NNode | null, result: number[]) {
      if (node) {
         this.postOrderRecursive(node.left, result)
         this.postOrderRecursive(node.right, result)
         result.push(node.data)
      }
   }
}

const tree = new BinaryTree()
tree.insert(5)
tree.insert(3)
tree.insert(1)
tree.insert(10)
tree.insert(7)
tree.insert(15)
tree.insert(20)

// console.log('Search 4:', tree.search(4))
// console.log('Search 6:', tree.search(6))
// console.log('pre traversal: ', tree.preOrderTraversal())
// console.log('in traversal: ', tree.inOrderTraversal())
// console.log('post traversal: ', tree.postOrderTraversal())
console.log('dfs: ', tree.dfs(20))
console.log('bfs: ', tree.bfs(20))
