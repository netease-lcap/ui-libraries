/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    ideusage: {
      idetype: 'container',
      events: {
        click: true,
      },
    },
    extends: [
      {
        name: 'ElSelect',
      },
      {
        name: 'ElTree',
      },
    ],
  })
  @Component({
    title: '树形选择',
    icon: 'tree-view',
    description: '树形选择器，可以对树形结构数据进行选择',
    group: 'Selector',
  })
  export class ElTreeSelect<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(options?: Partial<ElTreeSelectOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElTreeSelectOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '禁用组件',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '是否可搜索',
      description:
        '是否可搜索，默认搜索规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '为空的内容',
      description: '当下拉列表为空时显示的内容。',
      setter: { concept: 'InputSetter' },
    })
    noDataText: any;

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可多选',
      description: '是否显示可选框',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: M = false as M;

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
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;

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
      title: '是否虚拟滚动',
      description: '是否开启虚拟滚动',
      setter: { concept: 'SwitchSetter' },
    })
    virtualize: nasl.core.Boolean = false;

    @Prop<ElTreeSelectOptions<T, V, P, M, C>, 'height'>({
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

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '表单树形选择',
    description: '表单树形选择器，可以对树形结构数据进行选择',
    group: 'Form',
  })
  export class ElFormTreeSelect<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(
      options?: Partial<ElTreeSelectOptions<T, V, P, M, C> & Omit<ElTreeSelectOptions<T, V, P, M, C>, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormTreeSelectOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponentOptions {}
}
