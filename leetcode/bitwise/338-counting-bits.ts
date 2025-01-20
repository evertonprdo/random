// The problem can be found on https://leetcode.com/problems/counting-bits
/**
 * Runtime: 8ms, Memory: 56.80MB
 * First attempt:
 */
function countBits(n: number): number[] {
   const result: number[] = []
   for (let i = 0; i <= n; i++) {
      let curr = i
      let count = 0

      while (curr > 0) {
         if (curr & 1) {
            count++
         }
         curr >>= 1
      }
      result.push(count)
   }
   return result
}

// Not my solution
function countBits2(n: number): number[] {
   let dp = Array(n + 1).fill(0)
   let sub = 1

   for (let i = sub; i < n + 1; i++) {
      if (sub * 2 === i) {
         sub = i
      }
      dp[i] = dp[i - sub] + 1
   }
   return dp
}

// Not my solution
function countBits3(n: number): number[] {
   const ans: number[] = new Array(n + 1).fill(0)

   for (let i = 1; i <= n; i++) {
      ans[i] = ans[i >> 1] + (i & 1)
   }
   return ans
}
