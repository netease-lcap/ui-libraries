const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

function getThemePreviewCode(compName) {
  return `<template>
  <demo-preview></demo-preview>
</template>
<script>
import createStoriesPreview from '@lcap/builder/input/vue2/stories-preview';
import * as stories from '../../../components/${compName}/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};

</script>
`;
}

function generateThemeFiles() {
  const fileList = glob.sync('./src/components/*/api.ts');

  fileList.forEach((filePath) => {
    const componentFolder = path.resolve(filePath, '../');
    const compName = path.basename(componentFolder);
    const varFileName = `${compName.replace(/^el\-/, '').replace(/\-pro$/, '')}.css`;
    const varFilePath = path.resolve('./src/styles/variables', varFileName);
    const targetFolderPath = path.resolve('./src/theme/components', compName);
    if (fs.existsSync(targetFolderPath) || !fs.existsSync(varFilePath)) {
      return;
    }

    if (!fs.existsSync(targetFolderPath)) {
      fs.mkdirSync(targetFolderPath, { recursive: true });
    }

    fs.copyFileSync(varFilePath, path.resolve(targetFolderPath, 'vars.css'));
    fs.writeFileSync(path.resolve(targetFolderPath, 'index.vue'), getThemePreviewCode(compName), 'utf-8');
  });
}

generateThemeFiles();
