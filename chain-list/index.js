const names = require('./names.json')

if (names.length < 2) {
   throw new Error('Min 2 participants')
}

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

function appendParticipants(array) {
   const result = []

   for (let i = 0; i < array.length; i++) {
      const amigo = {
         from: array[i],
         to: array[(i + 1) % array.length],
      }
      result.push(amigo)
   }

   return result
}

const randomizedList = randomizeArray(names)
const sortedParticipants = appendParticipants(randomizedList)

console.log(sortedParticipants)
