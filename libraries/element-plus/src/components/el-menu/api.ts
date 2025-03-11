/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)",
      events: {
        click: true,
      },
      additionalAttribute: {
        ':collapseTransition': '"false"',
        menuTrigger: 'click',
      },
      snippetsDisplayConditions: {
        default: "this.getAttribute('mode')?.value === 'vertical' ? [0, 1, 2] : [0, 1]",
      },
      displaySlotConditions: {
        left: "this.getAttribute('mode')?.value === 'horizontal'",
        right: "this.getAttribute('mode')?.value === 'horizontal'",
      },
    },
  })
  @Component({
    title: '导航菜单',
    icon: 'navbar-multi',
    description: '为网站提供导航功能的菜单。',
    group: 'Navigation',
  })
  export class ElMenu extends ViewComponent {
    constructor(options?: Partial<ElMenuOptions>) {
      super();
    }

    @Method({
      title: '展开',
      description: '展开指定的 sub-menu',
    })
    open(
      @Param({
        title: '子菜单唯一标识',
      })
      index: nasl.core.String,
    ): void {}

    @Method({
      title: '收起',
      description: '收起指定的 sub-menu',
    })
    close(
      @Param({
        title: '子菜单唯一标识',
      })
      index: nasl.core.String,
    ): void {}
  }

  export class ElMenuOptions extends ViewComponentOptions {
    @Prop<ElMenuOptions, 'mode'>({
      group: '主要属性',
      title: '模式',
      description: '模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
      onChange: [
        {
          clear: ['collapse'],
          if: (_) => _ === 'horizontal',
        },
      ],
    })
    mode: 'horizontal' | 'vertical' = 'vertical';

    @Prop<ElMenuOptions, 'collapse'>({
      group: '主要属性',
      title: '折叠状态',
      description: '是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.mode === 'vertical',
    })
    collapse: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '背景色',
      description: '菜单的背景色（仅支持 hex 格式）',
      setter: { concept: 'InputSetter' },
    })
    backgroundColor: nasl.core.String = '#ffffff';

    @Prop({
      group: '样式属性',
      title: '文字颜色',
      description: '菜单的文字颜色（仅支持 hex 格式）',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#303133';

    @Prop({
      group: '样式属性',
      title: '当前激活菜单的文字颜色',
      description: '当前激活菜单的文字颜色（仅支持 hex 格式）',
      setter: { concept: 'InputSetter' },
    })
    activeTextColor: nasl.core.String = '#409EFF';

    @Prop({
      group: '主要属性',
      title: '当前激活菜单的标识',
      description: '当前激活菜单的 标识',
      setter: { concept: 'InputSetter' },
    })
    defaultActive: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '当前打开的子菜单的标识的数组',
      description: '当前打开的子菜单的标识的数组',
      setter: { concept: 'InputSetter' },
    })
    defaultOpeneds: nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '主要属性',
      title: '是否只保持一个子菜单的展开',
      description: '是否只保持一个子菜单的展开',
      setter: { concept: 'SwitchSetter' },
    })
    uniqueOpened: nasl.core.Boolean = false;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: MouseEvent) => void;

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: MouseEvent) => any;

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: MouseEvent) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: MouseEvent) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: MouseEvent) => any;

    @Event({
      title: '聚焦时',
      description: '聚焦时触发',
    })
    onFocus: (event: FocusEvent) => void;

    @Event({
      title: '失焦时',
      description: '失焦时触发',
    })
    onBlur: (event: FocusEvent) => void;

    @Slot({
      title: '菜单项内容',
      description: '菜单项内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)",
      parentAccept: "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'",
      displaySlotInline: {
        title: true,
      },
    },
  })
  @Component({
    title: '菜单组',
    description: '菜单组',
  })
  export class ElMenuItemGroup extends ViewComponent {
    constructor(options?: Partial<ElMenuItemGroupOptions>) {
      super();
    }
  }

  export class ElMenuItemGroupOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '默认',
      snippets: [
        {
          title: '子菜单',
          code: '<el-submenu><template #title><el-text text="子菜单"></el-text></template><template #default><el-menu-item><template #default><el-text text="菜单项"></el-text></template></el-menu-item></template></el-submenu>',
        },
        {
          title: '菜单项',
          code: '<el-menu-item><template #default><el-text text="菜单项"></el-text></template></el-menu-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
