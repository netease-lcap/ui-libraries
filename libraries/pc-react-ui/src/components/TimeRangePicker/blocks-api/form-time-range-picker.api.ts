/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '时间范围选择',
    icon: 'time-picker',
    description: '时间范围选择',
    group: 'Selector',
  })
  export class FormTimeRangePicker extends ViewComponent {
    constructor(options?: Partial<FormTimeRangePickerOptions & FormItemOptions>) {
      super();
    }
  }

  export class FormTimeRangePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '小时选项间隔',
      description: '小时选项间隔',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    hourStep: nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '分钟选项间隔',
      description: '分钟选项间隔',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    minuteStep: nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '秒选项间隔',
      description: '秒选项间隔',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    secondStep: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '是否自动获得焦点',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autoFocus: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '使用 12 小时制',
      description: '使用 12 小时制',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    use12Hours: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除内容',
      docDescription: '是否展示清除按钮',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    allowClear: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '始末时间是否自动排序',
      description: '始末时间是否自动排序',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    order: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '弹出状态',
      description: '弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”',
      docDescription: '开启时加载时间组件时，下拉框自动弹出，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    open: nasl.core.Boolean;

    @Event({
      title: '改变后',
      description: '时间改变时触发',
    })
    onChange: (event: { date: nasl.core.String; time: nasl.core.String }) => any;

    @Event({
      title: '失去焦点',
      description: '失去焦点时触发。',
    })
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
