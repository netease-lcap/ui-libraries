/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    ideusage: {
      "idetype": "container",
      "structured": true,
      "childAccept": "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)"
    }
  })
  @Component({
    title: '导航菜单',
    icon: 'menu',
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
    open(): any { }

    @Method({
      title: '收起',
      description: '收起指定的 sub-menu',
    })
    close(): any { }
  }

  export class ElMenuOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '模式',
      description: '模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    mode: 'horizontal' | 'vertical' = 'vertical';

    @Prop({
      group: '状态属性',
      title: '是否水平折叠收起菜单',
      description: '是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）',
      setter: { concept: 'SwitchSetter' },
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
      group: '数据属性',
      title: '当前激活菜单的index',
      description: '当前激活菜单的 index',
      setter: { concept: 'InputSetter' },
    })
    defaultActive: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '当前打开的sub-menu的index的数组',
      description: '当前打开的 sub-menu 的 index 的数组',
      setter: { concept: 'InputSetter' },
    })
    defaultOpeneds: nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '状态属性',
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

    @Prop({
      group: '状态属性',
      title: '是否使用 vue-router 的模式',
      description:
        '是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转',
      setter: { concept: 'SwitchSetter' },
    })
    router: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
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
      title: 'sub-menu展开时',
      description: 'sub-menu 展开的回调',
    })
    onOpen: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

    @Event({
      title: 'sub-menu收起时',
      description: 'sub-menu 收起的回调',
    })
    onClose: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

    @Slot({
      title: '默认',
      description: '默认',
      snippets: [
        { title: 'Submenu', code: '<el-submenu></el-submenu>' },
        { title: 'Menu Item', code: '<el-menu-item></el-menu-item>' },
        {
          title: 'Menu Item Group',
          code: '<el-menu-item-group></el-menu-item-group>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "structured": true, // 配合默认插槽 snippets选项 添加子组件
      "parentAccept": "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'",
      "childAccept": "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)"
    }
  })
  @Component({
    title: 'Submenu',
    icon: 'submenu',
    description: '',
    group: 'Navigation',
  })
  export class ElSubmenu extends ViewComponent {
    constructor(options?: Partial<ElSubmenuOptions>) {
      super();
    }
  }

  export class ElSubmenuOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '唯一标志',
      description: '唯一标志',
      setter: { concept: 'InputSetter' },
    })
    index: nasl.core.String | any = null;

    @Prop({
      group: '样式属性',
      title: '弹出菜单类名',
      description: '弹出菜单的自定义类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '展开 sub-menu 的延时',
      description: '展开 sub-menu 的延时',
      setter: { concept: 'NumberInputSetter' },
    })
    showTimeout: nasl.core.Decimal = 300;

    @Prop({
      group: '主要属性',
      title: '展开 sub-menu 的延时',
      description: '展开 sub-menu 的延时',
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
        { title: 'Submenu', code: '<el-submenu></el-submenu>' },
        { title: 'Menu Item', code: '<el-menu-item></el-menu-item>' },
        {
          title: 'Menu Item Group',
          code: '<el-menu-item-group></el-menu-item-group>',
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
    show: false,
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'"
    }
  })
  @Component({
    title: 'Menu Item',
    icon: 'menu-item',
    description: '',
    group: 'Navigation',
  })
  export class ElMenuItem extends ViewComponent {
    constructor(options?: Partial<ElMenuItemOptions>) {
      super();
    }
  }

  export class ElMenuItemOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '唯一标志',
      description: '唯一标志',
      setter: { concept: 'InputSetter' },
    })
    index: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Vue Router 路径对象',
      description: 'Vue Router 路径对象',
      setter: { concept: 'InputSetter' },
    })
    route: object;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Slot({
      title: '标题',
      description: '标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "structured": true,
      "childAccept": "['el-submenu', 'el-menu-item', 'el-menu-item-group'].includes(target.tag)",
      "parentAccept": "target.tag === 'el-menu' || target.tag === 'el-submenu' || target.tag === 'el-menu-item-group'"
    }
  })
  @Component({
    title: 'Menu Item Group',
    icon: 'menu-item-group',
    description: '',
    group: 'Navigation',
  })
  export class ElMenuItemGroup extends ViewComponent {
    constructor(options?: Partial<ElMenuItemGroupOptions>) {
      super();
    }
  }

  export class ElMenuItemGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '分组标题',
      description: '分组标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Slot({
      title: '默认',
      description: '默认',
      snippets: [
        { title: 'Submenu', code: '<el-submenu></el-submenu>' },
        { title: 'Menu Item', code: '<el-menu-item></el-menu-item>' },
        {
          title: 'Menu Item Group',
          code: '<el-menu-item-group></el-menu-item-group>',
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
