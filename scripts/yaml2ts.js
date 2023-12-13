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
const firstUpperCase = (name) => name.replace(/^[a-z]/, (m) => m.toUpperCase());
const notNil = (value) => value !== null && value !== undefined;
const indent = (n) => '    '.repeat(n);
const formatOptions = (options) => json5.stringify(options).replace(/[{:,]/g, '$& ').replace(/[}]/g, ' $&');

const translateNumber = (attr) => {
    if (attr.precision === 0) {
        return 'nasl.core.Integer';
    } else {
        return 'nasl.core.Decimal';
    }
}
const translateDefaultValue = (value, type) => {
    let tempValue;
    if(typeof value === 'string' && value.startsWith('{')){
        tempValue = value;
    } else {
        tempValue = json5.stringify(value);
    }
    if(type.includes('=>') && value){
        let tempType = type.split('=>')[0];
        const tempTypeItemName = tempType.match(/(?<=\()(.+?)(?=\:)/g)[0];
        tempType = tempType.replace(/(?<=\:)(.+?)(?=\))/g, ' any');
        return `(${tempType} => ${tempTypeItemName}.${value}) as any`;
    }
    if(type.includes('nasl.collection.List') || type === 'M') {
        return `${tempValue} as any`;
    }
    if(type === 'nasl.core.Date') {
        return `${tempValue} as any`;
    }
    return tempValue;
}

