/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '树选择',
    icon: 'tree-view',
    description: '树选择',
    group: 'Selector',
  })
  export class FormTreeSelect<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '重新加载',
    })
    reload(): void {}
    constructor(options?: Partial<FormTreeSelectOptions<T, V, M> & FormItemOptions>) {
      super();
    }
  }

  export class FormTreeSelectOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop({
      group: '数据属性',
      title: '子级值字段',
      description: '集合的元素类型中，用于标识子节点的属性，默认为children',
      docDescription: '集合的元素类型中，用于标识子节点的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    childrenField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '父级值字段',
      description: '集合的元素类型中，用于标识父节点的属性',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    parentField: (item: T) => any;

    @Prop({
      group: '交互属性',
      title: '可多选',
      description: '设置是否开启多选模式，显示多选框',
      docDescription: '开启后支持选中多项。默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    treeCheckable: nasl.core.Boolean = false;

    @Prop({
      title: '占位符',
      description: '为空时显示的占位符文本',
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '交互属性',
      title: '父子节点独立选择',
      description: '开启后父节点选择不会全选子节点，子节点选择不会联动父节点',
      docDescription: '开启后父节点选择不会全选子节点，子节点选择不会联动父节点',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    treeCheckStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: `置灰显示，且禁止任何交互（焦点、点击、选择、输入等）`,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: '选中树节点时调用此函数',
      description: '选中树节点时调用此函数',
    })
    onChange: (event: { value: V; oldValue: V; node: T; oldNode: T }) => any;

    @Event({
      title: '被选中时调用',
      description: '被选中时调用',
    })
    onSelect: (event: { value: V; oldValue: V; node: T; oldNode: T }) => any;
  }
}
