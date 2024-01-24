#!/usr/bin/env node
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import fse from 'fs-extra';
import semver from 'semver';
import { program } from 'commander';
import build from '../libs/commands/build/index.mjs';
import { resolveConfig } from '../libs/config/index.js';
import deploy from '../libs/commands/deploy/index.mjs';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

function checkNodeVersion(requireNodeVersion, frameworkName = 'ice') {
  if (!semver.satisfies(process.version, requireNodeVersion)) {
    console.log();
    console.log(chalk.red(`  You are using Node ${process.version}`));
    console.log(chalk.red(`  ${frameworkName} requires Node ${requireNodeVersion}, please update Node.`));
    console.log();
    console.log();
    process.exit(1);
  }
}

// eslint-disable-next-line wrap-iife
(async () => {
  const packageInfo = await fse.readJSON(path.join(__dirname, '../package.json'));
  checkNodeVersion(packageInfo.engines.node, packageInfo.name);
  program.version(packageInfo.version).usage('<command> [options]');
  const cwd = process.cwd();

  program.command('screenshot')
    .description('stories 截图')
    .option('--config <configPath>', '设置配置文件路径', 'lcap-ui.config.js')
    .action(async (args, ctx) => {
      console.log(args, ctx);
    });

  program.command('build')
    .description('构建流程，生成 theme.json， usage.json, nasl.ui.json, i18n.json 等文件')
    .option('--config <configPath>', '设置配置文件路径', 'lcap-ui.config.js')
    .action(async ({ config }) => {
      await build(resolveConfig(path.join(cwd, config), cwd));
    });

  program.command('deploy')
    .description('发布流程')
    .option('--config <configPath>', '设置配置文件路径', 'lcap-ui.config.js')
    .option('--platform <platform>', '发布cdn 地址', 'http://defaulttenant.lcap.codewave-dev.163yun.com')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ config, platform }) => {
      await deploy(resolveConfig(path.join(cwd, config), cwd), platform);
    });
  program.parse(process.argv);

  const proc = program.runningCommand;

  if (proc) {
    proc.on('close', process.exit.bind(process));
    proc.on('error', () => {
      process.exit(1);
    });
  }

  const subCmd = program.args[0];
  if (!subCmd) {
    program.help();
  }
})();
