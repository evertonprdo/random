function bubble(nums: number[]) {
   let size = nums.length

   for (const _ of nums) {
      console.log(nums)
      let isSorted = true

      for (let i = 0; i < size - 1; i++) {
         if (nums[i] > nums[i + 1]) {
            isSorted = false
            const a = nums[i]
            const b = nums[i + 1]

            nums[i + 1] = a
            nums[i] = b
         }
      }

      if (isSorted === true) return
   }
}

const arr = [5, 4, 3, 2, 1]
const oArr = [1, 2, 3, 4, 5]
const arr2 = [1, 2, 5, 4, 3]

bubble(arr2)
