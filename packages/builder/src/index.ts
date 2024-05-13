import lcapPlugin from './plugins';
import genNaslLogicsConfig from './build/gen-nasl-logics-config';
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
  parseCssVarsOld,
  transformJsx2Nasl,
  transformTsFunc2NaslLogic,
} from './nasl';

export {
  lcapPlugin,
  genNaslLogicsConfig,
  createGenScopedName,
};
