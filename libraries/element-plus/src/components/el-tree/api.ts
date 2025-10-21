/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'container',
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: '> .el-p-tree__list .el-p-tree__item',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '"请绑定数据源"',
        },
      },
    },
  })
  @Component({
    title: '树形视图',
    icon: 'tree-view-new',
    description: '用于承载有父子关系的结构化内容，提供内容层级的展示。',
    group: 'Selector',
  })
  export class ElTree<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<ElTreeOptions<T, V, M>>) {
      super();
    }

    // @Prop({
    //   title: '选中值',
    // })
    // value: ElTreeOptions<T, V, M>['value'];

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
    // @Method({
    //   title: '获取节点',
    //   description: '通过 key 或 data 获取节点',
    // })
    // getNode(data: T | V): any { return null; }

    // @Method({
    //   title: '获取当前选中节点',
    //   description: '获取当前选中节点的数据',
    // })
    // getCurrentNode(): any { return null; }

    // @Method({
    //   title: '设置当前选中节点',
    //   description: '通过 key 或 data 设置当前选中节点',
    // })
    // setCurrentNode(data: T | V): void {}

    // @Method({
    //   title: '设置节点是否选中',
    //   description: '通过 key 或 data 设置节点是否选中',
    // })
    // setChecked(data: T | V, checked: nasl.core.Boolean, deep: nasl.core.Boolean): void {}

    // @Method({
    //   title: '获取选中节点',
    //   description: '如果节点可以被选中，则返回目前选中的节点数据数组',
    // })
    // getCheckedNodes(): any { return null; }

    // @Method({
    //   title: '获取半选中节点',
    //   description: '如果节点可以被选中，则返回目前半选中的节点数据数组',
    // })
    // getHalfCheckedNodes(): any { return null; }

    // @Method({
    //   title: '展开指定节点',
    //   description: '展开指定节点的所有子节点',
    // })
    // expandNode(data: T | V): void {}

    // @Method({
    //   title: '折叠指定节点',
    //   description: '折叠指定节点的所有子节点',
    // })
    // collapseNode(data: T | V): void {}

    // @Method({
    //   title: '过滤节点',
    //   description: '对树节点进行筛选操作',
    // })
    // filter(query: nasl.core.String): void {}
  }

  export class ElTreeOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '树形结构的数据来源',
      docDescription: '设置树形结构的数据来源，支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构类型',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示说明。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '用于标识树节点的唯一值字段',
      docDescription: '集合的元素类型中，用于标识树节点唯一值的属性名称，支持自定义变更。',
      setter: { concept: 'PropertySelectSetter' },
    })
    valueField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '用于显示树节点文本的字段',
      docDescription: '集合的元素类型中，用于显示树节点文本的属性名称，支持自定义变更。',
      setter: { concept: 'PropertySelectSetter' },
    })
    textField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '父级字段',
      description: '用于标识父级节点的字段',
      docDescription: '如果数据源是平铺结构，需要指定父级字段来构建树形结构。',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => V;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '选中值',
      description: '当前选中的树节点值',
      docDescription: '绑定当前选中的树节点值。单选模式下为单个值，多选模式下为数组。支持双向绑定。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      group: '状态属性',
      title: '默认值',
      description: '树节点的初始默认选中值',
      docDescription: '设置树节点的初始默认选中值。此属性为非受控属性，仅在组件初始化时生效。',
      setter: { concept: 'InputSetter' },
    })
    private defaultValue: any[] = [];

    @Prop({
      group: '状态属性',
      title: '默认展开',
      description: '默认展开的节点标识数组',
      docDescription: '设置默认展开的节点标识数组，用于控制哪些节点在初始化时处于展开状态。仅首次生效。',
      setter: { concept: 'InputSetter' },
    })
    defaultExpandedKeys: nasl.collection.List<V> = [];

    @Prop({
      group: '状态属性',
      title: '默认选中',
      description: '默认选中的节点标识数组',
      docDescription: '设置默认选中的节点标识数组，用于控制哪些节点在初始化时处于选中状态。仅首次生效。',
      setter: { concept: 'InputSetter' },
    })
    defaultCheckedKeys: nasl.collection.List<V> = [];

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '无数据文本',
      description: '树为空时显示的提示文本',
      docDescription: '当树形结构没有数据时显示的提示文本，用于引导用户操作。',
      setter: { concept: 'InputSetter' },
    })
    emptyText: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '高亮当前',
      description: '是否高亮当前选中节点',
      docDescription: '开启后，当前选中的节点会以高亮样式显示，便于用户识别当前操作对象。',
      setter: { concept: 'SwitchSetter' },
    })
    highlightCurrent: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '节点缩进',
      description: '相邻级节点间的水平缩进距离',
      docDescription: '设置相邻级节点间的水平缩进距离，单位为像素。数值越大，层级关系越明显。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
    })
    indent: nasl.core.Decimal = 18;

    @Prop({
      group: '主要属性',
      title: '虚拟滚动',
      description: '是否开启虚拟滚动',
      docDescription: '开启后，树会使用虚拟滚动技术，只渲染可视区域内的节点，提升大数据量时的性能。',
      setter: { concept: 'SwitchSetter' },
    })
    virtualize: nasl.core.Boolean = false;

    @Prop<ElTreeOptions<T, V, M>, 'height'>({
      group: '主要属性',
      title: '树高度',
      description: '设置树的高度',
      docDescription: '设置树的高度，单位为像素。开启虚拟滚动时必须设置此属性。',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => _.virtualize !== false,
    })
    height: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '延迟渲染',
      description: '是否在展开节点后才渲染子节点',
      docDescription: '开启后，只有在第一次展开某个树节点时才渲染其子节点，可以提升初始加载性能。',
      setter: { concept: 'SwitchSetter' },
    })
    renderAfterExpand: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '手风琴模式',
      description: '是否开启手风琴模式',
      docDescription: '开启后，同时只能有一个父节点处于展开状态，展开新的父节点时会自动收起其他已展开的父节点。',
      setter: { concept: 'SwitchSetter' },
    })
    accordion: nasl.core.Boolean = false;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '多选模式',
      description: '是否显示复选框支持多选',
      docDescription: '开启后，树节点会显示复选框，支持多选操作。关闭后，树节点只能单选。',
      setter: { concept: 'SwitchSetter' },
    })
    showCheckbox: M = false as M;

    @Prop({
      group: '交互属性',
      title: '严格模式',
      description: '父子节点选中状态是否关联',
      docDescription: '开启后，父子节点的选中状态不再关联，可以各自独立选中或取消。关闭后，选中父节点会自动选中所有子节点。',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '点击展开',
      description: '是否支持点击节点展开收起',
      docDescription: '开启后，点击树节点可以展开或收起其子节点。关闭后，只能通过展开/收起按钮操作。',
      setter: { concept: 'SwitchSetter' },
    })
    expandOnClickNode: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '点击选中',
      description: '是否支持点击节点选中',
      docDescription: '开启后，点击树节点可以选中该节点。关闭后，只能通过复选框选中节点。',
      setter: { concept: 'SwitchSetter' },
    })
    checkOnClickNode: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '自动展开',
      description: '是否自动展开所有节点',
      docDescription: '开启后，树会默认展开所有节点。关闭后，节点默认处于收起状态。仅首次生效。',
      setter: { concept: 'SwitchSetter' },
    })
    defaultExpandAll: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '自动展开父节点',
      description: '展开子节点时是否自动展开父节点',
      docDescription: '开启后，当展开某个子节点时，会自动展开其所有父节点。当数据源为静态数据时首次打开生效。',
      setter: { concept: 'SwitchSetter' },
    })
    autoExpandParent: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '复选框属性',
      description: '透传给复选框组件的属性',
      docDescription: '可以透传属性到内部的checkbox组件，参考checkbox组件的API文档。',
      setter: { concept: 'InputSetter' },
    })
    private checkProps: object;

    @Event({
      title: '改变时',
      description: '节点选中状态变化时触发',
    })
    checkChange: (value: M extends true ? nasl.collection.List<V> : V) => any;

    @Event({
      title: '节点点击时',
      description: '节点点击时触发',
    })
    onNodeClick: (event: {
      actived: nasl.core.Boolean;
      checked: nasl.core.Boolean;
      data: T;
      disabled: nasl.core.Boolean;
      expanded: nasl.core.Boolean;
      indeterminate: nasl.core.Boolean;
      loading: nasl.core.Boolean;
      value: V;
      label: nasl.core.String;
    }) => any;

    @Event({
      title: '点击节点复选框之后触发',
      description: '点击节点复选框之后触发',
    })
    onCheck: (data: T, checked: nasl.core.Boolean) => any;

    @Event({
      title: '当前选中节点改变时',
      description: '当前选中节点改变时触发',
    })
    onCurrentChange: (data: T) => any;

    @Event({
      title: '节点展开时',
      description: '节点被展开时触发的事件	',
    })
    onNodeExpand: (data: T) => any;

    @Event({
      title: '节点收起时',
      description: '节点被收起时触发的事件',
    })
    onNodeCollapse: (data: T) => any;

    // @Slot({
    //   title: '默认插槽',
    //   description: '默认插槽',
    // })
    // slotDefault: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '节点内容',
      description: '节点内容',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
