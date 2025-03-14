/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '时间选择器',
    icon: 'time',
    description: '用于选择或输入日时间',
    group: 'Form',
  })
  export class ElTimePicker extends ViewComponent {
    constructor(options?: Partial<ElTimePickerOptions>) {
      super();
    }
  }

  export class ElTimePickerOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '数据属性',
    //   title: '值',
    //   description: '选择的值'
    // })
    // value: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '占位符',
    //   description: '占位内容',
    //   setter: { concept: 'InputSetter' },
    // })
    // placeholder: nasl.core.String = '请选择时间';

    // @Prop({
    //   group: '主要属性',
    //   title: '时间格式',
    //   description: '时间格式化',
    //   setter: { concept: 'InputSetter' },
    // })
    // format: nasl.core.String = 'HH:mm:ss';

    // @Prop({
    //   group: '主要属性',
    //   title: '值格式',
    //   description: '可选，绑定值的格式。不指定则绑定值为 Date 对象',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueFormat: nasl.core.String = 'HH:mm:ss';

    // @Prop({
    //   group: '主要属性',
    //   title: '范围选择',
    //   description: '是否为时间范围选择',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // isRange: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '开始占位符',
    //   description: '范围选择时开始日期的占位内容',
    //   setter: { concept: 'InputSetter' },
    // })
    // startPlaceholder: nasl.core.String = '开始时间';

    // @Prop({
    //   group: '主要属性',
    //   title: '结束占位符',
    //   description: '范围选择时结束日期的占位内容',
    //   setter: { concept: 'InputSetter' },
    // })
    // endPlaceholder: nasl.core.String = '结束时间';

    // @Prop({
    //   group: '状态属性',
    //   title: '禁用状态',
    //   description: '是否禁用',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // disabled: nasl.core.Boolean = false;

    // @Prop({
    //   group: '状态属性',
    //   title: '只读状态',
    //   description: '完全只读',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // readonly: nasl.core.Boolean = false;

    // @Prop({
    //   group: '状态属性',
    //   title: '可清除',
    //   description: '是否显示清除按钮',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // clearable: nasl.core.Boolean = true;

    // @Event({
    //   title: '值改变时',
    //   description: '值改变时触发',
    // })
    // onChange: (value: nasl.core.String) => any;

    // @Event({
    //   title: '获得焦点时',
    //   description: '获得焦点时触发',
    // })
    // onFocus: (event: FocusEvent) => any;

    // @Event({
    //   title: '失去焦点时',
    //   description: '失去焦点时触发',
    // })
    // onBlur: (event: FocusEvent) => any;

    // @Event({
    //   title: '点击清除按钮时',
    //   description: '点击清除按钮时触发',
    // })
    // onClear: (event: MouseEvent) => any;
  }
}
