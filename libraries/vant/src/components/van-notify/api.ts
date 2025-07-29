/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'messager',
      cacheOpenKey: 'show',
      selector: {
        expression: "this",
        cssSelector: '.van-popup',
      },
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '消息通知',
    icon: 'notification',
    description: '在页面顶部展示消息提示，支持组件调用和函数调用两种方式。',
    group: 'Feedback',
  })
  export class VanNotify extends ViewComponent {
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
    constructor(options?: Partial<VanNotifyOptions>) {
      super();
    }
  }

  export class VanNotifyOptions extends ViewComponentOptions {
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
      title: '类型',
      description: '类型',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '主要' }, { title: '成功' }, { title: '警告' }, { title: '危险' }] },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' = 'danger';

    @Prop({
      group: '主要属性',
      title: '是否锁定背景滚动',
      description: '是否锁定背景滚动',
      setter: { concept: 'SwitchSetter' },
    })
    lockScroll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '层级',
      description: '层级',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 2000;

    @Prop({
      group: '主要属性',
      title: '弹出位置',
      description: '弹出位置',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '底部' }, { title: '顶部' }] },
    })
    position: 'bottom' | 'top' = 'top';

    @Prop({
      group: '样式属性',
      title: '通知消息字体颜色',
      description: '通知消息字体颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#fff';

    @Prop({
      group: '样式属性',
      title: '通知消息背景颜色',
      description: '通知消息背景颜色',
      setter: { concept: 'InputSetter' },
    })
    background: nasl.core.String;

    @Event({
      title: '点击时的回调函数	',
      description: '点击时的回调函数	',
    })
    onClick: (event: any) => void;

    @Event({
      title: '关闭时的回调函数',
      description: '关闭时的回调函数',
    })
    onClose: () => void;

    @Event({
      title: '完全展示后的回调函数	',
      description: '完全展示后的回调函数	',
    })
    onOpened: () => void;

    @Slot({
      title: '自定义通知消息',
      description: '自定义通知消息',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
