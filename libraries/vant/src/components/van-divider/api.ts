/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 12,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '分割线',
    icon: 'divider',
    description: '区隔内容的分割线。',
    group: 'Display',
  })
  export class VanDivider extends ViewComponent {
    constructor(options?: Partial<VanDividerOptions>) {
      super();
    }
  }

  export class VanDividerOptions extends ViewComponentOptions {


    @Prop({
      group: '主要属性',
      title: '虚线',
      description: '是否使用虚线',
      setter: { concept: 'SwitchSetter' },
    })
    dashed: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '细线',
      description: '是否使用细线',
      setter: { concept: 'SwitchSetter' },
    })
    hairline: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '内容位置',
      description: '内容位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左' }, { title: '右' }, { title: '居中' }],
      },
    })
    contentPosition: 'left' | 'right' | 'center' = 'center';


    @Slot({
      title: 'Default',
      description: '分割线内文案的内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
