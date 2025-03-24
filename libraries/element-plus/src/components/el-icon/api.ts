/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '图标',
    icon: 'icon',
    description: '图标',
    group: 'Display',
  })
  export class ElIcon extends ViewComponent {
    constructor(options?: Partial<ElIconOptions>) {
      super();
    }
  }

  export class ElIconOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图标',
      docDescription: '支持从图标库选择图标或上传自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    name: nasl.core.String = 'search';

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: MouseEvent) => any;
  }
}
