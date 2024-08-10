/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '日期时间选择器',
    icon: 'datetime-picker',
    description: '在同一个选择器里选择日期和时间',
    group: 'Selector',
  })
  export class ElDatetimePicker extends ViewComponent {
    constructor(options?: Partial<ElDatetimePickerOptions>) {
      super();
    }

    @Method({
      title: 'Focus',
      description: '使 input 获取焦点',
    })
    focus(): any {}
  }

  export class ElDatetimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.DateTime | nasl.collection.List<nasl.core.DateTime>;

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '显示类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '年' },
          { title: '月' },
          { title: '日期' },
          { title: '周' },
          { title: '日期时间' },
          { title: '日期时间范围' },
          { title: '日期范围' },
        ],
      },
    })
    type:
      | 'year'
      | 'month'
      | 'date'
      | 'week'
      | 'datetime'
      | 'datetimerange'
      | 'daterange' = 'date';


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
    size: 'large' | 'small' | 'mini' | '' = '';

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
      description: '范围选择时结束日期的占位内容',
      setter: { concept: 'InputSetter' },
    })
    endPlaceholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '使用箭头选择时间',
      description: '是否使用箭头进行时间选择',
      setter: { concept: 'SwitchSetter' },
    })
    timeArrowControl: nasl.core.Boolean = false;

    
    @Prop({
      group: '主要属性',
      title: '显示格式',
      description: '显示在输入框中的格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    format: nasl.core.String = 'yyyy-MM-dd HH:mm:ss';

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
    //   description: 'DateTimePicker 下拉框的类名',
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
      title: '范围分隔符',
      description: '选择范围时的分隔符',
      setter: { concept: 'InputSetter' },
    })
    rangeSeparator: nasl.core.String = '-';

    @Prop({
      group: '主要属性',
      title: '默认值',
      description: '可选，选择器打开时默认显示的时间',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.Date;

    @Prop({
      group: '主要属性',
      title: '选中日期的默认时刻',
      description: '选中日期后的默认具体时刻',
      setter: { concept: 'InputSetter' },
    })
    defaultTime: nasl.core.String | nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '主要属性',
      title: '绑定值格式',
      description: '可选，绑定值的格式。不指定则绑定值为 Date 对象',
      setter: { concept: 'InputSetter' },
    })
    valueFormat: nasl.core.String = 'yyyy-MM-dd HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '取消日期联动',
      description: '在范围选择器里取消两个日期面板之间的联动',
      setter: { concept: 'SwitchSetter' },
    })
    unlinkPanels: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '头部图标',
      description: '自定义头部图标的类名',
      setter: { concept: 'InputSetter' },
    })
    prefixIcon: nasl.core.String = 'el-icon-date';

    @Prop({
      group: '主要属性',
      title: '清空图标',
      description: '自定义清空图标的类名',
      setter: { concept: 'InputSetter' },
    })
    clearIcon: nasl.core.String = 'el-icon-circle-close';

    @Prop({
      group: "主要属性",
      title: '快捷选项',
      description: "是否开启快捷选项",
      setter: {
        concept: "SwitchSetter",
      }
    })
    useShortcuts: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '首列星期',
      description: '填写数字1~7，分别表示周一~周日',
      docDescription: '0～7 (周一～周日) 数字配置，自定义每行从周几开始展示，默认 7，**当开启展示周数时固定周日开始**。',
      setter: {
          concept: 'NumberInputSetter',
          precision: 0,
      },
    })
    firstDayOfWeek: nasl.core.Integer = 7;

    @Prop({
      group: '数据属性',
      title: '最小日期值',
      description: '最小可选的日期值，日期填写格式为“yyyy-mm-dd”',
      docDescription: '控制日历展示的日期范围。',
      setter: {
        concept: "InputSetter",
      }
    })
    minDate: nasl.core.Date | nasl.core.String;

    @Prop({
        group: '数据属性',
        title: '最大日期值',
        description: '最大可选的日期值，日期填写格式为“yyyy-mm-dd”',
        docDescription: '控制日历展示的日期范围',
        setter: {
          concept: "InputSetter",
        }
    })
    maxDate: nasl.core.Date | nasl.core.String;

    @Event({
      title: "选中日期后",
      description: "选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效"
    })
    onPick: (event: {maxDate: nasl.core.Date; minDate: nasl.core.Date}) => any;
    
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

    @Slot({
      title: '自定义分隔符',
      description: '自定义分隔符',
    })
    slotRangeSeparator: () => Array<ViewComponent>;
  }
}
