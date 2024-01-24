import genUsageByTs from './genUsageByTs.mjs';
import genThemeConfig from './genThemeConfig.mjs';
import genI18NConfig from './genI18NConfig.mjs';
// import genUsageByYaml from './genUsageByYaml.mjs';
import * as logger from '../../utils/logger.mjs';

export default async (config) => {
  await genUsageByTs(config);
  logger.done('generate nasl.ui.json successed!');
  await genI18NConfig(config);
  logger.done('generate i18n.json successed!');
  await genThemeConfig(config);
  logger.done('generate theme.json successed!');
  // await genUsageByYaml(config);
  // logger.done('generate usage.json successed!');
};
