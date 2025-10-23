/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      editable: 'text',
      textholder: 'text',
      useFxOrEg: { property: 'text' },
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '文本',
    icon: 'text',
    description: '用于展示文字或表达式',
    group: 'Display',
  })
  export class ElText extends ViewComponent {
    constructor(options?: Partial<ElTextOptions>) {
      super();
    }
  }

  export class ElTextOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '文本内容',
      description: '显示的文本内容',
      docDescription: '设置需要显示的文本内容，支持纯文本和表达式。',
      implicitToString: true,
    })
    text: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '主题颜色',
      description: '选择文本的主题颜色',
      docDescription: '控制文本的主题颜色。默认：标准文本色；主要色：品牌色；辅助色：次要文本色；成功色：绿色；警告色：橙色；错误色：红色；禁用色：灰色。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '主要色' },
          { title: '辅助色' },
          { title: '成功色' },
          { title: '警告色' },
          { title: '错误色' },
          { title: '禁用色' },
        ],
      },
    })
    color:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning'
      | 'error'
      | 'disabled' = 'default';

    @Prop({
      group: '主要属性',
      title: '展示方式',
      description: '选择文本的展示方式',
      docDescription: '控制文本的展示方式。行内：文本在行内显示；块级：文本独占一行，会自动换行。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '行内' }, { title: '块级' }],
      },
    })
    display: 'inline' | 'block' = 'inline';

    @Prop({
      group: '主要属性',
      title: '省略显示',
      description: '文本过长时是否省略显示',
      docDescription:
        '文本过长的处理方式，支持默认不处理、多余的文本省略、强制换行且英文自动添加换行符、始终不换行共四种隐藏处理方式，缺省情况为默认不处理',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认不处理' },
          { title: '多余的文本省略' },
          { title: '强制换行且英文自动添加换行符' },
          { title: '始终不换行' },
        ],
      },
    })
    overflow: 'normal' | 'ellipsis' | 'break' | 'nowrap' = 'normal';

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '设置文本大小',
      docDescription: '文本框尺寸，支持小、正常、大、巨大',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '小' },
          { title: '正常' },
          { title: '大' },
          { title: '巨大' },
        ],
      },
    })
    size: 'default' | 'small' | 'normal' | 'large' | 'huge' = 'default';

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
