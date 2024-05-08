import { execSync } from '../utils/exec';
import logger from '../utils/logger';

export default () => {
  logger.start('start building......');
  execSync('npx vite build');
  logger.success('build success!');
};
