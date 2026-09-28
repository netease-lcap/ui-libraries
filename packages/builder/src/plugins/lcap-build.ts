import type { Plugin, ResolvedConfig } from 'vite';
import { lcapBuild } from '../build';
import type { LcapBuildOptions, LcapThemeOptions, BuildMode } from '../build/types';
import logger from '../utils/logger';

export {
  LcapThemeOptions,
};

export interface ViteLcapPluginOptions extends Partial<LcapBuildOptions> {
}

export default (options: any) => {
  let disabled = false;
  let startMode: BuildMode = 'production';
  return {
    name: 'vite:lcap-build',
    _options: options,
    configResolved(config: ResolvedConfig) {
      if (config.build.watch || config.mode === 'test' || config.mode === 'serve') {
        disabled = true;
      }

      if (config.mode === 'staging') {
        startMode = 'staging';
      }
    },
    buildEnd(error) {
      if (error) {
        disabled = true;
      }
    },
    async closeBundle() {
      if (disabled) {
        return;
      }

      try {
        await lcapBuild(options, startMode);
      } catch (e) {
        logger.error(e);
        process.exit(1);
      }
    },
  } as Plugin;
};
