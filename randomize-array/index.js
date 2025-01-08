const arr = require('./names.json')

function randomizeArray(array) {
   const arrLength = array.length
   const result = []

   while (result.length < arrLength) {
      const random = Math.round(Math.random() * (array.length - 1))

      result.push(array[random])
      array.splice(random, 1)
   }

   return result
}

console.log(randomizeArray(arr))
