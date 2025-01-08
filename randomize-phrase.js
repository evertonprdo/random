function randomizePhrase(phrase) {
   const characters = phrase.trim().split('')

   if (characters.length < 2) {
      console.log('min 2 digits')
      return
   }

   if (characters[0] === '"') {
      characters.shift()
   }

   if (characters[characters.length - 1] === '"') {
      characters.pop()
   }

   console.log('Starting randomize')

   const charLength = characters.length
   let randomizedPhrase = ''

   let count = 0
   const timeStart = new Date().getMilliseconds()

   while (randomizedPhrase.length < charLength) {
      count++
      const random = Math.round(Math.random() * (characters.length - 1))

      randomizedPhrase += characters[random]
      characters.splice(random, 1)
   }

   const endTime = new Date().getMilliseconds()
   console.log(
      `Randomized phrase: ${randomizedPhrase}\ninteractions: ${count}\nmilliseconds: ${
         endTime - timeStart
      }`,
   )
}

randomizePhrase(
   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis laborum animi nisi voluptatem sint dolor recusandae minima eos totam neque, consequuntur reiciendis, culpa ea et ipsam, esse itaque inventore accusamus!',
)

// $env SAY_SOMETHING="{YOUR_PHRASE}" && node randomize-phrase.js
// randomizePhrase(process.env.SAY_SOMETHING)
