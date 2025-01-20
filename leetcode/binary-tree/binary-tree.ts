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

// console.log('Search 4:', tree.search(4))
// console.log('Search 6:', tree.search(6))
console.log('pre traversal: ', tree.preOrderTraversal())
console.log('in traversal: ', tree.inOrderTraversal())
console.log('post traversal: ', tree.postOrderTraversal())
