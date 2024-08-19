/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-tab-pane'",
    },
  })
  @Component({
    title: '选项卡',
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
      title: '选中值',
      description: '绑定值，选中选项卡的 name',
      setter: { concept: 'InputSetter' },
      sync: true,
      settable: true,
    })
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '风格样式',
      description: '风格样式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认样式' },
          { title: '选项卡样式的标签页' },
          { title: '卡片化的标签页' },
        ],
      },
    })
    type: '' | 'card' | 'border-card' = '';

    @Prop({
      group: '主要属性',
      title: '可关闭',
      description: '标签页是否可关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可增加',
      description: '标签页是否可增加',
      setter: { concept: 'SwitchSetter' },
    })
    addable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '可添加/关闭',
    //   description: '标签是否同时可增加和关闭',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // editable: nasl.core.Boolean = false;

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
      title: '切换标签之前的逻辑',
      description: '切换标签之前的钩子，若返回 false 则阻止切换。',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
    })
    beforeLeave: (
      activeName: nasl.core.String,
      oldActiveName: nasl.core.String,
    ) => nasl.core.Boolean;

    @Event({
      title: '点击标签页',
      description: 'tab 被选中时触发',
    })
    onTabClick: (event: {
      active: nasl.core.Boolean;
      loaded: nasl.core.Boolean;
      isClosable: nasl.core.Boolean;
      value: nasl.core.String | nasl.core.Integer;
    }) => void;

    @Event({
      title: '点击移除按钮时',
      description: '点击移除按钮后触发',
    })
    onTabRemove: (event: nasl.core.String) => void;

    @Event({
      title: '点击新增按钮',
      description: '点击 tabs 的新增按钮后触发',
    })
    onTabAdd: (event: {}) => void;

    @Event({
      title: '点击新增按钮或关闭',
      description: '点击 tabs 的新增按钮或 tab 被关闭后触发',
    })
    onTabEdit: (event: {
      value: nasl.core.String;
      action: 'add' | 'remove';
    }) => void;

    @Slot({
      title: '标签页',
      description: '内容',
      snippets: [
        {
          title: '标签页',
          code: '<el-tab-pane><template #label><el-text text="标签页"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('el-tabs')",
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'label')",
          cssSelector: '.el-tabs__item',
        },
        {
          expression: 'this',
          cssSelector: '.el-tab-pane',
        },
      ],
      displaySlotInline: {
        label: true,
      },
      events: {
        click: true,
      },
      forceRefresh: 'parent',
    },
  })
  @Component({
    title: '标签页',
    description: '标签页',
  })
  export class ElTabPane extends ViewComponent {
    constructor(options?: Partial<ElTabPaneOptions>) {
      super();
    }
  }

  export class ElTabPaneOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: '选项卡标题',
    //   description: '选项卡标题',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '值',
      description: '与选项卡绑定值对应的标识符',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

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

    @Slot({
      title: '标签页内容',
      description: '标签页内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标签页标题',
      description: '标签页标题',
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
