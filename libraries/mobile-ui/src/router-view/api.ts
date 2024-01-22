/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '子页面容器',
    icon: 'router-view',
    description: '放置子页面的容器。',
    group: "Container"
  })
  export class VanRouterView extends ViewComponent {
    constructor(options?: Partial<VanRouterViewOptions>) {
      super();
    }
  }
  export class VanRouterViewOptions extends ViewComponentOptions {}
}
