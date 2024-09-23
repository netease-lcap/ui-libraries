/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 5,
    ideusage: {
      idetype: "container",
      structured: true,
      childAccept: "target.tag === 'el-radio-pro'",
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > .el-p-radio:not([data-nodepath])",
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源或插入子节点'
        },
        slotWrapperInlineStyle: {
          default: 'display: inline-block;',
        }
      },
    }
  })

  @Component({
    title: '单选组',
    icon: 'radios',
    description: '',
    group: 'Form',
  })
  export class ElRadioGroupPro<T, V>  extends ViewComponent {

    @Prop({
      title: '选中值',
    })
    value: V;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElRadioGroupProOptions<T, V>>) {
      super();
    }
  }

  export class ElRadioGroupProOptions<T, V> extends ViewComponentOptions {

    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<ElRadioGroupProOptions<T, V>, 'valueField'>({
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

    @Prop({
      group: '数据属性',
      title: '单选项属性设置',
      description: '单选项属性设置',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
      bindOpen: true,
    })
    itemProps: (current: Current<T>) => {
      /**
       * @title 禁用
       */
      disabled?: nasl.core.Boolean;
      /**
       * @title 是否允许取消选中
       */
      allowUncheck?: nasl.core.Boolean;
    };

    @Prop({
      group: '状态属性',
      title: '可取消选中',
      description: '是否允许取消选中',
      setter: { concept: 'SwitchSetter' },
    })
    allowUncheck: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用全部子单选框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'HTML 元素原生标签',
      description: 'HTML 元素原生属性',
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
      description: '插入`<el-radio-pro>`子组件。',
      snippets: [
        {
          title: '单选项',
          code: '<el-radio-pro><el-text text="单选项"></el-text></el-radio-pro>',
        },
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
      idetype: "container",
      parentAccept: "target.tag === 'el-radio-group-pro'",
      selector: {
        expression: "this",
        cssSelector: "label.el-p-radio"
      },
    }
  })

  @Component({
    title: '单选项',
    icon: 'radio',
    description: '',
    group: 'Form',
  })
  export class ElRadioPro<T, V> extends ViewComponent {
    constructor(options?: Partial<ElRadioProOptions<T, V>>) {
      super();
    }
  }

  export class ElRadioProOptions<T, V> extends ViewComponentOptions {

    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '单选按钮的值。',
      setter: { concept: 'InputSetter' },
    })
    value: V;

    @Prop({
      group: '数据属性',
      title: '是否选中',
      description: '是否选中',
      setter: { concept: 'SwitchSetter' },
    })
    private checked: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '可取消选中',
      description: '是否允许取消选中',
      setter: { concept: 'SwitchSetter' },
    })
    allowUncheck: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否为禁用态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'HTML 元素原生标签',
      description: 'HTML 元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    private name: nasl.core.String;

    @Event({
      title: '改变后',
      description: '选中状态变化时触发',
    })
    onChange: (event: V) => any;

    @Event({
      title: '点击',
      description: '点击时触发，一般用于外层阻止冒泡场景',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
  }) => any;

    @Slot({
      title: 'Default',
      description: '单选按钮内容，同 label。',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
