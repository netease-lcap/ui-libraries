/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '时间选择器',
    icon: 'time-picker',
    description: ' 用于选择或输入时间',
    group: 'Selector',
  })
  export class ElTimePicker extends ViewComponent {
    constructor(options?: Partial<ElTimePickerOptions>) {
      super();
    }

    @Method({
      title: 'Focus',
      description: '使 input 获取焦点',
    })
    focus(): any {}
  }

  export class ElTimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Time | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '完全只读',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '文本框可输入',
      description: '文本框可输入',
      setter: { concept: 'SwitchSetter' },
    })
    editable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '清除按钮',
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '输入框尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '大' },
          { title: '小' },
          { title: '迷你' },
          { title: '默认' },
        ],
      },
    })
    size: 'medium' | 'small' | 'mini' | '' = '';

    @Prop({
      group: '主要属性',
      title: '占位内容',
      description: '非范围选择时的占位内容',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '开始日期的占位内容',
      description: '范围选择时开始日期的占位内容',
      setter: { concept: 'InputSetter' },
    })
    startPlaceholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '结束日期的占位内容',
      description: '范围选择时开始日期的占位内容',
      setter: { concept: 'InputSetter' },
    })
    endPlaceholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否时间范围',
      description: '是否为时间范围选择，仅对`<el-time-picker>`有效',
      setter: { concept: 'SwitchSetter' },
    })
    isRange: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '使用箭头选择时间',
      description: '是否使用箭头进行时间选择，仅对`<el-time-picker>`有效',
      setter: { concept: 'SwitchSetter' },
    })
    arrowControl: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '居左' },
          { title: '居中' },
          { title: '居右' },
          { title: '默认' },
        ],
      },
    })
    align: 'left' | 'center' | 'right' = 'left';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popper Class',
    //   description: 'TimePicker 下拉框的类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // popperClass: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Picker Options',
    //   description: '当前时间日期选择器特有的选项参考下表',
    //   setter: { concept: 'InputSetter' },
    // })
    // pickerOptions: object = {};

    @Prop({
      group: '主要属性',
      title: '可选时间段',
      description: '可选时间段，例如"18:30:00 - 20:30:00"或者传入数组',
      setter: { concept: 'InputSetter' },
    })
    pickerSelectableRange: nasl.core.String | nasl.collection.List<nasl.core.String>;
    @Prop({
      group: '主要属性',
      title: '格式化',
      description: '时间格式化',
      setter: { concept: 'InputSetter' },
    })
    pickerFormat: nasl.core.String = 'HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: '范围分隔符',
      description: '选择范围时的分隔符',
      setter: { concept: 'InputSetter' },
    })
    rangeSeparator: nasl.core.String = '-';

    @Prop({
      group: '主要属性',
      title: '绑定值格式',
      description:
        '可选，仅TimePicker时可用，绑定值的格式。不指定则绑定值为 Date 对象',
      setter: { concept: 'InputSetter' },
    })
    valueFormat: nasl.core.String = 'HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: '默认时间',
      description: '可选，选择器打开时默认显示的时间',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.Time | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '头部图标',
      description: '自定义头部图标的类名',
      setter: { concept: 'InputSetter' },
    })
    prefixIcon: nasl.core.String = 'el-icon-time';

    @Prop({
      group: '主要属性',
      title: '清空图标',
      description: '自定义清空图标的类名',
      setter: { concept: 'InputSetter' },
    })
    clearIcon: nasl.core.String = 'el-icon-circle-close';

    @Event({
      title: 'On Change',
      description: '用户确认选定的值时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Blur',
      description: '当 input 失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '当 input 获得焦点时触发',
    })
    onFocus: (event: any) => any;
  }
}
