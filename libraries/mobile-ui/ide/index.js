import themeGlobal from '../src-vusion/theme/ide';
import genBlocks from './blocks/index';
import genProcess from './process';

export const theme = {
  global: themeGlobal,
};

export const blocks = genBlocks;

export const process = genProcess;
