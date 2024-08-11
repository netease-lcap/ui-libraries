export function replaceTagName(code: string, source: string, target: string) {
  return code.replaceAll(`<${source}\n`, `<${target}\n`)
    .replaceAll(`<${source} `, `<${target} `)
    .replaceAll(`<${source}>`, `<${target}>`)
    .replaceAll(`</${source}>`, `</${target}>`)
    .replaceAll(`</ ${source}>`, `</${target}>`);
}
