/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '表示两种相互对立的状态间的切换，多用于触发「开/关」',
    group: 'Form',
  })
  export class ElSwitch extends ViewComponent {
    @Prop({
      title: '绑定值',
      description: '开关的绑定值',
    })
    modelValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer;

    @Prop({
      title: '激活值',
      description: '开关打开时的值',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '预览',
      description: '预览',
    })
    preview: nasl.core.Boolean;

    constructor(options?: Partial<ElSwitchOptions>) {
      super();
    }
  }

  export class ElSwitchOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '开关的绑定值',
      docDescription: '绑定开关的当前值，应等于激活值或非激活值。支持布尔类型、字符串或数字类型，支持双向绑定。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '激活值',
      description: '开关打开时的值',
      docDescription: '设置开关打开（激活）时的值。可以是布尔值true、字符串或数字，用于自定义开关的开启状态值。',
      setter: { concept: 'InputSetter' },
    })
    activeValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer = true;

    @Prop({
      group: '数据属性',
      title: '非激活值',
      description: '开关关闭时的值',
      docDescription: '设置开关关闭（非激活）时的值。可以是布尔值false、字符串或数字，用于自定义开关的关闭状态值。',
      setter: { concept: 'InputSetter' },
    })
    inactiveValue: nasl.core.Boolean | nasl.core.String | nasl.core.Integer = false;

    @Prop({
      group: '数据属性',
      title: '表单名称',
      description: '开关的表单字段名',
      docDescription: '设置开关对应的HTML name属性，用于表单提交时的字段名。',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '激活文字',
      description: '开关打开时显示的文字',
      docDescription: '设置开关打开（激活）状态时显示的文字描述，帮助用户理解开关的含义。',
      setter: { concept: 'InputSetter' },
    })
    activeText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '非激活文字',
      description: '开关关闭时显示的文字',
      docDescription: '设置开关关闭（非激活）状态时显示的文字描述，帮助用户理解开关的含义。',
      setter: { concept: 'InputSetter' },
    })
    inactiveText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '内嵌显示',
      description: '文字或图标是否显示在按钮内',
      docDescription: '开启后，文字或图标会显示在开关按钮内部。文本模式下只显示第一个字符。',
      setter: { concept: 'SwitchSetter' },
    })
    inlinePrompt: nasl.core.Boolean = false;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用开关',
      docDescription: '开启后，开关将变为禁用状态，用户无法进行切换操作。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '加载状态',
      description: '是否显示加载中状态',
      docDescription: '开启后，开关会显示加载动画，通常用于异步操作进行中的场景。',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '预览模式',
      description: '是否启用预览模式',
      docDescription: '开启后，开关会以预览模式显示，通常用于只读展示场景。',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '组件尺寸',
      description: '选择开关的尺寸大小',
      docDescription: '控制开关的整体尺寸。大：宽松型开关；默认：标准尺寸；小：紧凑型开关。',
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
      title: '开关宽度',
      description: '设置开关的宽度',
      docDescription: '设置开关的宽度，单位为像素。可以根据需要自定义开关的宽度。',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Integer;

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
      forceUpdateWhenAttributeChange: true,
    },
    extends: [
      {
        name: 'ElFormItemPro',
      },
      {
        name: 'ElSwitch',
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
