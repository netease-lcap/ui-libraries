/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'drawerdropdown',
      drawerCSSSelector: '.van-popup',
      cacheOpenKey: 'show',
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 6,
        loopRule: 'nth-child(n+2)',
        loopElem: "> label[class^='u-radios_radio']:not([data-nodepath])",
      },
    },
  })
  @Component({
    title: '选择器',
    icon: 'picker',
    description: '用于从一组选项中进行选择',
    group: 'Selector',
  })
  export class VanPicker<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    @Prop({
      title: '过滤文本',
    })
    filterText: nasl.core.String;
    constructor(options?: Partial<VanPickerOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class VanPickerOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
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
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop({
      group: '数据属性',
      title: '父级字段',
      description: '集合的元素类型中，用于标识父级值的属性',
      docDescription: '集合的元素类型中，用于标识父级值的属性，支持自定义变更',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => V = ((item: any) => item.parent) as any;

    @Prop({
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.collection.List<V>;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '主要属性',
      title: '确认按钮文本',
      description: '确认按钮文本',
      setter: { concept: 'InputSetter' },
    })
    confirmButtonText: nasl.core.String = '确认';

    @Prop({
      group: '主要属性',
      title: '取消按钮文本',
      description: '取消按钮文本',
      setter: { concept: 'InputSetter' },
    })
    cancelButtonText: nasl.core.String = '取消';

    @Prop({
      group: '主要属性',
      title: '工具栏位置',
      description: '工具栏位置',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '顶部' }, { title: '底部' }] },
    })
    toolbarPosition: 'top' | 'bottom' = 'top';

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载中',
      description: '是否显示加载状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示顶部栏',
      description: '是否显示顶部栏',
      setter: { concept: 'SwitchSetter' },
    })
    showToolbar: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '选项高度',
      description: '选项的高度，单位为px',
      setter: { concept: 'NumberInputSetter' },
    })
    optionHeight: nasl.core.Integer = 44;

    @Prop({
      group: '主要属性',
      title: '滑动动画时长',
      description: '滑动动画的时长，单位为ms',
      setter: { concept: 'NumberInputSetter' },
    })
    swipeDuration: nasl.core.Integer = 1000;

    @Prop({
      group: '主要属性',
      title: '可见选项数量',
      description: '可见选项的数量',
      setter: { concept: 'NumberInputSetter' },
    })
    visibleOptionNum: nasl.core.Integer = 6;

    @Prop({
      group: '交互属性',
      title: '可搜索',
      description: '是否允许搜索选项',
      docDescription:
        '开启后，用户可以在选择框中输入文字来搜索选项。默认搜索规则不区分大小写，支持全文本任意位置匹配。',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop<VanPickerOptions<T, V, P, M, C>, 'remote'>({
      group: '交互属性',
      title: '远程搜索',
      description: '是否开启远程搜索',
      docDescription: '开启后，组件不会过滤选项，而是改变当前组件.filterText属性，用户自行实现搜索逻辑。',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !!_.filterable,
    })
    remote: nasl.core.Boolean = false;

    @Event({
      title: '选中值变化时',
      description: '选中值变化时触发',
    })
    onChange: (event: {
      value: nasl.core.String | nasl.core.Integer | nasl.collection.List<nasl.core.String | nasl.core.Integer>;
      option: any;
      selectedOptions: any[];
      trigger: 'clear' | 'check' | 'default';
    }) => any;

    @Slot({
      title: '标题',
      description: '自定义标题内容',
    })
    slotTitle: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'drawerdropdown',
      drawerCSSSelector: '.van-popup',
      cacheOpenKey: 'show',
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 6,
        loopRule: 'nth-child(n+2)',
        loopElem: "> label[class^='u-radios_radio']:not([data-nodepath])",
      },
      displaySlotInline: {
        label: true,
      },
    },
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanPicker',
      },
    ],
  })
  @Component({
    title: '表单选择器',
    icon: 'picker',
    description: '表单选择器',
    group: 'Selector',
  })
  export class VanFormPicker<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormPickerOptions<T, V, P, M, C> &
          VanFormItemOptions &
          Omit<VanPickerOptions<T, V, P, M, C>, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormPickerOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {}
}
