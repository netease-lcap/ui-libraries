import * as fs from 'fs-extra';
import * as path from 'path';

import gen from './common/ts2usage'


const root = path.join(__dirname, "../../cloud-ui");
const data = gen(root)

fs.writeFileSync(
    path.join(__dirname, `../pc.nasl.ui.json`),
    JSON.stringify(data, null, 2)
);
