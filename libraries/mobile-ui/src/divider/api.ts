/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '分隔线',
    icon: 'divider',
    description: '用于将内容分隔为多个区域',
    group: "Display"
  })
  export class VanDivider extends ViewComponent {
    constructor(options?: Partial<VanDividerOptions>) {
      super();
    }
  }
  export class VanDividerOptions extends ViewComponentOptions {
    @Prop({
      title: '内容位置',
      description: '设置内容位置',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '居中'
        }, {
          title: '左'
        }, {
          title: '右'
        }]
      }
    })
    contentPosition: 'center' | 'left' | 'right' = 'center';
    @Prop({
      title: '文本',
      description: '文本'
    })
    private title: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '线条类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '虚线'
        }, {
          title: '实线'
        }]
      }
    })
    dashed: 'b' | 'a' = 'a';
    @Slot({
      title: '默认',
      description: '显示的文本'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
