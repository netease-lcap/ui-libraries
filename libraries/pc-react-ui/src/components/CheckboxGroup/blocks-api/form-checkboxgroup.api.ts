/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单多选组',
    description: '表单多选组',
  })
  export class FormCheckboxGroup<T, V, C extends string> extends ViewComponent {
    constructor(options?: Partial<FormCheckboxGroupOptions<T, V, C> & FormItemOptions>) {
      super();
    }
  }

  export class FormCheckboxGroupOptions<T, V, C extends string> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '选项文本',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any;

    @Prop<FormCheckboxGroupOptions<T, V, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '用于标识选中值的字段',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

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
      title: '改变后',
      description: '选中状态改变时触发',
    })
    onChange: (event: { value: nasl.collection.List<V> | nasl.core.String; oldValue: nasl.collection.List<V> | nasl.core.String }) => any;

    @Slot({
      title: '多选框',
      description: '插入`<checkbox>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [
        {
          title: '多选项',
          code: '<Checkbox>节点</Checkbox>',
        },
      ],
    })
    slotDefault: () => Array<Checkbox<T, V>>;

    @Slot({
      title: 'undefined',
      description: '自定义选项的结构和样式',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
