/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '开关',
    icon: 'switch',
    description: '开关',
    group: 'Form',
  })
  export class Switch extends ViewComponent {
    constructor(options?: Partial<SwitchOptions>) {
      super();
    }
  }

  export class SwitchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '标识开关状态的值',
      sync: true,
      docDescription: '开关状态，返还true或者false。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    value: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '开启时展示文案',
      description: '开启时展示文案',
    })
    checkedChildren: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '关闭时展示文案',
      description: '关闭时展示文案',
    })
    unCheckedChildren: nasl.core.String;
    // @Prop({
    //   group: '状态属性',
    //   title: '只读',
    //   description: '正常显示，但禁止选择/输入',
    //   docDescription: '正常显示，但禁止选择或输入。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // readonly: nasl.core.Boolean = false;

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
