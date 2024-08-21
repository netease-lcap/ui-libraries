/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '标记',
    icon: 'badge',
    description: '出现在按钮、图标旁的数字或状态标记。',
    group: 'Display',
  })
  export class ElBadge extends ViewComponent {
    constructor(options?: Partial<ElBadgeOptions>) {
      super();
    }
  }
  export class ElBadgeOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '标记内容',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '显示值',
      description: '显示值',
      setter: { concept: 'InputSetter' },
    })
    value: any;

    @Prop({
      group: '主要属性',
      title: '最大值',
      description:
        "最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型",
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '小圆点',
      description: '小圆点',
      setter: { concept: 'SwitchSetter' },
    })
    isDot: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '隐藏',
      description: '隐藏 badge',
      setter: { concept: 'SwitchSetter' },
    })
    hidden: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'primary' },
          { title: 'success' },
          { title: 'warning' },
          { title: 'danger' },
          { title: 'info' },
        ],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  }
}
