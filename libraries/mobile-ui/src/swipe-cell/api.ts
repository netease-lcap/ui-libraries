/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '滑动条',
    icon: 'swipe-cell',
    description: '滑动条',
    group: "Container"
  })
  export class VanSwipeCell extends ViewComponent {
    constructor(options?: Partial<VanSwipeCellOptions>) {
      super();
    }

    @Prop({
      title: '禁止滑动'
    })
    disabled: nasl.core.Boolean;

    @Method({
      title: '收起单元格侧边栏',
      description: '收起单元格侧边栏'
    })
    close(): any {}
  }
  export class VanSwipeCellOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '左侧滑动区域宽度',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    leftWidth: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '右侧滑动区域宽度',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    rightWidth: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '禁止滑动',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击',
      description: '点击后触发'
    })
    onClick: (event: nasl.core.String) => void;
    @Slot({
      title: '组件插槽',
      description: '插入文本或 HTML。'
    })
    slotDefault: () => Array<ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '右侧。'
    })
    slotRight: () => Array<ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '左侧。'
    })
    slotLeft: () => Array<ViewComponent>;
  }
}
