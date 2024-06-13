/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '徽标',
    icon: 'badge',
    description: '在右上角展示徽标数字或小红点。',
    group: "Display"
  })
  export class VanBadge extends ViewComponent {
    @Prop({
      title: '徽章值',
    })
    content: VanBadgeOptions['content'];

    constructor(options?: Partial<VanBadgeOptions>) {
      super();
    }
  }
  export class VanBadgeOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '徽章值',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    content: nasl.core.Decimal = 2;
    @Prop({
      group: '数据属性',
      title: '徽章最大值',
      description: '徽章内容为数字时显示的最大值',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    max: nasl.core.Decimal;
    @Prop({
      group: '主要属性',
      title: '显示徽章',
      setter: {
        concept: "SwitchSetter"
      }
    })
    dot: nasl.core.Boolean = false;
    @Slot({
      title: 'undefined',
      description: '插入徽章内容'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
