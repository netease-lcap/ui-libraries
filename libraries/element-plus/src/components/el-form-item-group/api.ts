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
  })
  export class ElFormItemGroup extends ViewComponent {
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
      group: '主要属性',
      title: '列数',
      description:
        '在块级/查询表单中占用相当于 N 个表单项的位置宽度（非内部分列）。1 为单倍，2/3 为双倍/三倍，最大不超过容器宽度。',
      docDescription:
        '块级：内容区宽度约为 N × 原表单控件宽度；查询表单：跨 N 个查询列（含列间距）。内部控件默认撑满分组宽度，可单独覆盖。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '1 倍' }, { title: '2 倍' }, { title: '3 倍' }],
      },
    })
    columns: 1 | 2 | 3 = 1;

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
