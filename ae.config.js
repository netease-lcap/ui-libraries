const fs = require('fs-extra');

module.exports = {
  mode: 'file-rpa',
  prompt: fs.readFileSync('./ae.prompt.md'),
  includes: ['libraries/element-pro/src/theme/**/vars.css'],
  excludes: ['libraries/element-pro/src/theme/vars.css'],
  postprocess(aiSegment, sourceSegment) {
    const re = /\}\s*$/;
    if (!re.test(sourceSegment) && re.test(aiSegment))
      return aiSegment.replace(re, '');
    else
      return aiSegment;
  }
}
