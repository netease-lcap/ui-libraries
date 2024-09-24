import type { Plugin } from 'vite';
import { lcapBuild } from '../build';
import type { LcapBuildOptions, LcapThemeOptions } from '../build/types';

export {
  LcapThemeOptions,
};

export interface ViteLcapPluginOptions extends Partial<LcapBuildOptions> {
}

export default (options: any) => {
  let disabled = false;
  return {
    name: 'vite:lcap-build',
    configResolved(config) {
      if (config.mode === 'test' || config.mode === 'serve') {
        disabled = true;
      }
    },
    async closeBundle() {
      if (disabled) {
        return;
      }
      await lcapBuild(options);
    },
  } as Plugin;
};
