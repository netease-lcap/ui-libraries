/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '级联选择器',
    icon: 'cascader',
    description: '',
    group: 'Selector',
  })
  export class ElCascaderPro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponent {
    constructor(options?: Partial<ElCascaderProOptionso<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElCascaderProOptionso<
    T,
    V,
    P,
    M,
    C,
  > extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '无边框模式',
      description: '无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Check Props',
    //   description: '参考 checkbox 组件 API。',
    //   setter: { concept: 'InputSetter' },
    // })
    // checkProps: object;

    @Prop({
      group: '主要属性',
      title: '父子不关联',
      description: '父子节点选中状态不再关联，可各自选中或取消',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可清空',
      description: '是否支持清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '无数据内容',
      description: '无匹配选项时的内容，默认全局配置为 "暂无数据"。',
      setter: { concept: 'InputSetter' },
    })
    empty: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filter',
    //   description:
    //     '自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。',
    //   setter: { concept: 'InputSetter' },
    // })
    // filter: any;

    @Prop({
      group: '主要属性',
      title: 'Filterable',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop<ElCascaderProOptionso<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription:
        '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.label) as any;

    @Prop<ElCascaderProOptionso<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElCascaderProOptionso<T, V, P, M, C>, 'childrenField'>({
      group: '数据属性',
      title: '子级值字段',
      description: '树形数据子节点字段名，默认为children',
      docDescription: '树形数据子节点字段名，默认为children',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    childrenField: (item: T) => nasl.collection.List<any> = ((item: any) =>
      item.children) as any;

    @Prop({
      group: '数据属性',
      title: '父级值字段',
      description: '集合的元素类型中，用于标识父节点的属性',
      docDescription:
        '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    parentField: (item: T) => any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Input Props',
    //   description: '透传 Input 输入框组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // inputProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Keys',
    //   description:
    //     '用来定义 value / label / children / disabled 在 `options` 中对应的字段别名。',
    //   setter: { concept: 'InputSetter' },
    // })
    // keys: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Label',
    //   description: '左侧文本。',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Lazy',
    //   description:
    //     '延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // lazy: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Load',
    //   description: '加载子树数据的方法（仅当节点 children 为 true 时生效）。',
    //   setter: { concept: 'InputSetter' },
    // })
    // load: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Loading',
    //   description: '是否为加载状态',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // loading: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Loading Text',
    //   description: '远程加载时显示的文字，支持自定义。如加上超链接。',
    //   setter: { concept: 'InputSetter' },
    // })
    // loadingText: any;

    @Prop({
      group: '主要属性',
      title: '多选数量',
      description: '用于控制多选数量，值为 0 则不限制',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '最小折叠数量',
      description:
        '最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      setter: { concept: 'NumberInputSetter' },
    })
    minCollapsedNum: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '是否多选',
      description: '是否允许多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Options',
    //   description: '可选项数据源。',
    //   setter: { concept: 'InputSetter' },
    // })
    // options: any[] = [];

    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popup Props',
    //   description: '参考 popup 组件 API。',
    //   setter: { concept: 'InputSetter' },
    // })
    // popupProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popup Visible',
    //   description: '是否显示下拉框',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // popupVisible: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态，值为真会隐藏输入框，且无法打开下拉框',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Reserve Keyword',
    //   description: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // reserveKeyword: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Select Input Props',
    //   description: '透传 SelectInput 筛选器输入框组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // selectInputProps: object;

    @Prop({
      group: '主要属性',
      title: '使用完整路径',
      description: '选中值使用完整路径，输入框在单选时也显示完整路径',
      setter: { concept: 'SwitchSetter' },
    })
    showAllLevels: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '组件尺寸。可选项：large/medium/small。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'large' }, { title: 'medium' }, { title: 'small' }],
      },
    })
    size: 'large' | 'medium' | 'small' = 'medium';

    @Prop({
      group: '主要属性',
      title: '输入框状态',
      description: '输入框状态。可选项：default/success/warning/error',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'default' },
          { title: 'success' },
          { title: 'warning' },
          { title: 'error' },
        ],
      },
    })
    status: 'default' | 'success' | 'warning' | 'error' = 'default';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Suffix',
    //   description: '后置图标前的后置内容。',
    //   setter: { concept: 'InputSetter' },
    // })
    // suffix: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tag Input Props',
    //   description: '透传 TagInput 标签输入框组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tagInputProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tag Props',
    //   description: '透传 Tag 标签组件全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tagProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tips: any;

    @Prop({
      group: '主要属性',
      title: '展开下一层级的方式',
      description: '展开下一层级的方式。可选项：click/hover',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'click' }, { title: 'hover' }],
      },
    })
    trigger: 'click' | 'hover' = 'click';

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选中项的值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中项的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.String | nasl.core.Decimal | any[] = [];

    // @Prop({
    //   group: '主要属性',
    //   title: 'Value Display',
    //   description: '自定义选中项呈现的内容。',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueDisplay: any;

    @Prop({
      group: '主要属性',
      title: '选中值模式',
      description:
        '选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaf 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '叶子节点' },
          { title: '仅父节' },
          { title: '父节点和子节' },
        ],
      },
    })
    valueMode: 'onlyLeaf' | 'parentFirst' | 'all' = 'onlyLeaf';

    @Prop({
      group: '主要属性',
      title: '选中值的类型',
      description:
        '用于控制选中值的类型。single 表示输入输出值为 叶子结点值， full 表示输入输出值为全路径。可选项：single/full',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'single' }, { title: 'full' }],
      },
    })
    valueType: 'single' | 'full' = 'single';

    // @Event({
    //   title: 'On Blur',
    //   description: '当输入框失去焦点时触发',
    // })
    // onBlur: (event: any) => any;

    @Event({
      title: '值变化',
      description:
        '选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源。',
    })
    onChange: (event: any) => any;

    // @Event({
    //   title: 'On Focus',
    //   description: '获得焦点时触发',
    // })
    // onFocus: (event: any) => any;

    // @Event({
    //   title: 'On Popup Visible Change',
    //   description: '下拉框显示或隐藏时触发。',
    // })
    // onPopupVisibleChange: (event: any) => any;

    // @Event({
    //   title: 'On Remove',
    //   description: '多选模式下，选中数据被移除时触发。',
    // })
    // onRemove: (event: any) => any;

    // @Slot({
    //   title: 'Collapsed Items',
    //   description:
    //     '多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。',
    // })
    // slotCollapsedItems: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Empty',
    //   description: '无匹配选项时的内容，默认全局配置为 "暂无数据"。',
    // })
    // slotEmpty: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Label',
    //   description: '左侧文本。',
    // })
    // slotLabel: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Loading Text',
    //   description: '远程加载时显示的文字，支持自定义。如加上超链接。',
    // })
    // slotLoadingText: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Option',
    //   description: '自定义单个级联选项。',
    // })
    // slotOption: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Suffix',
    //   description: '后置图标前的后置内容。',
    // })
    // slotSuffix: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Suffix Icon',
    //   description: '组件后置图标。',
    // })
    // slotSuffixIcon: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    // })
    // slotTips: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Value Display',
    //   description: '自定义选中项呈现的内容。',
    // })
    // slotValueDisplay: () => Array<ViewComponent>;
  }
}
