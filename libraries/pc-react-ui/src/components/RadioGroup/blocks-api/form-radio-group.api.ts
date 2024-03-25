/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单单选组',
    icon: 'capsules',
    description: '多项中选择一项',
    group: 'Form',
  })
  export class FormRadioGroup<T, V, C extends string> extends ViewComponent {
    constructor(options?: Partial<FormRadioGroupOptions<T, V, C> & FormItemOptions>) {
      super();
    }
  }

  export class FormRadioGroupOptions<T, V, C extends string> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop<FormRadioGroupOptions<T, V, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => nasl.core.String;

    @Prop<FormRadioGroupOptions<T, V, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V;

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

    @Prop<FormRadioGroupOptions<T, V, C>, 'size'>({
      group: '样式属性',
      title: '尺寸',
      description: '只对按钮样式生效',
      docDescription: '只对按钮样式生效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
      if: (_) => _.optionType === 'button',
    })
    size: 'small' | 'middle' | 'large';

    @Prop({
      group: '样式属性',
      title: '单选样式',
      description: '只对按钮样式生效',
      docDescription: '只对按钮样式生效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '按钮' }],
      },
    })
    optionType: 'default' | 'button';

    @Event({
      title: '选项变化时',
      description: '选项变化时',
    })
    onChange: (event: {
      selected: nasl.core.Boolean;
      item: nasl.core.String;
      oldItem: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
      items: nasl.collection.List<nasl.core.String>;
      oldItems: nasl.collection.List<nasl.core.String>;
    }) => any;

    @Slot({
      title: 'undefined',
      description: '插入文本或 HTML。',
      snippets: [
        {
          title: '选项',
          code: '<Radio><Text children="单选项"></Text></Radio>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
