const fs = require('fs-extra');

module.exports = {
  mode: 'file-rpa',
  prompt: fs.readFileSync('./ae.css-selectors-prompt.md', 'utf-8'),
  includes: ['libraries/pc-ui/index.css-rules-desc.json'],
  excludes: [],
  linePattern: /^(\s*")(.+?)(":\s*")(.*?)(",?\s*)$/,
  linePreFilter(line) {
    const cap = line.match(this.linePattern);
    return cap && !cap[4]; // 节省 token，只处理""的值
  },
  linePostProcess(line, oldLine) {
    const cap = line.match(this.linePattern);
    if (!cap) console.log('[linePostProcess] cap is null:', line);
    if (!oldLine) console.log('[linePostProcess] oldLine is null:', line, oldLine);
    return oldLine.replace(this.linePattern, (_, $1, $2, $3, $4, $5) => $1 + cap[2] + $3 + cap[4] + $5);
  },
}
