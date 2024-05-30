/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '滑块',
    icon: 'slider',
    description: '滑动输入条，用于在给定的范围内选择一个值。',
    group: "Display"
  })
  export class VanSlider extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: VanSliderOptions['value'];

    constructor(options?: Partial<VanSliderOptions>) {
      super();
    }
  }
  export class VanSliderOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识滑块的值',
      sync: true,
      setter: {
        concept: "NumberInputSetter"
      }
    })
    value: nasl.core.Decimal | nasl.collection.List<nasl.core.Decimal>;
    @Prop({
      group: '数据属性',
      title: '最大值',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    max: nasl.core.Decimal = 100;
    @Prop({
      group: '数据属性',
      title: '最小值',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    min: nasl.core.Decimal = 0;
    @Prop({
      group: '主要属性',
      title: '双滑块模式',
      description: '是否开启双滑块模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    range: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '自定义组件',
      setter: {
        concept: "SwitchSetter"
      }
    })
    custom: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '垂直展示',
      description: '是否垂直展示',
      setter: {
        concept: "SwitchSetter"
      }
    })
    vertical: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '步长',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    step: nasl.core.Decimal = 0;
    @Prop({
      group: '样式属性',
      title: '进度条高度',
      description: '设置进度条高度，单位为px',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    barHeight: nasl.core.Decimal = 2;
    @Prop({
      group: '样式属性',
      title: '滑块按钮大小',
      description: '设置滑块按钮大小，单位为px',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    buttonSize: nasl.core.Decimal = 24;
    @Prop({
      group: '样式属性',
      title: '进度条激活态颜色'
    })
    activeColor: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '进度条非激活态颜色'
    })
    inactiveColor: nasl.core.String;
    @Event({
      title: '改变时',
      description: '进度变化时实时触发'
    })
    onInput: (event: nasl.core.Decimal) => void;
    @Event({
      title: '改变后',
      description: '进度变化且结束拖动后触发'
    })
    onChange: (event: nasl.core.Decimal) => void;
    @Event({
      title: '开始拖动时触发',
      description: '开始拖动时触发'
    })
    onDragStart: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '结束拖动时触发',
      description: '结束拖动时触发'
    })
    onDragEnd: (event: nasl.ui.BaseEvent) => void;

    @Slot({
      title: '',
      description: ''
    })
    slotButton: () => Array<ViewComponent>
  }
}
