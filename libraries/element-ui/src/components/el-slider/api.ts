/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
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
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'NumberInputSetter' },
    })
    value: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '最小值',
      description: '最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '最大值',
      description: '最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 100;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '步长',
      description: '步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '是否显示输入框',
      description: '是否显示输入框，仅在非范围选择时有效',
      setter: { concept: 'SwitchSetter' },
    })
    showInput: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示输入框的控制按钮',
      description: '在显示输入框的情况下，是否显示输入框的控制按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showInputControls: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '输入框的尺寸',
      description: '输入框的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '大' },
          { title: '中' },
          { title: '小' },
          { title: '超小' },
        ],
      },
    })
    inputSize: 'large' | 'medium' | 'small' | 'mini';


    @Prop({
      group: '主要属性',
      title: '是否显示间断点',
      description: '是否显示间断点',
      setter: { concept: 'SwitchSetter' },
    })
    showStops: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示提示信息',
      description: '是否显示 提示信息',
      setter: { concept: 'SwitchSetter' },
    })
    showTooltip: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '格式化提示信息',
      description: '格式化 提示信息',
      setter: { concept: 'InputSetter' },
    })
    formatTooltip: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否为范围选择',
      description: '是否为范围选择',
      setter: { concept: 'SwitchSetter' },
    })
    range: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否竖向模式',
      description: '是否竖向模式',
      setter: { concept: 'SwitchSetter' },
    })
    vertical: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '滑块高度，垂直模式必填',
      description: '滑块高度，垂直模式时必填',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '屏幕阅读器标签',
      description: '屏幕阅读器标签',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '输入时的去抖延迟，毫秒',
      description: '输入时的去抖延迟，毫秒，仅在`show-input`等于true时有效',
      setter: { concept: 'NumberInputSetter' },
    })
    debounce: nasl.core.Decimal = 300;

    @Prop({
      group: '主要属性',
      title: 'tooltip 的自定义类名',
      description: 'tooltip 的自定义类名',
      setter: { concept: 'InputSetter' },
    })
    tooltipClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '标记',
      description:
        '标记， key 的类型必须为 number 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式',
      setter: { concept: 'InputSetter' },
    })
    marks: nasl.collection.Map<nasl.core.Integer, nasl.core.String | { style: nasl.collection.Map<nasl.core.String, nasl.core.String | nasl.core.Decimal>, label: nasl.core.String }>;

    @Event({
      title: '值改变时',
      description: '值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）',
    })
    onChange: (event: any) => any;

    @Event({
      title: '数据改变时',
      description: '数据改变时触发（使用鼠标拖曳时，活动过程实时触发）',
    })
    onInput: (event: any) => any;
  }
}
