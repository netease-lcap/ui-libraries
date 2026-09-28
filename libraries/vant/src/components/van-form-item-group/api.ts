/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      forceRefresh: true,
      slotWrapperInlineStyle: {
        label: 'display: inline-block;width:90%;',
      },
      namedSlotOmitWrapper: ['label'],
    },
  })
  @Component({
    title: '表单项分组',
    description: '用以将多个表单项分组，并绑定一个变量进行校验。',
    group: 'Form',
    icon: 'validator',
  })
  export class VanFormItemGroup extends ViewComponent {
    @Prop({
      title: '验证是否有效',
    })
    valid: nasl.core.Boolean;

    @Method({
      title: '校验函数',
      description: '校验函数，包含错误文本提示等功能',
    })
    validated(): {
      valid: nasl.core.Boolean;
    } {
      return {} as any;
    }

    constructor(options?: Partial<VanFormItemGroupOptions>) {
      super();
    }
  }

  export class VanFormItemGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '校验值',
      description: '绑定一个变量，用于对该值进行校验',
      sync: true,
    })
    value: any;

    @Prop({
      group: '主要属性',
      title: '标签宽度',
      description: '表单项标签宽度，优先级高于 Form 组件的 labelWidth',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '标签对齐方式',
      description: '标签对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '顶部对齐' }, { title: '右对齐' }],
      },
    })
    labelAlign: 'left' | 'top' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '显示冒号',
      description: '是否在 label 后面添加冒号',
      setter: { concept: 'SwitchSetter' },
    })
    colon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '表单字段校验规则。',
      setter: { concept: 'InputSetter' },
      bindHide: true,
    })
    rules: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '必填',
      description: '是否显示表单项必填星号',
      setter: { concept: 'SwitchSetter' },
    })
    required: nasl.core.Boolean;

    @Slot({
      title: '标签',
      description: '自定义表单项标签',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '默认',
      description: '分组内容，可放置多个表单控件。',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
