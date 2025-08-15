/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'van-radio'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: '.van-radio',
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
    description: '单选框组，用于管理多个单选框',
    group: 'Form',
  })
  export class VanRadioGroup<T, V> extends ViewComponent {
    constructor(options?: Partial<VanRadioGroupOptions<T, V>>) {
      super();
    }
  }

  export class VanRadioGroupOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选中值',
      sync: true,
      description: '选中的值',
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
      title: '方向',
      description: '排列方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    direction: 'horizontal' | 'vertical' = 'vertical';

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用所有单选框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '单选框形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '点' }, { title: '方形' }],
      },
    })
    shape: 'round' | 'dot' | 'square' = 'round';

    @Prop({
      group: '主要属性',
      title: '选中颜色',
      description: '选中时的颜色',
      setter: { concept: 'InputSetter' },
    })
    checkedColor: nasl.core.String = '#1989fa';

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: V) => void;

    @Slot({
      title: '默认',
      description: '插入 van-radio 子组件',
      snippets: [
        {
          title: '单选项',
          code: '<van-radio name="value" ><van-text text="单选项"></van-text></van-radio>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      displaySlotInline: {
        label: true,
      },
    },
  })
  @Component({
    title: '单选框',
    icon: 'radio',
    description: '在一组备选项中进行单选',
    group: 'Form',
  })
  export class VanRadio extends ViewComponent {
    constructor(options?: Partial<VanRadioOptions>) {
      super();
    }
  }

  export class VanRadioOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选项名称',
      description: '单选框的名称',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用单选框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '单选框形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '点' }, { title: '方形' }],
      },
    })
    shape: 'round' | 'dot' | 'square' = 'round';

    @Prop({
      group: '主要属性',
      title: '选中颜色',
      description: '选中时的颜色',
      setter: { concept: 'InputSetter' },
    })
    checkedColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '标签禁用',
      description: '是否禁用文本内容点击',
      setter: { concept: 'SwitchSetter' },
    })
    labelDisabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标签位置',
      description: '标签位置',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '左侧' }, { title: '右侧' }] },
    })
    labelPosition: 'left' | 'right' = 'right';

    @Prop({
      group: '主要属性',
      title: '图标大小',
      description: '图标大小',
      setter: { concept: 'NumberInputSetter' },
    })
    iconSize: nasl.core.Integer = 20;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: {}) => void;

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
        loopElem: '.van-radio',
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
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanRadioGroup',
      },
    ],
  })
  @Component({
    title: '表单单选组',
    icon: 'radio',
    description: '表单单选组，用于管理多个单选框',
  })
  export class VanFormRadioGroup<T, V> extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormRadioGroupOptions<T, V> & VanFormItemOptions & Omit<VanRadioGroupOptions<T, V>, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormRadioGroupOptions<T, V> extends ViewComponentOptions {}
}
