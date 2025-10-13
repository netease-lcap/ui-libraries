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
    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
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

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;


    @Prop({
      group: '主要属性',
      title: '禁用组件',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '无选项时显示的文字',
      description: '无选项时显示的文字，默认是 “No data”',
      setter: { concept: 'InputSetter' },
    })
    noDataText: nasl.core.String = 'No data';


    @Prop({
      group: '主要属性',
      title: '是否可搜索',
      description:
        '是否可搜索，默认搜索规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;


    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'descriptionField'>({
      group: '数据属性',
      title: '描述字段',
      description: '集合的元素类型中，用于显示描述的属性名称',
      docDescription: '集合的元素类型中，用于显示描述的属性名称，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    descriptionField: (item: T) => any = ((item: any) => item.description) as any;

    @Prop({
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: M extends true ? nasl.collection.List<V> :V 

    @Prop({
      group: '主要属性',
      title: '是否多选',
      description: '是否允许多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: M = false as any;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'collapseTags'>({
      group: '主要属性',
      title: '是否折叠标签',
      description: '是否折叠标签',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !!_.multiple,
    })
    collapseTags: nasl.core.Boolean = false;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'collapseTagsTooltip'>({
      group: '主要属性',
      title: '是否折叠标签提示',
      description: '是否折叠标签提示',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !!_.collapseTags,
    })
    collapseTagsTooltip: nasl.core.Boolean = false;


    @Prop({
      group: '主要属性',
      title: '是否虚拟滚动',
      description: '是否开启虚拟滚动,虚拟滚动仅支持数据源',
      setter: { concept: 'SwitchSetter' },
    })
    virtualize: nasl.core.Boolean = false;


    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;


    @Prop({
      group: '主要属性',
      title: '组件尺寸',
      description: '组件尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';


    @Event({
      title: '选中值变化时',
      description:
        '选中值变化时触发。`context.trigger` 表示触发变化的来源；`context.selectedOptions` 表示选中值的完整对象，数组长度一定和 `value` 相同；`context.option` 表示当前操作的选项，不一定存在。',
    })
    onChange: (event: {
      value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;
      option: T;
      selectedOptions: T[];
      trigger: 'clear' | 'tag-remove' | 'backspace' | 'check' | 'uncheck' | 'default';
    }) => any;

    @Event({
      title: '清空时',
      description: '清空时触发',
    })
    onClear: (event: any) => any;



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
        excludes: [
          'slotDefault',
        ],
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
