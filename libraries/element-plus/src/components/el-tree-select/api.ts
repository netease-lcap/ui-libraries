/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      selector: {
        expression: 'this',
        cssSelector: '.el-tree-select',
      },
    },
  })
  @Component({
    title: '树形选择',
    icon: 'tree',
    description: '树形选择器，可以对树形结构数据进行选择',
    group: 'Form',
  })
  export class ElTreeSelect extends ViewComponent {
    constructor(options?: Partial<ElTreeSelectOptions>) {
      super();
    }
  }

  export class ElTreeSelectOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '数据属性',
      title: '树形数据',
      description: '展示数据',
      setter: { concept: 'InputSetter' },
    })
    data: nasl.collection.List<any>;

    @Prop({
      group: '数据属性',
      title: '节点配置选项',
      description: '配置选项，具体看下表',
      setter: { concept: 'InputSetter' },
    })
    props: any;

    @Prop({
      group: '数据属性',
      title: '节点键名',
      description: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
      setter: { concept: 'InputSetter' },
    })
    nodeKey: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '缓存数据',
      description: '懒加载节点的缓存数据，结构与 data 相同，用于获取未加载数据的标签',
      setter: { concept: 'InputSetter' },
    })
    cacheData: nasl.collection.List<any>;

    @Prop({
      group: '主要属性',
      title: '多选',
      description: '是否多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用状态',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '大' },
          { title: '默认' },
          { title: '小' },
        ],
      },
    })
    size: 'large' | 'default' | 'small';

    @Prop({
      group: '主要属性',
      title: '可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '折叠标签',
      description: '多选时是否将选中值按文字的形式展示',
      setter: { concept: 'SwitchSetter' },
    })
    collapseTags: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '折叠标签提示',
      description: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签',
      setter: { concept: 'SwitchSetter' },
    })
    collapseTagsTooltip: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '多选限制',
      description: '多选时用户最多可以选择的项目数，为 0 则不限制',
      setter: { concept: 'NumberInputSetter' },
    })
    multipleLimit: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '主要属性',
      title: '显示复选框',
      description: '节点是否可被选择',
      setter: { concept: 'SwitchSetter' },
    })
    showCheckbox: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '严格模式',
      description: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '点击节点选中',
      description: '是否在点击节点的时候选中节点，showCheckbox 为 true 时生效',
      setter: { concept: 'SwitchSetter' },
    })
    checkOnClickNode: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可筛选',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '懒加载',
      description: '是否懒加载子节点，需与 load 方法结合使用',
      setter: { concept: 'SwitchSetter' },
    })
    lazy: nasl.core.Boolean = false;

    @Event({
      title: '值变化时',
      description: '当绑定值变化时触发的事件',
    })
    onChange: (value: nasl.core.String | nasl.collection.List<nasl.core.String>) => any;

    @Event({
      title: '节点点击时',
      description: '节点被点击时的回调',
    })
    onNodeClick: (data: any, node: any, component: any) => any;

    @Event({
      title: '节点选中状态变化时',
      description: '节点选中状态发生变化时的回调',
    })
    onCheckChange: (data: any, checked: nasl.core.Boolean) => any;

    @Event({
      title: '当前选中节点变化时',
      description: '当前选中节点变化时触发的事件',
    })
    onCurrentChange: (data: any, node: any) => any;

    @Event({
      title: '节点展开时',
      description: '节点被展开时触发的事件',
    })
    onNodeExpand: (data: any, node: any, component: any) => any;

    @Event({
      title: '节点折叠时',
      description: '节点被折叠时触发的事件',
    })
    onNodeCollapse: (data: any, node: any, component: any) => any;
  }
} 