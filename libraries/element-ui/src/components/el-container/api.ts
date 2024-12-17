/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: "container",
      childAccept: "['el-header', 'el-aside', 'el-footer', 'el-main', 'el-container'].includes(target.tag)",
      slotInlineStyle: {
        default: "height:100%"
      }
    }
  })
  @Component({
    title: '布局容器',
    icon: 'multi-layout',
    description: '用于布局的容器组件，方便快速搭建页面的基本结构：',
    group: 'Layout',
  })
  export class ElContainer extends ViewComponent {
    constructor(options?: Partial<ElContainerOptions>) {
      super();
    }
  }

  export class ElContainerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '元素排列方向',
      description: '子元素的排列方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '横向' }, { title: '纵向' }],
      },
    })
    direction: 'horizontal' | 'vertical';

    @Event({
      title: '滚动时',
      description: '滚动时触发',
    })
    onScroll: (event: {
      scrollTop: nasl.core.Integer;
      scrollLeft: nasl.core.Integer;
      scrollWidth: nasl.core.Integer;
      scrollHeight: nasl.core.Integer;
      clientWidth: nasl.core.Integer;
      clientHeight: nasl.core.Integer;
    }) => any;

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
      title: 'Default',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '顶栏',
    icon: 'header',
    description: '',
    group: 'Layout',
  })
  export class ElHeader extends ViewComponent {
    constructor(options?: Partial<ElHeaderOptions>) {
      super();
    }
  }

  export class ElHeaderOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '侧边栏',
    icon: 'aside',
    description: '侧边栏',
    group: 'Layout',
  })
  export class ElAside extends ViewComponent {
    constructor(options?: Partial<ElAsideOptions>) {
      super();
    }
  }

  export class ElAsideOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '宽度',
      description: '宽度，需要有px单位',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String = '300px';

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
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '主区域',
    icon: 'main',
    description: '主区域，内容主要显示位置',
    group: 'Layout',
  })
  export class ElMain extends ViewComponent {
    constructor(options?: Partial<ElMainOptions>) {
      super();
    }
  }

  export class ElMainOptions extends ViewComponentOptions {
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
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '底栏',
    icon: 'footer',
    description: '底部区域',
    group: 'Layout',
  })
  export class ElFooter extends ViewComponent {
    constructor(options?: Partial<ElFooterOptions>) {
      super();
    }
  }

  export class ElFooterOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
