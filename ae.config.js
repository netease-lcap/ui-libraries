const path = require('path');
const fs = require('fs-extra');

module.exports = {
  prompt: fs.readFileSync('./ae.prompt.md'),
  includes: ['libraries/element-ui/src/theme/**/vars.css'],
  excludes: ['libraries/element-ui/src/theme/vars.css'],
}
