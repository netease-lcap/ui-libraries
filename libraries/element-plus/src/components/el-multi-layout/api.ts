/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept:
        "['el-multi-layout-item', 'el-multi-layout-top-nav', 'el-multi-layout-body', 'el-multi-layout-sidebar', 'el-multi-layout-main'].includes(target.tag)",
    },
    extends: [
      {
        name: 'ElFlex',
        excludes: ['slotDefault'],
      },
    ],
  })
  @Component({
    title: '分栏布局',
    icon: 'multi-layout',
    description: '一定的规则布局',
    group: 'Layout',
  })
  export class ElMultiLayout extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutOptions>) {
      super();
    }
  }

  export class ElMultiLayoutOptions extends ViewComponentOptions {
    @Slot({
      title: 'undefined',
      description: '插入`<el-multi-layout-item>`子组件。',
      snippets: [
        {
          title: '布局栏',
          code: '<el-multi-layout-item :gutter="0" style="width: 100%;"></el-multi-layout-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '布局栏',
    icon: 'multi-layout-item',
    description: '一定的规则布局',
  })
  export class ElMultiLayoutItem extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutItemOptions>) {
      super();
    }
  }

  export class ElMultiLayoutItemOptions extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '内容顶栏',
    icon: 'multi-layout-item',
    description: '主内容区顶部栏，常用于放置面包屑、标题等',
  })
  export class ElMultiLayoutMainHead extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutMainHeadOptions>) {
      super();
    }
  }

  export class ElMultiLayoutMainHeadOptions extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '顶导栏',
    icon: 'multi-layout-item',
    description: '页面顶部导航区域',
  })
  export class ElMultiLayoutTopNav extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutTopNavOptions>) {
      super();
    }
  }

  export class ElMultiLayoutTopNavOptions extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '主体区',
    icon: 'multi-layout-item',
    description: '顶导栏下方的整体内容区域',
  })
  export class ElMultiLayoutBody extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutBodyOptions>) {
      super();
    }
  }

  export class ElMultiLayoutBodyOptions extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '侧栏',
    icon: 'multi-layout-item',
    description: '双栏布局中的侧边栏区域',
  })
  export class ElMultiLayoutSidebar extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutSidebarOptions>) {
      super();
    }
  }

  export class ElMultiLayoutSidebarOptions extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '主内容区',
    icon: 'multi-layout-item',
    description: '双栏布局中的主内容区域，通常包含内容顶栏和滚动内容',
  })
  export class ElMultiLayoutMain extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutMainOptions>) {
      super();
    }
  }

  export class ElMultiLayoutMainOptions extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'ElFlex',
      },
    ],
  })
  @Component({
    title: '主内容滚动区',
    icon: 'multi-layout-item',
    description: '主内容区内的滚动内容区域',
  })
  export class ElMultiLayoutMainBody extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions & ElMultiLayoutMainBodyOptions>) {
      super();
    }
  }

  export class ElMultiLayoutMainBodyOptions extends ViewComponentOptions {}
}
