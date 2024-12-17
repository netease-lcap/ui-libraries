/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 5,
    ideusage: {
      idetype: 'element',
      editable: "text",
      textholder: "text",
      useFxOrEg: { property: "text" }
    }
  })
  @Component({
    title: '标签',
    icon: 'label',
    description: '用于标记和选择。',
    group: 'Display',
  })
  export class ElTag extends ViewComponent {
    constructor(options?: Partial<ElTagOptions>) {
      super();
    }
  }

  export class ElTagOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '标签内容',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: 'type属性，可选择标签的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '成功' },
          { title: '普通' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    type: '' | 'success' | 'info' | 'warning' | 'danger';

    @Prop({
      group: '主要属性',
      title: '背景色',
      description: 'color属性，可以设置标签背景色',
      setter: {
        concept: 'InputSetter'
      },
    })
    color: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: 'size属性，用于设置标签尺寸大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认标签' },
          { title: '中等标签' },
          { title: '小型标签' },
          { title: '超小标签' }
        ],
      },
    })
    size: '' | 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: '主题',
      description: 'effect属性，用于设置标签主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '深色' },
          { title: '浅色' },
          { title: '普通' }
        ],
      },
    })
    effect: 'dark' | 'light' | 'plain' = 'light';

    @Prop({
      group: '交互属性',
      title: '是否有边框描边',
      description: 'hit属性，是否有边框描边',
      setter: { concept: 'SwitchSetter' },
    })
    hit: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '是否添加移除图标',
      description: 'closable属性，是否添加移除图标',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '是否禁用渐变动画',
      description: 'disable-transitions属性，是否禁用渐变动画',
      setter: { concept: 'SwitchSetter' },
    })
    disableTransitions: nasl.core.Boolean = false;

    @Event({
      title: '点击',
      description: '点击 Tag 时触发的事件',
    })
    onClick: (event: MouseEvent) => void;

    @Event({
      title: '关闭',
      description: '关闭 Tag 时触发的事件',
    })
    onClose: (event: MouseEvent) => void;

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
  }
}
