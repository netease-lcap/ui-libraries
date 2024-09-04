import * as postcss from 'postcss';

export interface ThemeVariable {
  title?: string;
  desc?: string;
  type?: string;
  name: string;
  value: string;
  hidden?: boolean;
  [key: string]: any;
}

export interface ThemeComponentVars {
  name: string;
  useGlobalTokens: string[];
  selector: string;
  variables: ThemeVariable[];
  hidden?: boolean;
}

export interface ThemeGlobalVars {
  selector: string;
  variables: ThemeVariable[];
}

export interface ThemeInfo {
  global: ThemeGlobalVars,
  components: ThemeComponentVars[],
}

const ComponentAnnotation = '@component';
const UseGlobalTokensAnnotation = '@useGlobalTokens';

const parseCssVars = (nodes: NonNullable<postcss.Container['nodes']>) => {
  const variables: ThemeVariable[] = [];
  let variable: ThemeVariable = {
    title: '',
    desc: '',
    type: 'input',
    name: '',
    value: '',
  };

  nodes.forEach((n) => {
    if (n.type === 'comment') {
      n.text.replace(/\*/g, '')
        .trim()
        .split('\n')
        .map((str) => str.trim())
        .filter((str) => str && str.startsWith('@'))
        .forEach((str) => {
          const spaceIndex = str.indexOf(' ');
          if (spaceIndex === -1) {
            return;
          }

          const key = str.substring(1, spaceIndex);
          const valueStr = str.substring(spaceIndex).trim();
          if (valueStr.startsWith('{') || valueStr.startsWith('[')) {
            variable[key] = JSON.parse(valueStr);
          } else {
            variable[key] = valueStr;
          }
        });
      return;
    }

    if (n.type !== 'decl') {
      return;
    }

    variable.name = n.prop;
    variable.value = n.value;

    if ((
      ['color', 'bg', 'background'].some((key) => variable.name.toLocaleLowerCase().includes(key)) || variable.name.toLocaleLowerCase().endsWith('outline')
    ) && (!variable.type || variable.type === 'input')) {
      variable.type = 'color';
    }

    variables.push(variable);
    variable = {
      title: '',
      desc: '',
      type: 'input',
      name: '',
      value: '',
    };
  });
  return variables;
};

export default (cssContent: string) => {
  const themeInfo: ThemeInfo = {
    global: {
      selector: '',
      variables: [],
    },
    components: [],
  };

  const root = postcss.parse(cssContent);

  let componentInfo: ThemeComponentVars | null = null;
  root.nodes.forEach((n) => {
    if (n.type === 'comment') {
      if (n.text.includes('@component')) {
        componentInfo = {
          name: '',
          useGlobalTokens: [],
          selector: '',
          variables: [],
        };

        n.text.replace(/\*/g, '')
          .trim()
          .split('\n')
          .map((str) => str.trim())
          .filter((str) => str && str.startsWith('@'))
          .forEach((str) => {
            if (!componentInfo) {
              return;
            }

            if (str.startsWith(ComponentAnnotation)) {
              componentInfo.name = str.substring(ComponentAnnotation.length).trim();
            } else if (str.startsWith(UseGlobalTokensAnnotation)) {
              componentInfo.useGlobalTokens = JSON.parse(str.substring(UseGlobalTokensAnnotation.length).trim());
            }
          });
      }
    } else if (n.type === 'rule') {
      const variables = parseCssVars(n.nodes);

      if (componentInfo) {
        componentInfo.variables = variables;
        componentInfo.selector = n.selector;
        if (themeInfo.components.findIndex((c) => c.name === componentInfo?.name) === -1) {
          themeInfo.components.push(componentInfo);
        }
        componentInfo = null;
      } else if (!themeInfo.global.selector) {
        themeInfo.global.selector = n.selector;
        themeInfo.global.variables = variables;
      }
    }
  });

  return themeInfo;
};
