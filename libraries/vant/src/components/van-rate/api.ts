/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '评分',
    icon: 'rate',
    description: '评分组件，用于对事物进行评级操作',
    group: 'Form',
  })
  export class VanRate extends ViewComponent {
    constructor(options?: Partial<VanRateOptions>) {
      super();
    }
  }

  export class VanRateOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '评分的值',
      setter: { concept: 'NumberInputSetter' },
    })
    modelValue: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '图标总数',
      description: '设置评分图标的总数',
      setter: { concept: 'NumberInputSetter', min: 1 },
    })
    count: nasl.core.Integer = 5;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否为禁用状态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '是否为只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '允许半选',
      description: '是否允许半选',
      setter: { concept: 'SwitchSetter' },
    })
    allowHalf: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '图标大小',
      description: '设置图标大小，单位为px',
      setter: { concept: 'NumberInputSetter', min: 1 },
    })
    size: nasl.core.Decimal = 20;

    @Prop({
      group: '样式属性',
      title: '图标间距',
      description: '设置图标间距，最小值为0',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    gutter: nasl.core.Decimal = 4;

    @Prop({
      group: '样式属性',
      title: '选中颜色',
      description: '选中时的颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#ee0a24';

    @Prop({
      group: '样式属性',
      title: '未选中颜色',
      description: '未选中时的颜色',
      setter: { concept: 'InputSetter' },
    })
    voidColor: nasl.core.String = '#c8c9cc';

    @Prop({
      group: '样式属性',
      title: '禁用颜色',
      description: '禁用时的颜色',
      setter: { concept: 'InputSetter' },
    })
    disabledColor: nasl.core.String = '#c8c9cc';

    @Prop({
      group: '主要属性',
      title: '选中时的图标',
      description: '选中时的图标名称',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    icon: nasl.core.String = 'star';

    @Prop({
      group: '主要属性',
      title: '未选中时的图标',
      description: '未选中时的图标名称',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    voidIcon: nasl.core.String = 'star-o';

    @Prop({
      group: '主要属性',
      title: '触摸反馈',
      description: '是否开启点击反馈',
      setter: { concept: 'SwitchSetter' },
    })
    touchable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '清除',
      description: '是否允许再次点击后清除',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '值改变时',
      description: '分值改变时触发',
    })
    onChange: (value: nasl.core.Decimal) => void;

  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      displaySlotInline: {
        label: true,
      },
    },
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanRate',
      },
    ],
  })
  @Component({
    title: '评分表单项',
    icon: 'rate',
    description: '评分表单项组件',
    group: 'Form',
  })
  export class VanFormRate extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormRateOptions & VanFormItemOptions & Omit<VanRateOptions, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormRateOptions extends ViewComponentOptions {}
}
