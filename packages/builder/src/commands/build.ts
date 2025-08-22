import { execSync } from '../utils/exec';
import logger from '../utils/logger';

interface BuildCommandOptions {
  staging?: boolean;
}

export default (rootPath: string, options: BuildCommandOptions) => {
  logger.start('start building......');
  const commands = [
    'npx vite build',
  ];

  if (options.staging) {
    commands.push('--mode staging');
  }

  execSync(commands.join(' '));
  logger.success('build success!');
};
