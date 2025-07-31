/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      style: [
        {
          selector: '.empty-slot-wrapper',
          declaration: 'position: relative !important',
        },
      ],
    },
  })
  @Component({
    title: '图片',
    icon: 'image',
    description: '增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。',
    group: 'Display',
  })
  export class VanImage extends ViewComponent {
    constructor(options?: Partial<VanImageOptions>) {
      super();
    }
  }

  export class VanImageOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图片链接',
      description: '图片链接',
      setter: { concept: 'InputSetter' },
    })
    src: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图片填充模式',
      description: '图片填充模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '填充' }, { title: '包含' }, { title: '覆盖' }, { title: '不处理' }, { title: '缩小' }],
      },
    })
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'fill';

    @Prop({
      group: '主要属性',
      title: '图片位置',
      description: '图片位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '右' }, { title: '下' }, { title: '左' }, { title: '居中' }],
      },
    })
    position: 'top' | 'right' | 'bottom' | 'left' | 'center' = 'center';

    @Prop({
      group: '主要属性',
      title: '替代文本',
      description: '替代文本',
      setter: { concept: 'InputSetter' },
    })
    alt: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '宽度',
      description: '宽度，默认单位为 px',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '高度',
      description: '高度，默认单位为 px',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '圆角大小',
      description: '圆角大小，默认单位为 px',
      setter: { concept: 'InputSetter' },
    })
    radius: nasl.core.String = '0';

    @Prop({
      group: '主要属性',
      title: '是否显示为圆形',
      description: '是否显示为圆形',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否将根节点设置为块级元素',
      description: '是否将根节点设置为块级元素，默认情况下为 inline-block 元素',
      setter: { concept: 'SwitchSetter' },
    })
    block: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否开启图片懒加载',
      description: '是否开启图片懒加载，须配合 Lazyload 组件使用',
      setter: { concept: 'SwitchSetter' },
    })
    lazyLoad: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否展示图片加载失败提示',
      description: '是否展示图片加载失败提示',
      setter: { concept: 'SwitchSetter' },
    })
    showError: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否展示图片加载中提示',
      description: '是否展示图片加载中提示',
      setter: { concept: 'SwitchSetter' },
    })
    showLoading: nasl.core.Boolean = true;

    // 这两个 icon 只接受 string 类型，不接受组件，不能用 cw 的图标组件
    @Prop({
      group: '主要属性',
      title: '失败时提示的图标',
      description: '失败时提示的图标',
      setter: { concept: 'InputSetter' },
    })
    errorIcon: nasl.core.String = 'photo-fail';

    @Prop({
      group: '主要属性',
      title: '加载时提示的图标',
      description: '加载时提示的图标',
      setter: { concept: 'InputSetter' },
    })
    loadingIcon: nasl.core.String = 'photo';

    @Prop({
      group: '主要属性',
      title: '加载图标和失败图标的大小',
      description: '加载图标和失败图标的大小',
      setter: { concept: 'InputSetter' },
    })
    iconSize: nasl.core.String = '32px';

    // @Prop({
    //   group: '主要属性',
    //   title: '是否自定义默认内容',
    //   description: '是否自定义默认内容',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // isCustomDefault: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '跨域',
      description: '跨域',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'anonymous' }, { title: 'use-credentials' }, { title: '不设置' }],
      },
    })
    crossorigin: 'anonymous' | 'use-credentials' | '' = '';

    @Prop({
      group: '主要属性',
      title: 'HTTP 引用头',
      description: 'HTTP 引用头',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'no-referrer' },
          { title: 'no-referrer-when-downgrade' },
          { title: 'origin' },
          { title: 'origin-when-cross-origin' },
          { title: 'same-origin' },
          { title: 'strict-origin' },
          { title: 'strict-origin-when-cross-origin' },
          { title: 'unsafe-url' },
          { title: '不设置' },
        ],
      },
    })
    referrerpolicy: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url' | '' = '';

    @Event({
      title: '点击图片时触发',
      description: '点击图片时触发',
    })
    onClick: (event: MouseEvent) => void;

    @Event({
      title: '图片加载失败时触发',
      description: '图片加载失败时触发',
    })
    onError: () => void;

    @Event({
      title: '图片加载完毕时触发',
      description: '图片加载完毕时触发',
    })
    onLoad: (event: Event) => void;

    @Slot({
      title: '自定义图片下方的内容',
      description: '自定义图片下方的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '自定义加载中的提示内容',
      description: '自定义加载中的提示内容',
    })
    slotLoading: () => Array<ViewComponent>;

    @Slot({
      title: '自定义加载失败时的提示内容',
      description: '自定义加载失败时的提示内容',
    })
    slotError: () => Array<ViewComponent>;
  }
}
