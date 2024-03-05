/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '布局',
    icon: 'label',
    description: '用于展示状态、标签、分类等',
    group: 'Display',
  })
  export class Layout extends ViewComponent {
    constructor(options?: Partial<LayoutOptions>) {
      super();
    }
  }

  export class LayoutOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入文本或 HTML',
    })
    slotDefault: () => Array<ViewComponent>;
  }
  @Component({
    title: '头部标签',
    description: '头部标签',
  })
  export class Header extends ViewComponent {
    constructor(options?: Partial<HeaderOptions>) {
      super();
    }
  }

  export class HeaderOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入文本或 HTML',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
