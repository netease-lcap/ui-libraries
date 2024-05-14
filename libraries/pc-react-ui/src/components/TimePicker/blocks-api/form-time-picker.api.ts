/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单时间选择',
    description: '时间选择',
  })
  export class FormTimePicker extends ViewComponent {
    constructor(options?: Partial<FormTimePickerOptions & FormItemOptions>) {
      super();
    }
  }

  export class FormTimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '时间选择框无内容时的提示信息，支持自定义编辑，默认为请输入',
    })
    placeholder: nasl.core.String = '请选择时间';

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
      title: '分选项间隔',
      description: '分选项间隔',
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
      group: '主要属性',
      title: '此刻按钮',
      description: '点击可快捷选择当前时间',
      docDescription: '是否展示此刻按钮',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showNow: nasl.core.Boolean = true;

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
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

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
