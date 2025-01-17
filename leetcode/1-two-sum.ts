// The problem can be found on https://leetcode.com/problems/two-sum

/**
 * Runtime: 47ms, Memory: 51.99MB
 *
 * To solve the problem, the bruit force technic is used.
 * First attempt:
 */
function twoSum(nums: number[], target: number): number[] {
   for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
         if (nums[i] + nums[j] === target) return [i, j]
      }
   }
   return []
}

/**
 * Runtime: 4ms, Memory: 53.38MB
 *
 * To solve the problem, the hash map technic is used.
 * Note: I couldn't imagine this on my own, but it's simple, just chase the pair until you find
 * Second attempt:
 */
function twoSum2(nums: number[], target: number): number[] {
   const map = new Map<number, number>()
   let result: number[] = []

   for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i]

      if (map.has(diff)) {
         result = [map.get(diff)!, i]
         break
      }

      map.set(nums[i], i)
   }

   return result
}

const numbers = [3, 2, 4]
console.log(twoSum2(numbers, 6))
