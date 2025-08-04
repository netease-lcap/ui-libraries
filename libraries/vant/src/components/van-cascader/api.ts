/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '级联选择器',
    icon: 'cascade-select',
    description: '级联选择器，用于选择多级数据。',
    group: 'Form',
  })
  export class VanCascader<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(options?: Partial<VanCascaderOptions<T, V, P, M, C>>) {
      super();
    }
  }


  export class VanCascaderOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '级联选择器绑定值',
    })
    modelValue: V;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
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

    @Prop<VanCascaderOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<VanCascaderOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<VanCascaderOptions<T, V, P, M, C>, 'parentField'>({
      group: '数据属性',
      title: '父级字段',
      description: '集合的元素类型中，用于标识父节点的属性',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => any;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    closeable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'SwitchSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '选中颜色',
      description: '选中颜色',
      setter: { concept: 'InputSetter' },
    })
    activeColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '是否可滑动',
      description: '是否可滑动',
      setter: { concept: 'SwitchSetter' },
    })
    swipeable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否显示头部',
      description: '是否显示头部',
      setter: { concept: 'SwitchSetter' },
    })
    showHeader: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '关闭图标',
    //   description: '关闭图标',
    //   setter: { concept: 'InputSetter' },
    // })
    // closeIcon: nasl.core.String = 'close';

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: V) => void;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: any) => void;

    @Event({
      title: '聚焦时',
      description: '聚焦时触发',
    })
    onFocus: (event: any) => void;

    @Event({
      title: '失焦时',
      description: '失焦时触发',
    })
    onBlur: (event: any) => void;
  }

  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '表单级联选择器',
    description: '表单级联选择器，用于选择多级数据。',
    group: 'Form',
  })
  export class VanFormCascader<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormCascaderOptions & VanFormItemOptions & Omit<VanCascaderOptions<T, V, P, M, C>, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormCascaderOptions extends ViewComponentOptions {}
}
