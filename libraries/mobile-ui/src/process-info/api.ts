


/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '流程信息',
    icon: 'processinfo',
    description: '',
    group: 'Process'
  })
  export class VanProcessInfo extends ViewComponent {

    constructor(options?: Partial<VanProcessInfoOptions>) { super(); }
  }

  export class VanProcessInfoOptions extends ViewComponentOptions {

  }
}

