const fs = require('fs-extra');
const json = require('./libraries/element-plus/dist-theme/nasl.ui.json');

const componentNameMap = {};
json.forEach((component) => {
  componentNameMap[component.name] = component.title;
  componentNameMap[component.kebabName] = component.title;
  component.children.forEach((subComponent) => {
    componentNameMap[subComponent.name] = subComponent.title;
    componentNameMap[subComponent.kebabName] = subComponent.title;
  });
});
const componentNameMapStr = Object.keys(componentNameMap).map((name) => `- ${name}: ${componentNameMap[name]}\n`).join('');

module.exports = {
  mode: 'file-rpa',
  prompt: fs.readFileSync('./ae.css-selectors-prompt.md', 'utf-8').replace(/<%= context %>/, componentNameMapStr),
  includes: ['libraries/element-plus/index.css-info-desc.json'],
  excludes: [],
  linePattern: /^(\s*")(.+?)(":\s*")(.*?)(",?\s*)$/,
  linePreFilter(line) {
    const cap = line.match(this.linePattern);
    return cap && !cap[4]; // 节省 token，只处理""的值
  },
  linePostProcess(line, oldLine) {
    const cap = line.match(this.linePattern);
    if (!cap) return console.log('[linePostProcess] cap is null:', line);
    if (!oldLine) return console.log('[linePostProcess] oldLine is null:', line, oldLine);
    return oldLine.replace(this.linePattern, (_, $1, $2, $3, $4, $5) => $1 + cap[2] + $3 + cap[4] + $5);
  },
};
