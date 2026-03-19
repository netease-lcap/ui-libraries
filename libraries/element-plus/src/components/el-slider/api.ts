/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '滑块',
    icon: 'slider',
    description: '通过拖动滑块在一个固定区间内进行选择',
    group: 'Form',
  })
  export class ElSlider<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    @Prop({
      title: '预览',
      description: '是否预览',
    })
    preview: nasl.core.Boolean;

    @Prop({
      title: '禁用状态',
      description: '是否禁用滑块',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '绑定值',
      description: '滑块的当前值',
      docDescription: '绑定滑块的当前值，支持双向绑定。可以获取或设置滑块的数值。',
    })
    modelValue: nasl.core.Integer;
    constructor(options?: Partial<ElSliderOptions>) {
      super();
    }
  }

  export class ElSliderOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '滑块的当前值',
      docDescription: '绑定滑块的当前值，支持双向绑定。可以获取或设置滑块的数值。',
    })
    modelValue: M extends true ? nasl.collection.List<nasl.core.Integer> : nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '滑块的最小值',
      docDescription: '设置滑块允许滑动到的最小值，滑块不能小于此值。',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '滑块的最大值',
      docDescription: '设置滑块允许滑动到的最大值，滑块不能大于此值。',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '步长',
      description: '滑块移动的步长',
      docDescription: '设置滑块每次移动的步长。例如步长为5时，滑块只能停留在5的倍数位置。',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Integer;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '显示输入框',
      description: '是否显示数值输入框',
      docDescription: '开启后，滑块右侧会显示一个数值输入框，可以直接输入数值。仅在非范围选择时有效。',
      setter: { concept: 'SwitchSetter' },
    })
    showInput: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '显示控制按钮',
      description: '输入框是否显示加减按钮',
      docDescription: '开启后，在显示输入框的情况下会显示加减控制按钮。关闭后只显示纯输入框。',
      setter: { concept: 'SwitchSetter' },
    })
    showInputControls: nasl.core.Boolean = true;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用滑块',
      docDescription: '开启后，滑块将变为禁用状态，用户无法拖动滑块或修改数值。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '滑块尺寸',
      description: '选择滑块的尺寸大小',
      docDescription: '控制滑块的整体尺寸。默认：标准尺寸；大：宽松型滑块；小：紧凑型滑块。垂直模式下无效。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: 'default' | 'large' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '输入框尺寸',
      description: '数值输入框的尺寸',
      docDescription: '设置数值输入框的尺寸。如未设置则继承滑块尺寸属性的值。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    inputSize: 'default' | 'large' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '显示间断点',
      description: '是否显示间断点',
      setter: { concept: 'SwitchSetter' },
    })
    showStops: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '显示提示信息',
      description: '是否显示提示信息',
      setter: { concept: 'SwitchSetter' },
    })
    showTooltip: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '范围选择',
      description: '是否为范围选择',
      setter: { concept: 'SwitchSetter' },
    })
    range: M;

    @Prop({
      group: '主要属性',
      title: '垂直模式',
      description: '是否为垂直模式,垂直模式必须设置高度',
      setter: { concept: 'SwitchSetter' },
    })
    vertical: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '高度',
      description: '滑块高度，垂直模式时必填',
      setter: { concept: 'NumberInputSetter' },
    })
    height: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '延迟毫秒数',
      description: '输入时的去抖延迟，毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    debounce: nasl.core.Integer = 300;

    // @Prop({
    //   group: '主要属性',
    //   title: '提示框类名',
    //   description: '提示框的自定义类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // tooltipClass: string = '';

    @Prop({
      group: '主要属性',
      title: '提示框位置',
      description: '提示框的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '顶部' }, { title: '底部' }, { title: '左侧' }, { title: '右侧' }],
      },
    })
    placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

    @Prop({
      group: '主要属性',
      title: '表单验证',
      description: '是否触发表单验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '值改变时',
      description: '值改变时触发（如果拖拽中，则只在松开鼠标后触发）',
    })
    onChange: (value: M extends true ? nasl.collection.List<nasl.core.Integer> : nasl.core.Integer) => void;

    @Event({
      title: '数据改变时',
      description: '数据改变时触发（拖拽过程中实时触发）',
    })
    onInput: (value: nasl.core.Integer | nasl.core.Integer[]) => void;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      additionalAttribute: {
        ':isRequired': {
          condition:
            "(!this.getAttribute('isRequired')?.value) && (this.getAttribute('rules')?.rules || []).find(r => r.calleeName === 'filled')",
          value: '"true"',
        },
      },
    },
    extends: [
      {
        name: 'ElSlider',
      },
      {
        name: 'ElFormItemPro',
      },
    ],
  })
  @Component({
    title: '表单滑块',
    description: '表单滑块',
    group: 'Form',
  })
  export class ElFormSlider<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(
      options?: Partial<ElFormSliderOptions<T, V, P, M, C> & ElFormItemProOptions & Omit<ElSliderOptions<T, V, P, M, C>, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormSliderOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions { }
}
