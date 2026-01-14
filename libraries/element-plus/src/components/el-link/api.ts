/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
      editable: 'text',
      textholder: 'text',
    },
  })
  @Component({
    title: '链接',
    icon: 'link',
    description: '文字超链接',
    group: 'Display',
  })
  export class ElLink extends ViewComponent {
    @Prop({
      title: '禁用状态',
      description: '是否禁用链接',
      docDescription: '开启后，链接将变为禁用状态，用户无法点击。禁用状态下链接会显示为灰色。',
    })
    disabled: nasl.core.Boolean;

    constructor(options?: Partial<ElLinkOptions>) {
      super();
    }
  }

  export class ElLinkOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '链接文本',
      description: '链接显示的文本内容',
      docDescription: '设置链接显示的文本内容，用于向用户说明链接的目标。',
    })
    text: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '链接类型',
      description: '选择链接的视觉类型',
      docDescription:
        '控制链接的视觉样式和主题色。默认：标准链接；主要：强调链接；成功：绿色主题；警告：橙色主题；危险：红色主题；信息：蓝色主题。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '主要' },
          { title: '成功' },
          { title: '警告' },
          { title: '危险' },
          { title: '信息' },
        ],
      },
    })
    type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '跳转类型',
      description: '选择链接的跳转类型',
      docDescription: '控制链接的跳转方式。页面跳转：跳转到指定页面；下载链接：触发文件下载。',
      bindHide: true,
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '页面跳转' }, { title: '下载链接' }],
      },
    })
    linkType: 'destination' | 'download' = 'destination';

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用链接',
      docDescription: '开启后，链接将变为禁用状态，用户无法点击。禁用状态下链接会显示为灰色。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '显示下划线',
      description: '是否显示文本下划线',
      docDescription: '开启后，链接文本下方会显示下划线。关闭后不显示下划线，更简洁。',
      setter: { concept: 'SwitchSetter' },
    })
    underline: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '链接地址',
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '左图标',
      description: '左图标组件',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右图标',
      description: '右图标组件',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    rightIcon: nasl.core.String;

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
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

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: {
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

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: {
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

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: {
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

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: {
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

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: {
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

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: {
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

    @Event({
      title: '失焦时',
      description: '失焦时触发',
    })
    onBlur: (event: any) => any;
    @Event({
      title: '切换路由前',
      description: '使用 router 相关属性切换路由前触发',
  })
  onBeforeNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
  }) => any;

  @Event({
      title: '切换路由后',
      description: '使用 router 相关属性切换路由后触发',
  })
  onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
  }) => any;
  }
}
