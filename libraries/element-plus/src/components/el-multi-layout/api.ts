/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-multi-layout-item'",
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
}
