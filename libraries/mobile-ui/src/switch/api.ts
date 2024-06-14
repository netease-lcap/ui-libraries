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
      }
    })
    value: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
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
