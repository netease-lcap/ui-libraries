/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单日期范围选择',
    description: '日期选择',
  })
  export class FormDateRangePicker extends ViewComponent {
    constructor(
      options?: Partial<FormDateRangePickerOptions & FormItemOptions>,
    ) {
      super();
    }
  }

  export class FormDateRangePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '日期类型',
      description: '日期格式设置',
      docDescription:
        '日期选择弹出层里的日期展示格式，支持日期、月份、季度、年份4种模式。默认日期格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '日期' },
          { title: '周' },
          { title: '月份' },
          { title: '季度' },
          { title: '年份' },
        ],
      },
    })
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';

    @Prop<FormDateRangePickerOptions, 'showTime'>({
      group: '主要属性',
      title: '显示时间选择',
      // bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.picker === 'date',
    })
    showTime: nasl.core.Boolean = false;

    @Prop({
      group: '基础信息',
      title: '字段名称',
      description: '表单项名称。',
      if: (_) => false,
    })
    name: nasl.core.String;

    @Prop({
      group: '基础信息',
      title: '开始时间字段名称',
      description: '表单项名称。',
    })
    startName: nasl.core.String;

    @Prop({
      group: '基础信息',
      title: '结束时间字段名称',
      description: '表单项名称。',
    })
    endName: nasl.core.String;

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
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除内容',
      docDescription: '控制是否显示清除按钮，支持一键清除所选内容',
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



    @Event({
      title: '值变化时',
      description: '值变化时触发',
    })
    onChange: (event: {
      date: nasl.core.String;
      time: nasl.core.String;
    }) => any;

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
