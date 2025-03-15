/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '滑块',
    icon: 'slider',
    description: '通过拖动滑块在一个固定区间内进行选择',
    group: 'Form',
  })
  export class ElSlider extends ViewComponent {
    constructor(options?: Partial<ElSliderOptions>) {
      super();
    }
  }

  export class ElSliderOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      description: '滑块绑定值',
    })
    modelValue: number | number[] = 0;

    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '滑块可设置的最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: number = 0;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '滑块可设置的最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: number = 100;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用滑块',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: boolean = false;

    @Prop({
      group: '数据属性',
      title: '步长',
      description: '滑块步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: number = 1;

    @Prop({
      group: '主要属性',
      title: '显示输入框',
      description: '是否显示输入框，仅在非范围选择时有效',
      setter: { concept: 'SwitchSetter' },
    })
    showInput: boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示输入框控制按钮',
      description: '在显示输入框的情况下，是否显示输入框的控制按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showInputControls: boolean = true;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '滑块的尺寸，垂直模式下无效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: '' | 'default' | 'large' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '输入框尺寸',
      description: '输入框的尺寸，如未设置则继承 size 属性的值',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    inputSize: '' | 'default' | 'large' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '显示间断点',
      description: '是否显示间断点',
      setter: { concept: 'SwitchSetter' },
    })
    showStops: boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示提示信息',
      description: '是否显示提示信息',
      setter: { concept: 'SwitchSetter' },
    })
    showTooltip: boolean = true;

    @Prop({
      group: '主要属性',
      title: '范围选择',
      description: '是否为范围选择',
      setter: { concept: 'SwitchSetter' },
    })
    range: boolean = false;

    @Prop({
      group: '主要属性',
      title: '垂直模式',
      description: '是否为垂直模式',
      setter: { concept: 'SwitchSetter' },
    })
    vertical: boolean = false;

    @Prop({
      group: '样式属性',
      title: '高度',
      description: '滑块高度，垂直模式时必填',
      setter: { concept: 'InputSetter' },
    })
    height: string = '';

    @Prop({
      group: '主要属性',
      title: '延迟毫秒数',
      description: '输入时的去抖延迟，毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    debounce: number = 300;

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
      title: '验证事件',
      description: '是否触发表单验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: boolean = true;

    @Event({
      title: '值改变时',
      description: '值改变时触发（如果拖拽中，则只在松开鼠标后触发）',
    })
    onChange: (value: number | number[]) => void;

    @Event({
      title: '输入时',
      description: '数据改变时触发（拖拽过程中实时触发）',
    })
    onInput: (value: number | number[]) => void;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
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
  export class ElFormSlider extends ViewComponent {
    constructor(options?: Partial<ElFormSliderOptions & ElFormItemProOptions & Omit<ElSliderOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class ElFormSliderOptions extends ViewComponentOptions {}
}
