/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '我的流程',
    icon: 'processmyprocess',
    description: '',
    group: 'Process'
  })
  export class VanMyProcess extends ViewComponent {

    constructor(options?: Partial<VanMyProcessOptions>) { super(); }
  }

  export class VanMyProcessOptions extends ViewComponentOptions {
  }
}
