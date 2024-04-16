/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单',
    icon: 'form',
    description: '具有数据收集、校验和提交功能的表单，包含输入框、选择框、复选框、单选框等元素。',
    group: "Form"
  })
  export class VanForm extends ViewComponent {
    constructor(options?: Partial<VanFormOptions>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '验证表单，支持传入 name 来验证单个或部分表单项'
    })
    validate(
      @Param({
        title: 'undefined',
        description: '可选。需要验证的表单项 name'
      })
      name?: nasl.core.String | nasl.collection.List<nasl.core.String>
    ): nasl.ui.ValidateResult {
      return {
        rawValue: '',
        value: '',
        trigger: '',
        muted: '',
        valid: true,
        touched: true,
        dirty: true,
        firstError: ''
      };
    }
  }
  export class VanFormOptions extends ViewComponentOptions {
    @Prop({
      title: '标签对齐方式',
      description: '标签对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    private labelAlign: 'left' | 'center' | 'right' = 'left';
    @Prop({
      title: '输入框对齐方式',
      description: '输入框对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    private inputAlign: 'left' | 'center' | 'right' = 'left';
    @Event({
      title: '验证通过',
      description: '提交表单且验证通过后触发'
    })
    onSubmit: (event: {}) => void;
    @Event({
      title: '验证不通过',
      description: '提交表单且验证不通过后触发'
    })
    onFailed: (event: {
      values: {};
    }) => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-field>`子组件。',
      emptyBackground: 'add-sub-large',
      snippets: [{
        title: '表单项',
        code: '<van-field drole="other"><template #title><van-text text="表单项"><van-text></template><template #input></template></van-field>'
      }]
    })
    slotDefault: () => Array<VanField>;
  }
  @Component({
    title: '表单项',
    group: "Form"
  })
  export class VanField extends ViewComponent {
    constructor(options?: Partial<VanFieldOptions>) {
      super();
    }
  }
  export class VanFieldOptions extends ViewComponentOptions {
    @Prop({
      title: '表单项值',
      description: '表单项值',
      sync: true
    })
    private value: nasl.core.Any = '';
    @Prop({
      title: '提交表单的标识符',
      description: '提交表单的标识符'
    })
    private name: nasl.core.String;
    @Prop({
      title: '输入框类型',
      description: 'input输入框类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: 'text'
        }, {
          title: 'number'
        }, {
          title: 'password'
        }, {
          title: 'textarea'
        }, {
          title: 'digit'
        }, {
          title: 'tel'
        }]
      }
    })
    private type: 'text' | 'number' | 'password' | 'textarea' | 'digit' | 'tel' = 'text';
    @Prop({
      title: '标签名称',
      description: '输入框左侧文本'
    })
    private label: nasl.core.String = '表单项';
    @Prop({
      title: '标签大小',
      description: '输入框左侧文本大小',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '正常'
        }, {
          title: '大'
        }]
      }
    })
    private size: '-' | 'large' = '-';
    @Prop({
      title: '输入框占位提示文字'
    })
    private placeholder: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '标签布局',
      docDescription: '设置标签布局方式。行内展示、块级展示，标签与表单项分行展示。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '行内展示'
        }, {
          title: '块级展示，标签与表单项分行展示'
        }]
      }
    })
    labelLayout: 'inline' | 'block' = 'inline';
    @Prop({
      group: '主要属性',
      title: '必填标记',
      setter: {
        concept: "SwitchSetter"
      }
    })
    required: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '设置验证规则，简写格式为字符串类型，完整格式或混合格式为数组类型',
      bindHide: true
    })
    rules: nasl.collection.List<nasl.core.String>;
    @Prop({
      group: '样式属性',
      title: '显示底边框',
      description: '是否显示底边框',
      setter: {
        concept: "SwitchSetter"
      }
    })
    border: nasl.core.Boolean = true;
    @Slot({
      title: 'undefined',
      description: '插入自定义输入框'
    })
    slotInput: () => Array<ViewComponent>;

    @Slot({
      title: '',
      description: ''
    })
    slotTitle: () => Array<ViewComponent>
  }
}
