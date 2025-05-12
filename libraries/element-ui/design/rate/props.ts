/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElRateProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许半选 */
  allowHalf: Boolean,
  /** 是否允许清除 */
  clearable: Boolean,
  /** 评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，示例：[选中颜色]。数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色，[选中颜色，未选中颜色]。示例：['#ED7B2F', '#E3E6EB'] */
  color: {
    type: [String, Array] as PropType<ElRateProps['color']>,
    default: '#ED7B2F',
  },
  /** 评分的数量 */
  count: {
    type: Number,
    default: 5,
  },
  /** 是否禁用评分 */
  disabled: Boolean,
  /** 评分图标的间距 */
  gap: {
    type: Number,
    default: 4,
  },
  /** 自定义评分图标 */
  icon: {
    type: Function as PropType<ElRateProps['icon']>,
  },
  /** 是否显示对应的辅助文字 */
  showText: Boolean,
  /** 评分图标的大小，示例：`20px` */
  size: {
    type: String,
    default: '24px',
  },
  /** 评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分'] */
  texts: {
    type: Array as PropType<ElRateProps['texts']>,
    default: (): ElRateProps['texts'] => [],
  },
  /** 选择评分的值 */
  value: {
    type: Number,
    default: undefined,
  },
  /** 选择评分的值，非受控属性 */
  defaultValue: {
    type: Number,
    default: 0,
  },
  /** 是否区分颜色 */
  distinguishColor: Boolean,
  /** 低分和中等分数的界限值，值越大代表分数越低 */
  lowThreshold: {
    type: Number,
    default: 2,
  },
  /** 高分和中等分数的界限值，值越大代表分数越高 */
  highThreshold: {
    type: Number,
    default: 4,
  },
  /** 未选中时的颜色 */
  voidColor: String,
  /** 图标颜色 */
  colors: {
    type: Array as PropType<ElRateProps['colors']>,
    default: (): ElRateProps['colors'] => ['#99A9BF', '#F7BA2A', '#FF9900'],
  },
  /** 是否显示分数 */
  showScore: Boolean,
  /** 分数模板 */
  scoreTemplate: {
    type: String,
    default: '{value}',
  },
  /** 评分数改变时触发 */
  onChange: Function as PropType<ElRateProps['onChange']>,
};
