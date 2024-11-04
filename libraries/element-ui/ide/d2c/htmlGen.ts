import {
  ICodeWaveNode,
  IHTMLGen,
  styleObjToStr,
} from './common';

// 适配ide样式
function adaptIDEStyle(args: {
  node: ICodeWaveNode;
  imageUrls: { nodeId: string; url: string }[];
  nodes: ICodeWaveNode[];
}) {
  const { node: n, imageUrls, nodes } = args;
  const styleObj: Record<string, string> = {
    ...n.style,
    // 防止被ide其他样式污染
    'min-height': 'unset',
    'min-width': 'unset',
    customStyle: '',
  };
  const attrs = [
    `vusion-d2c-id="${n.id}"`,
    `vusion-d2c-name="${n.name.replace(/"/g, "'")}"`,
  ];
  // 如果 styleObj 有 display flex，就设置 mode 属性为 flex
  if (styleObj.display === 'flex') {
    attrs.push('mode="flex"');
    // 默认不换行
    attrs.push(':wrap="false"');
    // 默认gap为0
    styleObj.gap = styleObj.gap || '0px';
    delete styleObj.display;
  }
  // 如果 styleObj 有 flex-direction，就设置 direction 属性
  if (styleObj['flex-direction']) {
    // 将 flex direction 的 row 和 column 转为 horizontal 或 vertical
    const direction = styleObj['flex-direction'] === 'row' ? 'horizontal' : 'vertical';
    attrs.push(`direction="${direction}"`);
    delete styleObj['flex-direction'];
  }
  // 如果 styleObj 有 justify-content，就设置 justify 属性
  if (styleObj['justify-content']) {
    const justify = {
      'flex-start': 'start',
      center: 'center',
      'flex-end': 'end',
      'space-between': 'space-between',
    }[styleObj['justify-content']];
    attrs.push(`justify="${justify}"`);
    delete styleObj['justify-content'];
  }
  // align-items
  if (styleObj['align-items']) {
    const align = {
      'flex-start': 'start',
      center: 'center',
      'flex-end': 'end',
    }[styleObj['align-items']];
    attrs.push(`align="${align}"`);
    delete styleObj['align-items'];
  }
  if (styleObj.background?.startsWith('url(')) {
    const image = imageUrls.find((i) => i.nodeId === n.id);
    if (image) {
      styleObj.background = `url(${image.url}) no-repeat center center / contain`;
    }
    // 如果有背景图片，就添加到 customStyle 里
    styleObj.customStyle += `background: ${styleObj.background};`;
    delete styleObj.background;
  }
  // 如果没有margin-left，就设置为0，其他margin同理
  (
    ['margin-left', 'margin-top', 'margin-right', 'margin-bottom']
  ).forEach((key) => {
    if (!styleObj[key]) {
      styleObj[key] = '0px';
    }
  });
  // 如果有flex-grow为1，就添加 widthStretch=true
  if (styleObj['flex-grow'] === '1') {
    attrs.push('widthStretch="true"');
    delete styleObj['flex-grow'];
  }
  // 如果 span 没有 line-height，就设置为 initial，防止被ide其他样式污染
  if (n.tag === 'span' && !styleObj['line-height']) {
    styleObj['line-height'] = 'initial';
  }
  // 如果每个兄弟都是绝对定位，就删除position，自由布局自带position
  const siblings = nodes.filter((i) => i.parentId === n.parentId);
  const everySiblingIsAbsolute = siblings.every(
    (i) => i.style?.position === 'absolute',
  );
  if (everySiblingIsAbsolute) {
    delete styleObj.position;
  }
  return { styleObj, attrs };
}

export const htmlGen: IHTMLGen = {
  linearLayoutTag: 'el-flex',

  absoluteLayoutTag: 'el-absolute-layout',

  textTag: 'el-text',

  imageTag: 'el-image',

  createDiv(args) {
    const { node, nodes, childrenHtml = '' } = args;
    let tag = 'div';
    const isParent = nodes.some((i) => i.parentId === node.id);
    if (isParent) {
      tag = this.linearLayoutTag;
      const children = nodes.filter((i) => i.parentId === node.id);
      const everyChildIsAbsolute = children.every(
        (i) => i.style?.position === 'absolute',
      );
      if (everyChildIsAbsolute) {
        tag = this.absoluteLayoutTag;
      }
    }
    const { styleObj, attrs } = adaptIDEStyle(args);
    const styleStr = styleObjToStr(styleObj);

    const divCode = `
<${tag} ${attrs.join(' ')} style="${styleStr}">${childrenHtml}</${tag}>
`;
    return divCode;
  },

  createSpan(args) {
    const { node: n } = args;
    const tag = this.textTag;
    const { styleObj, attrs } = adaptIDEStyle(args);
    const styleStr = styleObjToStr(styleObj);
    const text = n.attrs?.text?.replace(/"/g, "'") || '';
    const spanCode = `
    <${tag}
        text="${text}"
        ${attrs.join(' ')}
        style="${styleStr}"
    >
    </${tag}>
`;
    return spanCode;
  },

  createImg(args) {
    const { node: n, imageUrls } = args;
    const image = imageUrls.find((i) => i.nodeId === n.id);
    const tag = this.imageTag;
    const { styleObj, attrs } = adaptIDEStyle(args);
    const styleStr = styleObjToStr(styleObj);
    const imgCode = `
    <${tag} 
        src="${image?.url || ''}" 
        fit="contain" 
        ${attrs.join(' ')}
        style="${styleStr}"
    ></${tag}>
`;
    return imgCode;
  },
};
