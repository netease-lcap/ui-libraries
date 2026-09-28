/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElNode } from '../common';

export interface ElRateProps {
  /**
   * 是否区分颜色
   * @default false
   */
  distinguishColor?: boolean;

  /**
   * 低分和中等分数的界限值，值越大代表分数越低
   * @default 2
   */
  lowThreshold?: number;

  /**
   * 高分和中等分数的界限值，值越大代表分数越高
   * @default 4
   */
  highThreshold?: number;

  /**
   * 未选中时的颜色
   * @default '#C6D1DE'
   */
  voidColor?: string;

  /** 
   * 图标颜色
   * @default ['#99A9BF','#F7BA2A', '#FF9900']
   */
  colors?: Array<string>;


  /**
   * 是否显示分数
   * @default false
   */
  showScore?: boolean;

  /**
   * 分数模板
   * @default '{value}分'
   */
  scoreTemplate?: string;

  /**
   * 是否允许半选
   * @default false
   */
  allowHalf?: boolean;
  /**
   * 是否允许清除
   * @default false
   */
  clearable?: boolean;
  /**
   * 评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，示例：[选中颜色]。数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色，[选中颜色，未选中颜色]。示例：['#ED7B2F', '#E3E6EB']
   * @default '#ED7B2F'
   */
  color?: string | Array<string>;
  /**
   * 评分的数量
   * @default 5
   */
  count?: number;
  /**
   * 是否禁用评分
   * @default false
   */
  disabled?: boolean;
  /**
   * 评分图标的间距
   * @default 4
   */
  gap?: number;
  /**
   * 自定义评分图标
   */
  icon?: ElNode;
  /**
   * 是否显示对应的辅助文字
   * @default false
   */
  showText?: boolean;
  /**
   * 评分图标的大小，示例：`20px`
   * @default 24px
   */
  size?: string;
  /**
   * 评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分']
   * @default []
   */
  texts?: Array<string>;
  /**
   * 选择评分的值
   * @default 0
   */
  value?: number;
  /**
   * 选择评分的值，非受控属性
   * @default 0
   */
  defaultValue?: number;
  /**
   * 评分数改变时触发
   */
  onChange?: (value: number) => void;
}
