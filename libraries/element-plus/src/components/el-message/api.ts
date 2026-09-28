/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'messager',
      elementSutando: {
        condition: true,
        component: 'ElMessageDesigner',
        selector: {
          slot: 'default',
          cssSelector: '.el-message',
        },
        useSlot: true,
      },
      displaySlotInline: {
        default: true,
      },
      cacheOpenKey: 'visible',
    },
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
    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      title: '显示状态',
      description: '控制消息的显示和隐藏',
      docDescription: '绑定消息的显示状态。true：显示消息；false：隐藏消息。支持双向绑定。',
      group: '状态属性',
      setter: {
        concept: 'SwitchSetter',
      },
      sync: true,
    })
    visible: nasl.core.Boolean = false;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      title: '消息类型',
      description: '选择消息的类型主题',
      docDescription: '控制消息的类型和主题色。信息：蓝色主题；成功：绿色主题；警告：橙色主题；错误：红色主题。',
      group: '主要属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '信息' }, { title: '成功' }, { title: '警告' }, { title: '错误' }],
      },
    })
    type: 'info' | 'success' | 'warning' | 'error' = 'info';

    @Prop({
      title: '纯色背景',
      description: '是否使用纯色背景',
      docDescription: '开启后，消息会使用纯色背景，视觉效果更突出。',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    plain: nasl.core.Boolean = false;

    @Prop({
      title: '自定义图标',
      description: '该属性会覆盖 type 的图标。',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      title: '显示时长',
      group: '主要属性',
      description: '显示时长, 毫秒。设为 0 则不会自动关闭',
      setter: {
        concept: 'NumberInputSetter',
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

    // @Prop({
    //   title: '居中',
    //   description: '文字是否居中',
    //   group: '主要属性',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // center: nasl.core.Boolean = false;

    @Prop({
      title: '偏移量',
      group: '主要属性',
      description: '距离窗口顶部的偏移量',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    offset: nasl.core.Integer = 20;

    @Prop({
      title: '是否合并内容相同的消息',
      description: '合并内容相同的消息，不支持 VNode 类型（插槽形式）的消息，需要使用消息内容属性配置弹出消息。',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    grouping: nasl.core.Boolean = false;

    @Prop({
      title: '重复次数',
      group: '主要属性',
      description: '重复次数，类似于 Badge 。当和 grouping 属性一起使用时作为初始数量使用',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
      if: (_) => !!_.grouping,
    })
    repeatNum: nasl.core.Integer = 1;

    @Prop({
      title: '消息内容',
      group: '主要属性',
      description: '消息内容',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => !!_.grouping,
    })
    msgContent: nasl.core.String = '消息内容';

    // @Event({
    //   title: '弹出后事件',
    //   description: '弹出提示时触发',
    // })
    // onOpen: (event: {}) => any;

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
