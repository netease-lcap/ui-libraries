/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '表示两种相互对立的状态间的切换，多用于触发「开/关」',
    group: 'Form',
  })
  export class ElSwitch extends ViewComponent {
    constructor(options?: Partial<ElSwitchOptions>) {
      super();
    }
  }

  export class ElSwitchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '绑定值，应等于 active-value 或 inactive-value，默认为布尔类型',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '禁用状态',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载状态',
      description: '是否显示加载中',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '开关的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '大' },
          { title: '默认' },
          { title: '小' },
        ],
      },
    })
    size: 'large' | 'default' | 'small';

    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '开关的宽度',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Integer;

    @Prop({
      group: '样式属性',
      title: '内嵌图标或文字',
      description: '图标或文本是否显示在点内，文本只显示第一个字符',
      setter: { concept: 'SwitchSetter' },
    })
    inlinePrompt: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '激活图标',
    //   description: '打开时所显示图标组件，会覆盖 active-text',
    //   setter: { concept: 'InputSetter' },
    // })
    // activeIcon: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '非激活图标',
    //   description: '关闭时所显示图标组件，会覆盖 inactive-text',
    //   setter: { concept: 'InputSetter' },
    // })
    // inactiveIcon: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '激活文字',
    //   description: '打开时的文字描述',
    //   setter: { concept: 'InputSetter' },
    // })
    // activeText: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '非激活文字',
    //   description: '关闭时的文字描述',
    //   setter: { concept: 'InputSetter' },
    // })
    // inactiveText: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '激活值',
      description: '打开时的值',
      setter: { concept: 'InputSetter' },
    })
    activeValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer = true;

    @Prop({
      group: '数据属性',
      title: '非激活值',
      description: '关闭时的值',
      setter: { concept: 'InputSetter' },
    })
    inactiveValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer = false;

    @Prop({
      group: '主要属性',
      title: '输入框名称',
      description: 'switch 对应的 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Event({
      title: '值变化时',
      description: '值变化时触发',
    })
    onChange: (value: nasl.core.Boolean | nasl.core.String | nasl.core.Integer) => any;

    // @Slot({
    //   title: '激活操作',
    //   description: '自定义激活操作',
    // })
    // slotActiveAction: any;

    // @Slot({
    //   title: '非激活操作',
    //   description: '自定义非激活操作',
    // })
    // slotInactiveAction: any;

    // @Method({
    //   title: '聚焦',
    //   description: '使 Switch 获取焦点',
    // })
    // focus(): void;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElSwitch',
      },
      {
        name: 'ElFormItemPro',
      },
    ],
  })
  @Component({
    title: '表单开关',
    description: '表单开关',
    group: 'Form',
  })
  export class ElFormSwitch extends ViewComponent {
    constructor(options?: Partial<ElFormSwitchOptions & ElFormItemProOptions & Omit<ElSwitchOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class ElFormSwitchOptions extends ViewComponentOptions {}
}
