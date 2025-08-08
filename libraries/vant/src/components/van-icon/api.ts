/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: true,
      updateFrameHeightWhenTrigger: 'load',
      additionalAttribute: {
        defaultName: "\"photo-o\"",
      },
    },
  })
  @Component({
    title: '图标',
    icon: 'icon',
    description: '用于显示图标',
    group: 'Display',
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

    @Event({
      title: '点击后',
      description: '点击此项时触发'
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => void;
  }
}
