/**
 * build:
 *  esbuild --outfile=build/test.js --bundle --platform=node src/data/FOLD_reader_test.ts
 * run:
 *  node build/test.js <FOLD_file_path>
 */

import { FOLD_format } from 'data/FOLD_format';
import * as fs from 'fs'

const
  last = (arr: string[]): string => arr[arr?.length - 1],
  f: FOLD_format = JSON.parse(fs.readFileSync(last(process.argv)).toString());

console.log(f);
