export interface Bound {
    x: number;
    y: number;
    width: number;
    height: number;
  }
export type Style = Record<string, string>
export type Attr = {
  text?: string;
};
export interface ICodeWaveNode {
    tag: 'div' | 'span' | 'svg' | 'img';
    name: string;
    id: string;
    parentId?: string;
    parentName?: string;
    bound: Bound;
    absoluteBound: Bound;
    style: Style;
    attrs: Attr;
  }

export interface ComponentCode {
    id: string;
    tag: string;
    code: string;
    slots?: {
      templateName: string;
      childrenIds: string[];
    }[];
    name: string;
    reason: string;
  }

export interface ComponentConfig {
    type: string;
    generateCode: (componentNode: ICodeWaveNode, textNodes: ICodeWaveNode[], allNodes: ICodeWaveNode[], slotNodes: ICodeWaveNode[][]) => ComponentCode;
}
