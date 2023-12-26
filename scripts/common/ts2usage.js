"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var ts2json_1 = require("./ts2json");
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
function gen(root) {
    var data = [];
    var pkg = eval('require')("".concat(root, "/package.json"));
    var libInfo = "".concat(pkg.name, "@").concat(pkg.version);
    var components = eval('require')("".concat(root, "/scripts/lcap/config.js"));
    components.forEach(function (component) {
        var sourceDir = 'src';
        var componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        component.symbol = component.name;
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
            component.symbol = component.name;
        }
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src/components';
            componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name, ".vue"));
            component.symbol = "".concat(component.name, ".vue");
        }
        // api.ts
        try {
            var tsPath = "".concat(componentDir, "/api.ts");
            // component.tsPath = tsPath;
            var info = (0, ts2json_1.transform)(fs.readFileSync(tsPath, 'utf8'));
            Object.assign(component, info[0]);
        }
        catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }
        var screenShot = getScreenShot(componentDir, component, libInfo, sourceDir);
        var drawings = getDrawings(componentDir, component, libInfo, sourceDir);
        // blocks
        try {
            var blockPath = "".concat(componentDir, "/docs/blocks.md");
            var blocks = getBlocks(fs.readFileSync(blockPath, 'utf8').toString(), {
                screenShot: screenShot,
                drawings: drawings,
            });
            Object.assign(component, { blocks: blocks });
        }
        catch (e) {
            console.log('找不到 blocks.md 文件', componentDir);
            console.log(e);
        }
        delete component.symbol;
        data.push(component);
    });
    return data;
}
exports.default = gen;
function getBlocks(content, options) {
    var screenShot = options.screenShot, drawings = options.drawings;
    var tokens = md.parse(content, {});
    var title = '';
    var description = '';
    var blocks = [];
    var idx = 0;
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
                    concept: 'ViewBlockWithImage',
                    title: title,
                    description: description,
                    code: "<template>\n".concat(token.content, "</template>\n"),
                    screenshot: screenShot[idx] || '',
                    drawing: drawings[idx] || '',
                });
                idx++;
            }
            else if (lang === 'vue') {
                blocks.push({
                    concept: 'ViewBlockWithImage',
                    title: title,
                    description: description,
                    code: token.content,
                    screenshot: screenShot[idx] || '',
                    drawing: drawings[idx] || '',
                });
                idx++;
            }
            description = '';
        }
    });
    return blocks;
}
function getScreenShot(componentDir, component, libInfo, sourceDir) {
    var screenShot = [];
    try {
        var screenShotPath = "".concat(componentDir, "/screenshots");
        if (hasImg(screenShotPath)) {
            screenShot = fs.readdirSync(screenShotPath)
                .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                .filter(function (filename) { return filename.indexOf('.DS_Store') === -1; });
            screenShot = screenShot.map(function (screen) {
                var prefix = "https://static-vusion.163yun.com/packages/".concat(libInfo, "/").concat(sourceDir);
                return "".concat(prefix, "/").concat(component.symbol, "/screenshots/").concat(screen);
            });
        }
    }
    catch (e) {
        console.log('找不到 screenShot 文件', componentDir);
        console.log(e);
    }
    return screenShot;
}
function getDrawings(componentDir, component, libInfo, sourceDir) {
    var drawings = [];
    try {
        var drawingsPath = "".concat(componentDir, "/drawings");
        if (hasSvg(drawingsPath)) {
            drawings = fs.readdirSync(drawingsPath)
                .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                .filter(function (filename) { return filename.indexOf('.DS_Store') === -1; });
            drawings = drawings.map(function (drawing) {
                var prefix = "https://static-vusion.163yun.com/packages/".concat(libInfo, "/").concat(sourceDir);
                return "".concat(prefix, "/").concat(component.symbol, "/drawings/").concat(drawing);
            });
        }
    }
    catch (e) {
        console.log('找不到 drawings 文件', componentDir);
        console.log(e);
    }
    return drawings;
}
function hasImg(dir) {
    return fs.existsSync(path.join(dir, '0.png'));
}
;
function hasSvg(dir) {
    return fs.existsSync(path.join(dir, '0.svg'));
}
;
