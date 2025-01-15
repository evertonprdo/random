import fs from 'node:fs'
import path from 'node:path'

const initOfScript = new Date().getTime()

const BOUNDARY = 10 // \n
const DOUBLEQUOTE = 34 // "
const HIGH_WATER_MARK = 8

// const FILENAME = 'sample.csv'
const FILENAME = 'sample-doublequote.csv'

const filePath = path.join(import.meta.dirname, FILENAME)
const readableCsv = fs.createReadStream(filePath, {
   highWaterMark: HIGH_WATER_MARK,
})

const lines: string[] = []

let unprocessedBytes = Buffer.alloc(0)
let doublequoteFlag = false
let lastBoundary = 0

function handleNewLine(line: string) {
   if (line[0] === '\n') {
      lines.push(line.substring(1))
      return
   }

   lines.push(line)
}

readableCsv.on('readable', function () {
   let chunk: Buffer

   function handleBoundary(curr: Buffer, boundaryIndex: number) {
      const currBuffer = curr.subarray(lastBoundary, boundaryIndex)

      const newLine = Buffer.concat([unprocessedBytes, currBuffer]).toString()

      unprocessedBytes = Buffer.alloc(0)
      lastBoundary = boundaryIndex

      handleNewLine(newLine)
   }

   while ((chunk = this.read()) !== null) {
      let curr = Buffer.alloc(chunk.length)

      for (let i = 0; i < chunk.byteLength; i++) {
         const byte = chunk[i]

         if (byte === DOUBLEQUOTE) {
            doublequoteFlag = !doublequoteFlag
         }

         if (byte === BOUNDARY && !doublequoteFlag) {
            handleBoundary(curr, i)
         }

         curr[i] = byte
      }

      const currBuffer = curr.subarray(lastBoundary)
      unprocessedBytes = Buffer.concat([unprocessedBytes, currBuffer])
      lastBoundary = 0
   }
})

readableCsv.on('end', () => {
   const line = unprocessedBytes.toString()
   if (line.length > 0) {
      handleNewLine(line)
   }

   console.log(lines)
   const endOfScript = new Date().getTime()

   console.log('\n============= end =============\n')
   console.log('Running time: ', `${endOfScript - initOfScript}ms`)
})

// Node 22: node --experimental-strip-types --experimental-transform-types csv-stream-02.ts
