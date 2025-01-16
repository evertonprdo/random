import fs from 'node:fs'
import path from 'node:path'

// Node 22: npm run start:ts -- csv-stream-03.ts
const initOfScript = new Date().getTime()

class ProcessCSV {
   private readonly STREAM: fs.ReadStream
   private readonly DOUBLEQUOTE = 34
   private readonly BOUNDARY = 10

   private unprocessedBytes = Buffer.alloc(0)
   private intoDoublequote = false
   private lastBoundary = 0

   private _result: string[] = []

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

      while ((chunk = this.STREAM.read()) !== null) {
         for (let i = 0; i < chunk.byteLength; i++) {
            if (chunk[i] === this.DOUBLEQUOTE) {
               this.intoDoublequote = !this.intoDoublequote
            }

            if (chunk[i] === this.BOUNDARY && !this.intoDoublequote) {
               this.handleBoundary(chunk, i)
            }
         }

         this.unprocessedBytes = Buffer.concat([
            this.unprocessedBytes,
            chunk.subarray(this.lastBoundary),
         ])

         this.lastBoundary = 0
      }
   }

   private handleBoundary(chunk: Buffer, boundaryIndex: number) {
      const preBoundary = chunk.subarray(this.lastBoundary, boundaryIndex)
      let newLine: string

      if (this.unprocessedBytes.length > 0) {
         newLine = Buffer.concat([
            this.unprocessedBytes,
            preBoundary,
         ]).toString()

         this.unprocessedBytes = Buffer.alloc(0)
      } else {
         newLine = preBoundary.toString()
      }

      this.lastBoundary = boundaryIndex
      this.handleNewLine(newLine)
   }

   private handleOnEnd(resolve: (value: unknown) => void) {
      const line = this.unprocessedBytes.toString()
      if (line.length > 0) {
         this.handleNewLine(line)
      }

      resolve(this._result)
   }

   private handleNewLine(line: string) {
      if (line[0] === '\n') {
         this._result.push(line.substring(1))
         return
      }

      this._result.push(line)
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
