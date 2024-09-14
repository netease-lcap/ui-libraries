/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: "> .el-p-tree__list .el-p-tree__item",
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源'
        }
      }
    }
  })
  @Component({
    title: '树形视图',
    icon: 'tree-view-new',
    description: '用于承载有父子关系的结构化内容，提供内容层级的展示。',
    group: 'Selector',
  })
  export class ElTreePro<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<ElTreeProOptions<T, V, M>>) {
      super();
    }

    @Prop({
      title: '选中值',
    })
    value: ElTreeProOptions<T, V, M>['value'];

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
  }

  export class ElTreeProOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '值',
      description: '选中值',
      setter: { concept: 'InputSetter' },
    })
    value: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      group: '交互属性',
      title: '可多选',
      description: '是否显示可选框',
      setter: { concept: 'SwitchSetter' },
    })
    checkable: M = false as M;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值，组件为可选状态时有效。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    private defaultValue: any[] = [];

    // @Prop({
    //   group: '主要属性',
    //   sync: true,
    //   title: '高亮节点值',
    //   description: '高亮的节点值。',
    //   setter: { concept: 'InputSetter' },
    // })
    // actived: nasl.collection.List<V>;

    // @Prop<ElTreeProOptions<T, V, M>, 'activable'>({
    //   group: '交互属性',
    //   title: '可高亮',
    //   description: '节点是否可高亮，仅单选时支持配置生效',
    //   setter: { concept: 'SwitchSetter' },
    //   if: _ => !_.checkable,
    // })
    // activable: nasl.core.Boolean = false;

    // @Prop<ElTreeProOptions<T, V, M>, 'activeMultiple'>({
    //   group: '主要属性',
    //   title: '多个节点同时高亮',
    //   description: '是否允许多个节点同时高亮',
    //   setter: { concept: 'SwitchSetter' },
    //   if: _ => !!_.activable,
    // })
    // activeMultiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Allow Drop',
      description: '判断节点是否可以执行 drop 操作，泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    private allowDrop: any;

    @Prop({
      group: '主要属性',
      title: '允许在过滤时折叠节点',
      description: '是否允许在过滤时折叠节点',
      setter: { concept: 'SwitchSetter' },
    })
    allowFoldNodeOnFilter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Check Props',
      description: '透传属性到 checkbox 组件。参考 checkbox 组件 API。',
      setter: { concept: 'InputSetter' },
    })
    private checkProps: object;

    @Prop({
      group: '主要属性',
      title: '严格模式',
      description: '父子节点选中状态不再关联，可各自选中或取消',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '树数据',
      designerValue: [{}, {}, {}]
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List\<T>后，会自动识别T的类型并进行展示',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '值字段',
      setter: { concept: 'PropertySelectSetter' },
    })
    valueField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '父级值字段',
      description: '如果数据源是平铺结构，需要指定父级字段',
      docDescription:
        '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '子级值字段',
      description: '如果数据源是树形结构，需要指定子级字段，默认为children',
      docDescription: '集合的元素类型中，用于标识子节点的属性',
      setter: { concept: 'PropertySelectSetter' },
    })
    childrenField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: { concept: 'PropertySelectSetter' },
    })
    textField: (item: T) => any;

    @Prop({
      group: '交互属性',
      title: '禁用复选框',
      description: '禁用复选框，可支持禁用不同的行。',
      setter: { concept: 'SwitchSetter' },
    })
    disableCheck: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '禁用',
      description: '是否禁用树操作',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Draggable',
      description: '节点是否可拖拽',
      setter: { concept: 'SwitchSetter' },
    })
    private draggable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '空态文本',
      description: '数据为空时展示的文本。',
      setter: { concept: 'InputSetter' },
    })
    empty: nasl.core.String = '';

    @Prop({
      group: '交互属性',
      title: '展开全部节点',
      description: '是否展开全部节点',
      setter: { concept: 'SwitchSetter' },
    })
    expandAll: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '默认展开的级别',
      description: '默认展开的级别，第一层为 0',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
    })
    expandLevel: nasl.core.Decimal = 0;

    @Prop({
      group: '交互属性',
      title: '手风琴效果',
      description: '同级别展开互斥，手风琴效果',
      setter: { concept: 'SwitchSetter' },
    })
    expandMutex: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '点击节点支持展开收起',
      description: '是否支持点击节点也能展开收起',
      setter: { concept: 'SwitchSetter' },
    })
    expandOnClickNode: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '自动展开父节点',
      description: '展开子节点时是否自动展开父节点',
      setter: { concept: 'SwitchSetter' },
    })
    expandParent: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '展开的节点值',
      description: '展开的节点值。',
      setter: { concept: 'InputSetter' },
    })
    expanded: nasl.collection.List<V> = [];

    @Prop({
      group: '主要属性',
      title: '节点过滤',
      description: '节点过滤方法，只呈现返回值为 true 的节点。',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    filter: (node: {
      actived: boolean;
      checked: boolean;
      data: T;
      disabled: boolean;
      expanded: boolean;
      indeterminate: boolean;
      loading: boolean;
    }) => nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '树高度',
      description:
        '树的高度，超出后会出现滚动条。示例：100,  "30%",  "300"。值为数字类型，会自动加上单位 px。如果不是绝对固定树的高度，建议使用 `maxHeight`',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '交互属性',
      title: '悬浮状态',
      description: '节点是否有悬浮状态',
      setter: { concept: 'SwitchSetter' },
    })
    hover: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '节点图标',
      description: '节点图标，可自定义。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Keys',
      description:
        '用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: "key", label "name", children: "list" }`。其中，disabled 待开发。。',
      setter: { concept: 'InputSetter' },
    })
    private keys: object;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description:
        '自定义节点内容，值为 `false` 不显示，值为 `true` 显示默认 label，值为字符串直接输出该字符串。泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    private label: any = true;

    @Prop({
      group: '主要属性',
      title: '延迟加载',
      description:
        '延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载',
      setter: { concept: 'SwitchSetter' },
    })
    private lazy: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '连接线',
      description:
        '是否显示连接线。',
      setter: { concept: 'SwitchSetter' },
    })
    line: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Load',
      description:
        '加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    private load: any;

    @Prop({
      group: '样式属性',
      title: '最大高度',
      description:
        '树的最大高度，超出后会出现滚动条。示例：100, "30%", "300"。值为数字类型，会自动加上单位 px',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Scroll',
      description:
        '懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`。',
      setter: { concept: 'InputSetter' },
    })
    private scroll: object;

    @Prop({
      group: '交互属性',
      title: '过渡动画',
      description: '节点展开折叠时是否使用过渡动画',
      setter: { concept: 'SwitchSetter' },
    })
    transition: nasl.core.Boolean = true;

    @Prop<ElTreeProOptions<T, V, M>, 'valueMode'>({
      group: '主要属性',
      title: '选中值模式',
      description:
        '选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'onlyLeaf' },
          { title: 'parentFirst' },
          { title: 'all' },
        ],
      },
      if: _ => _.checkable,
    })
    valueMode: 'onlyLeaf' | 'parentFirst' | 'all' = 'onlyLeaf';

    // @Event({
    //   title: '节点激活时',
    //   description: '节点激活时触发，泛型 `T` 表示树节点 ',
    // })
    // onActive: (value: V) => any;

    @Event({
      title: '改变时',
      description:
        '节点选中状态变化时触发',
    })
    onChange: (value: M extends true ? nasl.collection.List<V> : V) => any;

    @Event({
      title: '节点点击时',
      description: '节点点击时触发，泛型 `T` 表示树节点 ',
    })
    onClick: (event: any) => any;

    // @Event({
    //   title: 'On Drag End',
    //   description: '节点结束拖拽时触发，泛型 `T` 表示树节点 ',
    // })
    // onDragEnd: (event: any) => any;

    // @Event({
    //   title: 'On Drag Leave',
    //   description: '节点拖拽时离开目标元素时触发，泛型 `T` 表示树节点 ',
    // })
    // onDragLeave: (event: any) => any;

    // @Event({
    //   title: 'On Drag Over',
    //   description: '节点拖拽到目标元素时触发，泛型 `T` 表示树节点 ',
    // })
    // onDragOver: (event: any) => any;

    // @Event({
    //   title: 'On Drag Start',
    //   description: '节点开始拖拽时触发，泛型 `T` 表示树节点 ',
    // })
    // onDragStart: (event: any) => any;

    // @Event({
    //   title: 'On Drop',
    //   description: '节点在目标元素上释放时触发，泛型 `T` 表示树节点 ',
    // })
    // onDrop: (event: any) => any;

    @Event({
      title: '节点展开或收起时',
      description: '节点展开或收起时触发',
    })
    onExpand: (event: any) => any;

    // @Event({
    //   title: 'On Load',
    //   description: '异步加载后触发，泛型 `T` 表示树节点 ',
    // })
    // onLoad: (event: any) => any;

    // @Event({
    //   title: 'On Scroll',
    //   description: '滚动事件',
    // })
    // onScroll: (event: any) => any;

    // @Slot({
    //   title: 'Empty',
    //   description: '数据为空时展示的文本。',
    // })
    // slotEmpty: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Icon',
    //   description: '节点图标，可自定义。',
    // })
    // slotIcon: () => Array<ViewComponent>;

    @Slot({
      title: '自定义节点内容',
      description:
        '自定义节点内容',
    })
    slotLeaf: (current: Current<T>) => Array<ViewComponent>;

    // @Slot({
    //   title: 'Line',
    //   description:
    //     '连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线。',
    // })
    // slotLine: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Operations',
    //   description: '自定义节点操作项',
    // })
    // slotOperations: () => Array<ViewComponent>;
  }
}
