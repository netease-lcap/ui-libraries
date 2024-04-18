/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '导航栏',
    // icon: 'navbar-multi',
    description:
      '通常用于页面顶部的导航菜单，放置 Logo、导航链接、用户信息等。',
    // group: 'Navigation',
  })
  export class Menu extends ViewComponent {
    constructor(options?: Partial<MenuOptions>) {
      super();
    }
  }

  export class MenuOptions extends ViewComponentOptions {
    // @Prop({
    //   title: '使用路由',
    //   description: '是否根据 vue-router 来控制选择项',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // router: nasl.core.Boolean = true;

    @Prop({
      title: '值',
      description: '当前选择的值',
      sync: true,
    })
    openKeys: nasl.core.String;

    // @Prop({
    //   title: '字段',
    //   description: '显示文本字段',
    // })
    // private field: nasl.core.String = 'text';

    // @Prop({
    //   title: '只读',
    //   description: '是否只读',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // readonly: nasl.core.Boolean = false;

    // @Prop({
    //   title: '禁用',
    //   description: '是否禁用',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // disabled: nasl.core.Boolean = false;

    @Event({
      title: '点击',
      description:
        '点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    // @Event({
    //   title: '输入前',
    //   description: '选择某一项前触发',
    // })
    // onBeforeSelect: (event: { value: nasl.core.String; oldValue: nasl.core.String; selectedItem: any; item: any; oldItem: any }) => any;

    // @Event({
    //   title: '输入时',
    //   description: '选择某一项时触发',
    // })
    // onInput: (event: nasl.core.String) => any;

    @Event({
      title: '被选中时',
      description: '选择某一项时触发',
    })
    onSelect: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      selectedItem: any;
      item: any;
      oldItem: any;
    }) => any;

    // @Event({
    //   title: '改变后',
    //   description: '选择值改变时触发',
    // })
    // onChange: (event: { value: nasl.core.String; oldValue: nasl.core.String; selectedItem: any; item: any; oldItem: any }) => any;

    @Slot({
      title: '链接区域',
      description: '链接区域',
      snippets: [
        {
          title: '导航项',
          code: '<MenuItem style="line-height:60px" label={<Text children="导航项目" style="color:inherit" />}></MenuItem>',
        },
      ],
    })
    slotDefault: () => Array<MenuItem | MenuDivider>;

    // @Slot({
    //   title: '左部区域',
    //   description: '左部区域，一般放置 logo 等',
    // })
    // slotLeft: () => Array<ViewComponent>;

    // @Slot({
    //   title: '右部区域',
    //   description: '右部区域，一般放置用户个人信息等',
    // })
    // slotRight: () => Array<ViewComponent>;
  }

  @Component({
    title: '菜单项',
    description: '菜单项',
  })
  export class MenuItem extends ViewComponent {
    constructor(options?: Partial<MenuItemOptions>) {
      super();
    }
  }

  export class MenuItemOptions extends ViewComponentOptions {
    @Prop({
      group: '基础信息',
      title: '标题自定义',
      description: '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
      docDescription:
        '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    labelIsSlot: nasl.core.Boolean = false;

    @Prop<MenuItemOptions, 'label'>({
      group: '基础信息',
      title: '标题',
      docDescription: '选择分组的标题，标题只有在没有文本插槽的时候生效',
      if: (_) => _.labelIsSlot === false,
    })
    label: nasl.core.String = '表单项名称';

    @Prop({
      title: '唯一标识',
      description: '在导航中使用可以用来跳转或标识选中状态',
    })
    path: any;

    @Prop({
      title: '图标',
      description: '图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    icon: nasl.core.String = '';

    @Prop({
      title: '禁用',
      description: '禁用此项',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      title: '相关对象',
      description: '相关对象。当选择此项时，抛出的事件会传递该对象，便于开发',
    })
    private item: any;

    // @Prop({
    //   title: '链接类型',
    //   description: '链接类型',
    //   bindHide: true,
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '页面跳转' }, { title: '下载链接' }],
    //   },
    // })
    // linkType: 'destination' | 'download' = 'destination';

    // @Prop({
    //   title: '链接',
    //   description: '链接地址',
    // })
    // hrefAndTo: nasl.core.String;

    // @Prop({
    //   title: '打开方式',
    //   description: '链接跳转方式',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '新窗口' }, { title: '当前窗口' }, { title: '父级窗口' }, { title: '顶级窗口' }],
    //   },
    // })
    // target: '_blank' | '_self' | '_parent' | '_top' = '_self';

    @Prop({
      title: '路由链接',
      description:
        '需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。',
    })
    private to: nasl.core.String;

    @Prop({
      title: '替换地址',
      description:
        '需要 vue-router，与`<router-link>`的`replace`属性相同。如果为`true`，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history `记录。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    private replace: nasl.core.Boolean = false;

    @Prop({
      title: '精确匹配',
      description:
        '需要 vue-router，与`<router-link>`的`exact`属性相同。是否与路由完全一致时才高亮显示。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    private exact: nasl.core.Boolean = false;

    @Event({
      title: '点击',
      description: '点击此项时触发',
    })
    onClick: (event: any) => any;

    // @Event({
    //   title: '选择前',
    //   description: '选择此项前触发',
    // })
    // onBeforeSelect: (event: { value: nasl.core.String; oldValue: nasl.core.String; selectedItem: any; item: any; oldItem: any }) => any;

    // @Event({
    //   title: '导航前',
    //   description: '使用 router 相关属性切换路由前触发',
    // })
    // onBeforeNavigate: (event: { to: nasl.core.String; replace: nasl.core.Boolean; append: nasl.core.Boolean }) => any;

    // @Event({
    //   title: '导航',
    //   description: '使用router相关属性切换路由时触发',
    // })
    // onNavigate: (event: { to: nasl.core.String; replace: nasl.core.Boolean; append: nasl.core.Boolean }) => any;
    @Slot({
      title: '导航名称',
      description: '导航项自定义',
    })
    slotLabelSlot: () => Array<ViewComponent>;

    @Slot({
      title: '默认',
      description: '导航项自定义',
      snippets: [
        {
          title: '导航项',
          code: '<MenuItem label="导航项" ></MenuItem>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '导航栏分割线',
    description: '导航栏的分割线',
  })
  export class MenuDivider extends ViewComponent {
    constructor(options?: Partial<MenuDividerOptions>) {
      super();
    }
  }

  export class MenuDividerOptions extends ViewComponentOptions {}

  // @Component({
  //   title: '导航栏下拉菜单',
  //   description: '导航栏下拉菜单',
  // })
  // export class UNavbarDropdown extends ViewComponent {
  //   constructor(options?: Partial<UNavbarDropdownOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarDropdownOptions extends ViewComponentOptions {
  //   @Prop({
  //     title: '触发方式',
  //     description: '触发方式',
  //     setter: {
  //       concept: 'EnumSelectSetter',
  //       options: [{ title: '点击' }, { title: '悬浮' }, { title: '右击' }, { title: '双击' }, { title: '手动' }],
  //     },
  //   })
  //   trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual' = 'hover';

  //   @Prop({
  //     title: '弹出位置',
  //     description: '弹出方位',
  //     setter: {
  //       concept: 'EnumSelectSetter',
  //       options: [
  //         { title: '上' },
  //         { title: '下' },
  //         { title: '左' },
  //         { title: '右' },
  //         { title: '上左' },
  //         { title: '上右' },
  //         { title: '下左' },
  //         { title: '下右' },
  //         { title: '左上' },
  //         { title: '左下' },
  //         { title: '右上' },
  //         { title: '右下' },
  //       ],
  //     },
  //   })
  //   placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' = 'bottom';

  //   @Prop({
  //     title: '禁用',
  //     description: '是否禁用',
  //     setter: {
  //       concept: 'SwitchSetter',
  //     },
  //   })
  //   disabled: nasl.core.Boolean = false;

  //   @Slot({
  //     title: '默认',
  //     description: '插入文本或 HTML',
  //   })
  //   slotDefault: () => Array<ViewComponent>;

  //   @Slot({
  //     title: '标题',
  //     description: '插入文本或 HTML',
  //   })
  //   slotTitle: () => Array<ViewComponent>;
  // }

  // @Component({
  //   title: '导航菜单',
  //   description: '导航菜单',
  // })
  // export class UNavbarMenu extends ViewComponent {
  //   constructor(options?: Partial<UNavbarMenuOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarMenuOptions extends ViewComponentOptions {
  //   @Slot({
  //     title: '默认',
  //     description: '插入文本或 HTML',
  //   })
  //   slotDefault: () => Array<ViewComponent>;
  // }

  @Component({
    title: '导航菜单分组',
    description: '导航菜单分组',
  })
  export class MenuItemGroup extends ViewComponent {
    constructor(options?: Partial<MenuItemGroupOptions>) {
      super();
    }
  }

  export class MenuItemGroupOptions extends ViewComponentOptions {
    @Prop({
      title: '文本',
      description: '文本内容',
    })
    title: nasl.core.String;

    @Prop({
      title: '链接地址',
      description: '链接地址',
    })
    path: any;

    @Prop({
      title: '图标',
      description: '图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    icon: nasl.core.String = '';

    @Slot({
      title: '默认',
      description: '插入<MenuItem>子组件',
      snippets: [
        {
          title: '选项',
          code: '<MenuItem label={<Text children="选项"></Text>}></MenuItem>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '默认',
      description: '插入<MenuItem>子组件',
    })
    slotLabel: () => Array<ViewComponent>;
  }
  @Component({
    title: '导航菜单组',
    description: '导航菜单组',
  })
  export class MenuSubMenu extends ViewComponent {
    constructor(options?: Partial<MenuSubMenuOptions>) {
      super();
    }
  }

  export class MenuSubMenuOptions extends ViewComponentOptions {
    // @Prop({
    //   title: '文本',
    //   description: '文本内容',
    // })
    // title: nasl.core.String;

    @Prop({
      title: '值',
      description: '此项的值',
    })
    key: any;

    @Prop({
      title: '图标',
      description: '图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    icon: nasl.core.String = '';

    @Slot({
      title: '导航组自定义',
      description: '导航组自定义',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '默认',
      description: '导航项自定义',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  // @Component({
  //   title: '导航菜单项',
  //   description: '导航菜单项',
  // })
  // export class UNavbarMenuItem extends ViewComponent {
  //   constructor(options?: Partial<UNavbarMenuItemOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarMenuItemOptions extends ViewComponentOptions {
  //   @Event({
  //     title: '点击',
  //     description: '在元素上按下并释放任意鼠标按钮时触发。',
  //   })
  //   onClick: (event: {
  //     altKey: nasl.core.Boolean;
  //     button: nasl.core.Integer;
  //     clientX: nasl.core.Integer;
  //     clientY: nasl.core.Integer;
  //     ctrlKey: nasl.core.Boolean;
  //     metaKey: nasl.core.Boolean;
  //     movementX: nasl.core.Integer;
  //     movementY: nasl.core.Integer;
  //     offsetX: nasl.core.Integer;
  //     offsetY: nasl.core.Integer;
  //     pageX: nasl.core.Integer;
  //     pageY: nasl.core.Integer;
  //     screenX: nasl.core.Integer;
  //     screenY: nasl.core.Integer;
  //     which: nasl.core.Integer;
  //   }) => any;

  //   @Slot({
  //     title: '默认',
  //     description: '插入文本或 HTML',
  //   })
  //   slotDefault: () => Array<ViewComponent>;
  // }

  // @Component({
  //   title: '导航菜单分割线',
  //   description: '导航菜单分割线',
  // })
  // export class UNavbarMenuDivider extends ViewComponent {
  //   constructor(options?: Partial<UNavbarMenuDividerOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarMenuDividerOptions extends ViewComponentOptions {}

  // @Component({
  //   title: '导航选择',
  //   description: '导航选择',
  // })
  // export class UNavbarSelect extends ViewComponent {
  //   constructor(options?: Partial<UNavbarSelectOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarSelectOptions extends ViewComponentOptions {}

  // @Component({
  //   title: '导航选择分组',
  //   description: '导航选择分组',
  // })
  // export class UNavbarSelectGroup extends ViewComponent {
  //   constructor(options?: Partial<UNavbarSelectGroupOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarSelectGroupOptions extends ViewComponentOptions {}

  // @Component({
  //   title: '导航选择项',
  //   description: '导航选择项',
  // })
  // export class UNavbarSelectItem extends ViewComponent {
  //   constructor(options?: Partial<UNavbarSelectItemOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarSelectItemOptions extends ViewComponentOptions {}

  // @Component({
  //   title: '导航选择分割线',
  //   description: '导航选择分割线',
  // })
  // export class UNavbarSelectDivider extends ViewComponent {
  //   constructor(options?: Partial<UNavbarSelectDividerOptions>) {
  //     super();
  //   }
  // }

  // export class UNavbarSelectDividerOptions extends ViewComponentOptions {}
}
