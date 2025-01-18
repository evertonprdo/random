function quicksort(arr: number[], left: number, right: number) {
   if (left < right) {
      const pi = partition(arr, left, right)
      quicksort(arr, left, pi - 1)
      quicksort(arr, pi + 1, right)
   }
}

function partition(arr: number[], left: number, right: number) {
   const pivot = arr[right]

   let i = left - 1

   for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
         i += 1
         const a = arr[j]
         const b = arr[i]

         arr[i] = a
         arr[j] = b
      }
   }
   const a = arr[right]
   const b = arr[i + 1]

   arr[i + 1] = a
   arr[right] = b

   return i + 1
}

const arr = [0, 3, 6, 7, 8, 4, 2, 1, 5]
console.log('Unsorted:', arr)

quicksort(arr, 0, arr.length - 1)
console.log('Sorted:', arr)
