/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '导航栏',
    icon: 'navbar-multi',
    description:
      '通常用于页面顶部的导航菜单，放置 Logo、导航链接、用户信息等。',
    group: 'Navigation',
  })
  export class ProLayout extends ViewComponent {
    constructor(options?: Partial<ProLayoutOptions>) {
      super();
    }
  }

  export class ProLayoutOptions extends ViewComponentOptions {
    // @Prop({
    //   title: '使用路由',
    //   description: '是否根据 vue-router 来控制选择项',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // router: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '左上角Title',
      description: '左上角Title',
      docDescription: '左上角Title',
    })
    title: nasl.core.String = '应用名称';

    @Prop({
      group: '主要属性',
      title: '左上角 logo 的 url',
      description: '左上角 logo 的 url',
      docDescription: '左上角 logo 的 url',
    })
    logo: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右上角头像 logo 的 url',
      description: '右上角头像 logo 的 url',
      docDescription: '右上角头像 logo 的 url',
    })
    avatarSrc: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右上角用户名',
      description: '右上角用户名',
      docDescription: '右上角用户名',
    })
    avatarTitle: nasl.core.String = '张梦燕';

    @Prop<ProLayoutOptions, 'layout'>({
      group: '样式属性',
      title: '菜单模式',
      docDescription: '菜单模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '侧边导航' },
          { title: '顶部导航' },
          { title: '混合导航' },
        ],
      },
    })
    layout: 'side' | 'top' | 'mix' = 'mix';

    @Prop({
      group: '样式属性',
      title: '侧边菜单宽度',
      description: '侧边菜单宽度',
      docDescription: '侧边菜单宽度	',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    siderWidth: nasl.core.Decimal = 208;

    @Prop({
      group: '样式属性',
      title: '是否固定导航',
      description: '是否固定导航',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    fixSiderbar: nasl.core.Boolean = false;

    @Prop({
      title: '值',
      description: '当前选择的值',
      sync: true,
    })
    openKeys: nasl.core.String;

    // @Prop({
    //   title: '字段',
    //breadcrumbProps	breadcrumbRender
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

    @Slot({
      title: '链接区域',
      description: '链接区域',
      snippets: [
        {
          title: '导航项',
          code: '<MenuItem label="导航项" path="123"></MenuItem>',
        },
      ],
    })
    slotMenuSlot: () => Array<MenuItem | MenuDivider>;

    @Slot({
      title: '右上角操作区',
      description: '右上角操作区',
    })
    slotAvatarRender: () => Array<ViewComponent>;

    @Slot({
      title: '内容区',
      description: '内容区',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