XlsxPopulate.fromBlankAsync().then((workbook) => {
    // labels
    components.forEach((component) => {
        const output = `/// <reference types="@nasl/types" />

namespace nasl.ui {
${component.subs.map((sub) => {
    const className = kebab2Pascal(sub.name);
    const typeParamsStr = sub.tsTypeParams ? `<${sub.tsTypeParams}>` : '';
    const typeArgumentsStr = typeParamsStr.replace(/\s+extends\s+.+?(?=,|>)/g, '');

    return `${indent(1)}@Component({
        title: '${sub.title}',${sub.icon ? `
        icon: '${sub.icon}',` : ''}${sub.description ? `
        description: '${sub.description}',` : ''}
    })
    ${sub.advanced ? '' : 'export '}class ${className}${typeParamsStr} extends ViewComponent {
${!sub.attrs ? '' : sub.attrs.filter((attr) => attr.readable).map((attr) => {
    let attrType = attr.type
        .replace(/\bstring\b/g, 'nasl.core.String')
        .replace(/\bnumber\b/g, translateNumber(attr))
        .replace(/\bboolean\b/g, 'nasl.core.Boolean')
        .replace(/\bany\b/g, 'nasl.core.Any')
        // .replace(/'/g, '\\\'');
    if (/\{\[/.test(attrType))
        attrType = attrType.replace(/\s*,\s*/g, ' | ');
    const attrName = kebab2Camel(attr.readableName ? attr.readableName : attr.name);

    return (attr.readableTitle ? `${indent(2)}@Prop${attr.display ? `<${className}Options${typeArgumentsStr}, ${attr.advanced || attr.hidden ? 'any' : `'${kebab2Camel(attr.name)}'`}>` : ''}({${attr.readableTitle ? `
            title: '${attr.readableTitle}',` : ''}
        })
` : '') + `${indent(2)}${attr.advanced || attr.hidden ? 'private ' : ''}${attrName}: ${className}Options${typeArgumentsStr}['${kebab2Camel(attr.name)}'];`
    }).join('\n\n')}${!sub.methods ? '' : `

` + sub.methods.map((method) => {
        return `${indent(2)}@Method({
            title: '${method.title}',${method.description ? `
            description: '${method.description}',` : ''}
        })
        ${method.advanced ? 'private ' : ''}${method.name}(${!(method.params && method.params.length) ? '' : method.params.map((param) => {
            let paramType = param.type
                .replace(/\bstring\b/g, 'nasl.core.String')
                .replace(/\bnumber\b/g, translateNumber(param))
                .replace(/\bboolean\b/g, 'nasl.core.Boolean')
                .replace(/\bany\b/g, 'nasl.core.Any')
                .replace(/\s*,\s*/g, ' | ');
            if (param.options) {
                paramType = param.options.map((option) => `'${option.value}'`).join(' | ');
            }

            return `
            @Param({
                title: '${param.title}',${param.description ? `
                description: '${param.description}',` : ''}${param.options ? `
                setter: {
                    type: 'enumSelect',
                    options: ${formatOptions(param.options.map((option) => ({ title: option.title || option.name, icon: option.icon, tooltip: option.tooltip })))},
                },` : ''}
            })
            ${param.name}${param.required === false && !notNil(param.default) ? '?' : ''}: ${paramType}${notNil(param.default) ? ` = ${translateDefaultValue(param.default, paramType)}` : ''},`;
        }).join('') + '\n        '}): void {}`;
    }).join('\n\n')}
        constructor(options?: Partial<${className}Options${typeArgumentsStr}>) { super(); }
    }

    ${sub.advanced ? '' : 'export '}class ${className}Options${typeParamsStr} {
${!sub.attrs ? '' : sub.attrs.map((attr) => {
    const sync = !!(attr.model || attr.sync);
    let attrType = attr.type
        .replace(/\bstring\b/g, 'nasl.core.String')
        .replace(/\bnumber\b/g, translateNumber(attr))
        .replace(/\bboolean\b/g, 'nasl.core.Boolean')
        .replace(/\bany\b/g, 'nasl.core.Any')
        // .replace(/'/g, '\\\'');
    if (/\{\[/.test(attrType))
        attrType = attrType.replace(/\s*,\s*/g, ' | ');
    if (attr.options) {
        attrType = attr.options.map((option) => `'${option.value}'`).join(' | ');
        attr.options.forEach((option) => {
            if (!option.value)
                console.log(component.yamlPath, option);
        });
    }
    let ifcondition = '';
    if (attr.dependency) {
        ifcondition = attr.dependency.map((dep) => {
            return Object.keys(dep).map((key) => {
                let first = key[0];
                if (first === '!' || first === '+') {
                    const newkey = key.slice(1);
                    if (Array.isArray(dep[key])){
                      return dep[key].map((item) => {
                        return `_.${kebab2Camel(newkey)} !== ${json5.stringify(item)}`
                      }).join(' && ');
                    } else {
                      return `_.${kebab2Camel(newkey)} !== ${json5.stringify(dep[key])}`
                    }
                } else {
                    return `_.${kebab2Camel(key)} === ${json5.stringify(dep[key])}`
                }
            }).join(' && ');
        }).join(' || ');
    } else if (attr.depProp) {
        ifcondition = attr.depProp.map((dep) => {
            return `_.${kebab2Camel(dep.name)} === ${json5.stringify(dep.value)}`;
        }).join(' || ');
    }
    let onChange = '';
    if (attr.toggleclear) {
        onChange = `\n                { clear: ${json5.stringify(attr.toggleclear)} }`;
    } else if (attr.toggleupdate) {
        attr.toggleupdate.forEach((item) => {
            onChange += `\n                { update: ${json5.stringify(item.updateData)}, if: _ => _ === ${json5.stringify(item.value)} },`;
        });
    }

    return `${indent(2)}@Prop${attr.display || ifcondition || onChange ? `<${className}Options${typeArgumentsStr}, ${attr.advanced || attr.hidden ? 'any' : `'${kebab2Camel(attr.name)}'`}>` : ''}({${attr.group ? `
            group: '${attr.group}',` : ''}
            title: '${attr.title}',${attr.description ? `
            description: ${/[\n']/g.test(attr.description) ? `\`${attr.description}\`` : `'${attr.description}'`},` : ''}${sync ? `
            sync: ${sync},` : ''}${attr.tooltipLink ? `
            tooltipLink: '${attr.tooltipLink}',` : ''}${attr.docDescription ? `
            docDescription: ${/[\n']/g.test(attr.docDescription) ? `\`${attr.docDescription}\`` : `'${attr.docDescription}'`},` : ''}${notNil(attr.bindHide) ? `
            bindHide: ${attr.bindHide},` : ''}${notNil(attr.bindOpen) ? `
            bindOpen: ${attr.bindOpen},` : ''}${notNil(attr['designer-value']) ? `
            designerValue: ${attr['designer-value']},` : ''}${attr.setter ? `
            setter: {
                concept: '${attr.setter}',${attr.setterTitle ? `
                title: '${attr.setterTitle}',` : ''}
            },` : ''}${attr.options && !attr.display ? `
            setter: {
                concept: 'EnumSelectSetter',
                options: ${formatOptions(attr.options.map((option) => ({ title: option.title || option.name, icon: option.icon, tooltip: option.tooltip })))},
            },` : ''}${attr.display === 'capsules' ? `
            setter: {
                concept: 'CapsulesSetter',
                options: ${formatOptions(attr.options.map((option) => ({ title: option.title || option.name, icon: option.icon, tooltip: option.tooltip })))},
            },` : ''}${attr.display === 'number' || attr.type === 'number' ? `
            setter: {
                concept: 'NumberInputSetter',${attr.place ? `
                placeholder: '${attr.place}',` : ''}${attr.min !== undefined ? `
                min: ${attr.min},` : ''}${attr.max !== undefined ? `
                max: ${attr.max},` : ''}${attr.precision !== undefined ? `
                precision: ${attr.precision},` : ''}
            },` : ''}${attr.display === 'property-select' ? `
            setter: {
                concept: 'PropertySelectSetter',
            },` : ''}${attr.type === 'boolean' && !attr.place ? `
            setter: {
                concept: 'SwitchSetter',
            },` : ''}${!attr.display && attr.place ? `
            setter: {
                concept: 'InputSetter',
                placeholder: '${attr.place}',
            },` : ''}${ifcondition && !attr.dependencyDisplay ? `
            if: _ => ${ifcondition},` : ''}${ifcondition && attr.dependencyDisplay ? `
            disabledIf: _ => ${ifcondition},` : ''}${onChange ? `
            onChange: [${onChange}
            ],` : ''}
        })
        ${attr.advanced || attr.hidden ? 'private ' : ''}${kebab2Camel(attr.name)}: ${attrType}${notNil(attr.default) ? ` = ${translateDefaultValue(attr.default, attrType)}` : ''};`
    }).join('\n\n')}${!sub.events ? '' : `

` + sub.events.map((event) => {
        return `${indent(2)}@Event({
            title: '${event.title}',${event.description ? `
            description: '${event.description}',` : ''}
        })
        ${event.advanced ? 'private ' : ''}on${kebab2Pascal(event.name)}: (${!(event.params && event.params.length) ? '' : event.params
            .slice(0, 1).filter((param) => !param.name.includes('.')).map((param) => {
            let paramName = param.name;
            if (paramName === '$event')
                paramName = 'event';

            let paramType = !param.type ? 'BaseEvent' : param.type;
            if (param.schema?.$ref)
                paramType = param.schema.$ref.split('/').pop();
            paramType
                .replace(/\bstring\b/g, 'nasl.core.String')
                .replace(/\bnumber\b/g, 'nasl.core.Decimal')
                .replace(/\bboolean\b/g, 'nasl.core.Boolean')
                .replace(/\bany\b/g, 'nasl.core.Any')
                .replace(/\s*,\s*/g, ' | ');
            if (paramType.endsWith('Event'))
                paramType = `nasl.ui.${paramType}`;
            if (param.options) {
                paramType = param.options.map((option) => `'${option.value}'`).join(' | ');
            }

            return `${paramName}${param.required === false ? '?' : ''}: ${paramType}`;
            }).join(', ')}) => void;`
        }).join('\n\n')}${!sub.slots ? '' : `

` + sub.slots.map((slot) => {
        let paramName = slot.slotProps?.name;
        let paramTypeArgs = slot.slotProps?.typeAnnotation?.typeArguments;
        let paramTypeArgArr = [];
        if(paramTypeArgs) {
            paramTypeArgs.forEach((item) => {
                paramTypeArgArr.push(item.typeName);
            })
        }
        let paramType = slot.slotProps?.typeAnnotation?.typeName + (paramTypeArgArr.length ? `<${paramTypeArgArr.join(', ')}>` : '');

        return `${indent(2)}@Slot({
            title: '${slot.title}',${slot.description ? `
            description: '${slot.description}',` : ''}${slot['empty-background'] ? `
            emptyBackground: ${json5.stringify(slot['empty-background'])},` : ''}${!slot.support ? '' : `
            snippets: ${json5.stringify(slot.support.map((item) => ({
                title: item.title,
                code: item.snippet,
            })), null, 4).replace(/\n/g, `\n${indent(3)}`)},`}
        })
        ${slot.advanced ? 'private ' : ''}slot${kebab2Pascal(slot.name)}: (${!slot.slotProps ? '' : `${paramName}: ${paramType}`}) => Array<${slot.support ? slot.support.map((item) => kebab2Pascal(item.name) + (item.tsTypeArguments ? `<${item.tsTypeArguments}>` : '')).join(' | ') : 'ViewComponent'}>;`
        }).join('\n\n')}
    }`;
}).join('\n\n')}
}
`

        const tsPath = component.yamlPath.replace(/\.yaml$/, '.ts');
        const dtsPath = component.yamlPath.replace(/\.yaml$/, '.d.ts');
        fs.removeSync(dtsPath);
        fs.writeFileSync(tsPath, output);
    });
});
