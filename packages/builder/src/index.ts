import lcapPlugin from './plugins';
import genNaslLogicsConfig from './build/gen-nasl-logics-config';
import { createGenScopedName } from './utils/create-gen-scoped-name';

export type {
  ThemeInfo,
  ThemeComponentVars,
  ThemeVariable,
  ThemeGlobalVars,
} from './nasl';
export {
  parseComponentAPI,
  parseCssVars,
  parseCssVarsOld,
  transformTsFunc2NaslLogic,
} from './nasl';

export {
  lcapPlugin,
  genNaslLogicsConfig,
  createGenScopedName,
};
