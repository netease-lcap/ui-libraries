/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '时间选择',
    // icon: 'select',
    description: '',
    group: 'Selector',
  })
  export class ElTimeSelect extends ViewComponent {
    @Prop({
      title: '值',
    })
    modelValue: nasl.core.Time | nasl.core.String;

    @Method({
      title: '获取焦点',
      description: '使输入框获取焦点',
    })
    focus(): void {}

    @Method({
      title: '失去焦点',
      description: '使输入框失去焦点',
    })
    blur(): void {} 
    constructor(options?: Partial<ElTimeSelectOptions>) {
      super();
    }
  }

  export class ElTimeSelectOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '选择的值'
    })
    modelValue: nasl.core.String | nasl.core.Time;

    @Prop({
      group: '主要属性',
      title: '开始时间',
      description: '开始时间',
      setter: { concept: 'InputSetter' },
    })
    start: nasl.core.String | nasl.core.Time = '09:00';

    @Prop({
      group: '主要属性',
      title: '结束时间',
      description: '结束时间',
      setter: { concept: 'InputSetter' },
    })
    end: nasl.core.String | nasl.core.Time = '18:00';

    @Prop({
      group: '主要属性',
      title: '间隔时间',
      description: '间隔时间',
      setter: { concept: 'InputSetter' },
    })
    step: nasl.core.String = '00:30';

    @Prop({
      group: '主要属性',
      title: '最小时间',
      description: '最小时间，小于该时间的时间段将被禁用',
      setter: { concept: 'InputSetter' },
    })
    minTime: nasl.core.String | nasl.core.Time;

    @Prop({
      group: '主要属性',
      title: '最大时间',
      description: '最大时间，大于该时间的时间段将被禁用',
      setter: { concept: 'InputSetter' },
    })
    maxTime: nasl.core.String | nasl.core.Time;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位内容',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择时间';

    @Prop({
      group: '主要属性',
      title: '格式化',
      description: '用于格式化时间，',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '12:09:09' },
          { title: '12时09分09秒' },
          { title: '12:09' },
          { title: '12时09分' },
        ],
      },
    })
    format: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' = 'HH:mm:ss';

    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '可编辑',
      description: '文本框可输入',
      setter: { concept: 'SwitchSetter' },
    })
    editable: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '可清除',
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = true;

    @Prop({
      title: '前缀图标',
      description: '前缀图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    prefixIcon: nasl.core.String = 'Clock';

    @Prop({
      title: '清除图标',
      description: '清除图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    clearIcon: nasl.core.String = 'CircleClose';

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: nasl.core.String) => any;

    @Event({
      title: '获得焦点时',
      description: '获得焦点时触发',
    })
    onFocus: (event: FocusEvent) => any;

    @Event({
      title: '失去焦点时',
      description: '失去焦点时触发',
    })
    onBlur: (event: FocusEvent) => any;

    @Event({
      title: '点击清除按钮时',
      description: '点击清除按钮时触发',
    })
    onClear: (event: MouseEvent) => any;
  }
}
