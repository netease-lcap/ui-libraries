/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: "element",
      editable: "text",
      textholder: "text",
      forceUpdateWhenAttributeChange: true,
    }
  })
  @Component({
    title: '按钮',
    icon: 'button',
    description: '常用的操作按钮。',
    group: 'Display',
  })
  export class ElButton extends ViewComponent {
    constructor(options?: Partial<ElButtonOptions>) {
      super();
    }

    @Method({
      title: '打开加载中',
      description: '打开加载中',
    })
    startLoading(): void {}

    @Method({
      title: '关闭加载中',
      description: '关闭加载中',
    })
    closeLoading(): void {}
  }

  export class ElButtonOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '按钮内容',
      setter: { concept: 'InputSetter' },
      implicitToString: true,
    })
    text: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '设置按钮大小',
      docDescription: '按钮尺寸，支持设置 中型、小、迷你。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '大' },
          { title: '中型' },
          { title: '正常' },
          { title: '小' },
        ],
      },
    })
    size: 'large' | 'medium' | 'small' | 'mini' = 'small';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '设置按钮样式类型',
      docDescription:
        '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮按钮。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要按钮' },
          { title: '成功按钮' },
          { title: '警告按钮' },
          { title: '危险按钮' },
          { title: '信息按钮' },
          { title: '文字按钮' },
          { title: '默认按钮' },
        ],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | '' = '';

    @Prop({
      group: '主要属性',
      title: '朴素',
      description: '是否朴素按钮',
      setter: { concept: 'SwitchSetter' },
    })
    plain: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '圆角',
      description: '是否圆角按钮',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '圆形',
      description: '是否圆形按钮',
      setter: { concept: 'SwitchSetter' },
    })
    circle: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Loading',
      description: '是否加载中状态',
      setter: { concept: 'SwitchSetter' },
    })
    private loading: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用状态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '图标类名',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      title: '图标位置',
      description: '设置图标居左或居右显示',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左' }, { title: '右' }],
      },
    })
    iconPosition: 'left' | 'right' = 'left';

    @Prop({
      group: '状态属性',
      title: '自动获取焦点',
      description: '是否默认聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    private autofocus: nasl.core.Boolean = false;

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
  }
}
