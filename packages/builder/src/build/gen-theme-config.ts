import glob from 'fast-glob';
import fs from 'fs-extra';
import parseCssVars, { ThemeComponentVars, ThemeGlobalVars } from '../nasl/parse-css-vars';

export interface ThemeOptions {
  themeVarCssPath: string;
  themeComponentFolder: string;
  previewPages: Array<{ name: string, title: string }>;
  components: Array<{ group: string, title: string, name: string }>
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

  const varFiles = glob.sync(`${themeComponentFolder}/*/vars.css`);
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
  const cssContent = concatCssContent(options.themeVarCssPath, options.themeComponentFolder);
  const themeInfo = parseCssVars(cssContent);

  themeConfig.components = options.components.map(({ group, title, name }) => {
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
    };
  }).sort((a: any, b: any) => {
    return `${a.group}-${a.name}`.localeCompare(`${b.group}-${b.name}`);
  });

  themeConfig.global.selector = themeInfo.global.selector;
  themeConfig.global.variables = themeInfo.global.variables;

  themeConfig.global.variables.forEach(({ name: key, value }) => {
    themeConfig.defaultTheme[key] = value;
  });

  return themeConfig;
}
