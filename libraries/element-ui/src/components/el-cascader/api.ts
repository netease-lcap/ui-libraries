/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    ideusage: {
      "idetype": "container",
      "structured": true,
      "childAccept": "target.tag === 'el-cascader-panel'"
    }
  })
  @Component({
    title: '级联选择器',
    icon: 'cascader',
    description:
      '当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。',
    group: 'Selector',
  })
  export class ElCascader extends ViewComponent {
    constructor(options?: Partial<ElCascaderOptions>) {
      super();
    }

    @Method({
      title: '获取选中节点',
      description: '获取选中的节点',
    })
    getCheckedNodes(): any { }
  }

  export class ElCascaderOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      sync: true,
      title: '绑定值',
      description: '选中项绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: any;

    @Prop({
      group: '主要属性',
      title: '可选项数据源',
      description: '可选项数据源，键名可通过 `Props` 属性配置',
      setter: { concept: 'InputSetter' },
    })
    options: any[];

    @Prop({
      group: '主要属性',
      title: '配置选项',
      description: '配置选项，具体见下表',
      setter: { concept: 'InputSetter' },
    })
    props: object;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '中等' }, { title: '小型' }, { title: '迷你' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: '输入框占位文本',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '是否支持清空选项',
      description: '是否支持清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '是否显示完整路径',
      description: '输入框中是否显示选中值的完整路径',
      setter: { concept: 'SwitchSetter' },
    })
    showAllLevels: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '是否折叠Tag',
      description: '多选模式下是否折叠Tag',
      setter: { concept: 'SwitchSetter' },
    })
    collapseTags: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '分隔符',
      description: '选项分隔符',
      setter: { concept: 'InputSetter' },
    })
    separator: nasl.core.String = ' / ';

    @Prop({
      group: '状态属性',
      title: '是否可搜索',
      description: '是否可搜索选项',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean;

    @Prop({
      group: '交互属性',
      title: '自定义搜索逻辑',
      description:
        '自定义搜索逻辑，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中',
      setter: { concept: 'InputSetter' },
    })
    filterMethod: any;

    @Prop({
      group: '数据属性',
      title: '输入关键字的去抖延迟',
      description: '搜索关键词输入的去抖延迟，毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    debounce: nasl.core.Decimal = 300;

    @Prop({
      group: '交互属性',
      title: '筛选之前的钩子',
      description:
        '筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选',
      setter: { concept: 'InputSetter' },
    })
    beforeFilter: any;

    @Prop({
      group: '样式属性',
      title: '浮层类名',
      description: '自定义浮层类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Event({
      title: '选中节点变化时',
      description: '当选中节点变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: '展开节点变化时',
      description: '当展开节点发生变化时触发',
    })
    onExpandChange: (event: any) => any;

    @Event({
      title: '失去焦点时',
      description: '当失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '获得焦点时',
      description: '当获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '下拉框出现/隐藏时',
      description: '下拉框出现/隐藏时触发',
    })
    onVisibleChange: (event: any) => any;

    @Event({
      title: '移除Tag时',
      description: '在多选模式下，移除Tag时触发',
    })
    onRemoveTag: (event: any) => any;

    @Slot({
      title: '默认',
      description:
        '自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据',
      snippets: [
        {
          title: 'Cascader Panel',
          code: '<el-cascader-panel></el-cascader-panel>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '无匹配选项时的内容',
      description: '无匹配选项时的内容',
    })
    slotEmpty: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-cascader'"
    }
  })
  @Component({
    title: 'Cascader Panel',
    icon: 'cascader-panel',
    description: '',
    group: 'Selector',
  })
  export class ElCascaderPanel extends ViewComponent {
    constructor(options?: Partial<ElCascaderPanelOptions>) {
      super();
    }

    @Method({
      title: '获取选中的节点数组',
      description: '获取选中的节点数组',
    })
    getCheckedNodes(): any { }

    @Method({
      title: '清空选中的节点',
      description: '清空选中的节点',
    })
    clearCheckedNodes(): any { }
  }

  export class ElCascaderPanelOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      sync: true,
      title: '绑定值',
      description: '选中项绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: any;

    @Prop({
      group: '主要属性',
      title: '可选项数据源',
      description: '可选项数据源，键名可通过 `Props` 属性配置',
      setter: { concept: 'InputSetter' },
    })
    options: any[];

    @Prop({
      group: '主要属性',
      title: '配置选项',
      description: '配置选项，具体见下表',
      setter: { concept: 'InputSetter' },
    })
    props: object;

    @Event({
      title: '选中节点变化时',
      description: '当选中节点变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: '展开节点变化时',
      description: '当展开节点发生变化时触发',
    })
    onExpandChange: (event: any) => any;

    @Slot({
      title: '默认',
      description:
        '自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
