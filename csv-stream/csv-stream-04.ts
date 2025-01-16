import fs from 'node:fs'
import path from 'node:path'

// Node 22: npm run start:ts -- csv-stream-04.ts
const initOfScript = new Date().getTime()

class ProcessCSV {
   private readonly STREAM: fs.ReadStream
   private readonly DOUBLEQUOTE = 34
   private readonly BOUNDARY = 10
   private readonly COMMA = 44

   private unprocessedBytes = Buffer.alloc(0)

   private currentLine = 0
   private lastBreakIndex = 0

   private _result: string[][] = [[]]

   get result() {
      return this._result
   }

   constructor(stream: fs.ReadStream) {
      this.STREAM = stream
   }

   public run() {
      return new Promise((resolve, reject) => {
         this.STREAM.on('readable', this.handleOnReadable.bind(this))

         this.STREAM.on('end', () => this.handleOnEnd(resolve))
         this.STREAM.on('error', (err) => reject(err))
      })
   }

   private handleOnReadable() {
      let chunk: Buffer
      let isBetweenDoublequote = false

      while ((chunk = this.STREAM.read()) !== null) {
         if (this.unprocessedBytes.length > 0) {
            chunk = Buffer.concat([this.unprocessedBytes, chunk])
            this.unprocessedBytes = Buffer.alloc(0)
         }

         for (let i = 0; i < chunk.byteLength; i++) {
            if (chunk[i] === this.DOUBLEQUOTE) {
               isBetweenDoublequote = !isBetweenDoublequote
            }

            if (isBetweenDoublequote) {
               continue
            }

            if (chunk[i] === this.COMMA) {
               this.handleComma(chunk, i)
            }

            if (chunk[i] === this.BOUNDARY) {
               this.handleBoundary(chunk, i)
            }
         }

         if (this.lastBreakIndex > 0) {
            this.unprocessedBytes = Buffer.concat([
               this.unprocessedBytes,
               chunk.subarray(this.lastBreakIndex + 1),
            ])
         } else {
            this.unprocessedBytes = chunk
         }

         this.lastBreakIndex = 0
      }
   }

   private handleComma(chunk: Buffer, commaIndex: number) {
      const newCell = chunk.subarray(this.lastBreakIndex, commaIndex).toString()
      this.handleNewCell(newCell)

      this.lastBreakIndex = commaIndex
   }

   private handleBoundary(chunk: Buffer, boundaryIndex: number) {
      this.handleComma(chunk, boundaryIndex)

      this.handleNewLine()
   }

   private handleOnEnd(resolve: (value: unknown) => void) {
      const cell = this.unprocessedBytes.toString()
      if (cell.length > 0) {
         this.handleNewCell(cell)
      }

      resolve(this._result)
   }

   private handleNewCell(cell: string) {
      if (cell[0] === ',' || cell[0] === '\n') {
         cell = cell.substring(1)
      }

      this.result[this.currentLine].push(cell)
   }

   private handleNewLine() {
      this.result.push([])
      this.currentLine++
   }
}

async function run() {
   const FILENAME = 'sample.csv'
   // const FILENAME = 'sample-doublequote.csv'

   const filePath = path.join(import.meta.dirname, FILENAME)
   const csvStream = fs.createReadStream(filePath, { highWaterMark: 8 })

   const processCSV = new ProcessCSV(csvStream)
   await processCSV.run()

   console.log(processCSV.result)

   const endOfScript = new Date().getTime()
   console.log('Running time: ', `${endOfScript - initOfScript}ms`)
}

run()
