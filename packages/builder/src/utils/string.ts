export const kebabCaseToCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
export const firstLetterToUpperCase = (str) => str[0].toUpperCase() + str.slice(1);
