import fs from 'fs-extra';
import path from 'path';
import picocolors from 'picocolors';
import { parse } from '@lcap/material-parser';
import { executeCreateForSchema } from '../creates';
import { getExtensionProjectMeta } from '../utils/project';
import { execSync } from '../utils/exec';

export interface ParseCommandOptions {
  pkg: string;
  output?: string;
  tempDir?: string;
  npmClient?: 'npm' | 'yarn' | 'pnpm';
  generate?: boolean;
}

async function setPkgLcapScheme(output) {
  const pkgPath = path.resolve(process.cwd(), './package.json');
  if (!fs.existsSync(pkgPath)) {
    return;
  }
  const pkg = await fs.readJSON(pkgPath);

  if (!pkg.lcap) {
    pkg.lcap = {};
  }

  pkg.lcap.schema = output;

  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}

export async function parseNPM(options: any) {
  if (!options.name) {
    throw new Error('please input pkg name');
  }

  const {
    name,
    version,
    output = 'schema.json',
    tempDir,
    npmClient = 'npm',
  } = options;

  const result = await parse({
    name,
    version,
    tempDir,
    npmClient,
  });

  await fs.ensureFile(output);
  await fs.writeJSON(output, result, { spaces: 2 });

  await setPkgLcapScheme(output);
}

function addPkg(root: string, pkgManager: ParseCommandOptions['npmClient'], pkg: string) {
  switch (pkgManager) {
    case 'npm':
      execSync(`npm install ${pkg} --save`);
      break;
    case 'pnpm':
      execSync(`pnpm add ${pkg}`);
      break;
    case 'yarn':
      execSync(`yarn add ${pkg}`);
      break;
    default: break;
  }
}

export default async function executeParse(rootPath: string, options: ParseCommandOptions) {
  const {
    pkg,
    generate = false,
    npmClient = 'npm',
    ...rest
  } = options;
  const i = pkg.indexOf('@');
  let name: string;
  let version: string = '';

  if (i > 0) {
    name = pkg.substring(0, i);
    version = pkg.substring(i + 1);
  } else {
    name = pkg;
  }

  const output = options.output || 'schema.json';
  try {
    console.log(picocolors.bgBlue(`开始解析包 ${pkg}`), options);
    await parseNPM({
      ...rest,
      name,
      version,
      output,
      npmClient: 'npm',
    });

    console.log(picocolors.green(`解析包 ${pkg} 成功，生成文件 ${options.output || 'schema.json'}`));
  } catch (e: any) {
    console.log(picocolors.red(`解析包 ${pkg} 失败, ${e.message}`));
    console.log(e);
    process.exit(1);
  }

  if (!generate) {
    return;
  }

  addPkg(rootPath, npmClient, pkg);

  await executeCreateForSchema(rootPath, getExtensionProjectMeta(rootPath), output);
}
