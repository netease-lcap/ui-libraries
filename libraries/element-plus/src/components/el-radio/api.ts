/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 5,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-radio'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ' > .el-p-radio:not([data-nodepath])',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源或插入子节点',
        },
        slotWrapperInlineStyle: {
          default: 'display: inline-block;',
        },
      },
    },
  })
  @Component({
    title: '单选组',
    icon: 'radios',
    description: '在一组备选项中进行单选',
    group: 'Form',
  })
  export class ElRadioGroup<T, V> extends ViewComponent {
    @Prop({
      title: '选中值',
    })
    value: V;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElRadioGroupOptions<T, V>>) {
      super();
    }
  }

  export class ElRadioGroupOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
    })
    dataSource: nasl.collection.List<T> | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<ElRadioGroupOptions<T, V>, 'valueField'>({
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
      title: '选中值',
      description: '选中的值',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    value: V;

    @Prop<ElRadioGroupOptions<T, V>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElRadioGroupOptions<T, V>, 'size'>({
      group: '样式属性',
      title: '尺寸',
      description: '单选框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '默认' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用全部子单选框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'HTML元素原生name属性',
      description: 'HTML元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    private name: nasl.core.String;


    @Event({
      title: '改变后',
      description: '选中值发生变化时触发',
    })
    onChange: (event: V) => any;

    @Slot({
      title: 'Default',
      description: '插入`<el-radio>`子组件。',
      snippets: [
        {
          title: '单选项',
          code: '<el-radio value="value"><el-text text="单选项"></el-text></el-radio>',
        },
        // {
        //   title: '单选按钮',
        //   code: '<el-radio-button value="value"><el-text text="单选按钮"></el-text></el-radio-button>',
        // },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '单选项内容',
      description: '单选项内容',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'el-radio-group'",
      selector: {
        expression: 'this',
        cssSelector: 'label.el-radio',
      },
    },
  })
  @Component({
    title: '单选项',
    icon: 'radio',
    description: '单选项',
    group: 'Form',
  })
  export class ElRadio<T, V> extends ViewComponent {
    constructor(options?: Partial<ElRadioOptions<T, V>>) {
      super();
    }
  }

  export class ElRadioOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '单选按钮的值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: V;

    @Prop({
      group: '数据属性',
      title: '文本',
      description: '单选按钮显示文本，如果未设置则作为值使用',
      setter: { concept: 'InputSetter' },
    })
    label: string | number | boolean;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否为禁用态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '显示边框',
      description: '是否显示边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '单选框尺寸，仅在 border 为真时有效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '默认' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large';

    @Prop({
      group: '主要属性',
      title: 'HTML元素原生name属性',
      description: 'HTML元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    private name: nasl.core.String;

    @Event({
      title: '改变后',
      description: '选中状态变化时触发',
    })
    onChange: (event: V) => any;

    @Slot({
      title: 'Default',
      description: '单选按钮内容，同 label',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'el-radio-group'",
    },
  })
  @Component({
    title: '单选按钮',
    icon: 'radio-button',
    description: '单选按钮',
    group: 'Form',
  })
  export class ElRadioButton<T, V> extends ViewComponent {
    constructor(options?: Partial<ElRadioButtonOptions<T, V>>) {
      super();
    }
  }

  export class ElRadioButtonOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '单选按钮的值',
      setter: { concept: 'InputSetter' },
    })
    value: V;

    @Prop({
      group: '数据属性',
      title: '文本',
      description: '单选按钮显示文本，如果未设置则作为值使用',
      setter: { concept: 'InputSetter' },
    })
    label: string | number | boolean;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否为禁用态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '单选框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '默认' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large';

    @Prop({
      group: '主要属性',
      title: 'HTML元素原生name属性',
      description: 'HTML元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    private name: nasl.core.String;

    @Slot({
      title: 'Default',
      description: '单选按钮内容，同 label',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      bindStyleSelector: '.__cw-form-compose-input',
      structured: true,
      childAccept: "target.tag === 'el-radio'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ' > .el-p-radio:not([data-nodepath])',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源或插入子节点',
        },
        slotWrapperInlineStyle: {
          default: 'display: inline-block;',
        },
      },
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
    },
    extends: [
      {
        name: 'ElFormItem',
        excludes: ['slotDefault', 'useRangeValue', 'startFieldName', 'endFieldName', 'startInitialValue', 'endInitialValue'],
      },
      {
        name: 'ElRadioGroup',
      },
    ],
  })
  @Component({
    title: '表单单选组',
    description: '表单单选组',
    group: 'Form',
  })
  export class ElFormRadioGroup<T, V> extends ViewComponent {
    constructor(
      options?: Partial<ElFormRadioGroupOptions<T, V> & ElFormItemProOptions & Omit<ElRadioGroupOptions<T, V>, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormRadioGroupOptions<T, V> extends ViewComponentOptions {}
}
