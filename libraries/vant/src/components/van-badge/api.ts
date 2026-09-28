/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '徽章',
    icon: 'badge',
    description: '出现在按钮、图标旁的数字或状态标记。',
    group: 'Display',
  })
  export class VanBadge extends ViewComponent {
    constructor(options?: Partial<VanBadgeOptions>) {
      super();
    }
  }

  export class VanBadgeOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '最大值',
      description: "最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型",
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '小圆点',
      description: '小圆点',
      setter: { concept: 'SwitchSetter' },
    })
    dot: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '值为零时是否显示',
      description: '值为零时是否显示 Badge',
      setter: { concept: 'SwitchSetter' },
    })
    showZero: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '背景色',
      description: '背景色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#ee0a24';

    @Prop({
      group: '主要属性',
      title: '左偏移量',
      description: '左偏移量, 示例：10',
      setter: { concept: 'InputSetter' },
    })
    leftOffset: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '上偏移量',
      description: '上偏移量, 示例：10',
      setter: { concept: 'InputSetter' },
    })
    topOffset: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '位置',
      description: '徽标位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '右上角' }, { title: '右下角' }, { title: '左上角' }, { title: '左下角' }],
      },
    })
    position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' = 'top-right';

    @Prop({
      group: '主要属性',
      title: '内容',
      description: '徽标内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String;

    @Slot({
      title: '默认内容',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
