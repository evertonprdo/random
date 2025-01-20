// The problem can be found on https://leetcode.com/problems/number-of-1-bits
// Runtime: 0ms, Memory: 51.6MB
/**
 * This function calculates the Hamming weight (the number of 1-bits) in the binary representation of a number.
 *
 * - The premise is that `n & 1` will be `1` if the least significant bit (rightmost bit) of `n` is 1,
 *   and `0` if the least significant bit is 0.
 * - The number `n` is right-shifted byte by byte (`n >>= 1`), and for each bit that is 1, the count is incremented.
 * - The loop continues until all bits are processed (when `n` becomes 0).
 */
function hammingWeight(n: number): number {
   let count = 0
   while (n > 0) {
      if (n & 1) {
         count++
      }
      n >>= 1
   }
   return count
}
