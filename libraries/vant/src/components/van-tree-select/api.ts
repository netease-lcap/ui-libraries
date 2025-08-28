/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源',
        },
        slotWrapperInlineStyle: {
          default: 'display: inline-block;',
        },
        propertyName: ":dataSource",
      },
      additionalAttribute: {
        mainActiveIndex: '"0"',
      },
      translateBindingProperty: ["textField"],
    },
  })
  @Component({
    title: '分类选择',
    icon: 'tree-view-new',
    description: '分类选择',
    group: 'Selector',
  })
  export class VanTreeSelect<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<VanTreeSelectOptions<T, V, M>>) {
      super();
    }
    @Prop({
      title: '左侧选中项的值',
    })
    mainActiveIndex: nasl.core.Integer;

    @Prop({
      title: '右侧选中项的值',
    })
    activeId: M extends true ? nasl.collection.List<V> : V;

    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
  }

  export class VanTreeSelectOptions<T, V,  M extends nasl.core.Boolean> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '值字段',
      setter: { concept: 'PropertySelectSetter' },
    })
    valueField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '父级值字段',
      description: '如果数据源是平铺结构，需要指定父级字段',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: { concept: 'PropertySelectSetter' },
    })
    textField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '禁用字段',
      description: '集合的元素类型中，用于标识禁用状态的属性名称',
      setter: { concept: 'PropertySelectSetter' },
    })
    disabledField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '小红点字段',
      description: '集合的元素类型中，用于标识小红点状态的属性名称',
      setter: { concept: 'PropertySelectSetter' },
    })
    dotField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '徽标字段',
      description: '集合的元素类型中，用于标识徽标状态的属性名称',
      setter: { concept: 'PropertySelectSetter' },
    })
    badgeField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '左侧选中项的值',
      sync: true,
      description: '左侧选中项的索引',
      setter: { concept: 'InputSetter' },
    })
    mainActiveIndex: V;

    @Prop({
      group: '数据属性',
      title: '右侧选中项的值',
      sync: true,
      description: '右侧选中项的索引，支持传入数组',
      setter: { concept: 'InputSetter' },
    })
    activeId: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      group: '数据属性',
      title: '是否多选',
      description: '右侧选项是否允许多选',
      setter: { concept: 'SwitchSetter' },
      onChange: [{ clear: ['max'] }],
    })
    multiple: M = false as any;

    @Prop({
      group: '数据属性',
      title: '最大选中个数',
      description: '右侧项最大选中个数',
      setter: { concept: 'NumberInputSetter' },
      if: _ => _.multiple,
    })
    max: nasl.core.Integer;

    @Prop({
      group: '交互属性',
      title: '自定义左侧导航文本',
      description: '自定义左侧导航文本',
      setter: { concept: 'SwitchSetter' },
    })
    customNavText: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '自定义右侧区域内容',
      description: '自定义右侧区域内容',
      setter: { concept: 'SwitchSetter' },
    })
    customContent: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '右侧选中图标',
      docDescription: '自定义右侧栏选中状态的图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    selectedIcon: nasl.core.String;

    @Event({
      title: '点击左侧导航',
      description: '点击左侧导航时触发',
    })
    onClickNav: (event: nasl.core.Integer) => any;

    @Event({
      title: '点击右侧选择项',
      description: '点击右侧选择项时触发',
    })
    onClickItem: (event: T) => any;

    @Slot({
      title: '右侧区域内容',
      description: '右侧区域内容',
    })
    slotRightcontent: () => Array<ViewComponent>;

    @Slot({
      title: '左侧导航文本',
      description: '左侧导航文本',
    })
    slotNavtext: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      displaySlotInline: {
        label: true,
      },
    },
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanTreeSelect',
      },
    ],
  })
  @Component({
    title: '表单分类选择',
    icon: 'tree-view-new',
    description: '用于表单分类选择',
    group: 'Form',
  })
  export class VanFormTreeSelect<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(
      options?: Partial<VanFormTreeSelectOptions<T,V,M> & VanFormItemOptions & Omit<VanTreeSelectOptions<T,V,M>, keyof VanFormItemOptions>>,
    ) {
      super();
    }
  }

  export class VanFormTreeSelectOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {}
}
