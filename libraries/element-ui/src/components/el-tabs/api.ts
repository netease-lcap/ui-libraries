/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '标签页',
    icon: 'tabs',
    description: '分隔内容上有关联但属于不同类别的数据集合。',
    group: 'Navigation',
  })
  export class ElTabs extends ViewComponent {
    constructor(options?: Partial<ElTabsOptions>) {
      super();
    }
  }

  export class ElTabsOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值，选中选项卡的 name',
      description: '绑定值，选中选项卡的 name',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String = '第一个选项卡的 name';

    @Prop({
      group: '主要属性',
      title: '风格类型',
      description: '风格类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认样式' },
          { title: '选项卡样式的标签页' },
          { title: '卡片化的标签页' }
        ],
      },
    })
    type: '' | 'card' | 'border-card';

    @Prop({
      group: '主要属性',
      title: '标签是否可关闭',
      description: '标签是否可关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标签是否可增加',
      description: '标签是否可增加',
      setter: { concept: 'SwitchSetter' },
    })
    addable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标签是否同时可增加和关闭',
      description: '标签是否同时可增加和关闭',
      setter: { concept: 'SwitchSetter' },
    })
    editable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '选项卡所在位置',
      description: '选项卡所在位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '上' },
          { title: '右' },
          { title: '下' },
          { title: '左' },
        ],
      },
    })
    tabPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

    @Prop({
      group: '主要属性',
      title: '标签的宽度是否自撑开',
      description: '标签的宽度是否自撑开',
      setter: { concept: 'SwitchSetter' },
    })
    stretch: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。',
      description:
        '切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '允许切换' },
          { title: '阻止切换' }
        ],
      },
    })
    allowBeforeLeave: '允许切换' | '阻止切换' = '允许切换';

    @Event({
      title: '点击 tab',
      description: 'tab 被选中时触发',
    })
    onTabClick: (event: any) => void;

    @Event({
      title: '点击 tab 移除按钮',
      description: '点击 tab 移除按钮后触发',
    })
    onTabRemove: (event: any) => void;

    @Event({
      title: '点击 tabs 的新增按钮',
      description: '点击 tabs 的新增按钮后触发',
    })
    onTabAdd: (event: any) => void;

    @Event({
      title: '点击 tabs 的新增按钮或 tab 被关闭',
      description: '点击 tabs 的新增按钮或 tab 被关闭后触发',
    })
    onEdit: (event:
      {
        targetName: nasl.core.String;
        action: nasl.collection.List<String>;
      }
    ) => void;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [{ title: 'Tab Pane', code: '<el-tab-pane></el-tab-pane>' }],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Tab Pane',
    icon: 'tab-pane',
    description: '',
    group: 'Navigation',
  })
  export class ElTabPane extends ViewComponent {
    constructor(options?: Partial<ElTabPaneOptions>) {
      super();
    }
  }

  export class ElTabPaneOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '选项卡标题',
      description: '选项卡标题',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '选项卡别名',
      description: '与选项卡绑定值 value 对应的标识符，表示选项卡别名',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String =
      "该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'";

    @Prop({
      group: '主要属性',
      title: '标签是否可关闭',
      description: '标签是否可关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标签是否延迟渲染',
      description: '标签是否延迟渲染',
      setter: { concept: 'SwitchSetter' },
    })
    lazy: nasl.core.Boolean = false;
  }
}
