// The problem can be found on https://leetcode.com/problems/binary-search/
// Runtime: 0ms, Memory: 53.55MB

function search(
   nums: number[],
   target: number,
   left = 0,
   right?: number,
): number {
   left = 0
   right = right ?? nums.length
   let steps = 0

   while (left < right!) {
      steps++
      const mid = (left + right!) >>> 1

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

/**
 * Exponencial search
 */
function exponencialSearch(nums: number[], target: number) {
   if (nums[0] === target) {
      return 0
   }

   let n = nums.length
   let i = 1

   while (i < n && nums[i] < target) {
      i *= 2
   }

   if (nums[i] === target) {
      return i
   }

   return search(nums, target, i >>> 1, Math.min(i, n - 1))
}

const numsExp = [
   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
   41, 42, 43, 45, 46, 47,
]
console.log('Exponencial Search:', exponencialSearch(numsExp, 32))

const nums = [-1, 0, 3, 5, 9, 12]
console.log('Binary Search:', search(nums, 3))
