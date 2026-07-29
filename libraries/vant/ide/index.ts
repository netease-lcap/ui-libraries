import themeGlobal from '../src/theme/ide';
import genEntityBlocks from './blocks/entity/index';
import genEnumBlocks from './blocks/enum/index';

export const theme = {
  global: themeGlobal,
};

export const blocks = [...genEntityBlocks, ...genEnumBlocks];
