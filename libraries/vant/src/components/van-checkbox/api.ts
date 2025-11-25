/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'van-checkbox'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: '.van-checkbox',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源或插入子节点',
        },
      },
    },
  })
  @Component({
    title: '复选框组',
    icon: 'checkboxes',
    description: '用于管理多个复选框的状态。',
    group: 'Form',
  })
  export class VanCheckboxGroup<T, V> extends ViewComponent {
    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<VanCheckboxGroupOptions<T, V>>) {
      super();
    }
  }

  export class VanCheckboxGroupOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选中值',
      sync: true,
      description: '复选框组绑定值',
    })
    modelValue: V[];

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      bindOpen: true,
    })
    dataSource: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '最大选中数量',
      description: '最大选中数量,0表示不限制',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer = 0;

    @Prop<VanCheckboxGroupOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<VanCheckboxGroupOptions<T, V>, 'textField'>({
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
      group: '主要属性',
      title: '排列方向',
      description: '复选框排列方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    direction: 'horizontal' | 'vertical' = 'vertical';

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用复选框组',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '复选框形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '方形' }, { title: '圆形' }],
      },
    })
    shape: 'square' | 'round' = 'round';

    @Prop({
      group: '主要属性',
      title: '图标大小',
      description: '图标大小',
      setter: { concept: 'NumberInputSetter' },
    })
    iconSize: nasl.core.Integer = 20;

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: nasl.collection.List<V>) => void;

    @Slot({
      title: '默认',
      description: '插入 van-checkbox 子组件',
      snippets: [
        {
          title: '复选框',
          code: '<van-checkbox value="value"><van-text text="复选框"></van-text></van-checkbox>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '项内容',
      description: '选项内容',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '复选框',
    icon: 'checkbox',
    description: '在一组备选项中进行多选。',
    group: 'Form',
  })
  export class VanCheckbox extends ViewComponent {
    constructor(options?: Partial<VanCheckboxOptions>) {
      super();
    }
  }

  export class VanCheckboxOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '数据属性',
    //   title: '绑定值',
    //   sync: true,
    //   description: '复选框绑定值',
    // })
    // modelValue: nasl.core.Boolean;

    @Prop({
      group: '数据属性',
      title: '标识符',
      description: '复选框的',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String | nasl.core.Integer | nasl.core.Boolean | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用复选框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '复选框形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '方形' }, { title: '圆形' }],
      },
    })
    shape: 'square' | 'round' = 'round';

    @Prop({
      group: '主要属性',
      title: '图标大小',
      description: '图标大小',
      setter: { concept: 'NumberInputSetter' },
    })
    iconSize: nasl.core.Integer = 20;

    @Prop({
      group: '主要属性',
      title: '是否禁用文本',
      description: '是否禁用复选框文本点击',
      setter: { concept: 'SwitchSetter' },
    })
    labelDisabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '文本位置',
      description: '文本位置',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '左侧' }, { title: '右侧' }] },
    })
    labelPosition: 'left' | 'right' = 'right';

    @Prop({
      group: '主要属性',
      title: '选中颜色',
      description: '选中颜色',
      setter: { concept: 'InputSetter' },
    })
    checkedColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '数据属性',
      title: '是否复选框组绑定',
      description: '是否与复选框组绑定',
      setter: { concept: 'SwitchSetter' },
    })
    bindGroup: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否半选',
      description: '是否半选',
      setter: { concept: 'SwitchSetter' },
    })
    indeterminate: nasl.core.Boolean = false;

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: nasl.core.Boolean) => void;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: any) => void;

    @Slot({
      title: '默认',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: '.van-checkbox',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源或插入子节点',
        },
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
        name: 'VanCheckboxGroup',
      },
    ],
  })
  @Component({
    title: '表单复选框组',
    description: '表单复选框组',
    group: 'Form',
  })
  export class VanFormCheckboxGroup<T, V> extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormCheckboxGroupOptions<T, V> &
          VanFormItemOptions &
          Omit<VanCheckboxGroupOptions<T, V>, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormCheckboxGroupOptions<T, V> extends ViewComponentOptions {}
}
