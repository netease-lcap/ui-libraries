/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    order: 1,
    ideusage: {
      idetype: 'container',
      ignoreProperty: ['defaultCurrentPage'],
      structured: true,
      containerDirection: 'row',
      disableSlotAutoFill: [
        {
          slot: 'expandedRow',
          expression: "!this.getAttribute('hasExpandedRow')?.value",
        },
      ],
      events: {
        click: true,
      },
      additionalAttribute: {
        rowKey: '"index"',
        valueField: '"index"',
        ':expandRowKeys': '"[0]"',
      },
      forceUpdateWhenAttributeChange: true,
      refreshMutationNodesWhenAttributeChange: ['editTable'],

      dataSource: {
        display: 3,
        loopElem: 'table > tbody > tr',
        displayData: '"[{index:0},{index:1},{index:2}]"',
        propertyName: ':dataSource',
        emptySlot: {
          condition: 'this.elementsLength() === 0',
          accept: "target.concept === 'Entity'",
        },
        loopRule: 'nth-last-child(-n+2):not(:only-child)',
        refInLoop: {
          child: 'ElTableColumnPro',
          slot: 'cell',
          useRef: 'argus?.[0]?.index === 0',
        },
      },
      childAccept: "target.tag === 'el-table-column'",
    },
  })
  @Component({
    title: '数据表格',
    icon: 'table-view',
    description: '用于展示大量结构化数据。支持排序、过滤（筛选）、分页、自定义操作等复杂功能。',
    group: 'Table',
  })
  export class ElTable<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;

    @Prop({
      title: '分页大小',
    })
    pageSize: ElTableOptions<T, V, P, M>['pageSize'];

    @Prop({
      title: '当前页数',
    })
    currentPage: ElTableOptions<T, V, P, M>['currentPage'];

    @Prop({
      title: '排序属性',
    })
    order: nasl.core.String;

    @Prop({
      title: '排序字段',
    })
    sort: nasl.core.String;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElTableOptions<T, V, P, M>>) {
      super();
    }
  }

  export class ElTableOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否显示表格边框',
      description: '是否显示表格边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription:
        '表格展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
      designerValue: [{}, {}, {}],
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '表格每一行的数据类型。该属性为展示属性，由数据源推导得到，无需填写',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '合并行或列的计算方法',
      description: '合并行或列的计算方法',
      docDescription: '合并行或列的计算方法',
      bindOpen: true,
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
    })
    spanMethod: (item: { row: T; column: any; rowIndex: nasl.core.Integer; columnIndex: nasl.core.Integer }) =>
      | {
          /**
           * @title 合并行数
           */
          rowspan?: nasl.core.Integer;
          /**
           * @title 合并列数
           */
          colspan?: nasl.core.Integer;
        }
      | ((item: { row: T; column: any; rowIndex: nasl.core.Integer; columnIndex: nasl.core.Integer }) => null);

    @Prop({
      group: '主要属性',
      title: '表格高度',
      description:
        '表格高度，超出后会出现滚动条。示例：100,  "30%",  "300"。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight`',
      setter: {
        concept: 'InputSetter',
        autoClear: true,
      },
    })
    height: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '表格最大高度',
      description: '表格最大高度，超出后会出现滚动条。示例：100, "30%", "300"。值为数字类型，会自动加上单位 px',
      setter: {
        concept: 'InputSetter',
        autoClear: true,
      },
    })
    maxHeight: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '列配置',
      description: '列配置',
      setter: { concept: 'SwitchSetter' },
    })
    columnConfig: nasl.core.Boolean = false;

    @Prop<ElTableOptions<T, V, P, M>, 'pagination'>({
      group: '主要属性',
      title: '分页',
      description: '是否显示分页',
      setter: { concept: 'SwitchSetter' },
      onChange: [
        {
          clear: ['pageSizeOptions', 'pageSize', 'page'],
          if: (_) => !_,
        },
      ],
    })
    pagination: nasl.core.Boolean = false;

    @Prop<ElTableOptions<T, V, P, M>, 'pageSizes'>({
      group: '数据属性',
      title: '每页条数选项 ',
      description: '每页条数切换器的选项',
      setter: { concept: 'InputSetter' },
      if: (_) => _.pagination !== false,
    })
    pageSizes: nasl.core.String = '[10, 20, 50]';

    @Prop<ElTableOptions<T, V, P, M>, 'defaultPageSize'>({
      group: '数据属性',
      title: '默认每页条数',
      docDescription: '每页的数据条数。默认20条。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    defaultPageSize: nasl.core.Integer = 10;

    @Prop({
      group: '数据属性',
      title: '每页条数',
      docDescription: '每页的数据条数。默认20条。在"分页"属性开启时有效',
    })
    private pageSize: nasl.core.Integer = 10;

    @Prop<ElTableOptions<T, V, P, M>, 'defaultCurrentPage'>({
      group: '数据属性',
      title: '当前页数',
      description: '当前默认展示在第几页',
      docDescription: '当前加载的表格页。默认1。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    defaultCurrentPage: nasl.core.Integer = 1;

    @Prop({
      group: '数据属性',
      title: '当前页数',
      description: '当前默认展示在第几页',
    })
    private currentPage: nasl.core.Integer = 1;

    @Prop<ElTableOptions<T, V, P, M>, 'showTotal'>({
      group: '数据属性',
      title: '显示总条数',
      description: '是否显示总条数',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.pagination !== false,
    })
    showTotal: nasl.core.Boolean = false;

    @Prop<ElTableOptions<T, V, P, M>, 'showJumper'>({
      group: '数据属性',
      title: '显示跳转输入',
      description: '是否显示跳转页码控制器',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.pagination !== false,
    })
    showJumper: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '初始化排序字段',
      description: '设置数据初始化时的排序字段',
      docDescription: '支持选择数据表格数据源中的某一条数据，配置默认排序规则，支持升序和降序',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    defaultField: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '初始化排序顺序',
      description: '设置数据初始化时的排序顺序',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '升序' }, { title: '降序' }, { title: '无' }],
      },
    })
    defaultOrder: 'ascending' | 'descending' | null;

    @Prop<ElTableOptions<T, V, P, M>, 'parentField'>({
      group: '数据属性',
      title: '父级值字段',
      description: '在树形数据中，指定数据父级值的字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    parentField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '唯一标识',
      description:
        '必需。唯一标识一行数据的字段名，来源于 `data` 中的字段。如果是字段嵌套多层，可以设置形如 `item.a.id` 的方法',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    rowKey: (item: T) => V;

    @Prop({
      group: '主要属性',
      title: '是否显示表头',
      description: '是否显示表头',
      setter: { concept: 'SwitchSetter' },
    })
    showHeader: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '可编辑表格',
      description: '可编辑表格',
      setter: { concept: 'SwitchSetter' },
    })
    editTable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '表格尺寸',
      description: '表格尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '是否显示斑马纹',
      description: '是否显示斑马纹',
      setter: { concept: 'SwitchSetter' },
    })
    stripe: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否表头吸顶',
      description: '是否表头吸顶',
      setter: { concept: 'SwitchSetter' },
    })
    sticky: nasl.core.Boolean = false;

    @Prop<ElTableOptions<T, V, P, M>, 'stickyOffset'>({
      group: '主要属性',
      title: '表头吸顶偏移量',
      description: '表头吸顶偏移量',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => _.sticky === true,
    })
    stickyOffset: nasl.core.Integer = 8;

    @Prop({
      group: '主要属性',
      title: '表格布局方式',
      description: '表格布局方式，`<table>` 元素原生属性。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'auto' }, { title: 'fixed' }],
      },
    })
    tableLayout: 'auto' | 'fixed' = 'fixed';

    @Event({
      title: '单元格点击时',
      description: '单元格点击时触发。',
    })
    onCellClick: (event: any) => any;

    @Event({
      title: '选中行变化时',
      description: '选中行变化时触发',
    })
    onSelectionChange: (event: { newSelection: nasl.collection.List<V> }) => any;

    @Event({
      title: '分页发生变化时触发',
      description:
        '分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型',
    })
    onPageChange: (event: any) => any;

    @Event({
      title: '行点击时触发',
      description: '行点击时触发',
    })
    onRowClick: (event: { row: T; index: nasl.core.Integer }) => any;

    @Event({
      title: '行双击时触发',
      description: '行双击时触发',
    })
    onRowDblclick: (event: any) => any;

    @Event({
      title: '表格内容滚动时触发',
      description: '表格内容滚动时触发',
    })
    onScroll: (event: any) => any;

    @Slot({
      title: '表格列',
      description: '表格列',
      snippets: [
        {
          title: '表格列',
          code: `<el-table-column data-nodepath-multiple="ture">
                    <template #header><el-text text="表格列"></el-text></template>
                    <template #default="current"></template>
                </el-table-column>`,
        },
        {
          title: '表格列动态',
          code: `<el-table-column-dynamic data-nodepath-multiple="ture">
                    <template #header><el-text text="表格列动态"></el-text></template>
                    <template #default="current"></template>
                </el-table-column-dynamic>`,
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: { slot: 'default', empty: true },
      parentAccept: "['el-table'].includes(target.tag)",
      slotWrapperInlineStyle: {},
      useTemplateInDefaultSlot: true,
      namedSlotOmitWrapper: ['default'],
      selector: [
        {
          expression: 'this',
          cssSelector: 'td',
        },
        {
          expression: 'this.getElement(el=>el.slotTarget==="header")',
          cssSelector: 'th',
        },
      ],

      disableSlotAutoFill: [
        {
          slot: 'default',
          expression: "this.getAttribute('type')?.value === 'selection'",
        },
      ],
      slotInlineStyle: {
        title: 'min-width: 30px',
        cell: 'min-width: 30px',
      },
    },
  })
  @Component({
    title: '表格列',
    description: '表格列',
  })
  export class ElTableColumn<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<ElTableColumnOptions<T, V, P, M>>) {
      super();
    }
  }

  export class ElTableColumnOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '列字段',
      description: 'data 项中的字段',
      docDescription: '数据项中对应的字段名，如createdTime',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    prop: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '排序',
      description: '设置该列是否可以排序',
      docDescription: '开启后该列可排序，可设置默认顺序，升序或倒序',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不排序' }, { title: '后端排序' }],
      },
    })
    sortable: 'none' | 'custom' = 'none';

    @Prop<ElTableColumnOptions<T, V, P, M>, 'resizable'>({
      group: '样式属性',
      title: '是否允许调整列宽',
      description: '是否允许调整列宽,需要打开表格的边框属性',
      setter: { concept: 'SwitchSetter' },
    })
    resizable: nasl.core.Boolean = true;

    @Prop<ElTableColumnOptions<T, V, P, M>, 'type'>({
      group: '数据属性',
      title: '列类型',
      description: '支持序号列、单/多选、树形列和编辑列切换，序号列支持按照数字排序。选择编辑列需要先设置列字段。',
      docDescription: '可设置序号列、单选列、多选列、展开列或树型列',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '普通列' },
          { title: '多选列' },
          { title: '展开列' },
          { title: '序号列' },
          { title: '编辑列' },
        ],
      },
    })
    type: 'normal' | 'selection' | 'expand' | 'index' | 'editable' = 'normal';

    @Prop({
      group: '数据属性',
      title: '列标题',
      description: '列标题用于自定义列标题',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          update: {
            fixed: 'left',
          },
          if: (_) => _ === true,
        },
        {
          clear: ['fixed'],
          if: (_) => _ === false,
        },
      ],
    })
    isFixed: nasl.core.Boolean = false;

    @Prop<ElTableColumnOptions<T, V, P, M>, 'fixed'>({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: ' 左侧固定' }, { title: '右侧固定' }],
      },
      if: (_) => _.isFixed === true,
    })
    fixed: 'left' | 'right';

    @Event({
      title: '编辑列变化时',
      description: '编辑列变化时触发',
    })
    onEditChange: (event: { row: T; $index: nasl.core.Integer; cellIndex: nasl.core.Integer }) => any;

    @Slot({
      title: '单元格',
      description: '对单元格的数据展示进行自定义',
      snippets: [
        {
          title: '表格列',
          code: `<el-table-column data-nodepath-multiple="ture">
                    <template #header><el-text text="表格列"></el-text></template>
                    <template #default="current"></template>
                </el-table-column>`,
        },
      ],
    })
    slotDefault: (current: {
      item: T;
      index: nasl.core.Integer;
      rowIndex: nasl.core.Integer;
      columnIndex: nasl.core.Integer;
      editable: nasl.core.Boolean;
    }) => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '对标题进行自定义',
    })
    slotHeader: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      // structured: { slot: 'default', empty: true },
      parentAccept: "['el-table'].includes(target.tag)",
      slotWrapperInlineStyle: {},
      additionalAttribute: {
        ':dataSource': '"[{}]"',
      },
      useTemplateInDefaultSlot: true,
      namedSlotOmitWrapper: ['default'],
      selector: [
        {
          expression: 'this',
          cssSelector: 'td',
        },
        {
          expression: 'this.getElement(el=>el.slotTarget==="header")',
          cssSelector: 'th',
        },
      ],

      disableSlotAutoFill: [
        {
          slot: 'default',
          expression: "this.getAttribute('type')?.value === 'selection'",
        },
      ],
      slotInlineStyle: {
        title: 'min-width: 30px',
        cell: 'min-width: 30px',
      },
    },
  })
  @Component({
    title: '动态表格列',
    description: '动态表格列',
  })
  export class ElTableColumnDynamic<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    T1,
  > extends ViewComponent {
    constructor(options?: Partial<ElTableColumnDynamicOptions<T, V, P, M, T1>>) {
      super();
    }
  }

  export class ElTableColumnDynamicOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    T1,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      tooltipLink:
        'https://help.lcap.163yun.com/99.%E5%8F%82%E8%80%83/40.%E9%A1%B5%E9%9D%A2IDE/30.%E9%A1%B5%E9%9D%A2%E7%BB%84%E4%BB%B6/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/05.%E8%A1%A8%E6%A0%BC/100.%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC.html',
      docDescription:
        '表格展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
      designerValue: [{}],
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T1>; total: nasl.core.Integer } | nasl.collection.List<T1>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      tooltipLink:
        'https://help.lcap.163yun.com/99.%E5%8F%82%E8%80%83/40.%E9%A1%B5%E9%9D%A2IDE/30.%E9%A1%B5%E9%9D%A2%E7%BB%84%E4%BB%B6/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/05.%E8%A1%A8%E6%A0%BC/100.%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC.html',
      docDescription: '表格每一行的数据类型。该属性为展示属性，由数据源推导得到，无需填写',
    })
    dataSchema: T1;

    @Prop({
      group: '数据属性',
      title: '列字段',
      description: 'data 项中的字段',
      docDescription: '数据项中对应的字段名，如createdTime',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    colKey: (item: T1) => any = ((item: any) => item.value) as any;

    @Prop({
      group: '数据属性',
      title: '排序',
      description: '设置该列是否可以排序',
      docDescription: '开启后该列可排序，可设置默认顺序，升序或倒序',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不排序' }, { title: '后端排序' }],
      },
    })
    sortable: 'none' | 'custom' = 'none';

    @Prop<ElTableColumnDynamicOptions<T, V, P, M, T1>, 'resizable'>({
      group: '样式属性',
      title: '是否允许调整列宽',
      description: '是否允许调整列宽,需要打开表格的边框属性',
      setter: { concept: 'SwitchSetter' },
    })
    resizable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          update: {
            fixed: 'left',
          },
          if: (_) => _ === true,
        },
        {
          clear: ['fixed'],
          if: (_) => _ === false,
        },
      ],
    })
    isFixed: nasl.core.Boolean = false;

    @Prop<ElTableColumnDynamicOptions<T, V, P, M, T1>, 'fixed'>({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: ' 左侧固定' }, { title: '右侧固定' }],
      },
      if: (_) => _.isFixed === true,
    })
    fixed: 'left' | 'right';

    @Slot({
      title: '单元格',
      description: '对单元格的数据展示进行自定义',
    })
    slotDefault: (current: {
      item: T;
      index: nasl.core.Integer;
      rowIndex: nasl.core.Integer;
      columnIndex: nasl.core.Integer;
      columnItem: T1;
    }) => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '对标题进行自定义',
    })
    slotHeader: (current: { item: T1 }) => Array<ViewComponent>;
  }
}
