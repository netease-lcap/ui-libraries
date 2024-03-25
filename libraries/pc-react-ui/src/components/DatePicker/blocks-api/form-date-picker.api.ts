/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '日期选择',
    icon: 'date-picker',
    description: '日期选择',
    group: 'Selector',
  })
  export class FormDatePicker extends ViewComponent {
    constructor(options?: Partial<FormDatePickerOptions & FormItemOptions>) {
      super();
    }
  }

  export class FormDatePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '日期类型',
      description: '日期格式设置',
      docDescription: '日期选择弹出层里的日期展示格式，支持日期、月份、季度、年份4种模式。默认日期格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '日期' }, { title: '周' }, { title: '月份' }, { title: '季度' }, { title: '年份' }],
      },
    })
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';

    @Prop<FormDatePickerOptions, 'showTime'>({
      group: '主要属性',
      title: '显示时间选择',
      // bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.picker === 'date',
    })
    showTime: nasl.core.Boolean = false;

    //   | 'YYYY';

    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '控制是否在进入页面时聚焦到该组件',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autoFocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '日期选择框无内容时的提示信息，支持自定义编辑，默认为请输入',
    })
    placeholder: nasl.core.String = '请选择日期';

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
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '弹出状态',
      description: '弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”',
      docDescription: '开启时加载日期组件时，下拉框自动弹出，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    open: nasl.core.Boolean;

    @Event({
      title: '值变化时',
      description: '值变化时触发',
    })
    onChange: (event: { date: nasl.core.String; time: nasl.core.String }) => any;

    @Event({
      title: '弹出/隐藏时',
      description: '弹出/隐藏时触发',
    })
    onOpenChange: (event: { opened: nasl.core.Boolean }) => any;

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
