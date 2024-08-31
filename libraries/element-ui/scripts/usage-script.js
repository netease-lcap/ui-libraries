/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();

const naslUIConfigPath = path.resolve(cwd, './dist-theme/nasl.ui.json');
const usage = fs.readJSONSync(path.resolve(cwd, 'ideusage.json'), 'utf-8');
// const pcUIUsage = fs.readJSONSync(path.resolve(cwd, '../pc-ui/ideusage.json'), 'utf-8');
const naslui = fs.readJSONSync(naslUIConfigPath, 'utf-8');

function mergeIdeUsage(a, b) {
  if (a.ideusage) {
    return;
  }
  a.ideusage = b.ideusage;
}

function merge(list, usageList) {
  list.forEach((obj) => {
    const n = obj.name;
    const _usage = usageList.find((u) => u.name === n);
    if (_usage) {
      mergeIdeUsage(obj, _usage);
    }
    if (obj.children && obj.children.length > 0) {
      merge(obj.children, usageList);
    }
  });
}

// merge(naslui, pcUIUsage);
merge(naslui, usage);
fs.writeJSONSync(naslUIConfigPath, naslui, { spaces: 2 });
