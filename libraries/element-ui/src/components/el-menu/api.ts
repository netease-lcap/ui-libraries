/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept:
        "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)",
      events: {
        click: true,
      },
      additionalAttribute: {
        ':collapseTransition': '"false"',
        'menuTrigger': 'click',
      },
      snippetsDisplayConditions: {
        default:
          "this.getAttribute('mode')?.value === 'vertical' ? [0, 1, 2] : [0, 1]",
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
    open(): any {}

    @Method({
      title: '收起',
      description: '收起指定的 sub-menu',
    })
    close(): any {}
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
      settable: true,
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

    @Prop({
      group: '主要属性',
      title: '子菜单打开的触发方式',
      description: '子菜单打开的触发方式(只在 mode 为 horizontal 时有效)',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '鼠标悬停时' }, { title: '鼠标点击时' }],
      },
    })
    menuTrigger: 'hover' | 'click' = 'hover';

    // @Prop({
    //   group: '主要属性',
    //   title: '是否使用 vue-router 的模式',
    //   description:
    //     '是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // router: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否开启折叠动画',
      description: '是否开启折叠动画',
      setter: { concept: 'SwitchSetter' },
    })
    collapseTransition: nasl.core.Boolean = true;

    @Event({
      title: '菜单激活时',
      description: '菜单激活回调',
    })
    onSelect: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

    @Event({
      title: '子菜单展开时',
      description: '子菜单展开的回调',
    })
    onOpen: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

    @Event({
      title: '子菜单收起时',
      description: '子菜单收起的回调',
    })
    onClose: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

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
        {
          title: '菜单组',
          code: '<el-menu-item-group><template #title><el-text text="菜单分组"></el-text></template><template #default><el-menu-item><template #default><el-text>菜单项</el-text></template></el-menu-item></template></el-menu-item-group>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '导航栏左侧',
      description: '导航栏左侧',
    })
    slotLeft: () => Array<ViewComponent>;

    @Slot({
      title: '导航栏右侧',
      description: '导航栏右侧',
    })
    slotRight: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true, // 配合默认插槽 snippets选项 添加子组件
      parentAccept:
        "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'",
      childAccept:
        "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)",
      events: {
        click: true,
      },
      displaySlotInline: {
        title: true,
      },
      snippetsDisplayConditions: {
        default:
          "this.getAncestor('el-menu')?.getAttribute('mode')?.value === 'vertical' ? [0, 1, 2] : [0, 1]",
      },
    },
  })
  @Component({
    title: '子菜单',
    description: '子菜单',
  })
  export class ElSubmenu extends ViewComponent {
    constructor(options?: Partial<ElSubmenuOptions>) {
      super();
    }
  }

  export class ElSubmenuOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '唯一标识',
      description: '唯一标识',
      setter: { concept: 'InputSetter' },
    })
    index: nasl.core.String | null = null;

    @Prop({
      group: '样式属性',
      title: '弹出菜单类名',
      description: '弹出菜单的自定义类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '展开子菜单的延时',
      description: '展开子菜单的延时',
      setter: { concept: 'NumberInputSetter' },
    })
    showTimeout: nasl.core.Decimal = 300;

    @Prop({
      group: '主要属性',
      title: '展开子菜单的延时',
      description: '展开子菜单的延时',
      setter: { concept: 'NumberInputSetter' },
    })
    hideTimeout: nasl.core.Decimal = 300;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '是否将弹出菜单插入至 body 元素',
      description:
        '是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性',
      setter: { concept: 'SwitchSetter' },
    })
    popperAppendToBody: nasl.core.Boolean;

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
        {
          title: '菜单组',
          code: '<el-menu-item-group><template #title><el-text text="菜单分组"></el-text></template><template #default><el-menu-item><template #default><el-text>菜单项</el-text></template></el-menu-item></template></el-menu-item-group>',
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

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept:
        "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'",
    },
  })
  @Component({
    title: '菜单项',
    description: '菜单项',
  })
  export class ElMenuItem extends ViewComponent {
    constructor(options?: Partial<ElMenuItemOptions>) {
      super();
    }
  }

  export class ElMenuItemOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '唯一标识',
      description: '唯一标识',
      setter: { concept: 'InputSetter' },
    })
    index: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Vue Router 路径对象',
    //   description: 'Vue Router 路径对象',
    //   setter: { concept: 'InputSetter' },
    // })
    // route: object;

    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

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
      childAccept:
        "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)",
      parentAccept:
        "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'",
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
    // @Prop({
    //   group: '主要属性',
    //   title: '分组标题',
    //   description: '分组标题',
    //   setter: { concept: 'InputSetter' },
    // })
    // title: nasl.core.String;

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
