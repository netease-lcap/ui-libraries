/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '数据表格',
    icon: 'table-view',
    description:
      '用于展示大量结构化数据。支持排序、过滤（筛选）、分页、自定义操作等复杂功能。',
    group: 'Table',
  })
  export class ElTable<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(options?: Partial<ElTableOptions<T, V, P, M>>) {
      super();
    }

    @Prop({
      title: '分页大小',
    })
    size: ElTableOptions<T, V, P, M>['pageSize'];

    @Prop({
        title: '当前页数',
    })
    page: nasl.core.Integer;

    @Prop({
        title: '排序属性',
    })
    sort: ElTableOptions<T, V, P, M>['sortField'];

    @Prop({
        title: '排序属性',
    })
    order: ElTableOptions<T, V, P, M>['order'];

    @Method({
      title: '清空排序条件',
      description: '用于清空排序条件，数据会恢复成未排序的状态',
    })
    clearSort(): any {}

    @Method({
      title: '清空所有过滤条件',
      description:
        '不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件',
    })
    clearFilter(): any {}

    @Method({
      title: '重新布局',
      description:
        '对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法',
    })
    doLayout(): any {}
  }

  export class ElTableOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription:
        '表格展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
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
        '表格每一行的数据类型。该属性为展示属性，由数据源推导得到，无需填写',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '分页',
      description: '设置是否分页展示数据',
      docDescription:
        '是否展示分页组件，数据源调用接口是否加入分页参数。默认开启',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    pagination: nasl.core.Boolean;

    @Prop<ElTableOptions<T, V, P, M>, 'pageSize'>({
      group: '数据属性',
      title: '默认每页条数',
      docDescription: '每页的数据条数。默认20条。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination === true,
    })
    pageSize: nasl.core.Integer = 20;

    @Prop<ElTableOptions<T, V, P, M>, 'showSizer'>({
      group: '数据属性',
      title: '显示每页条数',
      description: '显示每页条数切换器',
      docDescription:
        '分页组件处是否展示数据条数的选择列表。默认开启。在"分页"属性开启时有效',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination === true,
    })
    showSizer: nasl.core.Boolean = true;

    @Prop<ElTableOptions<T, V, P, M>, 'pageSizeOptions'>({
      group: '数据属性',
      title: '每页条数选项',
      description: '每页条数切换器的选项',
      docDescription:
        '分页组件处是否展示每页显示数据条数的选择列表，需设置数组，如[10,20,30,40,50]。在"分页"属性开启时有效。',
      if: (_) => _.pagination === true && _.showSizer === true,
    })
    pageSizeOptions: Array<nasl.core.Integer> = [10, 20, 50];

    @Prop<ElTableOptions<T, V, P, M>, 'showTotal'>({
      group: '数据属性',
      title: '显示总条数',
      docDescription:
        '分页组件处是否显示表格总数。默认关闭。在"分页"属性开启时有效',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination === true,
    })
    showTotal: nasl.core.Boolean = false;

    @Prop<ElTableOptions<T, V, P, M>, 'showJumper'>({
      group: '数据属性',
      title: '显示跳转输入',
      description: '显示页面跳转输入框',
      docDescription:
        '分页组件处是否展示跳转到某一页的输入框。默认关闭。在"分页"属性开启时有效',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination === true,
    })
    showJumper: nasl.core.Boolean = false;

    @Prop<ElTableOptions<T, V, P, M>, 'pagePosition'>({
      group: '数据属性',
      title: '分页器的位置',
      description: '分页器的位置',
      docDescription:
        '指定分页器的位置，默认关闭。在"分页"属性开启时有效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '最左侧' }, { title: '居中' }, { title: '最右侧' }]
      },
      if: (_) => _.pagination === true,
    })
    pagePosition: 'left' | 'center' | 'right' = 'right';

    @Prop({
      group: '数据属性',
      title: '排序字段',
      description: '设置数据初始化时的排序字段',
      docDescription:
        '支持选择数据表格数据源中的某一条数据，配置默认排序字段',
      setter: {
        concept: 'PropertySelectSetter',
      }
    })
    sortField: (item: T) => V;

    @Prop<ElTableOptions<T, V, P, M>, 'order'>({
      group: '数据属性',
      title: '顺序规则',
      description: '设置数据初始化时的排序字段的顺序规则',
      docDescription: '设置数据初始化时的排序字段的顺序规则',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '升序' }, { title: '降序' }]
      },
      if: (_) => !!_.sortField,
    })
    order: 'descending' | 'ascending' = 'ascending';

    @Prop<ElTableOptions<T, V, P, M>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '在单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      docDescription: '在表格开启了单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      setter: {
          concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '当前行',
      description: '当前行的 key，只写属性',
      sync: true,
    })
    value: V;

    @Prop({
      group: '数据属性',
      title: '多选值',
      description: '用于标识多选选项的值',
      docDescription: '当表格设置了多选列，选择多个值后获得了值列表数组。该取值由值字段名决定',
      sync: true,
    })
    values: nasl.collection.List<V>;

    @Prop({
      group: '样式属性',
      title: '高度',
      description:
        'Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '样式属性',
      title: '最大高度',
      description: 'Table 的最大高度。合法的值为数字或者单位为 px 的高度。',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: 'Table 的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '小' }, { title: '迷你' }],
      },
    })
    size: 'medium' | 'small' | 'mini' = 'medium';

    @Prop({
      group: '样式属性',
      title: '斑马纹',
      description: '是否为斑马纹 table',
      setter: { concept: 'SwitchSetter' },
    })
    stripe: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '纵向边框',
      description: '是否带有纵向边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '列宽自适应',
      description: '列的宽度是否自撑开',
      setter: { concept: 'SwitchSetter' },
    })
    fit: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示表头',
      description: '是否显示表头',
      setter: { concept: 'SwitchSetter' },
    })
    showHeader: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '高亮当前行',
      description: '是否要高亮当前行',
      setter: { concept: 'SwitchSetter' },
    })
    highlightCurrentRow: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '高亮复选框选中行',
      description: '是否要高亮复选框选中行（仅针对开启 `selection` 有效）',
      setter: { concept: 'SwitchSetter' },
    })
    highlightSelectionRow: nasl.core.Boolean = false;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Row Class Name',
    //   description:
    //     '行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。',
    //   setter: { concept: 'InputSetter' },
    // })
    // rowClassName: any | nasl.core.String;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Row Style',
    //   description:
    //     '行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。',
    //   setter: { concept: 'InputSetter' },
    // })
    // rowStyle: any | object;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Cell Class Name',
    //   description:
    //     '单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。',
    //   setter: { concept: 'InputSetter' },
    // })
    // cellClassName: any | nasl.core.String;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Cell Style',
    //   description:
    //     '单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。',
    //   setter: { concept: 'InputSetter' },
    // })
    // cellStyle: any | object;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Header Row Class Name',
    //   description:
    //     '表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerRowClassName: any | nasl.core.String;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Header Row Style',
    //   description:
    //     '表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerRowStyle: any | object;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Header Cell Class Name',
    //   description:
    //     '表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerCellClassName: any | nasl.core.String;

    // @Prop({
    //   group: '样式属性',
    //   title: 'Header Cell Style',
    //   description:
    //     '表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerCellStyle: any | object;

    @Prop({
      group: '状态属性',
      title: '空数据文本',
      description: '空数据时显示的文本内容，也可以通过 `slot="empty"` 设置',
      setter: { concept: 'InputSetter' },
    })
    emptyText: nasl.core.String = '暂无数据';

    // 展开行处理
    // @Prop({
    //   group: '主要属性',
    //   title: 'Expand Row Keys',
    //   description:
    //     '可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。',
    //   setter: { concept: 'InputSetter' },
    // })
    // expandRowKeys: any[];

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tooltip Effect',
    //   description: 'tooltip `effect` 属性',
    //   setter: { concept: 'InputSetter' },
    // })
    // tooltipEffect: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Show Summary',
    //   description: '是否在表尾显示合计行',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // showSummary: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Sum Text',
    //   description: '合计行第一列的文本',
    //   setter: { concept: 'InputSetter' },
    // })
    // sumText: nasl.core.String = '合计';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Summary Method',
    //   description: '自定义的合计计算方法',
    //   setter: { concept: 'InputSetter' },
    // })
    // summaryMethod: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Span Method',
    //   description: '合并行或列的计算方法',
    //   setter: { concept: 'InputSetter' },
    // })
    // spanMethod: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Select On Indeterminate',
    //   description:
    //     '在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // selectOnIndeterminate: nasl.core.Boolean = true;


    @Prop({
      group: '交互属性',
      title: '默认展开所有行',
      description:
        '是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效',
      setter: { concept: 'SwitchSetter' },
    })
    defaultExpandAll: nasl.core.Boolean = false;

    // TODO 树节点处理
    // @Prop({
    //   group: '主要属性',
    //   title: '树节点缩进',
    //   description: '展示树形数据时，树节点的缩进',
    //   setter: { concept: 'NumberInputSetter' },
    // })
    // indent: nasl.core.Decimal = 16;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Lazy',
    //   description: '是否懒加载子节点数据',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // lazy: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Load',
    //   description:
    //     '加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息',
    //   setter: { concept: 'InputSetter' },
    // })
    // load: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tree Props',
    //   description: '渲染嵌套数据的配置选项',
    //   setter: { concept: 'InputSetter' },
    // })
    // treeProps: object;

    @Event({
      title: '鼠标移入单元格时',
      description: '当单元格 hover 进入时会触发该事件',
    })
    onCellMouseEnter: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      cell: any,
      event: any,
    }) => void;

    @Event({
      title: '鼠标移出单元格时',
      description: '当单元格 hover 退出时会触发该事件',
    })
    onCellMouseLeave: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      cell: any,
      event: any,
    }) => void;

    @Event({
      title: '单元格点击时',
      description: '当某个单元格被点击时会触发该事件',
    })
    onCellClick: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      cell: any,
      event: any,
    }) => void;

    @Event({
      title: '单元格双击时',
      description: '当某个单元格被双击击时会触发该事件',
    })
    onCellDblclick: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      cell: any,
      event: any,
    }) => void;

    @Event({
      title: '点击行',
      description: '当某一行被点击时会触发该事件',
    })
    onRowClick: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      event: any,
    }) => void;

    @Event({
      title: '右键点击行',
      description: '当某一行被鼠标右键点击时会触发该事件',
    })
    onRowContextmenu: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      event: any,
    }) => void;

    @Event({
      title: '双击行',
      description: '当某一行被双击时会触发该事件',
    })
    onRowDblclick: (event: {
      item: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      event: any,
    }) => void;

    @Event({
      title: 'On Header Click',
      description: '当某一列的表头被点击时会触发该事件',
    })
    onHeaderClick: (event: {
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      event: any,
    }) => void;

    @Event({
      title: 'On Header Contextmenu',
      description: '当某一列的表头被鼠标右键点击时触发该事件',
    })
    onHeaderContextmenu: (event: {
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      event: any,
    }) => void;

    @Event({
      title: '排序时',
      description: '当表格的排序条件发生变化的时候会触发该事件',
    })
    onSortChange: (event: {
      prop: string,
      order: string,
    }) => void;

    @Event({
      title: '切换分页后',
      description: '切换分页或改变分页大小时触发',
    })
    onPageChange: (event: {
      value: nasl.core.Integer,
      oldValue: nasl.core.Integer,
    }) => void;

    @Event({
      title: '分页大小切换后',
      description: '分页大小切换后',
    })
    onSizeChange: (event: {
      value: nasl.core.Integer,
      oldValue: nasl.core.Integer,
      page: nasl.core.Integer,
      oldPage: nasl.core.Integer,
    }) => void;

    @Event({
      title: '改变后',
      description:
        '当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性',
    })
    onCurrentChange: (event: {
      value: V,
      oldValue: V,
      item: T,
      oldItem: T,
    }) => any;

    @Event({
      title: 'On Select',
      description: '当用户手动勾选数据行的 Checkbox 时触发的事件',
    })
    onSelect: (event: {
      item: T,
      values: nasl.collection.List<V>,
      items: nasl.collection.List<T>,
    }) => void;

    @Event({
      title: 'On Select All',
      description: '当用户手动勾选全选 Checkbox 时触发的事件',
    })
    onSelectAll: (event: {
      values: nasl.collection.List<V>,
      items: nasl.collection.List<T>,
    }) => void;

    @Event({
      title: '表头拖动后',
      description: '当拖动表头改变了列的宽度的时候会触发该事件',
    })
    onHeaderDragend: (event: {
      newWidth: nasl.core.Integer,
      oldWidth: nasl.core.Integer,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      event: any,
    }) => any;

    @Event({
      title: 'On Expand Change',
      description:
        '当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）',
    })
    onExpandChange: (event: {
      item: T,
      expandedItems: nasl.collection.List<T>,
      expanded: nasl.core.Boolean,
    }) => any;

    @Event({
      title: '筛选条件变化时',
      description:
        '当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。',
    })
    onFilterChange: (event: nasl.collection.List<nasl.core.String>) => any;


    // @Slot({
    //   title: 'Append',
    //   description:
    //     '插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。',
    // })
    // slotAppend: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      emptyBackground: 'drag-entity-here',
      snippets: [
        { title: '表格列', code: '<el-table-column><template #header><el-text text="表格列"></el-text></template><template #default="current"></template></el-table-column>' },
        { title: '选择列', code: '<el-table-column type="selection"></el-table-column>' },
        { title: '序号列', code: '<el-table-column type="index" label="序号"></el-table-column>' },
        { title: '展开列', code: '<el-table-column type="expand"><template #default="current"></template></el-table-column>'}
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '表格列',
    icon: 'table-column',
    description: '',
    group: 'Table',
  })
  export class ElTableColumn<T, V> extends ViewComponent {
    constructor(options?: Partial<ElTableColumnOptions<T, V>>) {
      super();
    }
  }

  export class ElTableColumnOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '列类型',
      description:
        '对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '多选' },
          { title: '序号列' },
          { title: '展开列' },
          { title: '默认' },
        ],
      },
    })
    private type: 'selection' | 'index' | 'expand' | '' = '';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Index',
    //   description:
    //     '如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引',
    //   setter: { concept: 'InputSetter' },
    // })
    // index: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Column Key',
    //   description:
    //     'column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件',
    //   setter: { concept: 'InputSetter' },
    // })
    // columnKey: nasl.core.String;

    @Prop<ElTableColumnOptions<T, V>, 'label'>({
      group: '主要属性',
      title: '标题',
      description: '显示的标题',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop<ElTableColumnOptions<T, V>, 'field'>({
      group: '主要属性',
      title: '字段名',
      description: '对应列内容的字段名，也可以使用 property 属性',
      setter: { concept: 'PropertySelectSetter' },
      if: (_) => !_.type,
    })
    field: (item: T) => string;

    @Prop({
      group: '样式属性',
      title: '列宽度',
      description: '对应列的宽度',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '列最小宽度',
      description:
        '对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列',
      setter: { concept: 'InputSetter' },
    })
    minWidth: nasl.core.String = '120px';

    @Prop({
      group: '主要属性',
      title: '固定列',
      description: '列是否固定在左侧或者右侧，true 表示固定在左侧',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '固定在左侧' },
          { title: '固定在右侧' },
          { title: '不固定' },
        ]
      },
    })
    fixed: 'left' | 'right' | false = false;

    @Prop({
      group: '主要属性',
      title: '排序',
      description:
        "对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件",
      setter: { concept: 'SwitchSetter' },
    })
    sortable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Sort Method',
    //   description:
    //     '对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致',
    //   setter: { concept: 'InputSetter' },
    // })
    // sortMethod: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Sort By',
    //   description:
    //     '指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推',
    //   setter: { concept: 'InputSetter' },
    // })
    // sortBy: nasl.core.String | any[] | any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Sort Orders',
    //   description:
    //     '数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序',
    //   setter: { concept: 'InputSetter' },
    // })
    // sortOrders: any[] = ['ascending', 'descending', null];

    @Prop({
      group: '主要属性',
      title: '改变宽度',
      description:
        '对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为 true）',
      setter: { concept: 'SwitchSetter' },
    })
    resizable: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Formatter',
    //   description: '用来格式化内容',
    //   setter: { concept: 'InputSetter' },
    // })
    // formatter: any;

    @Prop({
      group: '主要属性',
      title: '内容过长时使用工具提示',
      description: '当内容过长被隐藏时显示 tooltip',
      setter: { concept: 'SwitchSetter' },
    })
    showOverflowTooltip: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左对齐' },
          { title: '居中' },
          { title: '右对齐' },
        ]
      },
    })
    align: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '表头对齐方式',
      description: '表头对齐方式，若不设置该项，则使用表格的对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左对齐' },
          { title: '居中' },
          { title: '右对齐' },
          { title: '' },
        ]
      },
    })
    headerAlign: 'left' | 'center' | 'right' | '' = '';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Reserve Selection',
    //   description:
    //     '仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 `row-key`）',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // reserveSelection: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filters',
    //   description:
    //     '数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // filters: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filter Placement',
    //   description: '过滤弹出框的定位',
    //   setter: { concept: 'InputSetter' },
    // })
    // filterPlacement: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filter Multiple',
    //   description: '数据过滤的选项是否多选',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // filterMultiple: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filter Method',
    //   description:
    //     '数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。',
    //   setter: { concept: 'InputSetter' },
    // })
    // filterMethod: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filtered Value',
    //   description:
    //     '选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // filteredValue: any[];

    @Slot({
      title: '列内容',
      description: '自定义列的内容，参数为 { row, column, $index }',
    })
    slotDefault: (current: {
      row: T,
      column: {
        property: nasl.core.String,
        realWidth: nasl.core.Decimal,
        minWidth: nasl.core.Decimal,
        sortable: nasl.core.Boolean,
        fixed: nasl.core.Boolean,
        type: nasl.core.String,
        level: nasl.core.Integer,
      },
      $index: nasl.core.Integer,
    }) => Array<ViewComponent>;

    @Slot({
      title: '表头',
      description: '自定义表头的内容. 参数为 { column, $index }',
    })
    slotHeader: () => Array<ViewComponent>;
  }
}
