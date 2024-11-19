import type { Plugin } from 'vite';
import { lcapBuild } from '../build';
import type { LcapBuildOptions, LcapThemeOptions } from '../build/types';
import logger from '../utils/logger';

export {
  LcapThemeOptions,
};

export interface ViteLcapPluginOptions extends Partial<LcapBuildOptions> {
}

export default (options: any) => {
  let disabled = false;
  return {
    name: 'vite:lcap-build',
    _options: options,
    configResolved(config) {
      if (config.build.watch || config.mode === 'test' || config.mode === 'serve') {
        disabled = true;
      }
    },
    async closeBundle() {
      if (disabled) {
        return;
      }

      try {
        await lcapBuild(options);
      } catch (e) {
        logger.error(e);
        process.exit(1);
      }
    },
  } as Plugin;
};
