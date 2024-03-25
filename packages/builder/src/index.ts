import lcapPlugin from './plugins';

export type {
  ThemeInfo,
  ThemeComponentVars,
  ThemeVariable,
  ThemeGlobalVars,
  NaslViewElement,
} from './nasl';
export {
  parseComponentAPI,
  parseCssVars,
  transformJsx2Nasl,
} from './nasl';
export {
  lcapPlugin,
};
