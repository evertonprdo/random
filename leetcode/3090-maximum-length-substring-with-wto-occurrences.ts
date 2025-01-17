// The problem can be found on https://leetcode.com/problems/maximum-length-substring-with-two-occurrences/

/**
 * Runtime: 5ms, Memory: 52.44MB
 *
 * To solve the problem, the sliding window technique is used.
 * First attempt:
 */
function maximumLengthSubstring(s: string): number {
   const map: Record<string, number> = {}
   let max = 0
   let l = 0

   for (let r = 0; r < s.length; r++) {
      map[s[r]] = !map[s[r]] ? 1 : map[s[r]] + 1

      if (!(map[s[r]] > 2) && max <= r - l) {
         max++
      }

      while (map[s[r]] > 2) {
         map[s[l]]--
         l++
      }
   }

   return max
}

/**
 * Runtime: 1ms, Memory: 52.80MB
 *
 * The same, but with new Map()
 * Second attempt:
 */
function maximumLengthSubstring2(s: string): number {
   const map = new Map<string, number>()
   let max = 0

   let l = 0

   for (let r = 0; r < s.length; r++) {
      map.set(s[r], map.get(s[r]) ? map.get(s[r] + 1)! : 1)

      if (!(map.get(s[r])! > 2) && max <= r - l) {
         max++
      }

      while (map.get(s[r])! > 2) {
         map.set(s[l], map.get(s[l])! - 1)
         l++
      }

      r++
   }

   return max
}

const s = 'bcbbbcba'
console.log(maximumLengthSubstring(s))
