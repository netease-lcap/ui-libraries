/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
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
    icon: 'toast',
    description: '悬浮出现在页面角落，显示全局的通知提醒消息。',
    group: 'Feedback',
  })
  export class ElNotification extends ViewComponent {
    constructor(options?: Partial<ElNotificationOptions>) {
      super();
    }
  }

  export class ElNotificationOptions extends ViewComponentOptions {
    @Prop({
      title: '消息类型',
      description: '消息类型',
      group: "主要属性",
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '信息' }, { title: '成功' }, { title: '警告' }, { title: '错误' }, { title: '默认' }]
      }
    })
    type: 'info' | 'success' | 'warning' | 'error' | '' = '';

    @Prop({
      title: '显示',
      description: '是否显示',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
      sync: true,
    })
    visible: nasl.core.Boolean = false;

    @Prop({
      title: '标题',
      description: '通知标题',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
    })
    title: nasl.core.String = '';

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
      title: '关闭按钮',
      description: '是否显示关闭按钮',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showClose: nasl.core.Boolean = false;

    @Prop({
      title: '自定义图标',
      description: '自定义图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
        hideUploadIcon: true,
      },
    })
    icon: nasl.core.String;

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
      title: '偏移量',
      group: "主要属性",
      description: "距离窗口顶部的偏移量",
      setter: {
        concept: "NumberInputSetter",
        min: 0,
      },
    })
    offset: nasl.core.Integer = 20;

    @Event({
      title: '弹出后事件',
      description: '弹出提示时触发',
    })
    onOpen: (event: {}) => any;

    @Event({
        title: '关闭后',
        description: '关闭提示时触发',
    })
    onClose: (event: {}) => any;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: {}) => any;

    @Slot({
        title: '通知内容',
        description: '通知内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
