/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '提及',
    icon: 'mention',
    description: '提及组件',
    group: 'Form',
  })
  export class ElMention<T, V> extends ViewComponent {
    constructor(options?: Partial<ElMentionOptions<T, V> & ElFormItemProOptions>) {
      super();
    }
  }

  export class ElMentionOptions<T, V> extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '提及列表的数据来源',
      docDescription: '设置提及列表的数据来源，支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      designerValue: [{}, {}, {}],
      setter: {
        concept: 'DataSourceSetter',
      },
    })
    dataSource: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构类型',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示说明。',
    })
    dataSchema: T;

    @Prop<ElMentionOptions<T, V>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '用于显示文本的字段',
      docDescription: '集合的元素类型中，用于显示提及选项文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElMentionOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '用于标识选中值的字段',
      docDescription: '集合的元素类型中，用于标识提及选中值的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '弹出位置',
      description: '提及列表的弹出位置',
      docDescription: '设置提及列表的弹出位置。上：输入框上方；下：输入框下方。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '下' }],
      },
    })
    placement: 'top' | 'bottom' = 'bottom';

    @Prop({
      group: '主要属性',
      title: '偏移距离',
      description: '弹出列表的偏移距离',
      docDescription: '设置提及列表相对于输入框的偏移距离，单位为像素。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    offset: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '整体删除',
      description: '当退格键被按下做删除操作时，是否将提及部分作为整体删除',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    whole: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '触发字符',
      description: '触发提及的字符',
      setter: {
        concept: 'InputSetter',
      },
    })
    prefix: nasl.core.String = '@';

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '搜索建议项',
      description: '搜索建议项时触发',
    })
    onSearch: (item: nasl.core.String) => any;

    @Event({
      title: '选择建议项',
      description: '选择建议项时触发',
    })
    onSelect: (item: nasl.core.String) => any;
  }

  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept:false,
      ignoreProperty: ['rules'],
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
      forceUpdateWhenAttributeChange: true,
      additionalAttribute: {
        ':isRequired': {
          condition:
            "(!this.getAttribute('isRequired')?.value) && (this.getAttribute('rules')?.rules || []).find(r => r.calleeName === 'filled')",
          value: '"true"',
        },
      },
    },
    extends: [
      {
        name: 'ElFormItemPro',
      },
      {
        name: 'ElMention',
      },
    ],
  })
  @Component({
    title: '表单提及',
    description: '表单提及',
    group: 'Form',
  })
  export class ElFormMention<T, V> extends ViewComponent {
    constructor(
      options?: Partial<
        ElFormMentionOptions<T, V> & ElFormItemProOptions & Omit<ElMentionOptions<T, V>, keyof ElFormItemProOptions>
      >,
    ) {
      super();
    }
  }

  export class ElFormMentionOptions<T, V> extends ViewComponentOptions {}
}
