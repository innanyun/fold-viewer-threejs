/**
 * build:
 *  esbuild --outfile=build/test.js --bundle --platform=node <this_file>
 * run:
 *  node build/test.js **<FOLD_file_path>**
 */

import * as fs from 'fs'

import { FOLD_data } from 'data/fold_format'

import * as externalData from './test-data/3d-vertex-coords/bird-base-3d-modified.json'


const
  last = (arr: string[]): string => arr[arr?.length - 1],
  readIn: FOLD_data = JSON.parse(fs.readFileSync(last(process.argv)).toString()),
  imported: FOLD_data = externalData


console.log(readIn)
console.log(imported)
