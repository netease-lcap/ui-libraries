/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require('fs-extra');
const defaultConfig = require('./defaults.js');

exports.resolveConfig = (configPath, rootPath) => {
  if (!fse.existsSync(configPath)) {
    return defaultConfig;
  }

  const config = require(configPath);
  return {
    ...defaultConfig,
    ...config,
    rootPath,
  };
};
