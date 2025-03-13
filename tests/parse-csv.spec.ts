import test from "@playwright/test";
import fs from 'fs';
import { parse } from "csv-parse";
import path from "path";

// const records = parse(fs.readFileSync(path.join(__dirname, './data/input.csv')), {
//     columns: true,
//     skip_empty_lines: true
// });

const records = parse(fs.readFileSync(path.join(__dirname, './data/input.csv'), 'utf8'), {
    columns: true,
    skip_empty_lines: true
})
    
console.log('records: ', records);

// for (let record of data) {
//     console.log(record);
// }

// for (let record of records) {
//     test(`test: ${record.username}`, async ({ page }) => {
//         console.log(record.username, record.password, record.some_value);
//     });
// }

// records.forEach(record => {
//     test(`test: ${record.username}`, async ({ page }) => {
//         console.log(record.username, record.password, record.some_value);
//     });
// });