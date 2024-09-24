/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '输入装饰器',
    icon: 'input-adornment',
    description: '',
    group: 'Form',
  })
  export class ElInputAdornmentPro extends ViewComponent {
    constructor(options?: Partial<ElInputAdornmentProOptions>) {
      super();
    }
  }

  export class ElInputAdornmentProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Append',
      description: '后缀装饰。',
      setter: { concept: 'InputSetter' },
    })
    append: any;

    @Prop({
      group: '主要属性',
      title: 'Prepend',
      description: '前缀装饰。',
      setter: { concept: 'InputSetter' },
    })
    prepend: any;

    @Slot({
      title: 'Append',
      description: '后缀装饰。',
    })
    slotAppend: () => Array<ViewComponent>;

    @Slot({
      title: 'Prepend',
      description: '前缀装饰。',
    })
    slotPrepend: () => Array<ViewComponent>;
  }
}
