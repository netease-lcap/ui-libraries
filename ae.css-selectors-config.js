const fs = require('fs-extra');

module.exports = {
  mode: 'file-rpa',
  prompt: fs.readFileSync('./ae.css-selectors-prompt.md'),
  includes: ['libraries/pc-ui/index.css-rules-desc.json'],
  excludes: [],
  matchLine(line, prevLine) {
    return /^\s*".+?":\s*""/.test(line);
  },
  postprocessLine(line, prevLine, nextLine) {
    if (nextLine.trim()[0] === '}')
      return line.replace(/,\s*$/, '');
    else
      return line;
  }
}
