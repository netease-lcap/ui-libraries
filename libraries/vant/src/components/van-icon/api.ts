/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '图标',
    icon: 'icon',
    description: '用于显示图标',
    group: 'Icon',
  })
  export class VanIcon extends ViewComponent {
    constructor(options?: Partial<VanIconOptions>) {
      super();
    }
  }

  export class VanIconOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图标',
      docDescription: '支持从图标库选择图标或上传自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    name: nasl.core.String = 'search';
  }
}
