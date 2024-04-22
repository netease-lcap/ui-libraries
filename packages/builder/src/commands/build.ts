import { execSync } from '../utils/exec';
import logger from '../utils/logger';

export default () => {
  logger.start('start building......');
  execSync('npx vite build && tsc -p tsconfig.api.json && npm pack');
  logger.success('build success!');
};
