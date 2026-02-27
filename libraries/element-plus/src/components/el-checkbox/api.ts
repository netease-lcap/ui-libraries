/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 7,
    ideusage: {
      idetype: 'container',
      structured: true,
      forceRefresh: {
        slot: 'item',
      },
      childAccept: "target.tag === 'el-checkbox-pro'",
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ' > .el-p-checkbox:not([data-nodepath])',
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
    title: '多选组',
    icon: 'checkboxes',
    description: '',
    group: 'Form',
  })
  export class ElCheckboxGroup<T, V> extends ViewComponent {
    @Prop({
      title: '数据',
      description: '多选框组的数据',
      setter: { concept: 'InputSetter' },
    })
    data: nasl.collection.List<T>;

    @Prop({
      title: '禁用',
      description: '是否禁用组件',
    })
    disabled: nasl.core.Boolean;


    @Prop({
      title: '选中值',
      description: '当前选中的值数组',
    })
    modelValue: nasl.collection.List<V>;

    @Prop({
      title: '预览',
      description: '是否预览',
    })
    preview: nasl.core.Boolean = false;


    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElCheckboxGroupOptions<T, V>>) {
      super();
    }
  }

  export class ElCheckboxGroupOptions<T, V> extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '多选框组的数据来源',
      docDescription: '设置多选框组的数据来源，支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      designerValue: [{}, {}, {}],
      setter: {
        concept: 'DataSourceSetter',
      },
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构类型',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示说明。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '选中值',
      description: '当前选中的值数组',
      docDescription: '绑定当前选中的多选框值数组，支持双向绑定。可以获取或设置选中状态。',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    modelValue: nasl.collection.List<V>;

    @Prop<ElCheckboxGroupOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '用于标识选中值的字段',
      docDescription: '集合的元素类型中，用于标识选中值的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop({
      group: '数据属性',
      title: '最小选中数',
      description: '限制最少选中的数量',
      docDescription: '设置最少需要选中的多选框数量，少于此数量时会阻止取消选中操作。',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal | nasl.core.Integer;

    @Prop<ElCheckboxGroupOptions<T, V>, 'max'>({
      group: '数据属性',
      title: '最大选中数',
      description: '限制最多选中的数量',
      docDescription: '设置最多允许选中的多选框数量，达到此数量后会禁用其他未选中的多选框。',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal | nasl.core.Integer;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========


    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '显示类型',
      description: '选择多选框的显示类型',
      docDescription: '控制多选框的显示类型。默认：标准复选框；边框：带边框的复选框；按钮：按钮样式的复选框。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '边框' }, { title: '按钮' }],
      },
    })
    type: 'default' | 'border' | 'button' = 'button';

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '组件尺寸',
      description: '选择多选框的尺寸大小',
      docDescription: '控制多选框组的整体尺寸。默认：标准尺寸；大：宽松型复选框；小：紧凑型复选框。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: 'default' | 'large' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '排列方向',
      description: '多选框的排列方向',
      docDescription: '控制多选框的排列方向。水平：多选框水平排列；垂直：多选框垂直排列。',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '水平' }, { title: '垂直' }] },
      onChange: [{ clear: ['column'] }],
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Prop<ElCheckboxGroupOptions<T, V>, 'column'>({
      group: '样式属性',
      title: '列数',
      description: '水平排列时的列数',
      docDescription: '设置水平排列时每行显示的多选框列数。为0时不限制列数，自动换行。仅在水平方向时有效。',
      setter: { concept: 'NumberInputSetter', min: 0 },
      if: (_) => _.direction != 'vertical',
    })
    column: nasl.core.Integer = 0;

    // @Prop({
    //   group: '数据属性',
    //   title: '懒加载',
    //   description:
    //     '是否启用懒加载。数据量加大时建议开启；加载复杂内容或大量图片时建议开启',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // lazyLoad: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用组件，默认为 false。优先级：Form.disabled < CheckboxGroup.disabled < Checkbox.disabled',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

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
          code: '<el-checkbox><el-text text="多选项"></el-text></el-checkbox>',
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
      idetype: 'container',
      parentAccept: "target.tag === 'el-checkbox-group'",
    },
  })
  @Component({
    title: '多选项',
    icon: 'checkboxes',
    description: '',
    group: 'Form',
  })
  export class ElCheckbox extends ViewComponent {
    constructor(options?: Partial<ElCheckboxOptions>) {
      super();
    }
  }

  export class ElCheckboxOptions extends ViewComponentOptions {
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

    // @Prop({
    //   group: '数据属性',
    //   title: '懒加载',
    //   description:
    //     '是否启用懒加载。数据量加大时建议开启；加载复杂内容或大量图片时建议开启',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // lazyLoad: nasl.core.Boolean = false;

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

    // @Prop({
    //   group: '状态属性',
    //   title: '只读',
    //   description: '只读状态',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // readonly: nasl.core.Boolean = false;

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

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true,
      bindStyleSelector: '.__cw-form-compose-input',
      childAccept: "target.tag === 'el-checkbox'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ' > .el-p-checkbox:not([data-nodepath])',
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
      additionalAttribute: {
        ':isRequired': {
          condition:
            "(!this.getAttribute('isRequired')?.value) && (this.getAttribute('rules')?.rules || []).find(r => r.calleeName === 'filled')",
          value: '"true"',
        },
      },
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      forceUpdateWhenAttributeChange: true,
      namedSlotOmitWrapper: ['label'],
    },
    extends: [
      {
        name: 'ElFormItemPro',
        excludes: [
          'slotDefault',
          'useRangeValue',
          'startFieldName',
          'endFieldName',
          'startInitialValue',
          'endInitialValue',
        ],
      },
      {
        name: 'ElCheckboxGroup',
      },
    ],
  })
  @Component({
    title: '表单多选项',
    description: '表单多选项',
    group: 'Form',
  })
  export class ElFormCheckboxGroup<T, V> extends ViewComponent {
    constructor(
      options?: Partial<
        ElFormCheckboxGroupOptions<T, V> &
          ElFormItemProOptions &
          Omit<ElCheckboxGroupOptions<T, V>, keyof ElFormItemProOptions>
      >,
    ) {
      super();
    }
  }

  export class ElFormCheckboxGroupOptions<T, V> extends ViewComponentOptions {}
}
