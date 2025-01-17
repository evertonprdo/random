// The problem can be found on https://leetcode.com/problems/contains-duplicate-ii

/**
 * Runtime: 28ms, Memory: 71.81MB
 *
 * To solve the problem, the sliding window technique is used.
 * First attempt:
 */
function containsNearbyDuplicate(nums: number[], k: number): boolean {
   const map = new Map<number, number>()
   let l = 0

   for (let r = 0; r < nums.length; r++) {
      if (!map.get(nums[r])) {
         map.set(nums[r], 1)
      } else {
         map.set(nums[r], map.get(nums[r])! + 1)
      }

      if (r - l <= k && map.get(nums[r])! >= 2) {
         return true
      }

      while (r - l >= k) {
         map.set(nums[l], map.get(nums[l])! - 1)
         l++
      }
   }

   return false
}

const nums = [0, 1, 2, 3, 2, 5]
console.log(containsNearbyDuplicate(nums, 2))
