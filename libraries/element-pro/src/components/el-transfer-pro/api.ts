/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '穿梭框',
    icon: 'transfer',
    description: '',
    group: 'Selector',
  })
  export class ElTransferPro extends ViewComponent {
    constructor(options?: Partial<ElTransferProOptions>) {
      super();
    }
  }

  export class ElTransferProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Checkbox Props',
      description: '用于控制复选框属性。',
      setter: { concept: 'InputSetter' },
    })
    checkboxProps: object;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Checked',
      description: '数据列表选中项。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    checked: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Checked',
      description: '数据列表选中项。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultChecked: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Data',
      description: '全量数据。',
      setter: { concept: 'InputSetter' },
    })
    data: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Direction',
      description: '穿梭框可操作方向。可选项：left/right/both',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'left' }, { title: 'right' }, { title: 'both' }],
      },
    })
    direction: 'left' | 'right' | 'both' = 'both';

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description:
        '禁用全部操作：搜索、选中、移动、分页等。[源列表, 目标列表]，示例：[true, false] 或者 true。',
      setter: { concept: 'InputSetter' },
    })
    disabled: nasl.core.Boolean | any[];

    @Prop({
      group: '主要属性',
      title: 'Empty',
      description:
        '列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容。',
      setter: { concept: 'InputSetter' },
    })
    empty: any = '';

    @Prop({
      group: '主要属性',
      title: 'Footer',
      description: '穿梭框底部内容。',
      setter: { concept: 'InputSetter' },
    })
    footer: any;

    @Prop({
      group: '主要属性',
      title: 'Keys',
      description:
        '用来定义 value / label / disabled 在 `data` 中对应的字段别名，示例：`{ label: "text", value: "id" }`，表示选项文本取 `text` 字段，选项值取 `id` 字段。',
      setter: { concept: 'InputSetter' },
    })
    keys: object;

    @Prop({
      group: '主要属性',
      title: 'Operation',
      description:
        '方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：["向左", "向右"] 或者 `[() => <i class="left" />, () => <i class="left" />]` 或者 `(h, direction) => direction === "left" ? "《" : "》"`。',
      setter: { concept: 'InputSetter' },
    })
    operation: any;

    @Prop({
      group: '主要属性',
      title: 'Pagination',
      description:
        '分页配置，值为空则不显示。具体 API 参考分页组件。值类型为数组，表示可分别控制源列表和目标列表分页组件。',
      setter: { concept: 'InputSetter' },
    })
    pagination: object | any[];

    @Prop({
      group: '主要属性',
      title: 'Search',
      description:
        '搜索框配置，值为 false 表示不显示搜索框；值为 true 表示显示默认搜索框；值类型为对象，用于透传 Props 到 Input 组件；值类型为数组，则分别表示控制两侧搜索框。',
      setter: { concept: 'InputSetter' },
    })
    search: nasl.core.Boolean | object | any[] = false;

    @Prop({
      group: '主要属性',
      title: 'Show Check All',
      description: '是否显示全选，值类型为数组则表示分别控制源列表和目标列表。',
      setter: { concept: 'InputSetter' },
    })
    showCheckAll: nasl.core.Boolean | any[] = true;

    @Prop({
      group: '主要属性',
      title: 'Target Draggable',
      description: '是否允许通过拖拽对目标列表进行排序',
      setter: { concept: 'SwitchSetter' },
    })
    targetDraggable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Target Sort',
      description: '目标数据列表排列顺序。可选项：original/push/unshift',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'original' },
          { title: 'push' },
          { title: 'unshift' },
        ],
      },
    })
    targetSort: 'original' | 'push' | 'unshift' = 'original';

    @Prop({
      group: '主要属性',
      title: 'Title',
      description:
        '穿梭框标题，示例：["源列表", "目标列表"] 或者 `[() => "A", () => "B"]` 或者 `({ type }) => type === "source" ? "源" : "目标"`。',
      setter: { concept: 'InputSetter' },
    })
    title: any = [];

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '目标数据列表数据。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '目标数据列表数据。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[] = [];

    @Event({
      title: 'On Change',
      description:
        '数据列表发生变化时触发，`type` 值为 `source`，表示源列表移动到目标列表，值为 `target` 表示目标列表移动到源列表，movedValue 则表示被移动的选项。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Checked Change',
      description:
        '源数据列表或目标数据列表的选中项发生变化时触发，`context.type` 可以区分触发来源是目标列表，还是源列表。',
    })
    onCheckedChange: (event: any) => any;

    @Event({
      title: 'On Page Change',
      description: '分页发生变化时触发',
    })
    onPageChange: (event: any) => any;

    @Event({
      title: 'On Scroll',
      description: '列表滚动时触发，bottomDistance 表示元素滚动到底部的距离。',
    })
    onScroll: (event: any) => any;

    @Event({
      title: 'On Search',
      description: '搜索时触发，options.query 表示用户输入的内容。',
    })
    onSearch: (event: any) => any;

    @Slot({
      title: 'Empty',
      description:
        '列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容。',
    })
    slotEmpty: () => Array<ViewComponent>;

    @Slot({
      title: 'Footer',
      description: '穿梭框底部内容。',
    })
    slotFooter: () => Array<ViewComponent>;

    @Slot({
      title: 'Operation',
      description:
        '方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：["向左", "向右"] 或者 `[() => <i class="left" />, () => <i class="left" />]` 或者 `(h, direction) => direction === "left" ? "《" : "》"`。',
    })
    slotOperation: () => Array<ViewComponent>;

    @Slot({
      title: 'Title',
      description:
        '穿梭框标题，示例：["源列表", "目标列表"] 或者 `[() => "A", () => "B"]` 或者 `({ type }) => type === "source" ? "源" : "目标"`。',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: 'Transfer Item',
      description: '自定义渲染节点。',
    })
    slotTransferItem: () => Array<ViewComponent>;

    @Slot({
      title: 'Tree',
      description: '传入 Tree 组件定义树形结构',
    })
    slotTree: () => Array<ViewComponent>;
  }
}
