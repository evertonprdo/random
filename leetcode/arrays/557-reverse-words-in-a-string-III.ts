// The problem can be found on https://leetcode.com/problems/reverse-words-in-a-string-iii/description/
// Runtime: 17ms, Memory: 58.11MB

/**
 * To solve the problem, the two pointers is used.
 */
function reverseWords(s: string): string {
   const result = new Array(s.length)

   let r = 0,
      l = 0

   while (r <= s.length) {
      if (s[r] === ' ' || r === s.length) {
         r !== s.length && (result[r] = s[r])

         for (let i = r - 1; l < r; i--, l++) {
            result[l] = s[i]
         }

         l++
         r++
      } else {
         r++
      }
   }

   return result.join('')
}

const str = "Let's take LeetCode contest"
console.log(reverseWords(str))
