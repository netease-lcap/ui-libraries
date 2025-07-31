/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'drawer',
      cacheOpenKey: 'show',
      structured: true,
      selector: {
        expression: 'this',
        cssSelector: '.van-popup',
      },
    },
  })
  @Component({
    title: '弹出层',
    icon: 'popuph5',
    description: '弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。',
    group: "Feedback"
  })
  export class VanPopup extends ViewComponent {
    constructor(options?: Partial<VanPopupOptions>) {
      super();
    }
  }
  export class VanPopupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '展示弹层',
      sync: true,
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    show: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '遮罩层',
      description: '是否显示遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    overlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '弹出位置',
      description: '设置弹出位置',
      setter: {
        concept: "EnumSelectSetter",
        options: [
        {
          title: '居中'
        },{
          title: '上'
        }, {
          title: '下'
        }, {
          title: '右'
        }, {
          title: '左'
        }]
      }
    })
    position: 'center' | 'top' | 'bottom' | 'right' | 'left' = 'center';

    @Prop({
      group: '主要属性',
      title: '动画时长',
      description: '动画时长，单位秒, 设置为 0 可以禁用动画',
      setter: { concept: 'InputSetter' },
    })
    duration: nasl.core.Decimal = 0.3;

    @Prop({
      group: '主要属性',
      title: '层级',
      description: '层级',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 2000;

    @Prop({
      group: '主要属性',
      title: '圆角',
      description: '是否显示圆角',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '关闭时销毁',
      description: '关闭时销毁弹出层',
      setter: { concept: 'SwitchSetter' },
    })
    destroyOnClose: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否锁定滚动',
      description: '是否锁定背景滚动',
      setter: { concept: 'SwitchSetter' },
    })
    lockScroll: nasl.core.Boolean = true;
    
    @Prop({
      group: '主要属性',
      title: '懒渲染',
      description: '是否在显示弹层时才渲染节点',
      setter: { concept: 'SwitchSetter' },
    })
    lazyRender: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '页面回退时自动关闭',
      description: '是否在页面回退时自动关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPopstate: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '点击遮罩层关闭',
      description: '是否在点击遮罩层后关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示关闭图标',
      description: '是否显示关闭图标',
      setter: { concept: 'SwitchSetter' },
    })
    closeable: nasl.core.Boolean = false;

    // 这里源码里只接受 string 类型的值，不接受组件，不能用 cw 的图标组件
    @Prop<VanPopupOptions, 'closeIcon'>({
      group: '主要属性',
      title: '关闭图标',
      description: '关闭图标名称或图片链接',
      setter: { concept: 'InputSetter' },
      if: (_) => _.closeable,
    })
    closeIcon: nasl.core.String = 'cross';

    @Prop<VanPopupOptions, 'closeIconPosition'>({
      group: '主要属性',
      title: '关闭图标位置',
      description: '关闭图标位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左上' },
          { title: '右上' },
          { title: '左下' },
          { title: '右下' }
        ]
      },
      if: (_) => _.closeable,
    })
    closeIconPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

    @Prop({
      group: '主要属性',
      title: '初始渲染启用过渡动画',
      description: '是否在初始渲染时启用过渡动画',
      setter: { concept: 'SwitchSetter' },
    })
    transitionAppear: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '顶部安全区适配',
      description: '是否开启顶部安全区适配',
      setter: { concept: 'SwitchSetter' },
    })
    safeAreaInsetTop: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '底部安全区适配',
      description: '是否开启底部安全区适配',
      setter: { concept: 'SwitchSetter' },
    })
    safeAreaInsetBottom: nasl.core.Boolean = false;

    @Event({
      title: '点击弹出层',
      description: '点击弹出层时触发'
    })
    onClick: (event: any) => void;

    @Event({
      title: '点击遮罩层',
      description: '点击遮罩层时触发'
    })
    onClickOverlay: (event: any) => void;

    @Event({
      title: '点击关闭图标',
      description: '点击关闭图标时触发'
    })
    onClickCloseIcon: (event: any) => void;

    @Event({
      title: '打开弹出层',
      description: '打开弹出层时立即触发'
    })
    onOpen: () => void;

    @Event({
      title: '关闭前回调',
      description: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise'
    })
    onBeforeClose: (action: nasl.core.String) => any;

    @Event({
      title: '关闭弹出层',
      description: '关闭弹出层时立即触发'
    })
    onClose: () => void;

    @Event({
      title: '打开且动画结束触发',
      description: '打开弹出层且动画结束后触发'
    })
    onOpened: () => void;

    @Event({
      title: '关闭且动画结束触发',
      description: '关闭弹出层且动画结束后触发'
    })
    onClosed: () => void;

    @Slot({
      title: '默认',
      description: '弹窗内容'
    })
    slotDefault: () => Array<ViewComponent>;

    // TODO LD: 遮罩层内容和弹窗的层级是一致的，这种插槽怎么挂
    // @Slot({
    //   title: '遮罩层内容',
    //   description: '遮罩层的内容'
    // })
    // slotOverlayContent: () => Array<ViewComponent>;
  }
}
