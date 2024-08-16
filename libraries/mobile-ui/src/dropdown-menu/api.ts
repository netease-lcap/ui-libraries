/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '下拉菜单',
    icon: 'dropdown-menu',
    description: '向下弹出的菜单列表。',
    group: "Navigation"
  })
  export class VanDropdownMenu extends ViewComponent {
    @Prop({
      title: '打开状态',
    })
    opened: nasl.core.Boolean;

    constructor(options?: Partial<VanDropdownMenuOptions>) {
      super();
    }
  }
  export class VanDropdownMenuOptions extends ViewComponentOptions {
    @Prop({
      title: '菜单值',
      description: '菜单值',
      sync: true
    })
    private value: nasl.core.String;
    @Prop({
      title: '是否开启路由模式',
      description: '是否开启路由模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private route: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '展开方向',
      description: '设置下拉菜单的展开方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '上'
        }, {
          title: '下'
        }]
      }
    })
    direction: 'up' | 'down' = 'down';
    @Prop({
      group: '交互属性',
      title: '显示遮罩层',
      setter: {
        concept: "SwitchSetter"
      }
    })
    overlay: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      description: '是否点击遮罩层后关闭菜单',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = true;
    @Slot({
      title: 'undefined',
      description: '插入`<van-dropdown-menu>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '菜单项',
        code: '<van-dropdown-item title="标题"><van-dropdown-item-son clickable :isLink="false"><template #title>标题</template></van-dropdown-item-son></van-dropdown-item>'
      }]
    })
    slotDefault: () => Array<VanDropdownItem>;
  }
  @Component({
    title: '菜单项',
    group: "Navigation"
  })
  export class VanDropdownItem extends ViewComponent {
    constructor(options?: Partial<VanDropdownItemOptions>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '切换菜单展示状态'
    })
    toggle(
      @Param({
        title: '展示',
        description: '展示'
      })
      show?: nasl.core.Boolean
    ): any {}
  }
  export class VanDropdownItemOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识菜单项的值',
      sync: true
    })
    value: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '标题',
      implicitToString: true,
    })
    title: nasl.core.String = '标题';
    @Prop({
      group: '交互属性',
      title: '点击菜单子项关闭',
      description: '是否通过点击菜单子项关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    shutself: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击选项导致 value 变化时触发',
      description: '点击选项导致 value 变化时触发'
    })
    onChange: (event: nasl.core.String) => void;
    @Event({
      title: '打开菜单栏时触发',
      description: '打开菜单栏时触发'
    })
    onOpen: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '关闭菜单栏时触发',
      description: '关闭菜单栏时触发'
    })
    onClose: (event: nasl.ui.BaseEvent) => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-dropdown-item-son>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '菜单项',
        code: '<van-dropdown-item-son clickable :isLink="false"><template #title>标题</template></van-dropdown-item-son>'
      }]
    })
    slotDefault: () => Array<VanDropdownItemSon>;
  }
  @Component({
    title: '菜单子项',
    group: "Navigation"
  })
  export class VanDropdownItemSon extends ViewComponent {
    constructor(options?: Partial<VanDropdownItemSonOptions>) {
      super();
    }
  }
  export class VanDropdownItemSonOptions extends ViewComponentOptions {
    @Prop({
      title: '右侧文本',
      description: '右侧文本'
    })
    private rtitle: nasl.core.String;
    @Prop({
      title: '标题下方的描述信息',
      description: '标题下方的描述信息'
    })
    private label: nasl.core.String = '这是单元格';
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识菜单子项的值'
    })
    value: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '箭头',
      description: '是否显示箭头图标',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isLink: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '箭头方向',
      description: '设置箭头方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '上'
        }, {
          title: '下'
        }, {
          title: '右'
        }]
      }
    })
    arrowDirection: 'left' | 'up' | 'down' | 'right' = 'right';
    @Prop({
      group: '主要属性',
      title: '垂直居中',
      setter: {
        concept: "SwitchSetter"
      }
    })
    center: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '菜单子项的左侧文本',
      implicitToString: true,
    })
    title: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '图标',
      description: '菜单子项的显示图标',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '链接类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '页面跳转'
        }, {
          title: '下载链接'
        }]
      }
    })
    linkType: 'destination' | 'download' = 'destination';
    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '打开方式',
      description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '新窗口'
        }, {
          title: '当前窗口'
        }, {
          title: '父级窗口'
        }, {
          title: '顶级窗口'
        }]
      }
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
    @Event({
      title: '点击后',
      description: '点击某一项后触发'
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
  }) => void;
    @Slot({
      title: '右侧文本',
      description: '插入文本或 HTML。'
    })
    slotDefault: () => Array<ViewComponent>;
    @Slot({
      title: '标题',
      description: '文本'
    })
    slotTitle: () => Array<ViewComponent>;
    @Slot({
      title: '右侧图标',
      description: '右侧图标。'
    })
    private slotRightIcon: () => Array<ViewComponent>;
  }
}
