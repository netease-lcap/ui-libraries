import * as fs from 'fs-extra';
import * as path from 'path';

import gen from './common/ts2usage'


const root = path.join(__dirname, "../../vant");
const data = gen(root)

fs.writeFileSync(
    path.join(__dirname, `../h5.nasl.ui.json`),
    JSON.stringify(data, null, 2)
);
