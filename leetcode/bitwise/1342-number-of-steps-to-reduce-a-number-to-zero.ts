// The problem can be found on https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/
/**
 * AND operator and RIGHT shift operation explanation:
 *
 * - `num & 1` (num AND 1) will return 1 if the number is odd, and 0 if it's even:
 *   - Example:
 *     1 0 0 1 => 0 0 0 1 = 1, so ... 1 will be 1 (odd)
 *     1 0 0 0 => 0 0 0 0 = 0, so ... 0 will be 0 (even)
 *
 * - `num >> 1` (num RIGHT shift) works similarly to `Math.floor(num / 2)`.
 *   It shifts all the bits to the right, effectively dividing the number by 2:
 *   - Example:
 *     6: 0 1 1 0 => 0 0 1 1 = 3
 *     9: 1 0 0 1 => 0 1 0 0 = 4
 *
 * The problem utilizes these bitwise operations to reduce the number:
 * - If the number is odd, subtract 1 (`num - 1`).
 * - If the number is even, right shift the number (`num >> 1`).
 * The process continues with `steps++` until the number becomes 0.
 * Finally, the function returns the number of steps.
 */
function numberOfSteps(num: number): number {
   let steps = 0
   while (num > 0) {
      num = num & 1 ? num - 1 : num >> 1
      steps++
   }
   return steps
}
