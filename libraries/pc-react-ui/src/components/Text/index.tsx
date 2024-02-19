import { Typography as AntdTypography } from 'antd';
import React from 'react';
import { registerComponet, Plugin } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

// import './index.module.less';

const {
  // Title: AntdTitle,
  Text: AntdText,
  // Paragraph: AntdParagraph,
  // Link: AntdLink,
} = AntdTypography;

// type TitleProps = React.ComponentProps<typeof AntdTitle>;
type TextProps = React.ComponentProps<typeof AntdText>;
// type ParagraphProps = React.ComponentProps<typeof AntdParagraph>;
// type LinkProps = React.ComponentProps<typeof AntdLink>;

const mapProps = {
  mySize: 'size',
};

// const Title = registerComponet<
//   TitleProps,
//   pluginType<TitleProps>
// >(
//   AntdTitle,
//   { plugin, displayName: AntdTitle.displayName, mapProps },
// );
const myPlugin = new Plugin({ plugin, displayName: 'Text', mapProps });
// clg
const Text = registerComponet<
  TextProps,
  pluginType<TextProps>
>(
  AntdText,
  { plugin, displayName: 'Text', mapProps },
);
export default Text;

// const Paragraph = registerComponet<
//   ParagraphProps,
//   pluginType<ParagraphProps>
// >(
//   AntdParagraph,
//   { plugin, displayName: AntdParagraph.displayName, mapProps },
// );

// const Link = registerComponet<
//   LinkProps,
//   pluginType<LinkProps>
// >(
//   AntdLink,
//   { plugin, displayName: AntdLink.displayName, mapProps },
// );

// export default {
//   Title, Text, Paragraph, Link,
// };
// export {
//   Title, Text, Paragraph, Link,
// };
