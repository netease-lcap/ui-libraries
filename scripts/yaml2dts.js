const YAML = require('yaml');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs-extra');
const path = require('path');
const json5 = require('json5');
const { components, components0 } = require('./common/loadComponents');

/**
 * 中划线格式 转 驼峰格式  kebab-case -> PascalCase
 * @param name 原名称
 * @return 转换后的名称
 */
const kebab2Pascal = (name) => name.replace(/(?:^|-)([a-zA-Z0-9])/g, (m, $1) => $1.toUpperCase());
const kebab2Camel = (name) => name.replace(/(?:-)([a-zA-Z0-9])/g, (m, $1) => $1.toUpperCase());
const indent = (n) => '    '.repeat(n);

XlsxPopulate.fromBlankAsync().then((workbook) => {
    // labels
    components.forEach((component) => {
        const output = `declare namespace nasl.ui {
${component.subs.map((sub) => `${indent(1)}@Component({
        title: '${sub.title}',${sub.icon ? `
        icon: '${sub.icon}',` : ''}${sub.description ? `
        description: '${sub.description}',` : ''}
    })
    ${sub.advanced ? '' : 'export '}class ${kebab2Pascal(sub.name)} extends VueComponent {
${!sub.attrs ? '' : sub.attrs.map((attr) => {
    const syncMode = ({ '11': 'both', '10': 'onlyModel', '01': 'onlySync', '00': '' })[Number(!!attr.model) + '' + Number(!!attr.sync)];
    let naslType = attr.type
        .replace(/\bstring\b/g, 'nasl.core.String')
        .replace(/\bnumber\b/g, 'nasl.core.Decimal')
        .replace(/\bboolean\b/g, 'nasl.core.Boolean')
        .replace(/\bany\b/g, 'nasl.core.Any')
        .replace(/\s*,\s*/g, ' | ');
    if (attr.options) {
        naslType = attr.options.map((option) => `'${option.value}'`).join(' | ');
        attr.options.forEach((option) => {
            if (!option.value)
                console.log(component.yamlPath, option);
        });
    }

    return `${indent(2)}@Prop({${attr.group ? `
            group: '${attr.group}',` : ''}
            title: '${attr.title}',${attr.description ? `
            description: '${attr.description}',` : ''}${syncMode ? `
            syncMode: '${syncMode}',` : ''}${attr.options ? `
            enumItemTitles: [${attr.options.map((option) => (option.title || option.name).includes?.(`'`) ? `"${option.title || option.name}"` : `'${option.title || option.name}'`).join(', ')}],` : ''}
        })
        ${attr.advanced ? 'private ' : ''}${kebab2Camel(attr.name)}: ${naslType}${attr.default ? ' = ' + json5.stringify(attr.default) : ''};`
    }).join('\n')}
    }`).join('\n\n')}
}
`

        const dtsPath = component.yamlPath.replace(/\.yaml$/, '.d.ts');
        fs.writeFileSync(dtsPath, output);
    });
});
