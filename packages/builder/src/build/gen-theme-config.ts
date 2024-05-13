/* eslint-disable newline-per-chained-call */
import glob from 'fast-glob';
import fs from 'fs-extra';
import parseCssVars, { ThemeComponentVars, ThemeGlobalVars, ThemeInfo } from '../nasl/parse-css-vars';
import parseCssVarsOld from '../nasl/parse-css-vars-old';

export interface ThemeOptions {
  themeVarCssPath: string;
  themeComponentFolder: string;
  previewPages: Array<{ name: string, title: string }>;
  useOldCssVarParser?: boolean;
  components: Array<{ group: string, title: string, name: string, [key: string]: any }>
}

export interface ThemeComponentConfig extends ThemeComponentVars {
  group: string;
  title: string;
  children?: string[];
}

export interface ThemeGlobalConfig extends ThemeGlobalVars {
}

export interface ThemeConfig {
  defaultTheme: {
    [key: string]: any;
  };
  previewPages: Array<{ name: string, title: string; viewport?: { width: number; height: number } }>;
  components: ThemeComponentConfig[];
  global: ThemeGlobalConfig;
}

function concatCssContent(themeVarCssPath: string, themeComponentFolder: string) {
  const cssVarFiles = [
    themeVarCssPath,
  ];

  const varFiles = glob.sync('*/vars.css', { cwd: themeComponentFolder, absolute: true });
  if (varFiles.length > 0) {
    cssVarFiles.push(...varFiles);
  }

  const cssContents: string[] = [];

  cssVarFiles.forEach((filePath) => {
    cssContents.push(fs.readFileSync(filePath, { encoding: 'utf-8' }).toString());
  });

  return cssContents.join('\n\n');
}

export default function genThemeConfig(options: ThemeOptions) {
  const themeConfig: ThemeConfig = {
    defaultTheme: {},
    previewPages: options.previewPages,
    components: [],
    global: {
      selector: '',
      variables: [],
    },
  };

  let themeInfo: ThemeInfo;

  if (options.useOldCssVarParser) {
    const cssContent = fs.readFileSync(options.themeVarCssPath, { encoding: 'utf-8' }).toString();
    themeInfo = parseCssVarsOld(cssContent, options.themeComponentFolder);
  } else {
    const cssContent = concatCssContent(options.themeVarCssPath, options.themeComponentFolder);
    themeInfo = parseCssVars(cssContent);
  }

  themeConfig.components = options.components.filter((comp) => comp.show !== false).map(({
    group, title, name, children,
  }) => {
    const compTheme = themeInfo.components.find((c) => c.name === name);
    if (!compTheme) {
      return {
        name,
        title,
        group,
        useGlobalTokens: [],
        selector: '',
        variables: [],
      };
    }

    compTheme.variables.forEach(({ name: key, value }) => {
      themeConfig.defaultTheme[key] = value;
    });

    return {
      ...compTheme,
      name,
      title,
      group,
      children: children || [],
    };
  }).filter((comp: ThemeComponentVars) => {
    return (comp.useGlobalTokens.length > 0 || comp.variables.length > 0) && !comp.hidden;
  }).map((comp) => {
    return {
      ...comp,
      variables: comp.variables.filter((cssVar) => !cssVar.hidden),
    };
  });

  themeConfig.global.selector = themeInfo.global.selector;
  themeConfig.global.variables = themeInfo.global.variables.filter((cssVar) => {
    themeConfig.defaultTheme[cssVar.name] = cssVar.value;
    return !cssVar.hidden;
  });

  return themeConfig;
}
