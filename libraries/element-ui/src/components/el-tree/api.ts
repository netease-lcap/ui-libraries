/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '树形控件',
    icon: 'tree',
    description: '用清晰的层级结构展示信息，可展开或折叠。',
    group: 'Display',
  })
  export class ElTree extends ViewComponent {
    constructor(options?: Partial<ElTreeOptions>) {
      super();
    }
  }

  export class ElTreeOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Data',
      description: '展示数据',
      setter: { concept: 'InputSetter' },
    })
    data: any[];

    @Prop({
      group: '主要属性',
      title: 'Empty Text',
      description: '内容为空的时候展示的文本',
      setter: { concept: 'InputSetter' },
    })
    emptyText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Node Key',
      description: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
      setter: { concept: 'InputSetter' },
    })
    nodeKey: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Props',
      description: '配置选项，具体看下表',
      setter: { concept: 'InputSetter' },
    })
    props: object;

    @Prop({
      group: '主要属性',
      title: 'Render After Expand',
      description: '是否在第一次展开某个树节点后才渲染其子节点',
      setter: { concept: 'SwitchSetter' },
    })
    renderAfterExpand: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Load',
      description: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
      setter: { concept: 'InputSetter' },
    })
    load: any;

    @Prop({
      group: '主要属性',
      title: 'Render Content',
      description: '树节点的内容区的渲染 Function',
      setter: { concept: 'InputSetter' },
    })
    renderContent: any;

    @Prop({
      group: '主要属性',
      title: 'Highlight Current',
      description: '是否高亮当前选中节点，默认值是 false。',
      setter: { concept: 'SwitchSetter' },
    })
    highlightCurrent: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default Expand All',
      description: '是否默认展开所有节点',
      setter: { concept: 'SwitchSetter' },
    })
    defaultExpandAll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Expand On Click Node',
      description:
        '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
      setter: { concept: 'SwitchSetter' },
    })
    expandOnClickNode: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Check On Click Node',
      description:
        '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
      setter: { concept: 'SwitchSetter' },
    })
    checkOnClickNode: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Auto Expand Parent',
      description: '展开子节点的时候是否自动展开父节点',
      setter: { concept: 'SwitchSetter' },
    })
    autoExpandParent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Default Expanded Keys',
      description: '默认展开的节点的 key 的数组',
      setter: { concept: 'InputSetter' },
    })
    defaultExpandedKeys: any[];

    @Prop({
      group: '主要属性',
      title: 'Show Checkbox',
      description: '节点是否可被选择',
      setter: { concept: 'SwitchSetter' },
    })
    showCheckbox: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Check Strictly',
      description:
        '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default Checked Keys',
      description: '默认勾选的节点的 key 的数组',
      setter: { concept: 'InputSetter' },
    })
    defaultCheckedKeys: any[];

    @Prop({
      group: '主要属性',
      title: 'Current Node Key',
      description: '当前选中的节点',
      setter: { concept: 'InputSetter' },
    })
    currentNodeKey: any;

    @Prop({
      group: '主要属性',
      title: 'Filter Node Method',
      description:
        '对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏',
      setter: { concept: 'InputSetter' },
    })
    filterNodeMethod: any;

    @Prop({
      group: '主要属性',
      title: 'Accordion',
      description: '是否每次只打开一个同级树节点展开',
      setter: { concept: 'SwitchSetter' },
    })
    accordion: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Indent',
      description: '相邻级节点间的水平缩进，单位为像素',
      setter: { concept: 'NumberInputSetter' },
    })
    indent: nasl.core.Decimal = 16;

    @Prop({
      group: '主要属性',
      title: 'Icon Class',
      description: '自定义树节点的图标',
      setter: { concept: 'InputSetter' },
    })
    iconClass: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: 'Lazy',
      description: '是否懒加载子节点，需与 load 方法结合使用',
      setter: { concept: 'SwitchSetter' },
    })
    lazy: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Draggable',
      description: '是否开启拖拽节点功能',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Allow Drag',
      description: '判断节点能否被拖拽',
      setter: { concept: 'InputSetter' },
    })
    allowDrag: any;

    @Prop({
      group: '主要属性',
      title: 'Allow Drop',
      description:
        "拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后",
      setter: { concept: 'InputSetter' },
    })
    allowDrop: any;

    @Event({
      title: 'On Node Click',
      description: '节点被点击时的回调',
    })
    onNodeClick: (event: any) => any;

    @Event({
      title: 'On Node Contextmenu',
      description: '当某一节点被鼠标右键点击时会触发该事件',
    })
    onNodeContextmenu: (event: any) => any;

    @Event({
      title: 'On Check Change',
      description: '节点选中状态发生变化时的回调',
    })
    onCheckChange: (event: any) => any;

    @Event({
      title: 'On Check',
      description: '当复选框被点击的时候触发',
    })
    onCheck: (event: any) => any;

    @Event({
      title: 'On Current Change',
      description: '当前选中节点变化时触发的事件',
    })
    onCurrentChange: (event: any) => any;

    @Event({
      title: 'On Node Expand',
      description: '节点被展开时触发的事件',
    })
    onNodeExpand: (event: any) => any;

    @Event({
      title: 'On Node Collapse',
      description: '节点被关闭时触发的事件',
    })
    onNodeCollapse: (event: any) => any;

    @Event({
      title: 'On Node Drag Start',
      description: '节点开始拖拽时触发的事件',
    })
    onNodeDragStart: (event: any) => any;

    @Event({
      title: 'On Node Drag Enter',
      description: '拖拽进入其他节点时触发的事件',
    })
    onNodeDragEnter: (event: any) => any;

    @Event({
      title: 'On Node Drag Leave',
      description: '拖拽离开某个节点时触发的事件',
    })
    onNodeDragLeave: (event: any) => any;

    @Event({
      title: 'On Node Drag Over',
      description: '在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）',
    })
    onNodeDragOver: (event: any) => any;

    @Event({
      title: 'On Node Drag End',
      description: '拖拽结束时（可能未成功）触发的事件',
    })
    onNodeDragEnd: (event: any) => any;

    @Event({
      title: 'On Node Drop',
      description: '拖拽成功完成时触发的事件',
    })
    onNodeDrop: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '自定义树节点的内容，参数为 { node, data }',
    })
    slotDefault: (current: Current<any>) => Array<ViewComponent>;
  }
}
