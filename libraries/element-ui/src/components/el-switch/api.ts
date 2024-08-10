/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '表示两种相互对立的状态间的切换，多用于触发「开/关」。',
    group: 'Form',
  })
  export class ElSwitch extends ViewComponent {
    constructor(options?: Partial<ElSwitchOptions>) {
      super();
    }

    @Method({
      title: '获取焦点',
      description: '使 Switch 获取焦点',
    })
    focus(): any { }
  }

  export class ElSwitchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      sync: true,
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Boolean | nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: 'switch的宽度',
      description: 'switch 的宽度（像素）',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Decimal = 40;

    @Prop({
      group: '样式属性',
      title: 'switch打开时所显示图标的类名',
      description:
        'switch 打开时所显示图标的类名，设置此项会忽略 `active-text`',
      setter: { concept: 'InputSetter' },
    })
    activeIconClass: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: 'switch关闭时所显示图标的类名',
      description:
        'switch 关闭时所显示图标的类名，设置此项会忽略 `inactive-text`',
      setter: { concept: 'InputSetter' },
    })
    inactiveIconClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'switch 打开时的文字描述',
      description: 'switch 打开时的文字描述',
      setter: { concept: 'InputSetter' },
    })
    activeText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'switch 关闭时的文字描述',
      description: 'switch 关闭时的文字描述',
      setter: { concept: 'InputSetter' },
    })
    inactiveText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'switch 打开时的值',
      description: 'switch 打开时的值',
      setter: { concept: 'InputSetter' },
    })
    activeValue: nasl.core.Boolean | nasl.core.String | nasl.core.Decimal =
      true;

    @Prop({
      group: '主要属性',
      title: 'switch 关闭时的值',
      description: 'switch 关闭时的值',
      setter: { concept: 'InputSetter' },
    })
    inactiveValue: nasl.core.Boolean | nasl.core.String | nasl.core.Decimal =
      false;

    @Prop({
      group: '样式属性',
      title: 'switch 打开时的背景色',
      description: 'switch 打开时的背景色',
      setter: { concept: 'InputSetter' },
    })
    activeColor: nasl.core.String = '#409EFF';

    @Prop({
      group: '样式属性',
      title: 'switch 关闭时的背景色',
      description: 'switch 关闭时的背景色',
      setter: { concept: 'InputSetter' },
    })
    inactiveColor: nasl.core.String = '#C0CCDA';

    @Prop({
      group: '主要属性',
      title: 'switch 对应的 name 属性',
      description: 'switch 对应的 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '改变 switch 状态时是否触发表单的校验',
      description: '改变 switch 状态时是否触发表单的校验',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Event({
      title: '状态改变时',
      description: 'switch 状态发生变化时的回调函数',
    })
    onChange: (event: any) => any;
  }
}
