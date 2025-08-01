/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'messager',
      cacheOpenKey: 'show',
      selector: {
        expression: "this.getElement(el => el.slotTarget === 'message')",
        cssSelector: '.van-popup',
      },
      forceUpdateWhenAttributeChange: true,
      style: [
        {
          selector: '.van-loading__spinner',
          declaration: 'animation-duration: 2s !important',
        },
        {
          selector: '.van-loading__spinner--circular',
          declaration: 'animation-duration: 2s !important',
        },
        {
          selector: '.van-loading__circular circle',
          declaration: 'animation-duration: 1.5s !important',
        },
      ],
    },
  })
  @Component({
    title: '轻提示',
    icon: 'toast',
    description:
      '在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。',
    group: 'Feedback',
  })
  export class VanToast extends ViewComponent {
    @Method({
      title: '显示消息',
      description: '显示消息',
    })
    open(): void {}
    
    @Method({
      title: '关闭消息',
      description: '关闭消息',
    })
    close(): void {}
    constructor(options?: Partial<VanToastOptions>) {
      super();
    }
  }

  export class VanToastOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否显示',
      description: '是否显示',
      setter: { concept: 'SwitchSetter' },
      sync: true,
    })
    show: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '提示类型',
      description: '提示类型',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '加载' }, { title: '成功' }, { title: '失败' }, { title: '文字' }] },
    })
    type: 'loading' | 'success' | 'fail' | 'text' = 'text';

    @Prop<VanToastOptions, 'loadingType'>({
      group: '主要属性',
      title: '加载图标类型',
      description: '加载图标类型',
      setter: { concept: 'EnumSelectSetter', options: [{ title: 'spinner' }, { title: 'circular' }] },
      if: (_) => _.type === 'loading',
    })
    loadingType: 'spinner' | 'circular' = 'circular';

    @Prop({
      group: '主要属性',
      title: '位置',
      description: '位置',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '中间' }, { title: '顶部' }, { title: '底部' }] },
    })
    position: 'middle' | 'top' | 'bottom' = 'middle';

    @Prop({
      group: '主要属性',
      title: '文本换行方式',
      description: '文本换行方式',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '正常' }, { title: 'break-all' }, { title: 'break-word' }] },
    })
    wordBreak: 'normal' | 'break-all' | 'break-word' = 'break-all';

    @Prop({
      group: '主要属性',
      title: '自定义图标',
      description: '自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标大小',
      description: '图标大小',
      setter: { concept: 'InputSetter' },
    })
    iconSize: nasl.core.String = '30px';

    @Prop({
      group: '主要属性',
      title: '是否显示背景遮罩层',
      description: '是否显示背景遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    overlay: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否禁止背景点击',
      description: '是否禁止背景点击',
      setter: { concept: 'SwitchSetter' },
    })
    forbidClick: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否在点击后关闭',
      description: '是否在点击后关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClick: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否在点击遮罩层后关闭',
      description: '是否在点击遮罩层后关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOverlay: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '展示时长',
      description: '展示时长, 值为 0 时，toast 不会消失',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    duration: nasl.core.Integer = 2000;

    @Prop({
      group: '主要属性',
      title: '层级',
      description: '将组件的 z-index 层级设置为一个固定值',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 2000;

    @Event({
      title: '完全展示后的回调函数',
      description: '完全展示后的回调函数',
    })
    onOpened: () => void;

    @Event({
      title: '关闭时的回调函数',
      description: '关闭时的回调函数',
    })
    onClose: () => void;

    @Slot({
      title: '自定义消息',
      description: '自定义消息',
    })
    slotMessage: () => Array<ViewComponent>;
  }
}
