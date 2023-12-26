import * as fs from 'fs-extra';
import * as path from 'path';

import * as astTypes from '@nasl/types/nasl.ui.ast';
import { transform } from './ts2json'

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

export default function gen(root: string) {
    const data: astTypes.ViewComponentDeclaration[] = []
    const pkg = eval('require')(`${root}/package.json`);
    const libInfo = `${pkg.name}@${pkg.version}`;

    const components = eval('require')(`${root}/scripts/lcap/config.js`);
    components.forEach((component: any) => {
        let sourceDir = 'src'
        let componentDir = path.join(root, `${sourceDir}/${component.name}`);
        component.symbol = component.name;
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, `${sourceDir}/${component.name}`);
            component.symbol = component.name;
        }

        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src/components';
            componentDir = path.join(root, `${sourceDir}/${component.name}.vue`);
            component.symbol = `${component.name}.vue`;
        }

        
        // api.ts
        try {
            const tsPath = `${componentDir}/api.ts`;
            // component.tsPath = tsPath;
            const info = transform(fs.readFileSync(tsPath, 'utf8'));
            Object.assign(component, info[0]);

        } catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }

        const screenShot = getScreenShot(componentDir, component, libInfo, sourceDir);
        const drawings = getDrawings(componentDir, component, libInfo, sourceDir);

        // blocks
        try {
            const blockPath = `${componentDir}/docs/blocks.md`;
            const blocks = getBlocks(fs.readFileSync(blockPath, 'utf8').toString(), {
                screenShot,
                drawings,
            });
            Object.assign(component, { blocks });
        } catch (e) {
            console.log('找不到 blocks.md 文件', componentDir);
            console.log(e);
        }

        delete component.symbol;
        data.push(component);
    })

    return data;
}

function getBlocks(content: string, options: { screenShot: string[], drawings: string[] }): astTypes.ViewBlockWithImage[] {
    const { screenShot, drawings } = options;

    const tokens = md.parse(content, {});
    let title = '';
    let description = '';
    let blocks: astTypes.ViewBlockWithImage[] = [];

    let idx = 0;
    tokens.forEach((token, index) => {
        if (token.type === 'heading_close' && token.tag === 'h3') {
            const inline = tokens[index - 1];
            if (inline && inline.type === 'inline')
                title = inline.content;
        } else if (token.type === 'paragraph_close') {
            const inline = tokens[index - 1];
            if (inline && inline.type === 'inline')
                description += inline.content + '\n';
        } else if (token.type === 'fence') {
            const lang = token.info.trim().split(' ')[0];

            if (lang === 'html') {
                blocks.push({
                    concept: 'ViewBlockWithImage',
                    title,
                    description,
                    code: `<template>\n${token.content}</template>\n`,
                    screenshot: screenShot[idx] || '',
                    drawing: drawings[idx] || '',
                });

                idx++;
            } else if (lang === 'vue') {
                blocks.push({
                    concept: 'ViewBlockWithImage',
                    title,
                    description,
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

function getScreenShot(componentDir: string, component: any, libInfo: string, sourceDir: string) {
    let screenShot: string[] = [];
    try {
        const screenShotPath = `${componentDir}/screenshots`;
        if (hasImg(screenShotPath)) {
            screenShot = fs.readdirSync(screenShotPath)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .filter((filename) => filename.indexOf('.DS_Store') === -1);

            screenShot = screenShot.map((screen) => {
                let prefix = `https://static-vusion.163yun.com/packages/${libInfo}/${sourceDir}`;
                return `${prefix}/${component.symbol}/screenshots/${screen}`;
            })

        }
    } catch (e) {
        console.log('找不到 screenShot 文件', componentDir);
        console.log(e);
    }

    return screenShot;
}

function getDrawings(componentDir: string, component: any, libInfo: string, sourceDir: string) {
    let drawings: string[] = [];
    try {
        const drawingsPath = `${componentDir}/drawings`;
        if (hasSvg(drawingsPath)) {
            drawings = fs.readdirSync(drawingsPath)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .filter((filename) => filename.indexOf('.DS_Store') === -1);

            drawings = drawings.map((drawing) => {
                let prefix = `https://static-vusion.163yun.com/packages/${libInfo}/${sourceDir}`;
                return `${prefix}/${component.symbol}/drawings/${drawing}`;
            })
        }
    } catch (e) {
        console.log('找不到 drawings 文件', componentDir);
        console.log(e);
    }

    return drawings;
}

function hasImg(dir: string) {
    return fs.existsSync(path.join(dir, '0.png'));
};

function hasSvg(dir: string) {
    return fs.existsSync(path.join(dir, '0.svg'));
};
