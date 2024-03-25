const React = require('react');
const fs = require('fs-extra');
const { extractStyle } = require('@ant-design/static-style-extract');
const { ConfigProvider } = require('antd');

const cssText = extractStyle((node) => (
  React.createElement(ConfigProvider, {
    theme: {
      cssVar: { prefix: 'cw', key: 'cw-nasl' },
    },
    prefixCls: 'cw',
  }, node)
));

fs.writeFileSync(`${process.cwd()}/src/index.css`, cssText);
