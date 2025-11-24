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
  export class ElBadge extends ViewComponent {
    @Prop({
      title: '值',
      description: '徽章显示的值',
    })
    value: any;
    constructor(options?: Partial<ElBadgeOptions>) {
      super();
    }
  }
  export class ElBadgeOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '显示值',
      description: '徽章显示的内容',
      docDescription: '设置徽章显示的值，可以是数字或文本。通常用于显示未读数量或状态。',
      setter: { concept: 'InputSetter' },
    })
    value: any;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '数值的最大显示值',
      docDescription: '设置徽章数值的最大显示值，超过此值会显示"{max}+"。例如max为99时，100会显示为"99+"。',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '徽章类型',
      description: '选择徽章的类型主题',
      docDescription: '控制徽章的视觉样式和主题色。主要：蓝色主题；成功：绿色主题；警告：橙色主题；危险：红色主题；信息：灰色主题。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '主要' }, { title: '成功' }, { title: '警告' }, { title: '危险' }, { title: '信息' }],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'danger';

    @Prop({
      group: '主要属性',
      title: '小圆点',
      description: '是否显示为小圆点',
      docDescription: '开启后，徽章会显示为小圆点而不是数字，适用于只需要标记状态的场景。',
      setter: { concept: 'SwitchSetter' },
    })
    isDot: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示为零',
      description: '值为零时是否显示徽章',
      docDescription: '开启后，即使徽章值为0也会显示。关闭后，值为0时会隐藏徽章。',
      setter: { concept: 'SwitchSetter' },
    })
    showZero: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '隐藏徽章',
      description: '是否隐藏徽章',
      docDescription: '开启后，徽章会被隐藏不显示。可以通过程序控制徽章的显示和隐藏。',
      setter: { concept: 'SwitchSetter' },
    })
    hidden: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '背景颜色',
      description: '自定义徽章的背景颜色',
      docDescription: '设置徽章的自定义背景颜色，会覆盖默认的主题色。',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '';

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

    @Slot({
      title: '默认内容',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;

    // 2.9.0版本不支持
    // @Slot({
    //   title: '显示内容',
    //   description: '自定义显示内容',
    // })
    // slotContent: (current: { value: string }) => Array<ViewComponent>;
  }
}
