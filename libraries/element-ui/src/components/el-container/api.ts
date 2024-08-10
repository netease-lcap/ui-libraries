/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '布局容器',
    icon: 'container',
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
        options: [{ title: 'horizontal' }, { title: 'vertical' }],
      },
    })
    direction: 'horizontal' | 'vertical';

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        { title: 'Header', code: '<el-header></el-header>' },
        { title: 'Aside', code: '<el-aside></el-aside>' },
        { title: 'Footer', code: '<el-footer></el-footer>' },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '头部区域',
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
    @Prop({
      group: '主要属性',
      title: '顶栏高度',
      description: '顶栏高度',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String = '60px';

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
      title: '侧边栏宽度',
      description: '侧边栏宽度',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String = '300px';

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
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '底部区域',
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
    @Prop({
      group: '主要属性',
      title: '底栏高度',
      description: '底栏高度',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String = '60px';

    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
