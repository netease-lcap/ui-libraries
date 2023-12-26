import * as fs from 'fs-extra';
import * as path from 'path';

import gen from './common/ts2usage'

const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();

const root = path.join(cwd, argv.root || '') || path.join(__dirname, "../../cloud-ui");
console.log('root: ', root);
const data = gen(root)

const output = path.join(cwd, argv.dest) || path.join(__dirname, `../pc.nasl.ui.json`);

fs.writeFileSync(
    output,
    JSON.stringify(data, null, 2)
);
