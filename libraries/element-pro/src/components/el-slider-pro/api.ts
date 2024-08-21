/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '滑块',
    icon: 'slider',
    description: '',
    group: 'Form',
  })
  export class ElSliderPro extends ViewComponent {
    constructor(options?: Partial<ElSliderProOptions>) {
      super();
    }
  }

  export class ElSliderProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Input Number Props',
      description:
        '用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件。',
      setter: { concept: 'InputSetter' },
    })
    inputNumberProps: nasl.core.Boolean | object = false;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description:
        '滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值。',
      setter: { concept: 'InputSetter' },
    })
    label: any = true;

    @Prop({
      group: '主要属性',
      title: 'Layout',
      description: '滑块布局方向。可选项：vertical/horizontal',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'vertical' }, { title: 'horizontal' }],
      },
    })
    layout: 'vertical' | 'horizontal' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: 'Marks',
      description:
        '刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + "%", 50: (h) => <button>50</button> }`。',
      setter: { concept: 'InputSetter' },
    })
    marks: object | any[];

    @Prop({
      group: '主要属性',
      title: 'Max',
      description: '滑块范围最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 100;

    @Prop({
      group: '主要属性',
      title: 'Min',
      description: '滑块范围最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Range',
      description: '双游标滑块',
      setter: { concept: 'SwitchSetter' },
    })
    range: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Show Step',
      description: '控制步长刻度值显示',
      setter: { concept: 'SwitchSetter' },
    })
    showStep: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Step',
      description: '步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: 'Tooltip Props',
      description: '透传提示组件属性。',
      setter: { concept: 'InputSetter' },
    })
    tooltipProps: object;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '滑块值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Decimal | any[];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '滑块值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.Decimal | any[];

    @Event({
      title: 'On Change',
      description: '滑块值变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Change End',
      description:
        '松开拖动 `mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用',
    })
    onChangeEnd: (event: any) => any;

    @Slot({
      title: 'Label',
      description:
        '滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值。',
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
