/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    sourceDocURL: 'https://element.eleme.io/#/zh-CN/component/menu',
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
      displaySlotConditions: {
        left: "this.getAttribute('mode')?.value === 'horizontal'",
        right: "this.getAttribute('mode')?.value === 'horizontal'",
      }
    },
  })
  @Component({
    title: '导航菜单',
    icon: 'navbar-multi',
    description: '为网站提供导航功能的菜单。',
    group: 'Navigation',
  })
  export class ElMenu<T, V> extends ViewComponent {
    constructor(options?: Partial<ElMenuOptions<T, V>>) {
      super();
    }

    @Method({
      title: '展开',
      description: '展开指定的 sub-menu',
    })
    open(
      @Param({
        title: '子菜单唯一标识'
      })
      index: nasl.core.String
    ): void { }

    @Method({
      title: '收起',
      description: '收起指定的 sub-menu',
    })
    close(
      @Param({
        title: '子菜单唯一标识'
      })
      index: nasl.core.String,
    ): void { }
  }

  export class ElMenuOptions<T, V> extends ViewComponentOptions {
    @Prop<ElMenuOptions<T, V>, 'hasDataSource'>({
      group: '数据属性',
      title: '数据源配置',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        { clear: ['dataSource', 'dataSchema', 'titleField', 'valueField', 'iconField', 'childrenField', 'typeField', 'itemProps'] }
      ],
    })
    hasDataSource: nasl.core.Boolean = false;

    @Prop<ElMenuOptions<T, V>, 'dataSource'>({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List\<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      if: _ => _.hasDataSource === true,
      bindOpen: true,
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop<ElMenuOptions<T, V>, 'dataSchema'>({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示',
      if: _ => _.hasDataSource === true,
    })
    dataSchema: T;

    @Prop<ElMenuOptions<T, V>, 'titleField'>({
      group: '数据属性',
      title: '标题字段',
      description: '集合的元素类型中，用于显示标题的属性名称，默认为title',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: _ => _.hasDataSource === true,
    })
    titleField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElMenuOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性， 默认为value',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: _ => _.hasDataSource === true,
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElMenuOptions<T, V>, 'iconField'>({
      group: '数据属性',
      title: '图标属性字段',
      description: '集合的元素类型中，用于图标的属性名称， 默认为icon',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: _ => _.hasDataSource === true,
    })
    iconField: (item: T) => any = ((item: any) => item.icon) as any;

    @Prop<ElMenuOptions<T, V>, 'propsField'>({
      group: '数据属性',
      title: '菜单项属性字段',
      description: '集合的元素类型中，用于菜单项的属性名称, 默认为props',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: _ => _.hasDataSource === true,
    })
    propsField: (item: T) => any = ((item: any) => item.itemProps) as any;

    @Prop<ElMenuOptions<T, V>, 'typeField'>({
      group: '数据属性',
      title: '组件标识属性字段',
      description: '标识当前配置属于什么组件，默认值为 type，【需要注意的是「组件标识」可选值有 item、submenu、group，默认为 item】',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: _ => _.hasDataSource === true,
    })
    typeField: (item: T) => any = ((item: any) => item.to) as any;

    @Prop<ElMenuOptions<T, V>, 'childrenField'>({
      group: '数据属性',
      title: '子节点字段',
      description: '集合的元素类型中，用于标识子节点的属性， 默认为children',
      docDescription: '集合的元素类型中，用于标识子级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: _ => _.hasDataSource === true,
    })
    childrenField: (item: T) => any;

    @Prop<ElMenuOptions<T, V>, 'mode'>({
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

    @Prop<ElMenuOptions<T, V>, 'collapse'>({
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

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: MouseEvent) => any;

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
      forceRefresh: 'parent',
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
      title: '隐藏子菜单的延时',
      description: '隐藏子菜单的延时',
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
