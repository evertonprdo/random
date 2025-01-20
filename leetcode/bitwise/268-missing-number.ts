// The problem can be found on https://leetcode.com/problems/missing-number/
// Runtime: 0ms, Memory: 52.75MB

/**
 * XOR operator main properties:
 *
 * A ^ A = 0 (i.e., A cancels out A)
 * A ^ 0 = A (i.e., XOR with 0 preserves A)
 * Associative: The order of operations does not affect the final result.
 * Commutative: The grouping of operations does not affect the final result.
 *
 * Once the main properties of XOR are understood,
 * the problem can be interpreted as an array cancellation.
 *
 * [0, 1, 3] XOR [1, 2, 3] = 2
 *
 * Since 0 is the starting value of any shuffled array,
 * and it's known that only one element is missing,
 * we conclude that the last value in the sequence will always be the array's length.
 * With this in mind, the XOR of all shuffled elements is computed,
 * and then a new array from 0 to n is constructed.
 * This way, the elements in the second array cancel out the first array's elements,
 * leaving only the final value, which is the missing element.
 *
 * Note: It is important to understand that this is a XOR operation, not a true array cancellation.
 * This approach works specifically because there is exactly one missing number in the sequence.
 * If two or more numbers are missing, the result will not represent the missing numbers directly.
 * Instead, it will be the XOR of the missing numbers, e.g.:
 *
 * k = (y ^ x)
 * [0, 1, 4] XOR [0, 1, 2, 3, 4] = (2 ^ 3) NOT [2, 3]
 *
 * This is not sufficient to determine the individual missing numbers without additional steps.
 */
function missingNumber(nums: number[]): number {
   let x = 0
   for (const n of nums) {
      x ^= n
   }
   for (let i = 1; i <= nums.length; i++) {
      x ^= i
   }
   return x
}

// Not my implementation
/**
 * This function simplifies the calculation by performing the XOR of both arrays at the same time,
 * XOR of `i` and XOR of `nums[i]`. This is possible due to the Associative and Commutative properties.
 */
function missingNumber2(nums: number[]) {
   let res = nums.length
   for (let i = 0; i < nums.length; i++) {
      res ^= i ^ nums[i]
   }
   return res
}

// const nums = [0, 1]
// const nums = [3, 0, 1]
const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
console.log(missingNumber(nums))
