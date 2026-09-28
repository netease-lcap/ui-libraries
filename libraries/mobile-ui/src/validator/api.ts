/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '验证器',
    icon: 'validator',
    description: '实现了基础的嵌套验证功能和原子化验证功能，包含提示样式。常用于嵌套验证时使用，或用于派生一些较复杂的组件。',
    group: 'Form'
  })
  export class VanValidator extends ViewComponent {
    @Prop({
      title: '验证是否有效',
    })
    valid: nasl.core.Boolean;

    @Method({
      title: 'undefined',
      description: '手动验证。',
    })
    validate(): ValidateResult {
      return {
          rawValue: '',
          value: '',
          trigger: '',
          muted:'',
          valid: true,
          touched: true,
          dirty: true,
          firstError: ''
      }
    };

    constructor(options?: Partial<VanValidatorOptions>) { super(); }
  }

  export class VanValidatorOptions  extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '设置验证规则，简写格式为字符串类型，完整格式或混合格式为数组类型',
      bindHide: true
    })
    rules: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '忽略验证',
      description: '是否忽略验证',
      setter: {
        concept: "SwitchSetter"
      }
    })
    ignoreValidation: nasl.core.Boolean = false;

    @Slot({
      title: '组件插槽',
      description: '插入自定义输入框'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
