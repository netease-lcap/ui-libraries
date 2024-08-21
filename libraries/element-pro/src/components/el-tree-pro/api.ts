/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '树',
    icon: 'tree',
    description: '',
    group: 'Display',
  })
  export class ElTreePro extends ViewComponent {
    constructor(options?: Partial<ElTreeProOptions>) {
      super();
    }
  }

  export class ElTreeProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Activable',
      description: '节点是否可高亮',
      setter: { concept: 'SwitchSetter' },
    })
    activable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Active Multiple',
      description: '是否允许多个节点同时高亮',
      setter: { concept: 'SwitchSetter' },
    })
    activeMultiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Actived',
      description: '高亮的节点值。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    actived: any[];

    @Prop({
      group: '主要属性',
      title: 'Allow Drop',
      description: '判断节点是否可以执行 drop 操作，泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    allowDrop: any;

    @Prop({
      group: '主要属性',
      title: 'Allow Fold Node On Filter',
      description: '是否允许在过滤时节点折叠节点',
      setter: { concept: 'SwitchSetter' },
    })
    allowFoldNodeOnFilter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Check Props',
      description: '透传属性到 checkbox 组件。参考 checkbox 组件 API。',
      setter: { concept: 'InputSetter' },
    })
    checkProps: object;

    @Prop({
      group: '主要属性',
      title: 'Check Strictly',
      description: '父子节点选中状态不再关联，可各自选中或取消',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Checkable',
      description: '隐藏节点复选框',
      setter: { concept: 'SwitchSetter' },
    })
    checkable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Data',
      description: '树数据，泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    data: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Disable Check',
      description: '禁用复选框，可支持禁用不同的行。',
      setter: { concept: 'InputSetter' },
    })
    disableCheck: nasl.core.Boolean | any = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
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
    draggable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Empty',
      description: '数据为空时展示的文本。',
      setter: { concept: 'InputSetter' },
    })
    empty: any = '';

    @Prop({
      group: '主要属性',
      title: 'Expand All',
      description: '是否展开全部节点',
      setter: { concept: 'SwitchSetter' },
    })
    expandAll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Expand Level',
      description: '默认展开的级别，第一层为 0',
      setter: { concept: 'NumberInputSetter' },
    })
    expandLevel: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Expand Mutex',
      description: '同级别展开互斥，手风琴效果',
      setter: { concept: 'SwitchSetter' },
    })
    expandMutex: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Expand On Click Node',
      description: '是否支持点击节点也能展开收起',
      setter: { concept: 'SwitchSetter' },
    })
    expandOnClickNode: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Expand Parent',
      description: '展开子节点时是否自动展开父节点',
      setter: { concept: 'SwitchSetter' },
    })
    expandParent: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Expanded',
      description: '展开的节点值。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    expanded: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Filter',
      description:
        '节点过滤方法，只呈现返回值为 true 的节点，泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    filter: any;

    @Prop({
      group: '主要属性',
      title: 'Height',
      description:
        '树的高度，超出后会出现滚动条。示例：100,  "30%",  "300"。值为数字类型，会自动加上单位 px。如果不是绝对固定树的高度，建议使用 `maxHeight`',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Hover',
      description: '节点是否有悬浮状态',
      setter: { concept: 'SwitchSetter' },
    })
    hover: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Icon',
      description: '节点图标，可自定义。',
      setter: { concept: 'InputSetter' },
    })
    icon: any = true;

    @Prop({
      group: '主要属性',
      title: 'Keys',
      description:
        '用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: "key", label "name", children: "list" }`。其中，disabled 待开发。。',
      setter: { concept: 'InputSetter' },
    })
    keys: object;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description:
        '自定义节点内容，值为 `false` 不显示，值为 `true` 显示默认 label，值为字符串直接输出该字符串。泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    label: any = true;

    @Prop({
      group: '主要属性',
      title: 'Lazy',
      description:
        '延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载',
      setter: { concept: 'SwitchSetter' },
    })
    lazy: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Line',
      description:
        '连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线。',
      setter: { concept: 'InputSetter' },
    })
    line: any = false;

    @Prop({
      group: '主要属性',
      title: 'Load',
      description:
        '加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 ',
      setter: { concept: 'InputSetter' },
    })
    load: any;

    @Prop({
      group: '主要属性',
      title: 'Max Height',
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
    scroll: object;

    @Prop({
      group: '主要属性',
      title: 'Transition',
      description: '节点展开折叠时是否使用过渡动画',
      setter: { concept: 'SwitchSetter' },
    })
    transition: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选中值，组件为可选状态时有效。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值，组件为可选状态时有效。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Value Mode',
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
    })
    valueMode: 'onlyLeaf' | 'parentFirst' | 'all' = 'onlyLeaf';

    @Event({
      title: 'On Active',
      description: '节点激活时触发，泛型 `T` 表示树节点 ',
    })
    onActive: (event: any) => any;

    @Event({
      title: 'On Change',
      description:
        '节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 `T` 表示树节点 ',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Click',
      description: '节点点击时触发，泛型 `T` 表示树节点 ',
    })
    onClick: (event: any) => any;

    @Event({
      title: 'On Drag End',
      description: '节点结束拖拽时触发，泛型 `T` 表示树节点 ',
    })
    onDragEnd: (event: any) => any;

    @Event({
      title: 'On Drag Leave',
      description: '节点拖拽时离开目标元素时触发，泛型 `T` 表示树节点 ',
    })
    onDragLeave: (event: any) => any;

    @Event({
      title: 'On Drag Over',
      description: '节点拖拽到目标元素时触发，泛型 `T` 表示树节点 ',
    })
    onDragOver: (event: any) => any;

    @Event({
      title: 'On Drag Start',
      description: '节点开始拖拽时触发，泛型 `T` 表示树节点 ',
    })
    onDragStart: (event: any) => any;

    @Event({
      title: 'On Drop',
      description: '节点在目标元素上释放时触发，泛型 `T` 表示树节点 ',
    })
    onDrop: (event: any) => any;

    @Event({
      title: 'On Expand',
      description: '节点展开或收起时触发，泛型 `T` 表示树节点 ',
    })
    onExpand: (event: any) => any;

    @Event({
      title: 'On Load',
      description: '异步加载后触发，泛型 `T` 表示树节点 ',
    })
    onLoad: (event: any) => any;

    @Event({
      title: 'On Scroll',
      description: '滚动事件',
    })
    onScroll: (event: any) => any;

    @Slot({
      title: 'Empty',
      description: '数据为空时展示的文本。',
    })
    slotEmpty: () => Array<ViewComponent>;

    @Slot({
      title: 'Icon',
      description: '节点图标，可自定义。',
    })
    slotIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description:
        '自定义节点内容，值为 `false` 不显示，值为 `true` 显示默认 label，值为字符串直接输出该字符串。泛型 `T` 表示树节点 ',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Line',
      description:
        '连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线。',
    })
    slotLine: () => Array<ViewComponent>;

    @Slot({
      title: 'Operations',
      description: '自定义节点操作项，泛型 `T` 表示树节点 ',
    })
    slotOperations: () => Array<ViewComponent>;
  }
}
