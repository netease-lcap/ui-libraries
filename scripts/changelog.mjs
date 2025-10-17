import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const git = simpleGit();

// 库名称映射
const libraryMap = {
  'libraries/element-plus': 'ElementPlus',
  'libraries/element-ui': 'ElementUI',
  'libraries/mobile-ui': 'MobileUI',
  'libraries/pc-react-ui': 'PcReactUI',
  'libraries/pc-ui': 'PcUI',
  'libraries/vant': 'Vant',
};

// 获取当月的开始和结束日期
function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return {
    start: startDate,
    end: endDate,
    formatStart: formatDate(startDate),
    formatEnd: formatDate(endDate),
  };
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 判断是否是 merge commit
function isMergeCommit(message) {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.startsWith('merge') ||
         lowerMessage.includes('merge branch') ||
         lowerMessage.includes('merge pull request');
}

// 判断 commit 类型
function getCommitType(message) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('feat')) {
    return 'Features';
  } else if (lowerMessage.includes('fix')) {
    return 'Bug Fixes';
  }
  return 'Other';
}

// 判断文件属于哪个库
function getLibraryFromFile(filePath) {
  for (const [key, value] of Object.entries(libraryMap)) {
    if (filePath.startsWith(key)) {
      return value;
    }
  }
  return 'Other';
}

// 生成 changelog 内容
function generateChangelog(commits, dateRange) {
  const { formatStart, formatEnd } = dateRange;

  // 按库和类型组织 commits
  const organized = {};

  commits.forEach(commit => {
    // 过滤掉 merge commit
    if (isMergeCommit(commit.message)) {
      return;
    }

    const type = getCommitType(commit.message);
    const libraries = new Set();

    // 获取该 commit 涉及的所有库
    commit.files.forEach(file => {
      const library = getLibraryFromFile(file);
      if (library !== 'Other') {
        libraries.add(library);
      }
    });

    // 如果没有匹配的库，归类到 Other
    if (libraries.size === 0) {
      libraries.add('Other');
    }

    // 为每个库添加记录
    libraries.forEach(library => {
      if (!organized[library]) {
        organized[library] = {
          Features: [],
          'Bug Fixes': [],
          Other: [],
        };
      }

      const commitInfo = {
        hash: commit.hash.substring(0, 7),
        message: commit.message.split('\n')[0], // 只取第一行
        author: commit.author_name,
        date: commit.date,
      };

      organized[library][type].push(commitInfo);
    });
  });

  // 生成 markdown 内容
  let markdown = `# ${formatStart} ~ ${formatEnd}\n\n`;

  // 按库名排序
  const sortedLibraries = Object.keys(organized).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
  });

  sortedLibraries.forEach(library => {
    const types = organized[library];
    const hasContent = types.Features.length > 0 || types['Bug Fixes'].length > 0 || types.Other.length > 0;

    if (!hasContent) return;

    markdown += `## ${library}\n\n`;

    // Features
    if (types.Features.length > 0) {
      markdown += `### Features\n\n`;
      types.Features.forEach(commit => {
        markdown += `- ${commit.message} ([${commit.hash}](../../commit/${commit.hash}))\n`;
      });
      markdown += '\n';
    }

    // Bug Fixes
    if (types['Bug Fixes'].length > 0) {
      markdown += `### Bug Fixes\n\n`;
      types['Bug Fixes'].forEach(commit => {
        markdown += `- ${commit.message} ([${commit.hash}](../../commit/${commit.hash}))\n`;
      });
      markdown += '\n';
    }

    // Other
    if (types.Other.length > 0) {
      markdown += `### Other\n\n`;
      types.Other.forEach(commit => {
        markdown += `- ${commit.message} ([${commit.hash}](../../commit/${commit.hash}))\n`;
      });
      markdown += '\n';
    }
  });

  return markdown;
}

// 主函数
async function main() {
  try {
    console.log('开始生成 changelog...');

    const dateRange = getCurrentMonthRange();
    console.log(`时间范围: ${dateRange.formatStart} ~ ${dateRange.formatEnd}`);

    // 获取 git log
    const log = await git.log({
      '--since': dateRange.formatStart,
      '--until': dateRange.formatEnd,
      '--date': 'short',
    });

    console.log(`找到 ${log.all.length} 个提交记录`);

    if (log.all.length === 0) {
      console.log('当月没有提交记录');
      return;
    }

    // 获取每个 commit 的文件列表
    const commits = await Promise.all(
      log.all.map(async (commit) => {
        const diff = await git.show([
          '--name-only',
          '--format=',
          commit.hash,
        ]);

        const files = diff
          .split('\n')
          .filter(line => line.trim() !== '');

        return {
          hash: commit.hash,
          message: commit.message,
          author_name: commit.author_name,
          date: commit.date,
          files,
        };
      })
    );

    console.log('正在生成 changelog 内容...');

    // 生成 changelog
    const markdown = generateChangelog(commits, dateRange);

    // 读取现有的 CHANGELOG.md 文件
    const outputPath = path.join(__dirname, '..', 'CHANGELOG.md');
    let existingContent = '';

    if (fs.existsSync(outputPath)) {
      existingContent = fs.readFileSync(outputPath, 'utf-8');
      console.log('检测到已存在的 changelog');

      // 检查是否已存在当前月份的记录
      const currentMonthHeader = `# ${dateRange.formatStart} ~ ${dateRange.formatEnd}`;

      if (existingContent.includes(currentMonthHeader)) {
        console.log('发现当前月份的记录，将先删除旧记录');

        // 删除当前月份的内容
        const headerIndex = existingContent.indexOf(currentMonthHeader);

        // 找到下一个分隔符的位置
        const separatorIndex = existingContent.indexOf('\n---\n', headerIndex);

        if (separatorIndex !== -1) {
          // 如果找到分隔符，删除从标题到分隔符之间的内容
          existingContent = existingContent.substring(separatorIndex + 6); // +6 是 '\n---\n\n' 的长度
        } else {
          // 如果没有分隔符，说明只有当前月份的记录，清空
          existingContent = '';
        }
      }
    }

    // 将新内容添加到文件开头，保留旧内容
    const finalContent = existingContent
      ? markdown + '\n---\n\n' + existingContent
      : markdown;

    fs.writeFileSync(outputPath, finalContent, 'utf-8');

    console.log(`✅ changelog 已生成: ${outputPath}`);
  } catch (error) {
    console.error('❌ 生成 changelog 失败:', error);
    process.exit(1);
  }
}

main();

