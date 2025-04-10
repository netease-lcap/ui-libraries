import fs from 'node:fs';
import { loadConfigFromFile, build, mergeConfig } from 'vite';

const outDir = 'dist';
function genBuildConfig(name, entry) {
  return {
    lib: {
      entry,
      fileName: () => `${name}.js`,
      name: `$IDE_SETTERS_${name}`,
      cssFileName: name,
      formats: ['umd'],
    },
    emptyOutDir: false,
    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖
        // 提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  };
}

function getSetters(filePath) {
  const setters = [];

  try {
    const content = fs.readFileSync(filePath);
    const map = JSON.parse(content);

    Object.keys(map).forEach((name) => {
      const entry = map[name];
      if (fs.existsSync(entry)) {
        setters.push({
          name,
          entry,
        });
      }
    });
  } catch (e) {
    console.log(e);
  }

  return setters;
}

async function buildSetters() {
  const setters = getSetters('setters.json');
  if (!setters || setters.length === 0) {
    console.log('未找到配置的setter， 在 setters.json');
    return;
  }

  if (fs.existsSync(outDir)) {
    fs.rmdirSync(outDir, { recursive: true });
  }

  fs.mkdirSync(outDir, { recursive: true });
  const config = await loadConfigFromFile({ mode: 'production', command: 'build' });

  await Promise.all(
    setters.map(({ name, entry }) =>
      build(
        mergeConfig(config, {
          build: genBuildConfig(name, entry),
        }),
      ),
    ),
  );
}

buildSetters();
