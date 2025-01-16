import fs from 'node:fs'
import path from 'node:path'

const initOfScript = new Date().getTime()

const BOUNDARY = 10 // \n
const DOUBLEQUOTE = 34 // "
const HIGH_WATER_MARK = 8

const FILENAME = 'sample.csv'
// const FILENAME = 'sample-doublequote.csv'

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

   function handleBoundary(chunk: Buffer, boundaryIndex: number) {
      const preBoundary = chunk.subarray(lastBoundary, boundaryIndex)
      let newLine: string

      if (unprocessedBytes.length > 0) {
         newLine = Buffer.concat([unprocessedBytes, preBoundary]).toString()
         unprocessedBytes = Buffer.alloc(0)
      } else {
         newLine = preBoundary.toString()
      }

      lastBoundary = boundaryIndex
      handleNewLine(newLine)
   }

   while ((chunk = this.read()) !== null) {
      for (let i = 0; i < chunk.byteLength; i++) {
         if (chunk[i] === DOUBLEQUOTE) {
            doublequoteFlag = !doublequoteFlag
         }

         if (chunk[i] === BOUNDARY && !doublequoteFlag) {
            handleBoundary(chunk, i)
         }
      }

      unprocessedBytes = Buffer.concat([
         unprocessedBytes,
         chunk.subarray(lastBoundary),
      ])

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

// Node 22: npm run start:ts -- csv-stream-02.ts
