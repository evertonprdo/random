const letters = Array.from({ length: 26 }, (_, i) =>
   String.fromCharCode(i + 65),
)

function pickRandomCharacters(n = 1) {
   const characters = []

   for (let i = 0; i < n; i++) {
      const random = Math.round(Math.random() * (letters.length - 1))
      characters.push(letters[random])
   }

   return characters
}

const word = pickRandomCharacters(process.env.NUMBER_OF_CHARACTERS)
console.log(word.join(''))

// $env NUMBER_OF_CHARACTERS={n} && node random-characters.js
