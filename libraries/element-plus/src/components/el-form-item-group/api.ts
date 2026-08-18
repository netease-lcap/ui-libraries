/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: false,
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceUpdateWhenAttributeChange: true,
      forceRefresh: true,
      namedSlotOmitWrapper: ['label'],
    },
  })
  @Component({
    title: '表单项分组',
    description: '用以将多个表单项分组，通常用于表单的布局。',
    group: 'Form',
    icon: 'validator',
  })
  export class ElFormItemGroup extends ViewComponent {
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
    constructor(options?: Partial<ElFormItemGroupOptions>) {
      super();
    }
  }

  export class ElFormItemGroupOptions extends ViewComponentOptions {
    @Prop<ElFormItemGroupOptions, 'labelWidth'>({
      group: '主要属性',
      title: '标签宽度',
      description: '可以整体设置标签宽度，优先级高于表单项',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '验证值',
      description: '临时修改验证值',
      docDescription: '临时修改验证值',
    })
    validatingValue: any;

    @Prop({
      group: '数据属性',
      title: '值预处理',
      description: '验证前对值进行预处理',
      docDescription: '验证前对值进行预处理',
    })
    validatingProcess: Function;

    @Prop({
      group: '主要属性',
      title: '规则',
      description: '简写格式为字符串类型，完整格式或混合格式为数组类型',
      docDescription: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型，详见[验证规则](#验证规则)',
      bindHide: true,
    })
    rules: nasl.core.String | Array<any>;

    @Prop({
      group: '主要属性',
      title: '错误提示类型',
      description:
        '校验失败时的提示方式：文字与错误状态（提示文字并透传错误状态）；仅透传错误状态（不提示文字）；文字与错误边框（提示文字、透传错误状态，分组显示错误边框）。',
      docDescription:
        '文字与错误状态：展示错误文案，并向表单项透传 error 状态（子控件随表单项标红）。仅透传错误状态：不展示错误文案，仍透传 error 状态。文字与错误边框：展示错误文案，透传 error 状态，仅在分组内容区显示错误边框。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '文字与错误状态' }, { title: '仅透传错误状态' }, { title: '文字与错误边框' }],
      },
    })
    errorTipType: 'textAndStatus' | 'statusOnly' | 'textAndBorder' = 'textAndStatus';

    @Prop({
      group: '主要属性',
      title: '忽略验证',
      docDescription: '忽略验证',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ignoreValidation: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '列数',
      description:
        '占用相当于 N 个表单项的位置宽度（非内部分列）。块级/查询：1 为单倍，2/3 为双倍/三倍，最大不超过容器宽度。栅格：跨 N 列，剩余列不足时换行，超过表单总列数时撑满整行。',
      docDescription:
        '块级：内容区宽度约为 N × 原表单控件宽度；查询表单：跨 N 个查询列（含列间距）；栅格表单：CSS Grid 跨 N 列。内部控件默认撑满分组宽度，可单独覆盖。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
    })
    columns: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否展示必填星号（*），仅展示不做校验',
      setter: { concept: 'SwitchSetter' },
    })
    isRequired: nasl.core.Boolean = false;

    @Slot({
      title: '标签',
      description: '字段标签名称。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '默认',
      description: '分组内容，可放置多个表单控件（如输入框、选择器、日期等）。',
      snippets: [
        {
          title: '表单输入框',
          code: '<el-form-input></el-form-input>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
