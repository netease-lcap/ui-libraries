/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import transformStory2Blocks from '../../transforms/story2block.mjs';
import { getComponentPathInfo } from '../../index.mjs';
import * as logger from '../../utils/logger.mjs';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (config, params = {}) => {
  const {
    rootPath,
    componentsPath,
    components,
  } = config;
  const {
    port = 6006,
  } = params;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1180,
    height: 600,
    deviceScaleFactor: 2,
  });
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < components.length; i++) {
    const cp = components[i];
    const { componentDir } = getComponentPathInfo(cp.name, rootPath, componentsPath);

    const storyFilePath = `${componentDir}/stories/block.stories.jsx`;
    if (!fs.existsSync(storyFilePath)) {
      logger.warn(`未找到blocks 文件, ${storyFilePath}`);
      // eslint-disable-next-line no-continue
      continue;
    }

    const code = fs.readFileSync(storyFilePath);
    const blocks = transformStory2Blocks(code.toString());

    if (!blocks || blocks.length === 0) {
      logger.warn('未找到block');
      // eslint-disable-next-line no-continue
      continue;
    }

    const screenshotDir = path.join(componentDir, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }

    for (let j = 0; j < blocks.length; j++) {
      const url = `http://127.0.0.1:${port}/iframe.html?viewMode=story&id=example-${cp.name.toLowerCase()}-blocks--${blocks[j].name}`;

      console.log('screenshot url: ' + url);
      await page.goto(url);
      await sleep(200);
      const el = await page.$('#storybook-root');
      await el.screenshot({ path: `${screenshotDir}/${j}.png` });
    }
  }
  await browser.close();
};
