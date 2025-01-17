// The problem can be found on https://leetcode.com/problems/binary-search/
// Runtime: 0ms, Memory: 53.55MB

function search(nums: number[], target: number): number {
   let left = 0
   let right = nums.length
   let steps = 0

   while (left < right) {
      steps++
      const mid = (left + right) >>> 1

      if (nums[mid] === target) {
         console.log('steps: ', steps)
         return mid
      } else if (nums[mid] < target) {
         left = mid + 1
      } else {
         right = mid
      }
   }

   return -1
}

const nums = [-1, 0, 3, 5, 9, 12]
console.log(search(nums, 9))
