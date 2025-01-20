// The problem can be found on https://leetcode.com/problems/first-unique-character-in-a-string/

/**
 * Runtime: 27ms, Memory: 53.71MB
 *
 * To solve the problem, the hash map technique is used.
 * First attempt
 */
function firstUniqChar(s: string): number {
   const map = new Map<string, number>()
   let min: number = Infinity
   for (let i = 0; i < s.length; i++) {
      if (map.get(s[i]) === undefined) {
         map.set(s[i], i)
         continue
      }
      if (isNaN(map.get(s[i])!)) {
         continue
      }
      if (typeof map.get(s[i]) === 'number') {
         map.set(s[i], NaN)
      } else {
         map.set(s[i], i)
      }
   }
   for (const key of map.keys()) {
      if (isNaN(map.get(key)!)) {
         continue
      }

      min = Math.min(map.get(key)!, min)
   }
   return min === Infinity ? -1 : min
}

/**
 * Runtime: 60ms, Memory: 58.05MB
 *
 * To solve the problem, the hash map technique is used.
 * Second attempt
 */
function firstUniqChar2(s: string): number {
   const d = new Map<string, [key: number, value: number]>()
   let min = Infinity

   for (let i = 0; i < s.length; i++) {
      if (d.get(s[i]) === undefined) {
         d.set(s[i], [i, 1])
      } else {
         d.set(s[i], [d.get(s[i])![0], d.get(s[i])![1] + 1])
      }
   }

   for (const [key, value] of d.values()) {
      if (value === 1) {
         min = Math.min(key, min)
      }
   }

   return min === Infinity ? -1 : min
}

const str = 'leetcode'
console.log(firstUniqChar(str))
