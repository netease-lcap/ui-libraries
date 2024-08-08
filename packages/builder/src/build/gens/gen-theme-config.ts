/* eslint-disable newline-per-chained-call */
import glob from 'fast-glob';
import fs from 'fs-extra';
import { kebabCase } from 'lodash';
import parseCssVars, { ThemeComponentVars, ThemeGlobalVars, ThemeInfo } from '../../nasl/parse-css-vars';
import parseCssVarsOld from '../../nasl/parse-css-vars-old';

export interface ThemeOptions {
  themeVarCssPath: string;
  themeComponentFolder: string;
  type: string;
  previewPages: Array<{ name: string, title: string }>;
  oldCssVarPath?: string;
  components: Array<{ group: string, title: string, name: string, [key: string]: any }>;
  findThemeType?: 'theme' | 'component';
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

function getCssContent(options: ThemeOptions) {
  const cssVarFiles: string[] = [];

  if (options.themeVarCssPath && fs.existsSync(options.themeVarCssPath)) {
    cssVarFiles.push(options.themeVarCssPath);
  }

  const varsPath = options.findThemeType === 'component' ? '*/theme/vars.css' : '*/vars.css';
  const varFiles = glob.sync(varsPath, { cwd: options.themeComponentFolder, absolute: true });
  if (varFiles.length > 0) {
    cssVarFiles.push(...varFiles);
  }

  const cssContents: string[] = [];

  cssVarFiles.forEach((filePath) => {
    cssContents.push(fs.readFileSync(filePath, { encoding: 'utf-8' }).toString());
  });

  return cssContents.join('\n\n');
}

export default function genThemeConfig(options: ThemeOptions, framework: string) {
  const themeConfig: ThemeConfig = {
    defaultTheme: {},
    previewPages: options.previewPages,
    components: [],
    global: {
      selector: '',
      variables: [],
    },
  };

  let themeInfo: ThemeInfo = null as any;

  if (options.oldCssVarPath && fs.existsSync(options.oldCssVarPath)) {
    themeInfo = parseCssVarsOld(fs.readFileSync(options.oldCssVarPath, 'utf-8').toString(), options.themeComponentFolder);
  }

  const cssContent = getCssContent(options);

  if (cssContent) {
    const { global, components } = parseCssVars(cssContent);
    if (!themeInfo) {
      themeInfo = { global, components };
    } else {
      themeInfo.global.variables = ([] as any[]).concat(themeInfo.global.variables).concat(global.variables);

      components.forEach((comp) => {
        const it = themeInfo?.components.find((itComp) => itComp.name === comp.name);
        if (!it) {
          themeInfo?.components.push(comp);
        }
      });
    }
  }

  themeConfig.components = options.components.filter((comp) => comp.show !== false).map(({
    group, title, name, children,
  }) => {
    const compTheme = themeInfo.components.find((c) => (
      c.name === name || (
        kebabCase(c.name) === kebabCase(name)
        && framework && framework.startsWith('vue')
      )
    ));
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
