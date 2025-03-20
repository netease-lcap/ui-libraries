/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
      displaySlotConditions: {
        option: "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value",
      },
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 3,
        loopRule: 'nth-last-child(-n+2)',
        loopElem: '.el-p-transfer__list-item',
        displayData: "\"[{value: '', label: ''},{value:'1', label: ' '}, {value:'2', label: ' '}]\"",
        propertyName: ':dataSource',
      },
      additionalAttribute: {
        valueField: '"value"',
        textField: '"label"',
      },
      slotWrapperInlineStyle: {
        option: 'width: 100%',
      },
      slotInlineStyle: {
        option: 'min-height: 0;',
      },
    },
  })
  @Component({
    title: '穿梭框',
    icon: 'transfer',
    description: '用于在两个区域之间移动元素的控件，完成元素的选择和移动',
    group: 'Selector',
  })
  export class ElTransfer<T, V> extends ViewComponent {
    @Prop({
      title: '绑定值',
      description: '当前选中的值，即目标列表的数据',
    })
    value: nasl.collection.List<V>;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElTransferOptions<T, V>>) {
      super();
    }
  }

  export class ElTransferOptions<T, V> extends ViewComponentOptions {
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
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.label) as any;

    // @Prop<ElTransferOptions<T, V>, 'optionIsSlot'>({
    //   group: '数据属性',
    //   title: '动态选项插槽',
    //   description: '自定义选项内容',
    //   docDescription: '自定义选项内容',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    //   bindHide: true,
    //   if: (_) => !!_.dataSource,
    // })
    // optionIsSlot: nasl.core.Boolean;

    @Prop<ElTransferOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElTransferOptions<T, V>, 'disabledField'>({
      group: '数据属性',
      title: '禁用字段',
      description: '集合的元素类型中，用于标识节点的disabled属性',
      docDescription: '集合的元素类型中，用于标识节点是否被禁用的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    disabledField: (item: T) => any = ((item: any) => item.disabled) as any;

    @Prop({
      group: '数据属性',
      title: '绑定值',
      description: '当前选中的值，即目标列表的数据',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    value: nasl.collection.List<V>;

    // @Prop({
    //   group: '数据属性',
    //   sync: true,
    //   title: '选中值',
    //   description: '数据列表选中项。支持语法糖 `.sync`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // checked: nasl.collection.List<V>;

    @Prop({
      group: '主要属性',
      title: '目标排序策略',
      description: '右侧列表元素的排序策略',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '原始顺序' }, { title: '最后添加' }, { title: '最先添加' }],
      },
    })
    targetOrder: 'original' | 'push' | 'unshift' = 'original';

    @Prop({
      group: '主要属性',
      title: '左侧列表标题',
      description: '左侧列表的标题',
      setter: { concept: 'InputSetter' },
    })
    leftTitle: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右侧列表标题',
      description: '右侧列表的标题',
    })
    rightTitle: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '按钮文本',
      description: '穿梭按钮的文本，数组形式，长度为2，分别代表左右两个按钮的文本',
      setter: { concept: 'InputSetter' },
    })
    leftButtonText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右侧按钮文本',
      description: '右侧按钮的文本',
    })
    rightButtonText: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '可筛选',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '筛选提示文本',
      description: '搜索框的占位符',
      setter: { concept: 'InputSetter' },
    })
    filterPlaceholder: nasl.core.String;

    // @Prop({
    //   group: '数据属性',
    //   title: '筛选方法',
    //   description: '自定义筛选方法',
    //   docDescription: '自定义筛选方法，当 filterable 为 true 时生效，用于决定列表项是否显示',
    // })
    // filterMethod: (query: nasl.core.String, item: T) => nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: '显示全选',
    //   description: '是否显示全选复选框，值类型为数组则表示分别控制源列表和目标列表。',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // showCheckAll: nasl.core.Boolean | any[] = true;

    @Event({
      title: '改变后',
      description: '右侧列表元素变化时触发，当前值和发生移动的值以及移动方向',
    })
    onChange: (event: { value: nasl.collection.List<V>; movedValue: nasl.collection.List<V>; type: 'source' | 'target' }) => any;

    @Event({
      title: '左侧选中变化',
      description: '左侧列表选中项变化时触发',
    })
    onLeftCheckChange: (event: nasl.collection.List<V>) => any;

    @Event({
      title: '右侧选中变化',
      description: '右侧列表选中项变化时触发',
    })
    onRightCheckChange: (event: nasl.collection.List<V>) => any;

    @Event({
      title: '滚动时',
      description: '列表滚动时触发，bottomDistance 表示元素滚动到底部的距离。',
    })
    onScroll: (event: {
      bottomDistance: nasl.core.Integer;
      type: 'source' | 'target';
      e: {
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
      };
    }) => any;

    @Slot({
      title: '来源底部内容',
      description: '自定义左侧列表底部内容',
    })
    slotLeftFooter: () => Array<ViewComponent>;

    @Slot({
      title: '目标底部内容',
      description: '自定义右侧列表底部内容',
    })
    slotRightFooter: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      bindStyleSelector: '.__cw-form-compose-input',
      displaySlotConditions: {
        option: "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value",
      },
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 3,
        loopRule: 'nth-last-child(-n+2)',
        loopElem: '.el-p-transfer__list-item',
        displayData: "\"[{value: '', label: ''},{value:'1', label: ' '}, {value:'2', label: ' '}]\"",
        propertyName: ':dataSource',
      },
      additionalAttribute: {
        valueField: '"value"',
        textField: '"label"',
      },
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
        option: 'width: 100%',
      },
      slotInlineStyle: {
        option: 'min-height: 0;',
      },
      ignoreProperty: ['rules'],
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
    },
    extends: [
      {
        name: 'ElFormItemPro',
        excludes: ['slotDefault', 'useRangeValue', 'startFieldName', 'endFieldName', 'startInitialValue', 'endInitialValue'],
      },
      {
        name: 'ElTransfer',
      },
    ],
  })
  @Component({
    title: '表单穿梭框',
    description: '表单穿梭框组件，用于在表单中使用穿梭框进行数据选择',
    group: 'Form',
  })
  export class ElFormTransfer<T, V> extends ViewComponent {
    constructor(
      options?: Partial<ElFormTransferOptions<T, V> & ElFormItemProOptions & Omit<ElTransferOptions<T, V>, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormTransferOptions<T, V> extends ViewComponentOptions {}
}
