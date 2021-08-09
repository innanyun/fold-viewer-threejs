/**
 * build:
 *  esbuild --outfile=build/test.js --bundle --platform=node src/data/FOLD_reader_test.ts
 * run:
 *  node build/test.js <FOLD_file_path>
 */

import * as fs from 'fs';

import { FOLD_data } from 'data/FOLD_format';

import * as externalData from './test-data/diagonal-folded.json';


const
  last = (arr: string[]): string => arr[arr?.length - 1],
  read: FOLD_data = JSON.parse(fs.readFileSync(last(process.argv)).toString()),
  imported: FOLD_data = externalData;


console.log(read);
console.log(imported);
