/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'type',
    },
  })
  @Component({
    title: '日期选择器',
    icon: 'date-picker',
    description: '用于选择某一具体日期或某一段日期区间。',
    group: 'Selector',
  })
  export class ElDatePicker<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    @Prop({
      title: '值',
    })
    modelValue: ElDatePickerOptions<T, V, P, M, C>['modelValue'];

    @Prop({
      title: '起始值',
    })
    startValue: ElDatePickerOptions<T, V, P, M, C>['startValue'];

    @Prop({
      title: '结束值',
    })
    endValue: ElDatePickerOptions<T, V, P, M, C>['endValue'];

    @Prop({
      title: '只读',
      description: '只读状态',
    })
    readonly: nasl.core.Boolean;

    @Prop({
      title: '禁用',
      description: '是否禁用按钮',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '预览',
      description: '是否预览',
    })
    preview: nasl.core.Boolean;

    constructor(options?: Partial<ElDatePickerOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElDatePickerOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    // @Prop({
    //   group: '数据属性',
    //   title: '区间选择',
    //   description: '是否支持进行时间区间选择，关闭则为时间点选择',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    //   onChange: [
    //     {
    //       clear: ['modelValue'],
    //       if: (_) => _ === false,
    //     },
    //     {
    //       clear: ['startValue', 'endValue'],
    //       if: (_) => _ === true,
    //     },
    //   ],
    // })
    // range: nasl.core.Boolean = false;

    // ========== 数据来源相关属性 ==========
    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'modelValue'>({
      group: '数据属性',
      title: '选中值',
      description: '当前选中的日期值',
      docDescription: '绑定当前选中的日期值，支持双向绑定。仅在非区间选择模式下有效。',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.type.includes('range'),
      sync: true,
    })
    modelValue: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'startValue'>({
      group: '数据属性',
      title: '起始值',
      description: '区间选择的开始日期',
      docDescription: '绑定日期区间的开始日期值，支持双向绑定。仅在区间选择模式下有效。',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('range'),
      sync: true,
    })
    startValue: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'endValue'>({
      group: '数据属性',
      title: '结束值',
      description: '结束日期',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('range'),
      sync: true,
    })
    endValue: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用按钮',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '输入框尺寸。可选项：large/default/small。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '中' }, { title: '小' }],
      },
    })
    size: '' | 'large' | 'default' | 'small' = '';

    @Prop({
      group: '交互属性',
      title: '文本框可输入',
      description: '文本框可输入',
      setter: { concept: 'SwitchSetter' },
    })
    editable: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '可清空',
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = true;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'placeholder'>({
      group: '主要属性',
      title: '占位符',
      description: '非范围选择时的占位内容',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.type.includes('range'),
    })
    placeholder: nasl.core.String = '';

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'startPlaceholder'>({
      group: '主要属性',
      title: '开始日期的占位内容',
      description: '范围选择时开始日期的占位内容',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('range'),
    })
    startPlaceholder: nasl.core.String;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'endPlaceholder'>({
      group: '主要属性',
      title: '结束日期的占位内容',
      description: '范围选择时结束日期的占位内容',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('range'),
    })
    endPlaceholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: { concept: 'SwitchSetter' },
      if: (_) => false,
    })
    range: M = false as any;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'type'>({
      group: '主要属性',
      title: '显示类型',
      description: '显示类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '年份' },
          { title: '多个年份' },
          { title: '月份' },
          { title: '多个月份' },
          { title: '日期' },
          { title: '多个日期' },
          { title: '日期时间' },
          { title: '周' },
          { title: '日期时间范围' },
          { title: '日期范围' },
          { title: '月份范围' },
          { title: '年份范围' },
        ],
      },
      onChange: [
        {
          clear: ['modelValue'],
          if: (_) => _.includes('range'),
        },
        {
          clear: ['startValue', 'endValue'],
          if: (_) => !_.includes('range'),
        },
        {
          if: (_) => _.includes('range') || _.includes('s'),
          update: {
            range: true,
          },
        },
        {
          if: (_) => !_.includes('range') && !_.includes('s'),
          update: {
            range: false,
          },
        },
      ],
    })
    type:
      | 'year'
      | 'years'
      | 'month'
      | 'months'
      | 'date'
      | 'dates'
      | 'datetime'
      | 'week'
      | 'datetimerange'
      | 'daterange'
      | 'monthrange'
      | 'yearrange' = 'date';

    @Prop({
      group: '主要属性',
      title: '最小日期',
      description: '最小日期',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('datetime'),
    })
    minDate: nasl.core.Date;

    @Prop({
      group: '主要属性',
      title: '最大日期',
      description: '最大日期',
      setter: { concept: 'InputSetter' },
    })
    maxDate: nasl.core.Date;

    @Prop({
      group: '主要属性',
      title: '显示在输入框中的格式',
      description: '显示在输入框中的格式',
      setter: {
        concept: 'InputSetter',
        autoClear: true,
      },
    })
    format: nasl.core.String = 'YYYY-MM-DD';

    @Prop({
      group: '主要属性',
      title: '选择范围时的分隔符',
      description: '选择范围时的分隔符',
      setter: { concept: 'InputSetter' },
    })
    rangeSeparator: nasl.core.String = '-';

    @Prop({
      group: '主要属性',
      title: '绑定值的格式',
      description: '可选，绑定值的格式，例如：YYYY-MM-DD。 不指定则绑定值为 Date 对象',
      setter: { concept: 'InputSetter' },
    })
    valueFormat: nasl.core.String='YYYY-MM-DD';

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'dateFormat'>({
      group: '主要属性',
      title: '下拉列表中显示的日期格式',
      description: '可选，时间选择器下拉列表中显示的日期格式',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('datetime'),
    })
    dateFormat: nasl.core.String;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'timeFormat'>({
      group: '主要属性',
      title: '下拉列表中显示的时间格式',
      description: '可选，时间选择器下拉列表中显示的时间格式',
      setter: { concept: 'InputSetter' },
      if: (_) => _.type.includes('datetime'),
    })
    timeFormat: nasl.core.String;

    @Prop<ElDatePickerOptions<T, V, P, M, C>, 'unlinkPanels'>({
      group: '主要属性',
      title: '取消两个日期面板之间的联动',
      description: '在范围选择器里取消两个日期面板之间的联动',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.type.includes('range'),
    })
    unlinkPanels: nasl.core.Boolean = false;

    @Prop({
      title: '前缀图标',
      description: '前缀图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    prefixIconName: nasl.core.String;

    @Prop({
      title: '清除图标',
      description: '自定义清除图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    clearIconName: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '表单验证',
      description: '是否触发表单验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '将下拉列表插入至 body 元素',
      description: '是否将 date-picker 的下拉列表插入至 body 元素',
      setter: { concept: 'SwitchSetter' },
    })
    teleported: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '清空选项的值',
    //   description: '清空选项的值',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueOnClear: nasl.core.Decimal | null;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tooltip 可用的 positions',
    //   description: 'Tooltip 可用的 positions',
    //   setter: {
    //     concept: 'InputSetter',
    //   },
    // })
    // fallbackPlacements: Array<
    //   | 'top'
    //   | 'top-start'
    //   | 'top-end'
    //   | 'bottom'
    //   | 'bottom-start'
    //   | 'bottom-end'
    //   | 'left'
    //   | 'left-start'
    //   | 'left-end'
    //   | 'right'
    //   | 'right-start'
    //   | 'right-end'
    // >;

    @Prop({
      group: '主要属性',
      title: '位置',
      description: '下拉框出现的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '上边' },
          { title: '上左' },
          { title: '上右' },
          { title: '下边' },
          { title: '下左' },
          { title: '下右' },
          { title: '左边' },
          { title: '左上' },
          { title: '左下' },
          { title: '右边' },
          { title: '右上' },
          { title: '右下' },
        ],
      },
    })
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end' = 'bottom';

    @Event({
      title: '值改变时',
      description: '用户确认选定的值时触发',
    })
    onChange: (modelValue: M extends true ? nasl.collection.List<nasl.core.Date> : nasl.core.Date) => void;

    @Event({
      title: '失去焦点时',
      description: '在组件 Input 失去焦点时触发',
    })
    onBlur: (event: FocusEvent) => void;

    @Event({
      title: '获得焦点时',
      description: '在组件 Input 获得焦点时触发',
    })
    onFocus: (event: FocusEvent) => void;

    @Event({
      title: '清空时',
      description: '可清空的模式下用户点击清空按钮时触发',
    })
    onClear: (event: any) => void;

    @Event({
      title: '日历所选日期更改时',
      description: '在日历所选日期更改时触发',
    })
    onCalendarChange: (modelValue: nasl.core.Date | nasl.collection.List<nasl.core.Date>) => void;

    @Event({
      title: '日期面板改变时',
      description: '当日期面板改变时触发',
    })
    onPanelChange: (date: nasl.core.Date | nasl.collection.List<nasl.core.Date>, view?: nasl.core.String) => void;

    @Event({
      title: '下拉列表出现/消失时',
      description: '当 DatePicker 的下拉列表出现/消失时触发',
    })
    onVisibleChange: (visibility: nasl.core.Boolean) => void;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      ignoreProperty: ['rules'],
      bindStyleAttr: 'inputStyle',
      bindStyleSelector: '.__cw-form-compose-input',
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      forceUpdateWhenAttributeChange: true,
      namedSlotOmitWrapper: ['label'],
    },
    extends: [
      {
        name: 'ElFormItemPro',
        excludes: ['slotDefault'],
      },
      {
        name: 'ElDatePicker',
      },
    ],
  })
  @Component({
    title: '表单日期选择器',
    description: '表单日期选择器',
    group: 'Form',
  })
  export class ElFormDatePicker<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponent {
    constructor(
      options?: Partial<
        ElFormDatePickerOptions<T, V, P, M, C> &
          ElFormItemProOptions &
          Omit<ElDatePickerOptions<T, V, P, M, C>, keyof ElFormItemProOptions>
      >,
    ) {
      super();
    }
  }

  export class ElFormDatePickerOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {}
}
