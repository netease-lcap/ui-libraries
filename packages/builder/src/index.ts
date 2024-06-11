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
  transformTsFunc2NaslLogic,
  transformJsx2Nasl,
} from './nasl';

export {
  transformExpression2nasl,
  transformTsType2Nasl,
  transformFunc2Nasl,
  transformTSX2Nasl,
} from './ts2nasl';

export {
  lcapPlugin,
  genNaslLogicsConfig,
  createGenScopedName,
};
