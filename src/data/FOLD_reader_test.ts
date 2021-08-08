/**
 * build:
 *  esbuild --outfile=build/test.js --bundle --platform=node src/data/FOLD_reader_test.ts
 * run:
 *  node build/test.js <FOLD_file_path>
 */

import * as fs from "fs";

import { FOLD_format } from 'data/FOLD_format';

import imported from './test-data/simple.json';


const
  last = (arr: string[]): string => arr[arr?.length - 1],
  f: FOLD_format = JSON.parse(fs.readFileSync(last(process.argv)).toString()),
  g: FOLD_format = imported;

console.log(f);
console.log(g);