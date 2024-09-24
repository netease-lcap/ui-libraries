/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
  })
  @Component({
    title: '子页面容器',
    icon: 'router-view',
    description: '用于嵌入子页面的容器。',
    group: 'Container',
  })
  export class ElRouterView extends ViewComponent {
    constructor(options?: Partial<ElRouterViewOptions>) {
      super();
    }
  }

  export class ElRouterViewOptions extends ViewComponentOptions {}
}
