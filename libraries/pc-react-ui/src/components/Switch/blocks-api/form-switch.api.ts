/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '开关',
    icon: 'switch',
    description: '开关',
    group: 'Form',
  })
  export class FormSwitch extends ViewComponent {
    constructor(options?: Partial<FormSwitchOptions & FormItemOptions>) {
      super();
    }
  }

  export class FormSwitchOptions extends ViewComponentOptions {

    @Prop({
      group: '主要属性',
      title: '选中时的内容',
      description: '选中时的内容',
    })
    checkedChildren: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '非选中时的内容',
      description: '非选中时的内容',
    })
    unCheckedChildren: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: '变化时',
      description: '变化时的回调函数',
    })
    onChange: (event: nasl.core.Boolean) => any;
  }
}
