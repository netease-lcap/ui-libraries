/**
 * ElLoading 组件的 Props 类型定义
 */

/**
 * 关闭前的回调函数类型
 */
export type BeforeCloseFunction = () => boolean | Promise<boolean>;

/**
 * 关闭后的回调函数类型
 */
export type ClosedFunction = () => void;

/**
 * ElLoading 组件的 Props 接口
 */
export interface ElLoadingProps {
  /** 是否显示加载状态 */
  visible?: boolean;
  /** 加载覆盖的目标元素选择器 */
  target?: string;
  /** 是否将加载遮罩层添加到 body 上 */
  body?: boolean;
  /** 是否全屏显示加载遮罩层 */
  fullscreen?: boolean;
  /** 是否锁定屏幕滚动 */
  lock?: boolean;
  /** 加载文案 */
  text?: string;
  /** 遮罩层背景色 */
  background?: string;
  /** 自定义加载图标类名 */
  spinner?: string;
  /** 自定义 SVG 图标 */
  svg?: string;
  /** SVG 图标的 viewBox 属性 */
  svgViewBox?: string;
  /** 自定义类名 */
  customClass?: string;
  /** 关闭前的回调函数 */
  onBeforeClose?: BeforeCloseFunction;
  /** 关闭后的回调函数 */
  onClosed?: ClosedFunction;
}

/**
 * ElLoading 组件的默认 Props
 */
export const elLoadingDefaultProps: Partial<ElLoadingProps> = {
  visible: false,
  body: false,
  fullscreen: true,
  lock: false,
};
