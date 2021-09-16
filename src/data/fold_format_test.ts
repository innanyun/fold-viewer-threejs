/**
 * **NB**: MANUAL (non-automated) test for `FOLD_data` type evolution
 *
 * build (in the project root dir):
 *  `esbuild --outfile=build/test.js --bundle --platform=node <this_file>`
 * run (in the project root dir):
 *  `node build/test.js **<FOLD_file>**` eg
 *  `node build/test.js src/data/test-data/3d-vertex-coords/box.json`
 */

import * as fs from 'fs'

import { FOLD_data } from 'data/fold_format'

import externalData from './test-data/3d-vertex-coords/bird-base-3d-modified.json'


const
  last = (arr: string[]): string => arr[arr?.length - 1],
  readIn: FOLD_data = JSON.parse(fs.readFileSync(last(process.argv)).toString()),
  imported: FOLD_data = externalData


console.log(readIn)
console.log(imported)
