export interface Bound {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ICodeWaveNode {
  tag: 'div' | 'span' | 'svg' | 'img';
  name: string;
  id: string;
  parentId?: string;
  parentName?: string;
  bound: Bound;
  style: Record<string, string>;
  attrs: {
    text?: string;
  };
}

export interface NodeWithAbsoluteBound extends ICodeWaveNode {
  absoluteBound: Bound;
}

export interface ComponentCode {
  id: string;
  originalId: string;
  code: string;
  slots?: {
    templateName: string;
    childrenIds: string[];
    /** 追加的子节点样式 */
    childrenStyle?: Record<string, string>;
  }[];
  name: string;
  reason: string;
}

export interface ComponentCodeGen {
  type: string;
  /**
   * 生成代码的函数
   * @param componentNode 组件节点
   * @param textNodes 组件中的文本节点
   * @param allNodes 所有节点
   * @returns 如果返回 null，则表示不生成组件代码
   * @returns 如果返回对象，则表示生成组件代码
   * @returns id 被替换的原始节点 id
   * @returns tag 组件标签
   * @returns code 组件代码
   */
  generateCode: (
    componentNode: NodeWithAbsoluteBound,
    textNodes: NodeWithAbsoluteBound[],
    allNodes: NodeWithAbsoluteBound[],
    slotNodes: NodeWithAbsoluteBound[][],
  ) => Omit<ComponentCode, 'name' | 'reason' | 'originalId'> | null;
  // 显示名称
  name: string;
  // 使用组件的理由
  reason: string;
  // tag，用于在 ide 里获取组件详细信息，如图标等
  tag: string;
}

export interface IHTMLGenArgs {
  node: ICodeWaveNode;
  imageUrls: { nodeId: string; url: string }[];
  nodes: ICodeWaveNode[];
  childrenHtml?: string;
}

export interface IHTMLGen {
  linearLayoutTag: string;
  absoluteLayoutTag: string;
  textTag: string;
  imageTag: string;
  createDiv(args: IHTMLGenArgs): string;
  createSpan(args: IHTMLGenArgs): string;
  createImg(args: IHTMLGenArgs): string;
}
