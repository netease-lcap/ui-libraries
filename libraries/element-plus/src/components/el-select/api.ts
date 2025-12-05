/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-option'",
      events: {
        click: true,
      },
      displaySlotConditions: {
        value:
          "!!this.getAttribute('dataSource') && this.getAttribute('valueIsSlot') && this.getAttribute('valueIsSlot').value",
        option:
          "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value",
      },
      slotWrapperInlineStyle: {
        option: 'width:100%;',
      },
      slotInlineStyle: {
        option: 'min-height: 0;',
        value: 'min-height: 0;',
      },
      additionalAttribute: {
        valueField: '"value"',
        textField: '"text"',
        '@blur': '"($event)=>{throw \'stop blur!\'}"',
      },
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 3,
        loopRule: 'nth-last-child(-n+2)',
        loopElem: 'li.el-p-select-option',
        displayData: "\"[{value: '', text: ' '},{value:'1', text: ' '}, {value:'2', text: ' '}]\"",
        propertyName: ':dataSource',
      },
    },
  })
  @Component({
    title: '选择器',
    icon: 'select',
    description: '',
    group: 'Selector',
  })
  export class ElSelect<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;

    @Prop({
      title: '数据总数',
    })
    total: nasl.core.Integer;

    @Prop({
      title: '选中值',
    })
    modelValue: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      title: '过滤文本',
    })
    filterText: nasl.core.String;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    @Method({
      title: '切换弹出/关闭状态',
      description: '切换弹出/关闭状态',
    })
    toggleMenu(): void {}

    constructor(options?: Partial<ElSelectOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElSelectOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '设置选择器的数据来源，支持绑定集合类型变量或返回集合的逻辑',
      docDescription:
        '可以绑定 List<T> 类型的变量，或者绑定返回 List<T> 类型的逻辑。当使用数据源时，选择器会根据数据动态生成选项，每个数据项对应一个选项。',
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源中每个数据项的类型定义，用于类型推导和属性选择',
      docDescription: '此属性为只读，当绑定数据源后会自动识别数据项的类型T，用于在插槽中提供类型提示和属性选择器。',
    })
    dataSchema: T;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '指定数据项中哪个字段作为选项的显示文本',
      docDescription:
        '当使用数据源时，需要指定数据项中的哪个属性作为选项的显示文本。例如：如果数据项有name字段，则选择name作为文本字段。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '指定数据项中哪个字段作为选项的值',
      docDescription:
        '当使用数据源时，需要指定数据项中的哪个属性作为选项的值。此值用于判断哪个选项被选中，以及触发相关事件时传递的参数。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'descriptionField'>({
      group: '数据属性',
      title: '描述字段',
      description: '指定数据项中哪个字段作为选项的描述文本',
      docDescription:
        '当使用数据源时，可以指定数据项中的哪个属性作为选项的描述文本。描述文本通常显示在选项文本下方，提供额外的说明信息。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    descriptionField: (item: T) => any = ((item: any) => item.description) as any;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'optionSlot'>({
      group: '数据属性',
      title: '选项插槽',
      description: '自定义选项内容',
      docDescription: '自定义选项内容',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => !!_.dataSource,
    })
    optionSlot: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '当前选中的选项值，支持双向绑定',
      docDescription:
        '绑定当前选中的选项值。单选模式下为单个值，多选模式下为数组。当用户选择或取消选择时，此值会自动更新。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      group: '数据属性',
      title: '选中值完整数据',
      description: '当前选中值的不在数据源中时，需要使用该字段回显选择框内数据。完整数据对象',
      docDescription:
        '当前选中值的不在数据源中时，需要使用此字段来回显选择框内的完整数据。包含选中选项的标签和值信息。',
    })
    selectedValuesData: nasl.collection.List<{ label: nasl.core.String; value: V }>;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '多选模式',
      description: '是否允许多选选项',
      docDescription: '开启后，用户可以选择多个选项。多选模式下，选中值会以数组形式存储，选择框会显示多个标签。',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: M = false as any;

    @Prop({
      group: '主要属性',
      title: '最大选中数',
      description: '最大选中数',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => !!_.multiple,
    })
    maxCount: nasl.core.Integer = 0;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'collapseTags'>({
      group: '主要属性',
      title: '折叠标签',
      description: '多选时是否折叠显示标签',
      docDescription: '开启后，当选择多个选项时，会折叠显示标签，只显示部分标签和"+N"的形式。适用于选择项较多的情况。',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !!_.multiple,
    })
    collapseTags: nasl.core.Boolean = false;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'collapseTagsTooltip'>({
      group: '主要属性',
      title: '折叠提示',
      description: '折叠标签时是否显示提示信息',
      docDescription: '开启后，当标签被折叠时，鼠标悬停在"+N"上会显示所有选中选项的提示信息。',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !!_.collapseTags,
    })
    collapseTagsTooltip: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '虚拟滚动',
      description: '是否开启虚拟滚动优化',
      docDescription:
        '开启后，当选项数量很多时会使用虚拟滚动技术，只渲染可见区域的选项，提高性能。仅在使用数据源时有效。',
      setter: { concept: 'SwitchSetter' },
    })
    virtualize: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '选择框为空时显示的提示文本',
      docDescription: '设置选择框为空时显示的占位符文本，用于提示用户进行选择操作。',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '组件尺寸',
      description: '选择器组件的尺寸大小',
      docDescription: '控制选择器组件的整体尺寸。小：紧凑型选择器；正常：标准尺寸；大：宽松型选择器。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '无数据文本',
      description: '没有选项时显示的文字',
      docDescription: '当下拉列表中没有选项时显示的文字，用于提示用户当前没有可选择的选项。默认为"No data"。',
      setter: { concept: 'InputSetter' },
    })
    noDataText: nasl.core.String = 'No data';

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '选择框右侧显示的图标',
      docDescription: '设置选择框右侧显示的图标，通常用于表示操作或状态。支持从图标库中选择或使用自定义图标。',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    suffixIcon: nasl.core.String;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '可清空',
      description: '是否允许清空已选择的选项',
      docDescription: '开启后，选择框会显示清空按钮，用户可以点击清空所有已选择的选项。',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可搜索',
      description: '是否允许搜索选项',
      docDescription:
        '开启后，用户可以在选择框中输入文字来搜索选项。默认搜索规则不区分大小写，支持全文本任意位置匹配。',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'remote'>({
      group: '交互属性',
      title: '远程搜索',
      description: '是否开启远程搜索',
      docDescription: '开启后，组件不会过滤选项，而是改变当前组件.filterText属性，用户自行实现搜索逻辑。',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !!_.filterable,
    })
    remote: nasl.core.Boolean = false;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用选择器组件',
      docDescription: '开启后，选择器将变为禁用状态，用户无法进行任何操作。禁用状态下选择器会显示为灰色。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Event({
      title: '选中值变化时',
      description: '选中值变化时触发。',
    })
    onChange: (event: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V) => any;

    @Event({
      title: '清空时',
      description: '清空时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: '搜索前',
      description: '可搜索输入框，在输入搜索文字时',
    })
    onBeforeFilter: (event: { filterText: nasl.core.String }) => any;

    @Event({
      title: '数据加载前触发',
      description: '数据加载前触发',
    })
    onBefore: () => any;

    @Event({
      title: '数据加载前触发',
      description: '数据加载前触发',
    })
    onSuccess: () => any;

    @Event({
      title: '下拉框显示或隐藏时',
      description: '下拉框显示或隐藏时触发',
    })
    onVisibleChange: (event: any) => any;

    @Event({
      title: '失去焦点时',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '获得焦点时',
      description: '获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Slot({
      title: '单选项内容',
      description: '单选项内容',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: '选项',
          code: '<el-option value="1" label="选项"><el-text text="选项" /></el-option>',
        },
        {
          title: '选项组',
          code: `<el-option-group label="选项组">
                  <el-option value="1" label="选项">
                    <el-text text="选项" />
                  </el-option>
                </el-option-group>`,
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-option'",
    },
  })
  @Component({
    title: '选项组',
    icon: 'option-group',
    description: '',
    group: 'Selector',
  })
  export class ElOptionGroup extends ViewComponent {
    constructor(options?: Partial<ElOptionGroupOptions>) {
      super();
    }
  }
  export class ElOptionGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '选项组标题',
      description: '选项组标题',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Slot({
      title: '选项组内容',
      description: '选项组内容',
      snippets: [
        {
          title: '选项',
          code: '<el-option value="1" label="选项"><el-text text="选项" /></el-option>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    show: true,
    ideusage: {
      parentAccept: "target.tag.endsWith('el-select')",
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      //   structured: true,
      //   selector: {
      //     expression: 'this',
      //     cssSelector: '.el-p-select-option',
      //   },
    },
  })
  @Component({
    title: '选择器选项',
    icon: 'option',
    description: '',
    group: 'Selector',
  })
  export class ElOption<T, V> extends ViewComponent {
    constructor(options?: Partial<ElOptionOptions<T, V>>) {
      super();
    }
  }

  export class ElOptionOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否禁用该选项',
      description: '是否禁用该选项',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '选项标题',
      description: '选项标题，在选项过长时hover选项展示',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '选项值',
      description: '选项值',
      setter: { concept: 'InputSetter' },
    })
    value: V;

    @Prop({
      group: '主要属性',
      title: '选项名称',
      description: '选项名称, 选中后显示内容',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal;

    @Slot({
      title: '选项内容',
      description: '用于定义复杂的选项内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      bindStyleSelector: '.__cw-form-compose-input',
      structured: true,
      childAccept: "target.tag === 'el-option'",
      events: {
        click: true,
      },
      displaySlotConditions: {
        value:
          "!!this.getAttribute('dataSource') && this.getAttribute('valueIsSlot') && this.getAttribute('valueIsSlot').value",
        option:
          "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value",
      },
      slotWrapperInlineStyle: {
        option: 'width:100%;',
        label: 'display: inline-block;',
      },
      slotInlineStyle: {
        option: 'min-height: 0;',
        value: 'min-height: 0;',
      },
      additionalAttribute: {
        valueField: '"value"',
        textField: '"text"',
        '@blur': '"($event)=>{throw\'stop blur!\'}"',
      },
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 3,
        loopRule: 'nth-last-child(-n+2)',
        loopElem: 'li.el-p-select-option',
        displayData: "\"[{value: '', text: ' '},{value:'1', text: ' '}, {value:'2', text: ' '}]\"",
        propertyName: ':dataSource',
      },
      ignoreProperty: ['rules'],
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
    },
    extends: [
      {
        name: 'ElFormItemPro',
        excludes: ['slotDefault'],
      },
      {
        name: 'ElSelect',
      },
    ],
  })
  @Component({
    title: '表单选择器',
    description: '表单选择器',
    group: 'Form',
  })
  export class ElFormSelect<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(
      options?: Partial<
        ElFormSelectOptions<T, V, P, M, C> &
          ElFormItemProOptions &
          Omit<ElSelectOptions<T, V, P, M, C>, keyof ElFormItemProOptions>
      >,
    ) {
      super();
    }
  }

  export class ElFormSelectOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {}
}
