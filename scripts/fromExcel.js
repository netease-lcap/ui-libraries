const xlsx = require('node-xlsx');
const fs = require('fs-extra');
const path = require('path');
const sheets = xlsx.parse(fs.readFileSync(path.join(__dirname, './组件总表.xlsx')), {
    cellStyles: true,
});

console.log(sheets[0].data[0]);
