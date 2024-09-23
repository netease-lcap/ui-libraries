/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 7,
    ideusage: {
      idetype: "container",
      structured: true,
      childAccept: "target.tag === 'el-checkbox-pro'",
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > .el-p-checkbox:not([data-nodepath])",
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

    @Prop({
      title: '选中值',
    })
    value: nasl.collection.List<V>;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

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
      group: '数据属性',
      title: '选中值',
      description: '选中值',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    value: nasl.collection.List<V>;

    @Prop<ElCheckboxGroupProOptions<T, V>, 'itemProps'>({
      group: '数据属性',
      title: '多选项属性设置',
      description: '多选项属性设置',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
      bindOpen: true,
      if: _ => !!_.dataSource,
    })
    itemProps: (current: Current<T>) => {
      /**
       * @title 禁用
       */
      disabled?: nasl.core.Boolean;
      /**
       * @title 只读
       */
      readonly?: nasl.core.Boolean;
      /**
       * @title 全选选项
       */
      checkAll?: nasl.core.Boolean;
    };

    @Prop({
      group: '数据属性',
      title: '全选选项',
      description:
        '用于标识是否为「全选选项」。数据源中的数据项中，该属性为 true 时，会添加全选项',
      setter: { concept: 'SwitchSetter' },
      onChange: [
        { clear: ['max'] }
      ],
    })
    checkAll: nasl.core.Boolean = false;

    @Prop<ElCheckboxGroupProOptions<T, V>, 'max'>({
      group: '数据属性',
      title: '最大选中数',
      description: '支持最多选中的数量',
      setter: { concept: 'NumberInputSetter' },
      if: _ => !_.checkAll,
    })
    max: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '懒加载',
      description:
        '是否启用懒加载。数据量加大时建议开启；加载复杂内容或大量图片时建议开启',
      setter: { concept: 'SwitchSetter' },
    })
    lazyLoad: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description:
        '是否禁用组件，默认为 false。优先级：Form.disabled < CheckboxGroup.disabled < Checkbox.disabled',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Event({
      title: '改变后',
      description:
        '值变化时触发。`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中，`context.option` 表示当前变化的数据项。',
    })
    onChange: (event: nasl.collection.List<V>) => any;

    @Slot({
      title: 'Default',
      description: '多选框内容，同 label。',
      snippets: [
        {
          title: '多选项',
          code: '<el-checkbox-pro><el-text text="多选项"></el-text></el-checkbox-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '多选项内容',
      description: '多选项内容',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: "container",
      parentAccept: "target.tag === 'el-checkbox-group-pro'",
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
      group: '数据属性',
      title: '选项值',
      description: '多选框的值。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '数据属性',
      title: '是否选中',
      description: '是否选中。支持语法糖 `v-model`',
      setter: { concept: 'SwitchSetter' },
    })
    private checked: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '默认是否选中',
      description: '是否选中。非受控属性',
      setter: { concept: 'SwitchSetter' },
    })
    private defaultChecked: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '懒加载',
      description:
        '是否启用懒加载。数据量加大时建议开启；加载复杂内容或大量图片时建议开启',
      setter: { concept: 'SwitchSetter' },
    })
    lazyLoad: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description:
        '是否禁用组件。如果父组件存在 CheckboxGroup，默认值由 CheckboxGroup.disabled 控制。优先级：Checkbox.disabled > CheckboxGroup.disabled > Form.disabled',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '半选',
      description: '是否为半选',
      setter: { concept: 'SwitchSetter' },
    })
    private indeterminate: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Event({
      title: '改变后',
      description: '值变化时触发',
    })
    onChange: (event: nasl.core.Boolean) => any;

    @Slot({
      title: 'Default',
      description: '多选框内容，同 label。',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
