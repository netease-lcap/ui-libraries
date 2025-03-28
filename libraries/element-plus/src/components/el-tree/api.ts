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
        loopElem: '> .el-p-tree__list .el-p-tree__item',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源',
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

    @Prop({
      group: '主要属性',
      title: '复选框属性',
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
      designerValue: [{}, {}, {}],
      bindOpen: true,
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示',
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
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: { concept: 'PropertySelectSetter' },
    })
    textField: (item: T) => any;

    @Prop({
      group: '主要属性',
      title: '空态文本',
      description: '数据为空时展示的文本。',
      setter: { concept: 'InputSetter' },
    })
    emptyText: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '展开后渲染',
      description: '是否在第一次展开某个树节点后才渲染其子节点',
      setter: { concept: 'SwitchSetter' },
    })
    renderAfterExpand: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '高亮当前节点',
      description: '是否高亮当前选中节点',
      setter: { concept: 'SwitchSetter' },
    })
    highlightCurrent: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '点击节点支持展开收起',
      description: '是否支持点击节点也能展开收起',
      setter: { concept: 'SwitchSetter' },
    })
    expandOnClickNode: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '点击节点支持选中',
      description: '是否支持点击节点也能选中',
      setter: { concept: 'SwitchSetter' },
    })
    checkOnClickNode: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动展开父节点',
      description: '展开子节点时是否自动展开父节点，当数据源为静态数据时首次打开生效',
      setter: { concept: 'SwitchSetter' },
    })
    autoExpandParent: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示复选框',
      description: '是否显示复选框',
      setter: { concept: 'SwitchSetter' },
    })
    showCheckbox: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '手风琴模式',
      description: '是否开启手风琴模式',
      setter: { concept: 'SwitchSetter' },
    })
    accordion: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '展开全部节点',
      description: '是否默认展开所有节点, 仅首次生效',
      setter: { concept: 'SwitchSetter' },
    })
    defaultExpandAll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '默认展开的节点的 key 的数组',
      description: '默认展开的节点的 key 的数组, 仅首次生效',
      setter: { concept: 'InputSetter' },
    })
    defaultExpandedKeys: nasl.collection.List<V> = [];

    @Prop({
      group: '主要属性',
      title: '是否虚拟滚动',
      description: '是否开启虚拟滚动',
      setter: { concept: 'SwitchSetter' },
    })
    virtualize: nasl.core.Boolean = false;

    @Prop<ElTreeOptions<T, V, M>, 'height'>({
      group: '主要属性',
      title: '高度',
      description: '高度虚拟滚动时需要设置高度',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => _.virtualize !== false,
    })
    height: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '缩进',
      description: '相邻级节点间的水平缩进，单位为像素',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
    })
    indent: nasl.core.Decimal = 18;

    @Prop({
      group: '主要属性',
      title: '默认选中的节点',
      description: '默认选中的节点的 key 的数组, 仅首次生效',
      setter: { concept: 'InputSetter' },
    })
    defaultCheckedKeys: nasl.collection.List<V> = [];

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
      node: {
        actived: nasl.core.Boolean;
        checked: nasl.core.Boolean;
        data: T;
        disabled: nasl.core.Boolean;
        expanded: nasl.core.Boolean;
        indeterminate: nasl.core.Boolean;
        loading: nasl.core.Boolean;
        value: V;
        label: nasl.core.String;
      };
    }) => any;

    @Event({
      title: '节点选中状态改变时',
      description: '节点选中状态改变时触发',
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
  }
}
