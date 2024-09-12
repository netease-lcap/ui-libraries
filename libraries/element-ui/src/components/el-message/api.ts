/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      "idetype": "messager",
      "elementSutando": {
        "condition": true,
        "component": "ElMessageDesigner",
        "selector": {
          "slot": "default",
          "cssSelector": ".el-message",
        },
        "useSlot": true,
      },
      "displaySlotInline": {
        default: true,
      },
      "cacheOpenKey": "visible"
    }
  })
  @Component({
    title: '弹出消息',
    icon: 'toast',
    description: '常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。',
    group: 'Feedback',
  })
  export class ElMessage extends ViewComponent {
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

    constructor(options?: Partial<ElMessageOptions>) {
      super();
    }
  }

  export class ElMessageOptions extends ViewComponentOptions {
    @Prop({
      title: '消息类型',
      description: '消息类型',
      group: "主要属性",
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '信息' }, { title: '成功' }, { title: '警告' }, { title: '错误' }]
      }
    })
    type: 'info' | 'success' | 'warning' | 'error' = 'info';

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
      title: '显示时长',
      group: "主要属性",
      description: "显示时长, 毫秒。设为 0 则不会自动关闭",
      setter: {
        concept: "NumberInputSetter",
        min: 0,
      },
    })
    duration: nasl.core.Integer = 3000;

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
      title: '居中',
      description: '文字是否居中',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      title: '自定义图标',
      description: '自定义图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    icon: nasl.core.String;
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

    @Slot({
      title: '消息内容',
      description: '消息内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
