"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var babel = require("@babel/core");
var babelTypes = require("@babel/types");
var generator_1 = require("@babel/generator");
var ts2json_1 = require("./common/ts2json");
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
genH5();
genPC();
function genH5() {
    var root = path.join(__dirname, "../../vant");
    var frontend = 'h5';
    var data = [];
    var pkg = require("".concat(root, "/package.json"));
    var libInfo = "".concat(pkg.name, "@").concat(pkg.version);
    var components = require("".concat(root, "/scripts/lcap/config.js"));
    components.forEach(function (component) {
        var sourceDir = 'src';
        var componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        }
        component.symbol = component.name;
        component.frontend = frontend;
        // api.ts
        try {
            var tsPath = "".concat(componentDir, "/api.ts");
            // component.tsPath = tsPath;
            var info = transform(fs.readFileSync(tsPath, 'utf8'));
            Object.assign(component, info);
        }
        catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }
        // blocks
        try {
            var blockPath = "".concat(componentDir, "/docs/blocks.md");
            var blocks = getBlocks(fs.readFileSync(blockPath, 'utf8').toString());
            Object.assign(component, { blocks: blocks });
        }
        catch (e) {
            console.log('找不到 blocks.md 文件', componentDir);
            console.log(e);
        }
        // screenShot
        try {
            var screenShotPath = "".concat(componentDir, "/screenshots");
            var screenShot = [];
            if (hasImg(screenShotPath)) {
                screenShot = fs.readdirSync(screenShotPath)
                    .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                    .filter(function (filename) { return filename.indexOf('.DS_Store') === -1; });
                Object.assign(component, {
                    screenShot: screenShot.map(function (screen) {
                        var prefix = "https://static-vusion.163yun.com/packages/".concat(libInfo, "/").concat(sourceDir);
                        return "".concat(prefix, "/").concat(component.symbol, "/screenshots/").concat(screen);
                    }).join(','),
                });
            }
        }
        catch (e) {
            console.log('找不到 screenShot 文件', componentDir);
            console.log(e);
        }
        // drawings
        try {
            var drawingsPath = "".concat(componentDir, "/drawings");
            var drawings = [];
            if (hasSvg(drawingsPath)) {
                drawings = fs.readdirSync(drawingsPath)
                    .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                    .filter(function (filename) { return filename.indexOf('.DS_Store') === -1; });
                Object.assign(component, {
                    drawings: drawings.map(function (drawing) {
                        var prefix = "https://static-vusion.163yun.com/packages/".concat(libInfo, "/").concat(sourceDir);
                        return "".concat(prefix, "/").concat(component.symbol, "/drawings/").concat(drawing);
                    }).join(','),
                });
            }
        }
        catch (e) {
            console.log('找不到 drawings 文件', componentDir);
            console.log(e);
        }
        data.push(component);
    });
    fs.writeFileSync(path.join(__dirname, "../".concat(frontend, ".json")), JSON.stringify(data, null, 2));
}
function genPC() {
    var root = path.join(__dirname, "../../cloud-ui");
    var frontend = 'pc';
    var data = [];
    var pkg = require("".concat(root, "/package.json"));
    var libInfo = "".concat(pkg.name, "@").concat(pkg.version);
    var components = require("".concat(root, "/scripts/lcap/config.js"));
    components.forEach(function (component) {
        var sourceDir = 'src/components';
        var componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name, ".vue"));
        component.symbol = component.name;
        component.frontend = frontend;
        // api.ts
        try {
            var tsPath = "".concat(componentDir, "/api.ts");
            // component.tsPath = tsPath;
            var info = transform(fs.readFileSync(tsPath, 'utf8'));
            Object.assign(component, info);
        }
        catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }
        // blocks
        try {
            var blockPath = "".concat(componentDir, "/docs/blocks.md");
            var blocks = getBlocks(fs.readFileSync(blockPath, 'utf8').toString());
            Object.assign(component, { blocks: blocks });
        }
        catch (e) {
            console.log('找不到 blocks.md 文件', componentDir);
            console.log(e);
        }
        // screenShot
        try {
            var screenShotPath = "".concat(componentDir, "/screenshots");
            var screenShot = [];
            if (hasImg(screenShotPath)) {
                screenShot = fs.readdirSync(screenShotPath)
                    .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                    .filter(function (filename) { return filename.indexOf('.DS_Store') === -1; });
                Object.assign(component, {
                    screenShot: screenShot.map(function (screen) {
                        var prefix = "https://static-vusion.163yun.com/packages/".concat(libInfo, "/").concat(sourceDir);
                        return "".concat(prefix, "/").concat(component.symbol, "/screenshots/").concat(screen);
                    }).join(','),
                });
            }
        }
        catch (e) {
            console.log('找不到 screenShot 文件', componentDir);
            console.log(e);
        }
        // drawings
        try {
            var drawingsPath = "".concat(componentDir, "/drawings");
            var drawings = [];
            if (hasSvg(drawingsPath)) {
                drawings = fs.readdirSync(drawingsPath)
                    .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                    .filter(function (filename) { return filename.indexOf('.DS_Store') === -1; });
                Object.assign(component, {
                    drawings: drawings.map(function (drawing) {
                        var prefix = "https://static-vusion.163yun.com/packages/".concat(libInfo, "/").concat(sourceDir);
                        return "".concat(prefix, "/").concat(component.symbol, "/drawings/").concat(drawing);
                    }).join(','),
                });
            }
        }
        catch (e) {
            console.log('找不到 drawings 文件', componentDir);
            console.log(e);
        }
        data.push(component);
    });
    fs.writeFileSync(path.join(__dirname, "../".concat(frontend, ".json")), JSON.stringify(data, null, 2));
}
function getBlocks(content) {
    var tokens = md.parse(content, {});
    var title = '';
    var description = '';
    var blocks = [];
    tokens.forEach(function (token, index) {
        if (token.type === 'heading_close' && token.tag === 'h3') {
            var inline = tokens[index - 1];
            if (inline && inline.type === 'inline')
                title = inline.content;
        }
        else if (token.type === 'paragraph_close') {
            var inline = tokens[index - 1];
            if (inline && inline.type === 'inline')
                description += inline.content + '\n';
        }
        else if (token.type === 'fence') {
            var lang = token.info.trim().split(' ')[0];
            if (lang === 'html') {
                blocks.push({
                    title: title,
                    description: description,
                    code: "<template>\n".concat(token.content, "</template>\n"),
                });
            }
            else if (lang === 'vue') {
                blocks.push({
                    title: title,
                    description: description,
                    code: token.content,
                });
            }
            description = '';
        }
    });
    return blocks;
}
function hasImg(dir) {
    return fs.existsSync(path.join(dir, '0.png'));
}
;
function hasSvg(dir) {
    return fs.existsSync(path.join(dir, '0.svg'));
}
;
function transform(code) {
    var root = babel.parseSync(code, {
        filename: 'result.ts',
        presets: [
            require('@babel/preset-typescript'),
        ],
        plugins: [
            [require('@babel/plugin-proposal-decorators'), { legacy: true }],
            // 'babel-plugin-parameter-decorator'
        ]
    });
    var programBody = root.program.body;
    var blockOrDecl = programBody.find(function (stat) { return stat.type === 'TSModuleDeclaration'; });
    while (blockOrDecl && blockOrDecl.type === 'TSModuleDeclaration') {
        blockOrDecl = blockOrDecl.body;
    }
    if (!blockOrDecl)
        return;
    var mainBody = blockOrDecl.body;
    /**
     * 组件名：[组件 class, 组件选项 class]
     */
    var classMap = new Map();
    mainBody.forEach(function (statement) {
        var classDecl;
        if (statement.type === 'ExportNamedDeclaration') {
            classDecl = statement.declaration;
        }
        else if (statement.type === 'ClassDeclaration') {
            classDecl = statement;
        }
        else {
            return;
        }
        if (classDecl.id.name.endsWith('Options')) {
            var className = classDecl.id.name.replace(/Options$/, '');
            var classItem = classMap.get(className);
            if (!classItem) {
                classItem = [null, classDecl];
                classMap.set(className, classItem);
            }
            else {
                classItem[1] = classDecl;
            }
        }
        else {
            var className = classDecl.id.name;
            if (classDecl.superClass.name === 'ViewComponent') {
                var classItem = classMap.get(className);
                if (!classItem) {
                    classItem = [classDecl, null];
                    classMap.set(className, classItem);
                }
                else {
                    classItem[0] = classDecl;
                }
            }
        }
    });
    // forEach classMap
    var result = [];
    var idx = 0;
    classMap.forEach(function (classItem, className) {
        var classDecl = classItem[0], optionsDecl = classItem[1];
        // console.log('classItem', classItem);
        if (!classDecl)
            return;
        var component = {
            name: className,
            title: '',
            description: '',
            icon: '',
            advanced: false,
            typeParams: undefined,
            props: [],
            readableProps: [],
            events: [],
            methods: [],
            slots: [],
            children: [],
        };
        classDecl.decorators.forEach(function (decorator) {
            if (decorator.expression.type === 'CallExpression' && decorator.expression.callee.name === 'Component') {
                decorator.expression.arguments.forEach(function (arg) {
                    if (arg.type === 'ObjectExpression')
                        Object.assign(component, (0, ts2json_1.evalOptions)(arg));
                });
            }
        });
        {
            var classTypeParams = (0, generator_1.default)(babelTypes.tsInterfaceDeclaration(babelTypes.identifier('Wrapper'), classDecl.typeParameters, [], babelTypes.tsInterfaceBody([]))).code.replace(/^interface Wrapper<?/, '').replace(/>? {}$/, '');
            var optionsTypeParams = (0, generator_1.default)(babelTypes.tsInterfaceDeclaration(babelTypes.identifier('Wrapper'), optionsDecl.typeParameters, [], babelTypes.tsInterfaceBody([]))).code.replace(/^interface Wrapper<?/, '').replace(/>? {}$/, '');
            if (classTypeParams !== optionsTypeParams)
                throw new Error("\u7EC4\u4EF6\u7684".concat(className, "\u6CDB\u578B\u7C7B\u578B\u53C2\u6570\u4E0D\u5339\u914D\uFF01"));
            component.typeParams = classTypeParams;
        }
        optionsDecl.body.body.forEach(function (member) {
            if (member.type === 'ClassProperty') {
                member.decorators.forEach(function (decorator) {
                    var _a, _b, _c, _d;
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Prop') {
                            var prop_1 = {
                                name: member.key.name,
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop_1, (0, ts2json_1.evalOptions)(arg));
                            });
                            // 枚举类型生成选项
                            if (['enumSelect', 'capsules'].includes((_a = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.setter) === null || _a === void 0 ? void 0 : _a.type)) {
                                var types_1 = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.type.split('|').map(function (type) { return type.replace(/(\'|\")/g, '').trim(); });
                                // @ts-ignore
                                (_b = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.setter) === null || _b === void 0 ? void 0 : _b.options = (_d = (_c = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.setter) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.map(function (option, idx) {
                                    return __assign(__assign({}, option), { value: types_1[idx] });
                                });
                            }
                            component.props.push(prop_1);
                        }
                        else if (calleeName === 'Event') {
                            var event_1 = {
                                name: member.key.name.replace(/^on(\w)/, function (m, $1) { return $1.toLowerCase(); }),
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(event_1, (0, ts2json_1.evalOptions)(arg));
                            });
                            component.events.push(event_1);
                        }
                        else if (calleeName === 'Slot') {
                            var slot_1 = {
                                name: member.key.name.replace(/^slot(\w)/, function (m, $1) { return $1.toLowerCase(); }),
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(slot_1, (0, ts2json_1.evalOptions)(arg));
                            });
                            component.slots.push(slot_1);
                        }
                    }
                });
            }
        });
        classDecl.body.body.forEach(function (member) {
            var _a, _b;
            if (member.type === 'ClassProperty') {
                (_a = member.decorators) === null || _a === void 0 ? void 0 : _a.forEach(function (decorator) {
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Prop') {
                            var prop_2 = {
                                name: member.key.name,
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop_2, (0, ts2json_1.evalOptions)(arg));
                            });
                            component.readableProps.push(prop_2);
                        }
                    }
                });
            }
            else if (member.type === 'ClassMethod') {
                (_b = member.decorators) === null || _b === void 0 ? void 0 : _b.forEach(function (decorator) {
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Method') {
                            var method_1 = {
                                name: member.key.name,
                                title: '',
                                type: '',
                                // type: generate((member. as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(method_1, (0, ts2json_1.evalOptions)(arg));
                            });
                            component.methods.push(method_1);
                        }
                    }
                });
            }
        });
        if (idx === 0) {
            result.push(component);
        }
        else {
            var parent_1 = result[0];
            parent_1.children.push(component);
        }
        idx++;
    });
    return result[0];
}
