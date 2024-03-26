import lcapPlugin from './plugins';
import { createGenScopedName } from './utils/create-gen-scoped-name';

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
  createGenScopedName,
};
