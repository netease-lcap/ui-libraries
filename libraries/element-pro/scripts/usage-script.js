/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();

const naslUIConfigPath = path.resolve(cwd, './dist-theme/nasl.ui.json');
const ideusagePath = path.resolve(cwd, 'ideusage.json');

if (!fs.existsSync(naslUIConfigPath) || !fs.existsSync(ideusagePath)) {
  return;
}

const usage = fs.readJSONSync(ideusagePath, 'utf-8');
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

merge(naslui, usage);
fs.writeJSONSync(naslUIConfigPath, naslui);
