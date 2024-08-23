/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: "container",
      structured: true,
      childAccept: "target.tag === 'el-checkbox-pro'",
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > .el-p-checkbox",
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
    title: '多选组',
    icon: 'checkboxes',
    description: '',
    group: 'Form',
  })
  export class ElCheckboxGroupPro<T, V> extends ViewComponent {
    constructor(options?: Partial<ElCheckboxGroupProOptions<T, V>>) {
      super();
    }
  }

  export class ElCheckboxGroupProOptions<T, V> extends ViewComponentOptions {

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

    @Prop<ElCheckboxGroupProOptions<T, V>, 'valueField'>({
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
      group: '主要属性',
      title: 'Disabled',
      description:
        '是否禁用组件，默认为 false。优先级：Form.disabled < CheckboxGroup.disabled < Checkbox.disabled',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Lazy Load',
      description:
        '是否启用懒加载。数据量加大时建议开启；加载复杂内容或大量图片时建议开启',
      setter: { concept: 'SwitchSetter' },
    })
    lazyLoad: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Max',
      description: '支持最多选中的数量',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '统一设置内部复选框 HTML 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.collection.List<V>;

    @Event({
      title: 'On Change',
      description:
        '值变化时触发。`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中，`context.option` 表示当前变化的数据项。',
    })
    onChange: (event: V) => any;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: "container",
      parentAccept: "target.tag === 'el-checkbox-group-pro'",
      selector: {
        expression: "this",
        cssSelector: "label[class='el-p-checkbox']"
      },
    }
  })

  @Component({
    title: '多选项',
    icon: 'checkboxes',
    description: '',
    group: 'Form',
  })
  export class ElCheckboxPro extends ViewComponent {
    constructor(options?: Partial<ElCheckboxProOptions>) {
      super();
    }
  }

  export class ElCheckboxProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Check All',
      description:
        '用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用',
      setter: { concept: 'SwitchSetter' },
    })
    checkAll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Checked',
      description: '是否选中。支持语法糖 `v-model`',
      setter: { concept: 'SwitchSetter' },
    })
    checked: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default Checked',
      description: '是否选中。非受控属性',
      setter: { concept: 'SwitchSetter' },
    })
    defaultChecked: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default',
      description: '多选框内容，同 label。',
      setter: { concept: 'InputSetter' },
    })
    default: any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description:
        '是否禁用组件。如果父组件存在 CheckboxGroup，默认值由 CheckboxGroup.disabled 控制。优先级：Checkbox.disabled > CheckboxGroup.disabled > Form.disabled',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Indeterminate',
      description: '是否为半选',
      setter: { concept: 'SwitchSetter' },
    })
    indeterminate: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '主文案。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Lazy Load',
      description:
        '是否启用懒加载。数据量加大时建议开启；加载复杂内容或大量图片时建议开启',
      setter: { concept: 'SwitchSetter' },
    })
    lazyLoad: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: 'HTML 元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '多选框的值。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Event({
      title: 'On Change',
      description: '值变化时触发',
    })
    onChange: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '多选框内容，同 label。',
      snippets: [
        {
          title: 'Checkbox Group',
          code: '<el-checkbox-group-pro></el-checkbox-group-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
