/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '文本',
    icon: 'text',
    description: '用于展示文字或表达式',
    group: 'Display',
  })
  export class Text extends ViewComponent {
    constructor(options?: Partial<TextOptions>) {
      super();
    }
  }

  export class TextOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '显示文本内容',
      docDescription: '显示的文本内容',
      implicitToString: true,
      // sync:false,
    })
    children:  nasl.core.String
      // | nasl.core.Integer
      // | nasl.core.Time
      // | nasl.core.Date
      // | nasl.core.DateTime
      // | nasl.core.Decimal;

    // @Prop({
    //   group: '主要属性',
    //   title: '主题颜色',
    //   description: '设置主题颜色样式',
    //   docDescription: '支持定义文本的颜色，支持默认、主要色、辅助色、成功色、警告色、错误色、禁用色',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '默认' }, { title: '主要色' }, { title: '辅助色' }, { title: '成功色' }, { title: '警告色' }, { title: '错误色' }, { title: '禁用色' }],
    //   },
    // })
    // color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled' = 'default';

    // @Prop({
    //   group: '主要属性',
    //   title: '展示方式',
    //   description: '行内展示，或块级换行展示',
    //   docDescription: '文本展示方式，支持行内展示或块级换行展示',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '行内' }, { title: '块级' }],
    //   },
    // })
    // display: 'inline' | 'block' = 'inline';

    @Prop({
      group: '主要属性',
      title: '隐藏过长文本',
      description: '文本过长时省略显示',
      docDescription:
        '文本过长的处理方式，支持默认不处理、多余的文本省略、强制换行且英文自动添加换行符、始终不换行共四种隐藏处理方式，缺省情况为默认不处理',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ellipsis: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: '是否可编辑',
    //   bindHide: true,
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // editable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '是否可拷贝',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    copyable: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '文本类型',
      description: '设置文本类型',
      docDescription: '设置文本类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '普通文本' },
          { title: '辅助文本' },
          { title: '成功文本' },
          { title: '警告文本' },
          { title: '危险文本' },
        ],
      },
    })
    type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' =
      'default';

    @Prop({
      group: '样式属性',
      title: '添加代码样式',
      setter: {
        concept: 'SwitchSetter',
      },
      bindHide: true,
    })
    code: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '添加删除线样式',
      setter: {
        concept: 'SwitchSetter',
      },
      bindHide: true,
    })
    delete: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '禁用文本',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '添加键盘样式',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    keyboard: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '添加标记样式',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    mark: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '是否加粗',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    strong: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '是否斜体',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    italic: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '添加下划线样式',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    underline: nasl.core.Boolean;

    // @Prop({
    //   group: '样式属性',
    //   title: '尺寸',
    //   description: '设置文本大小',
    //   docDescription: '文本框尺寸，支持小、正常、大、巨大',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '默认' }, { title: '小' }, { title: '正常' }, { title: '大' }, { title: '巨大' }],
    //   },
    // })
    // size: 'default' | 'small' | 'normal' | 'large' | 'huge' = 'default';

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
    onDoubleClick: (event: {
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
    onContextMenu: (event: {
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
    onMouseDown: (event: {
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
    onMouseUp: (event: {
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
    onMouseEnter: (event: {
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
    onMouseLeave: (event: {
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
