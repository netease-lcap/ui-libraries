/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '开关',
    icon: 'switch',
    description: '开关',
    group: "Form"
  })
  export class VanSwitch extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: nasl.core.Boolean = false;

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;


    constructor(options?: Partial<VanSwitchOptions>) {
      super();
    }
  }
  export class VanSwitchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识开关的值',
      sync: true,
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    value: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '显示开关文字',
      description: '是否显示开关文字',
      setter: {
        concept: "SwitchSetter"
      },
    })
    showText: nasl.core.Boolean = false;

    @Prop<VanSwitchOptions, 'activeText'>({
      group: '交互属性',
      title: '开启文字',
      description: '开启时显示的文字',
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.showText === true
    })
    activeText: nasl.core.String = 'ON';

    @Prop<VanSwitchOptions, 'inactiveText'>({
      group: '交互属性',
      title: '关闭文字',
      description: '关闭时显示的文字',
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.showText === true
    })
    inactiveText: nasl.core.String = 'OFF';

    @Event({
      title: '点击',
      description: '点击时触发'
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
  }) => void;
    @Event({
      title: '状态切换',
      description: '开关状态切换时触发'
    })
    onChange: (event: nasl.core.Boolean) => void;
  }
}
