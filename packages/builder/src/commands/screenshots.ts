/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import { getBlockInfos } from '../utils/block';
import logger from '../utils/logger';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (rootPath, port = 6006) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1180,
    height: 600,
    deviceScaleFactor: 2,
  });

  const storyPaths = await glob(['**/stories/block.stories.js', '**/stories/block.stories.jsx', '**/stories/block.stories.tsx'], { cwd: rootPath, absolute: true });

  for (let i = 0; i < storyPaths.length; i++) {
    const content = fs.readFileSync(storyPaths[i], 'utf-8');
    const blockInfos = getBlockInfos(content.toString());
    if (!blockInfos || blockInfos.length === 0) {
      logger.warn('未找到block');
      continue;
    }

    const screenshotDir = path.resolve(storyPaths[i], '../../screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }

    for (let j = 0; j < blockInfos.length; j++) {
      const url = `http://127.0.0.1:${port}/iframe.html?viewMode=story&id=${blockInfos[j].id}`;

      logger.info(`screenshot url: ${url}, block: ${blockInfos[j].name}`);
      await page.goto(url);
      await sleep(500);

      const el = await page.$('#storybook-root');
      if (!el || await el.isHidden()) {
        logger.warn('element is null');
        continue;
      }
      await el.screenshot({ path: `${screenshotDir}/${j}.png` });
    }
  }

  await browser.close();
};
