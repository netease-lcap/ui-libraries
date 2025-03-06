/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      events: {
        click: true,
      },
      additionalAttribute: {
        valueField: '"value"',
        textField: '"label"',
      },
    },
  })
  @Component({
    title: '树形控件',
    icon: 'tree',
    description: '用清晰的层级结构展示信息，可展开或折叠。',
    group: 'Navigation',
  })
  export class ElTree<T> extends ViewComponent {
    constructor(options?: Partial<ElTreeOptions<T>>) {
      super();
    }
  }

  export class ElTreeOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的源',
    })
    dataSource: T[];

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '数据源中用于显示文本的字段',
    })
    textField: (item: T) => any = ((item: any) => item.label) as any;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '数据源中用于标识值的字段',
    })
    valueField: (item: T) => any = ((item: any) => item.value) as any;

    @Prop({
      group: '数据属性',
      title: '父级字段',
      description: '数据源中用于标识父节点的字段',
    })
    parentField: (item: T) => any;

    @Prop({
      group: '主要属性',
      title: '是否显示复选框',
      description: '节点是否可被选择',
      setter: { concept: 'SwitchSetter' },
    })
    showCheckbox: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '父子节点不互相关联',
      description: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '默认展开所有节点',
      description: '是否默认展开所有节点',
      setter: { concept: 'SwitchSetter' },
    })
    defaultExpandAll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '点击节点时展开收缩',
      description: '是否在点击节点的时候展开或者收缩节点',
      setter: { concept: 'SwitchSetter' },
    })
    expandOnClickNode: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '节点唯一标识',
      description: '每个树节点用来作为唯一标识的属性',
    })
    nodeKey: nasl.core.String = 'id';

    @Event({
      title: '节点点击时',
      description: '节点被点击时触发',
    })
    onNodeClick: (event: {
      data: T;
      node: any;
    }) => any;

    @Event({
      title: '节点选中状态改变时',
      description: '节点选中状态发生变化时触发',
    })
    onCheck: (event: {
      data: T;
      checkedNodes: T[];
      checkedKeys: any[];
      halfCheckedNodes: T[];
      halfCheckedKeys: any[];
    }) => any;

    @Event({
      title: '当前选中节点改变时',
      description: '当前选中节点发生变化时触发',
    })
    onCurrentChange: (event: {
      data: T;
      node: any;
    }) => any;

    @Event({
      title: '节点展开时',
      description: '节点被展开时触发',
    })
    onNodeExpand: (event: {
      data: T;
      node: any;
    }) => any;

    @Event({
      title: '节点收起时',
      description: '节点被收起时触发',
    })
    onNodeCollapse: (event: {
      data: T;
      node: any;
    }) => any;

    @Slot({
      title: '自定义节点内容',
      description: '自定义树节点的内容，参数为 { node, data }',
    })
    slotDefault: (current: { node: any; data: T }) => Array<ViewComponent>;
  }
} 