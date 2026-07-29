/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 5,
    ideusage: {
      "idetype": "messager",
      "elementSutando": {
        "condition": true,
        "component": "ElNotificationDesigner",
        "selector": {
          "slot": "default",
          "cssSelector": ".el-notification",
        },
        "useSlot": true,
      },
      "cacheOpenKey": "visible"
    }
  })
  @Component({
    title: '通知',
    icon: 'notification',
    description: '悬浮出现在页面角落，显示全局的通知提醒消息。',
    group: 'Feedback',
  })
  export class ElNotification extends ViewComponent {
    @Method({
      title: '显示通知',
      description: '显示通知',
    })
    open(): void {}

    @Method({
      title: '关闭通知',
      description: '关闭通知',
    })
    close(): void {}
    constructor(options?: Partial<ElNotificationOptions>) {
      super();
    }
  }

  export class ElNotificationOptions extends ViewComponentOptions {
    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      title: '显示状态',
      description: '控制通知的显示和隐藏',
      docDescription: '绑定通知的显示状态。true：显示通知；false：隐藏通知。支持双向绑定。',
      group: '状态属性',
      setter: {
        concept: 'SwitchSetter',
      },
      sync: true,
    })
    visible: nasl.core.Boolean = false;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      title: '通知类型',
      description: '选择通知的类型主题',
      docDescription: '控制通知的类型和主题色。信息：蓝色主题；成功：绿色主题；警告：橙色主题；错误：红色主题；默认：无特定主题。',
      group: "主要属性",
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '信息' }, { title: '成功' }, { title: '警告' }, { title: '错误' }, { title: '默认' }]
      }
    })
    type: 'info' | 'success' | 'warning' | 'error' | '' = '';

    @Prop({
      title: '通知标题',
      description: '通知的标题文本',
      docDescription: '设置通知的标题文本，显示在通知顶部。',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
    })
    title: nasl.core.String = '';

    @Prop({
      title: '自定义图标',
      description: '自定义通知的图标',
      docDescription: '设置自定义图标。若已设置消息类型，则自定义图标会被类型图标覆盖。',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
        hideUploadIcon: true,
      },
    })
    icon: nasl.core.String;

    @Prop({
      title: '显示时长',
      group: "主要属性",
      description: "显示时长, 毫秒。设为 0 则不会自动关闭",
      setter: {
        concept: "NumberInputSetter",
        min: 0,
      },
    })
    duration: nasl.core.Integer = 4500;

    @Prop({
      title: '弹出位置',
      description: '自定义弹出位置',
      group: '主要属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '右上' }, { title: '左上' }, { title: '右下' }, { title: '左下' }],
      },
    })
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

    @Prop({
      title: '关闭按钮',
      description: '是否显示关闭按钮',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showClose: nasl.core.Boolean = true;

    @Prop({
      title: '偏移量',
      group: "主要属性",
      description: "相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的通知实例应当具有一个相同的偏移量",
      setter: {
        concept: "NumberInputSetter",
        min: 0,
      },
    })
    offset: nasl.core.Integer = 20;

    @Prop({
      title: '展示层级',
      group: "主要属性",
      description: "初始 zIndex",
      setter: { concept: "NumberInputSetter"},
    })
    zIndex: nasl.core.Integer = 0;

    // @Event({
    //   title: '弹出后事件',
    //   description: '弹出提示时触发',
    // })
    // onOpen: (event: {}) => any;

    @Event({
        title: '关闭后',
        description: '关闭提示时触发',
    })
    onClose: () => void;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: () => void;

    @Slot({
        title: '通知内容',
        description: '通知内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
