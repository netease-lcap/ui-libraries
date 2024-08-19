/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
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

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        { title: '布局容器', code: '<el-container></el-container>' },
        { title: 'Header', code: '<el-header></el-header>' },
        { title: 'Aside', code: '<el-aside></el-aside>' },
        { title: 'Footer', code: '<el-footer></el-footer>' },
        { title: 'Main', code: '<el-main></el-main>' },
      ],
      emptyBackground: 'add-sub',
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
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
