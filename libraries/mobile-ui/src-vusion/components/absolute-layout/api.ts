/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '自由布局',
    icon: 'absolute-layout',
    description: '拖拽内部元素到任意位置',
    group: "Layout"
  })
  export class VanAbsoluteLayout extends ViewComponent {
    constructor(options?: Partial<VanAbsoluteLayoutOptions>) {
      super();
    }
  }
  export class VanAbsoluteLayoutOptions extends ViewComponentOptions {
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
    }) => any ;
    @Slot({
      title: 'undefined',
      description: '内容'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
