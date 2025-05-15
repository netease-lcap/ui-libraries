/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '图标',
    icon: 'icon',
    description: '图标',
    group: 'Display',
  })
  export class ElIcon extends ViewComponent {
    constructor(options?: Partial<ElIconOptions>) {
      super();
    }
  }

  export class ElIconOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图标布局',
      description: '图标和文本的布局方式',
      docDescription: '支持选择图标的展示方式，包括仅图标、组合图标-上下、组合图标-左右三种方式。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '仅图标' }, { title: '组合图标-上下' }, { title: '组合图标-左右' }],
      },
    })
    icotype: 'only' | 'top' | 'left' = 'top';
    @Prop({
      group: '主要属性',
      title: '图标',
      docDescription: '支持从图标库选择图标或上传自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS'
      },
    })
    name: nasl.core.String = '';

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: MouseEvent) => any;

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

    @Slot({
      title: '默认',
      description: '插入文本或 HTML。',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
