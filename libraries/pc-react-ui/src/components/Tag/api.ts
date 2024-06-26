/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '标签',
    icon: 'label',
    description: '用于展示状态、标签、分类等',
    group: 'Display',
  })
  export class Tag extends ViewComponent {
    constructor(options?: Partial<TagOptions>) {
      super();
    }
  }

  export class TagOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      docDescription: '标签显示的文本内容',
    })
    children: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '样式类型',
    //   description: '设置标签样式，主要标签有背景，次要标签没有背景',
    //   docDescription: '支持选择标签样式，包括主要标签和普通标签',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '主要标签' }, { title: '普通标签' }],
    //   },
    // })
    // type: 'filled' | 'line' = 'filled';

    @Prop({
      group: '主要属性',
      title: '主题颜色',
      description: '设置主题颜色样式',
      docDescription: '支持定义标签颜色，包括默认、主题色、成功色、警告色和错误色',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认色' }, { title: '成功色' }, { title: '警告色' }, { title: '错误色' }],
      },
    })
    color: 'default' | 'success' | 'warning' | 'error' = 'default';

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
      group: '交互属性',
      title: '可关闭',
      description: '设置标签是否可点击删除图标进行关闭',
      docDescription: '支持控制删除图标的显隐，开启时显示删除图标',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    closable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '样式属性',
    //   title: '尺寸',
    //   description: '设置标签大小',
    //   docDescription: '标签尺寸，支持小、正常、大、巨大',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '小' }, { title: '正常' }, { title: '大' }, { title: '巨大' }],
    //   },
    // })
    // size: 'small' | 'normal' | 'large' | 'huge' = 'normal';

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

    @Event({
      title: '删除时触发',
      description: '删除时触发',
    })
    onClose: (event: any) => any;

    @Slot({
      title: '默认',
      description: '插入文本或 HTML',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
