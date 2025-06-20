export function getKebabCaseName(name: string) {
  return name.replace(/([A-Z])/g, (m, $1) => `-${$1.toLowerCase()}`).replace(/^-/, '');
}
