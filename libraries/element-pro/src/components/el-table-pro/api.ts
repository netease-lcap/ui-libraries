/// <reference types="@nasl/types" />

namespace nasl.ui {
  // @Component({
  //   title: '表格',
  //   icon: 'table',
  //   description: '',
  //   group: 'Table',
  // })
  // export class ElTablePro extends ViewComponent {
  //   constructor(options?: Partial<ElTableProOptions>) {
  //     super();
  //   }
  // }

  // export class ElTableProOptions extends ViewComponentOptions {
  //   @Slot({
  //     title: 'Default',
  //     description: '内容',
  //     snippets: [
  //       {
  //         title: 'Base Table',
  //         code: '<el-base-table-pro></el-base-table-pro>',
  //       },
  //       {
  //         title: 'Primary Table',
  //         code: '<el-primary-table-pro></el-primary-table-pro>',
  //       },
  //       {
  //         title: 'Enhanced Table',
  //         code: '<el-enhanced-table-pro></el-enhanced-table-pro>',
  //       },
  //     ],
  //   })
  //   slotDefault: () => Array<ViewComponent>;
  // }

  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'container',
      structured: true,
      dataSource: {
        display: 3,
        loopElem: 'table > tbody > tr',
        emptySlot: {
          condition: 'this.elementsLength() === 0',
          accept: "target.concept === 'Entity'",
        },
        refInLoop: {
          child: 'ElTableColumnPro',
          slot: 'cell',
          useRef: 'argus?.[0]?.index === 0',
        },
      },

      childAccept: "target.tag === 'ElTableColumnPro'",
    },
  })
  @Component({
    title: '数据表格',
    icon: 'table-view',
    description:
      '用于展示大量结构化数据。支持排序、过滤（筛选）、分页、自定义操作等复杂功能。',
    group: 'Table',
  })
  export class ElTablePro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(options?: Partial<ElTableProOptions<T, V, P, M>>) {
      super();
    }
  }

  export class ElTableProOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   sync: true,
    //   title: '高亮行值',
    //   description:
    //     '高亮行，支持鼠标键盘操作(Shift)连续高亮行，可用于处理行选中等批量操作，模拟操作系统区域选择行为。支持语法糖 `.sync`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // activeRowKeys: any[] = [];

    @Prop({
      group: '主要属性',
      sync: true,
      title: '选中值',
      description: '选中行。',
      // setter: { concept: 'InputSetter' },
    })
    selectedRowKeys: any[] | any;

    @Prop({
      group: '数据属性',
      title: '初始化排序规则',
      description: '设置数据初始化时的排序字段和顺序规则',
      docDescription:
        '支持选择数据表格数据源中的某一条数据，配置默认排序规则，支持升序和降序',
    })
    sorting: {
      field: nasl.core.String;
      order: nasl.core.String;
      compare?: Function;
    } = { field: undefined, order: 'desc' };

    // @Prop({
    //   group: '主要属性',
    //   title: 'Default Active Row Keys',
    //   description:
    //     '高亮行，支持鼠标键盘操作(Shift)连续高亮行，可用于处理行选中等批量操作，模拟操作系统区域选择行为。非受控属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // defaultActiveRowKeys: any[] = [];

    // @Prop({
    //   group: '主要属性',
    //   title: 'Active Row Type',
    //   description:
    //     '默认不会高亮点击行，`activeRowType=single` 表示鼠标点击仅允许同时高亮一行，Shift 键盘操作加鼠标操作依然可以高亮多行，因为这属于明显的区域选择行为。`activeRowType= multiple ` 表示允许鼠标点击同时高亮多行。',
    //   setter: { concept: 'InputSetter' },
    // })
    // activeRowType: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Allow Resize Column Width',
    //   description: '已废弃。是否允许调整列宽。请更为使用 `resizable`',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // allowResizeColumnWidth: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Attach',
    //   description:
    //     '超出省略等所有浮层元素统一绑定到 `attach`，可根据实际情况调整挂载元素。',
    //   setter: { concept: 'InputSetter' },
    // })
    // attach: nasl.core.String | any;

    @Prop({
      group: '主要属性',
      title: '是否显示表格边框',
      description: '是否显示表格边框',
      setter: { concept: 'SwitchSetter' },
    })
    bordered: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Bottom Content',
    //   description: '表格底部内容，可以用于自定义列设置等。',
    //   setter: { concept: 'InputSetter' },
    // })
    // bottomContent: any;

    @Prop({
      group: '主要属性',
      title: '单元格数据为空时呈现的内容。',
      description: '单元格数据为空时呈现的内容。',
      setter: { concept: 'InputSetter' },
    })
    cellEmptyContent: any;

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
      group: '主要属性',
      title: '是否禁用本地数据分页',
      description:
        '是否禁用本地数据分页。当 `data` 数据长度超过分页大小时，会自动进行本地数据分页。如果 `disableDataPage` 设置为 true，则无论何时，都不会进行本地数据分页',
      setter: { concept: 'SwitchSetter' },
    })
    disableDataPage: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '默认重复按下 Space 键可取消当前行高亮，是否禁用取消',
    //   description: '默认重复按下 Space 键可取消当前行高亮，是否禁用取消',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // disableSpaceInactiveRow: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Empty',
    //   description: '空表格呈现样式，支持全局配置 `GlobalConfigProvider`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // empty: any = '';

    // @Prop({
    //   group: '主要属性',
    //   title: 'First Full Row',
    //   description: '首行内容，横跨所有列。',
    //   setter: { concept: 'InputSetter' },
    // })
    // firstFullRow: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Fixed Rows',
    //   description:
    //     '固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行。',
    //   setter: { concept: 'InputSetter' },
    // })
    // fixedRows: any[];

    // @Prop({
    //   group: '主要属性',
    //   title: 'Foot Data',
    //   description: '表尾数据源，泛型 T 指表格数据类型。',
    //   setter: { concept: 'InputSetter' },
    // })
    // footData: any[] = [];

    // @Prop({
    //   group: '主要属性',
    //   title: 'Footer Affix Props',
    //   description:
    //     '已废弃。请更为使用 `footerAffixedBottom`。表尾吸底基于 Affix 组件开发，透传全部 Affix 组件属性。。',
    //   setter: { concept: 'InputSetter' },
    // })
    // footerAffixProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Footer Affixed Bottom',
    //   description:
    //     '表尾吸底。使用此向功能，需要非常注意表格是相对于哪一个父元素进行滚动。值为 `true`，则表示相对于整个窗口吸底。如果表格滚动的父元素不是整个窗口，请通过 `footerAffixedBottom.container` 调整固钉的吸顶范围。基于 Affix 组件开发，透传全部 Affix 组件属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // footerAffixedBottom: nasl.core.Boolean | object = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Footer Summary',
    //   description: '表尾总结行。',
    //   setter: { concept: 'InputSetter' },
    // })
    // footerSummary: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Header Affix Props',
    //   description:
    //     '已废弃。请更为使用 `headerAffixedTop`。表头吸顶基于 Affix 组件开发，透传全部 Affix 组件属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerAffixProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Header Affixed Top',
    //   description:
    //     '表头吸顶。使用该功能，需要非常注意表格是相对于哪一个父元素进行滚动。值为 `true`，表示相对于整个窗口吸顶。如果表格滚动的父元素不是整个窗口，请通过 `headerAffixedTop.container` 调整吸顶的位置。基于 Affix 组件开发，透传全部 Affix 组件属性。。',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerAffixedTop: nasl.core.Boolean | object = false;

    @Prop({
      group: '主要属性',
      title: '表格高度',
      description:
        '表格高度，超出后会出现滚动条。示例：100,  "30%",  "300"。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight`',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String | nasl.core.Decimal;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Horizontal Scroll Affixed Bottom',
    //   description: '滚动条吸底。基于 Affix 组件开发，透传全部 Affix 组件属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // horizontalScrollAffixedBottom: nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: '是否显示鼠标悬浮状态',
      description: '是否显示鼠标悬浮状态',
      setter: { concept: 'SwitchSetter' },
    })
    hover: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Keyboard Row Hover',
    //   description:
    //     '键盘操作行显示悬浮效果，一般用于键盘操作行选中、行展开、行高亮等功能',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // keyboardRowHover: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Last Full Row',
    //   description: '尾行内容，横跨所有列。',
    //   setter: { concept: 'InputSetter' },
    // })
    // lastFullRow: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Lazy Load',
    //   description:
    //     '是否启用整个表格元素的懒加载，当页面滚动到可视区域后再渲染表格。注意和表格内部行滚动懒加载的区别，内部行滚动无论表格是否在可视区域都会默认渲染第一屏的行元素',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // lazyLoad: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Loading',
    //   description:
    //     '加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态。',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // loading: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Loading Props',
    //   description: '透传加载组件全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // loadingProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Locale',
    //   description: '语言配置。',
    //   setter: { concept: 'InputSetter' },
    // })
    // locale: object;

    @Prop({
      group: '主要属性',
      title: '表格最大高度',
      description:
        '表格最大高度，超出后会出现滚动条。示例：100, "30%", "300"。值为数字类型，会自动加上单位 px',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String | nasl.core.Decimal;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Pagination',
    //   description:
    //     '分页配置，值为空则不显示。具体 API 参考分页组件。当 `data` 数据长度超过分页大小时，会自动对本地数据 `data` 进行排序，如果不希望对于 `data` 进行排序，可以设置 `disableDataPage = true`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // pagination: object;

    @Prop({
      group: '主要属性',
      title: '每页条数选项 ',
      description: '每页条数切换器的选项',
      setter: { concept: 'InputSetter' },
    })
    pageSizeOptions: nasl.core.String = '[10, 20, 50]';

    @Prop({
      group: '数据属性',
      title: '默认每页条数',
      docDescription: '每页的数据条数。默认20条。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    pageSize: nasl.core.Integer = 10;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Pagination Affixed Bottom',
    //   description: '分页吸底。基于 Affix 组件开发，透传全部 Affix 组件属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // paginationAffixedBottom: nasl.core.Boolean | object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Resizable',
    //   description:
    //     '是否允许调整列宽，设置 `tableLayout=fixed` 效果更友好，此时不允许通过 CSS 设置 `table`元素宽度，也不允许设置 `tableContentWidth`。一般不建议在列宽调整场景使用 `tableLayout: auto`。如果想要配置宽度可调整的最小值和最大值，请使用 `column.resize`，示例：`columns: ',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // resizable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Row Attributes',
    //   description:
    //     'HTML 标签 `tr` 的属性。类型为 Function 时，参数说明：`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body` 表示属性作用于 `tbody` 中的元素；`params.type=foot` 表示属性作用于 `tfoot` 中的元素。<br />示例一：{ draggable: true }，<br />示例二：[{ draggable: true }, { title: "超出省略显示" }]。<br /> 示例三：() => [{ draggable: true }]。',
    //   setter: { concept: 'InputSetter' },
    // })
    // rowAttributes: object | any[] | any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Row Class Name',
    //   description:
    //     '行类名，泛型 T 指表格数据类型。`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body`  表示类名作用于 `tbody` 中的元素；`params.type= tfoot` 表示类名作用于 `tfoot` 中的元素。',
    //   setter: { concept: 'InputSetter' },
    // })
    // rowClassName: nasl.core.String | object | any[] | any;

    @Prop({
      group: '主要属性',
      title: '唯一标识',
      description:
        '必需。唯一标识一行数据的字段名，来源于 `data` 中的字段。如果是字段嵌套多层，可以设置形如 `item.a.id` 的方法',
      setter: { concept: 'InputSetter' },
    })
    rowKey: nasl.core.String = 'index';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Rowspan And Colspan',
    //   description:
    //     '用于自定义合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // rowspanAndColspan: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Rowspan And Colspan In Footer',
    //   description:
    //     '用于自定义表尾的合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // rowspanAndColspanInFooter: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Scroll',
    //   description:
    //     '懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // scroll: object;

    @Prop({
      group: '主要属性',
      title: '是否显示表头',
      description: '是否显示表头',
      setter: { concept: 'SwitchSetter' },
    })
    showHeader: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '表格尺寸',
      description:
        '表格尺寸，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `medium`。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Prop({
      group: '主要属性',
      title: '是否显示斑马纹',
      description: '是否显示斑马纹',
      setter: { concept: 'SwitchSetter' },
    })
    stripe: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '表格内容的总宽度',
      description:
        '表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度',
      setter: { concept: 'InputSetter' },
    })
    tableContentWidth: nasl.core.String;

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

    // @Prop({
    //   group: '主要属性',
    //   title: 'Top Content',
    //   description: '表格顶部内容，可以用于自定义列设置、顶部查询条件等。',
    //   setter: { concept: 'InputSetter' },
    // })
    // topContent: any;

    @Prop({
      group: '主要属性',
      title: '内容上下方向对齐',
      description: '行内容上下方向对齐。可选项：top/middle/bottom',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '中' }, { title: '下' }],
      },
    })
    verticalAlign: 'top' | 'middle' | 'bottom' = 'middle';

    // @Event({
    //   title: '高亮行发生变化时触发',
    //   description:
    //     '高亮行发生变化时触发，泛型 T 指表格数据类型。参数 `activeRowList` 表示所有高亮行数据， `currentRowData` 表示当前操作行数据。',
    // })
    // onActiveChange: (event: any) => any;

    // @Event({
    //   title: 'On Active Row Action',
    //   description:
    //     '键盘操作事件。开启行高亮功能后，会自动开启键盘操作功能，如：通过键盘(Shift)或鼠标操作连续选中高亮行时触发，一般用于处理行选中等批量操作，模拟操作系统区域选择行为。',
    // })
    // onActiveRowAction: (event: any) => any;

    @Event({
      title: '单元格点击时触发。',
      description: '单元格点击时触发。',
    })
    onCellClick: (event: any) => any;

    // @Event({
    //   title: 'On Column Resize Change',
    //   description:
    //     '列调整大小之后触发。`context.columnsWidth` 表示操作后各个列的宽度；',
    // })
    // onColumnResizeChange: (event: any) => any;

    @Event({
      title: '分页发生变化时触发。',
      description:
        '分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型',
    })
    onPageChange: (event: any) => any;

    @Event({
      title: '行点击时触发',
      description: '行点击时触发',
    })
    onRowClick: (event: any) => any;

    @Event({
      title: '行双击时触发',
      description: '行双击时触发',
    })
    onRowDblclick: (event: any) => any;

    // @Event({
    //   title: 'On Row Mousedown',
    //   description: '鼠标在表格行按下时触发，',
    // })
    // onRowMousedown: (event: any) => any;

    // @Event({
    //   title: 'On Row Mouseenter',
    //   description: '鼠标在表格行进入时触发，泛型 T 指表格数据类型',
    // })
    // onRowMouseenter: (event: any) => any;

    // @Event({
    //   title: 'On Row Mouseleave',
    //   description: '鼠标在表格行离开时触发，泛型 T 指表格数据类型',
    // })
    // onRowMouseleave: (event: any) => any;

    // @Event({
    //   title: 'On Row Mouseover',
    //   description: '鼠标悬浮到行时触发，泛型 T 指表格数据类型',
    // })
    // onRowMouseover: (event: any) => any;

    // @Event({
    //   title: 'On Row Mouseup',
    //   description: '鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型',
    // })
    // onRowMouseup: (event: any) => any;

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
          code: '<el-table-column-pro></el-table-column-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    // @Event({
    //   title: 'On Scroll X',
    //   description: '已废弃。表格内容横向滚动时触发。请更为使用 `onScroll` 事件',
    // })
    // onScrollX: (event: any) => any;

    // @Event({
    //   title: 'On Scroll Y',
    //   description:
    //     '已废弃。表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 `onScroll` 事件',
    // })
    // onScrollY: (event: any) => any;

    // @Slot({
    //   title: 'Bottom Content',
    //   description: '表格底部内容，可以用于自定义列设置等。',
    // })
    // slotBottomContent: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Cell Empty Content',
    //   description: '单元格数据为空时呈现的内容。',
    // })
    // slotCellEmptyContent: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Empty',
    //   description: '空表格呈现样式，支持全局配置 `GlobalConfigProvider`。',
    // })
    // slotEmpty: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'First Full Row',
    //   description: '首行内容，横跨所有列。',
    // })
    // slotFirstFullRow: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Footer Summary',
    //   description: '表尾总结行。',
    // })
    // slotFooterSummary: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Last Full Row',
    //   description: '尾行内容，横跨所有列。',
    // })
    // slotLastFullRow: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Loading',
    //   description:
    //     '加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态。',
    // })
    // slotLoading: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Top Content',
    //   description: '表格顶部内容，可以用于自定义列设置、顶部查询条件等。',
    // })
    // slotTopContent: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '表格列',
    description: '表格列',
  })
  export class ElTableColumnPro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(options?: Partial<ElTableColumnProOptions<T, V, P, M>>) {
      super();
    }
  }

  export class ElTableColumnProOptions<
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
    })
    colKey: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '列选中类型',
      description: '列选中类型',
      docDescription: '有两种模式：单选和多选',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '单选' }, { title: '多选' }, { title: '无' }],
      },
    })
    type: 'single' | 'multiple' | null = null;

    // @Prop<ElTableColumnProOptions<T, V, P, M>, 'defaultOrder'>({
    //   group: '数据属性',
    //   title: '排序初始顺序',
    //   description: '该列首次点击时的排序顺序',
    //   docDescription:
    //     '该列首次点击时的排序顺序。与表格属性中的"默认排序顺序"相同',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '升序' }, { title: '倒序' }],
    //   },
    //   if: (_) => _.sortable === true,
    // })
    // defaultOrder: 'asc' | 'desc' = 'asc';

    // @Prop<UTableViewColumnOptions<T, V, P, M>, 'type'>({
    //   group: '数据属性',
    //   title: '列类型',
    //   description:
    //     '支持序号列、单/多选、树形列和编辑列切换，序号列支持按照数字排序。选择编辑列需要先设置列字段。',
    //   docDescription: '可设置序号列、单选列、多选列、展开列或树型列',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [
    //       { title: '普通列' },
    //       { title: '序号列' },
    //       { title: '单选列' },
    //       { title: '多选列' },
    //       { title: '展开列' },
    //       { title: '树形列' },
    //       {
    //         title: '编辑列',
    //         tooltip: '与列字段关联，列字段不能为空',
    //         disabledIf: (_) => _.field === null,
    //       },
    //       { title: '拖拽标识列' },
    //     ],
    //   },
    // })
    // type:
    //   | 'normal'
    //   | 'index'
    //   | 'radio'
    //   | 'checkbox'
    //   | 'expander'
    //   | 'tree'
    //   | 'editable'
    //   | 'dragHandler' = 'normal';

    // @Prop<UTableViewColumnOptions<T, V, P, M>, 'autoIndex'>({
    //   group: '数据属性',
    //   title: '换页继续编号',
    //   description: '换页后，继续上一页的列序号进行编号',
    //   docDescription: '支持换页后，继续上一页的列序号进行编号',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    //   if: (_) => _.type === 'index',
    // })
    // autoIndex: nasl.core.Boolean = false;

    // @Prop<UTableViewColumnOptions<T, V, P, M>, 'startIndex'>({
    //   group: '数据属性',
    //   title: '起始序号',
    //   description: '序号列的起始序号',
    //   docDescription: '当列类型为"序号列"时有效。默认值为1',
    //   setter: {
    //     concept: 'NumberInputSetter',
    //   },
    //   if: (_) => _.type === 'index' && _.autoIndex !== true,
    // })
    // startIndex: nasl.core.Decimal | nasl.core.Integer = 1;

    // @Prop({
    //   group: '数据属性',
    //   title: '双击处理函数',
    //   description: '用于可编辑表格，双击表格列时的处理函数',
    //   docDescription:
    //     '用于可编辑表格，双击表格列时的处理函数。在表格是"可编辑"的表格时有效',
    // })
    // private dblclickHandler: Function;

    // @Prop({
    //   group: '主要属性',
    //   title: '表格标题',
    //   tooltipLink:
    //     'https://help.lcap.163yun.com/99.%E5%8F%82%E8%80%83/40.%E9%A1%B5%E9%9D%A2IDE/30.%E9%A1%B5%E9%9D%A2%E7%BB%84%E4%BB%B6/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/05.%E8%A1%A8%E6%A0%BC/100.%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC.html',
    //   docDescription: '表格上方的标题信息。默认为空',
    // })
    // private title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: ' 左侧固定' },
          { title: '右侧固定' },
          { title: '不固定' },
        ],
      },
    })
    fixed: 'left' | 'right' | '' = '';

    @Prop({
      group: '主要属性',
      title: '表头文本过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription:
        '开启后，该列表头文本过长会省略显示，否则换行显示，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ellipsisTitle: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '内容区文本过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription: '开启后，该列文本过长会省略显示，否则换行显示，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ellipsis: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '隐藏列',
    //   docDescription:
    //     '开启后，当表格横向滚动条滚动时，该列会固定不会跟随滚动条滚动',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // hidden: nasl.core.Boolean = false;

    // @Prop<UTableViewColumnOptions<T, V, P, M>, 'expanderPosition'>({
    //   group: '样式属性',
    //   title: '展开列图标位置',
    //   description: '展开列图标的位置',
    //   docDescription: '展开列图标的位置。默认"左侧"。',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '左侧' }, { title: '右侧' }],
    //   },
    //   if: (_) => _.type === 'expander',
    // })
    // expanderPosition: 'left' | 'right' = 'left';

    @Prop({
      group: '样式属性',
      title: '列宽度',
      description: '设置列宽度，可设置为数字或百分比',
      docDescription:
        '列宽，可以作为最小宽度使用。当列宽总和小于 table 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 table 元素，表现为定宽。可以同时调整 table 元素的宽度来达到自己想要的效果	',
    })
    width: nasl.core.String | nasl.core.Decimal | nasl.core.Integer;

    // @Prop({
    //   group: '样式属性',
    //   title: '合并列数',
    //   setter: {
    //     concept: 'NumberInputSetter',
    //     min: 1,
    //     precision: 0,
    //   },
    // })
    // colSpan: nasl.core.Integer;

    // @Prop({
    //   group: '样式属性',
    //   title: '自动合并相同数据',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // autoRowSpan: nasl.core.Boolean = false;

    @Slot({
      title: '单元格',
      description: '对单元格的数据展示进行自定义',
    })
    slotCell: (current: Current<T>) => Array<ViewComponent>;

    // @Slot({
    //   title: '编辑单元格',
    //   description: '对单元格的编辑数据展示进行自定义',
    // })
    // slotEditcell: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '对标题进行自定义',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;

    // @Slot({
    //   title: '展开列内容',
    //   description: '展开列的内容',
    // })
    // 'slot-expand-content': (current: Current<T>) => Array<ViewComponent>;
    // slotExpandContent: (current: Current<T>) => Array<ViewComponent>; // 防止 ide 编译报错

    // @Slot({
    //   title: '展开列图标',
    //   description: '展开列图标',
    // })
    // slotExpander: (current: Current<T>) => Array<ViewComponent>;
  }
  //   @Component({
  //     title: 'Primary Table',
  //     icon: 'primary-table',
  //     description: '',
  //     group: 'Table',
  //   })
  //   export class ElPrimaryTablePro extends ViewComponent {
  //     constructor(options?: Partial<ElPrimaryTableProOptions>) {
  //       super();
  //     }
  //   }

  //   export class ElPrimaryTableProOptions extends ViewComponentOptions {
  //     @Prop({
  //       group: '主要属性',
  //       title: 'Async Loading',
  //       description:
  //         '异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     asyncLoading: any;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Column Controller',
  //       description:
  //         '自定义显示列控制器，值为空不会显示。具体属性请看下方 `TableColumnController` 文档。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     columnController: object;

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Column Controller Visible',
  //       description:
  //         '是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制。支持语法糖 `.sync`',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     columnControllerVisible: nasl.core.Boolean;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Columns',
  //       description: '列配置，泛型 T 指表格数据类型。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     columns: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Display Columns',
  //       description: '列配置功能中，当前显示的列。支持语法糖 `.sync`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     displayColumns: any[];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Default Display Columns',
  //       description: '列配置功能中，当前显示的列。非受控属性。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     defaultDisplayColumns: any[];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Drag Sort',
  //       description:
  //         '拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`row-handler` 表示通过拖拽手柄进行行拖拽排序。值为 `col` 表示列顺序拖拽。值为 `row-handler-col` 表示同时支持行拖拽和列拖拽。⚠️`drag-col` 已废弃，请勿使用。。可选项：row/row-handler/col/row-handler-col/drag-col',
  //       setter: {
  //         concept: 'EnumSelectSetter',
  //         options: [
  //           { title: 'row' },
  //           { title: 'row-handler' },
  //           { title: 'col' },
  //           { title: 'row-handler-col' },
  //           { title: 'drag-col' },
  //         ],
  //       },
  //     })
  //     dragSort: 'row' | 'row-handler' | 'col' | 'row-handler-col' | 'drag-col';

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Drag Sort Options',
  //       description:
  //         '拖拽排序扩展参数，具体参数见 [Sortable](https://github.com/SortableJS/Sortable)。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     dragSortOptions: object;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Editable Cell State',
  //       description:
  //         '单元格是否允许编辑。返回值为 `true` 则表示可编辑；返回值为 `false` 则表示不可编辑，只读状态。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     editableCellState: any;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Editable Row Keys',
  //       description: '处于编辑状态的行。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     editableRowKeys: any[];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Expand Icon',
  //       description:
  //         '用于控制是否显示「展开图标列」，值为 `false` 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。`expandedRow` 存在时，该参数有效。支持全局配置 `GlobalConfigProvider`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     expandIcon: any = true;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Expand On Row Click',
  //       description: '是否允许点击行展开',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     expandOnRowClick: nasl.core.Boolean;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Expanded Row',
  //       description: '展开行内容，泛型 T 指表格数据类型。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     expandedRow: any;

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Expanded Row Keys',
  //       description: '展开行。支持语法糖 `.sync`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     expandedRowKeys: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Default Expanded Row Keys',
  //       description: '展开行。非受控属性。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     defaultExpandedRowKeys: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Filter Row',
  //       description: '自定义过滤状态行及清空筛选等。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     filterRow: any;

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Filter Value',
  //       description: '过滤数据的值。支持语法糖 `.sync`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     filterValue: object;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Default Filter Value',
  //       description: '过滤数据的值。非受控属性。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     defaultFilterValue: object;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Hide Sort Tips',
  //       description:
  //         '隐藏排序文本提示，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `false`',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     hideSortTips: nasl.core.Boolean;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Indeterminate Selected Row Keys',
  //       description: '半选状态行。选中行请更为使用 `selectedRowKeys` 控制。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     indeterminateSelectedRowKeys: any[];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Multiple Sort',
  //       description: '是否支持多列排序',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     multipleSort: nasl.core.Boolean = false;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Reserve Selected Row On Paginate',
  //       description:
  //         '行选中功能，是否在分页时保留上一页选中结果不清空，本地数据分页场景下，会全选所有页数据。值为 `false` 则表示全部选中操作停留在当前页，不跨分页；本地数据分页场景下，全选仅选中当前页',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     reserveSelectedRowOnPaginate: nasl.core.Boolean = true;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Row Selection Allow Uncheck',
  //       description: '行选中单选场景，是否允许取消选中',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     rowSelectionAllowUncheck: nasl.core.Boolean;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Row Selection Type',
  //       description:
  //         '行选中类型，单选或多选。效果和 `columns` 中配置的 `{ colKey: "row-select", type: "single" }` 一样。可选项：single/multiple',
  //       setter: {
  //         concept: 'EnumSelectSetter',
  //         options: [{ title: 'single' }, { title: 'multiple' }],
  //       },
  //     })
  //     rowSelectionType: 'single' | 'multiple';

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Select On Row Click',
  //       description: '是否在点击整行时选中',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     selectOnRowClick: nasl.core.Boolean;

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Selected Row Keys',
  //       description:
  //         '选中行。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制。支持语法糖 `.sync`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     selectedRowKeys: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Default Selected Row Keys',
  //       description:
  //         '选中行。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制。非受控属性。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     defaultSelectedRowKeys: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Show Sort Column Bg Color',
  //       description: '当前排序列是否显示背景色',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     showSortColumnBgColor: nasl.core.Boolean = false;

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Sort',
  //       description:
  //         '排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。支持语法糖 `.sync`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     sort: object | any[];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Default Sort',
  //       description:
  //         '排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。非受控属性。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     defaultSort: object | any[];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Sort On Row Draggable',
  //       description:
  //         '已废弃。允许表格行拖拽时排序。请更为使用 `dragSort=\\"row\\"`',
  //       setter: { concept: 'SwitchSetter' },
  //     })
  //     sortOnRowDraggable: nasl.core.Boolean = false;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Omit Base Table Props T Columns On Cell Click',
  //       description:
  //         '继承 `Omit<BaseTableProps<T>, "columns" | "onCellClick">` 中的全部属性',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     omitBaseTablePropsTColumnsOnCellClick: any;

  //     @Event({
  //       title: 'On Async Loading Click',
  //       description: '异步加载区域被点击时触发',
  //     })
  //     onAsyncLoadingClick: (event: any) => any;

  //     @Event({
  //       title: 'On Cell Click',
  //       description: '单元格点击时触发。',
  //     })
  //     onCellClick: (event: any) => any;

  //     @Event({
  //       title: 'On Change',
  //       description:
  //         '分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，`currentData` 表示变化后的数据。',
  //     })
  //     onChange: (event: any) => any;

  //     @Event({
  //       title: 'On Column Change',
  //       description:
  //         '确认操作之前列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列。',
  //     })
  //     onColumnChange: (event: any) => any;

  //     @Event({
  //       title: 'On Column Controller Visible Change',
  //       description: '列配置弹窗显示或隐藏变化时触发',
  //     })
  //     onColumnControllerVisibleChange: (event: any) => any;

  //     @Event({
  //       title: 'On Data Change',
  //       description:
  //         '本地数据排序导致 `data` 变化时触发，第一个参数指变化后的数据，第二个参数 `context.trigger` 表示触发本次变化的来源。',
  //     })
  //     onDataChange: (event: any) => any;

  //     @Event({
  //       title: 'On Display Columns Change',
  //       description: '确认列配置时触发。',
  //     })
  //     onDisplayColumnsChange: (event: any) => any;

  //     @Event({
  //       title: 'On Drag Sort',
  //       description:
  //         '拖拽排序时触发，`data` 表示排序前的数据，`newData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发。',
  //     })
  //     onDragSort: (event: any) => any;

  //     @Event({
  //       title: 'On Expand Change',
  //       description: '展开行发生变化时触发，泛型 T 指表格数据类型。',
  //     })
  //     onExpandChange: (event: any) => any;

  //     @Event({
  //       title: 'On Filter Change',
  //       description: '过滤参数发生变化时触发，泛型 T 指表格数据类型。',
  //     })
  //     onFilterChange: (event: any) => any;

  //     @Event({
  //       title: 'On Row Edit',
  //       description: '行编辑时触发。',
  //     })
  //     onRowEdit: (event: any) => any;

  //     @Event({
  //       title: 'On Row Validate',
  //       description:
  //         '行编辑校验完成后触发，即组件实例方法 `validateRowData` 执行结束后触发。`result` 表示校验结果，`trigger=self` 表示编辑组件内部触发的校验，`trigger="parent"` 表示表格父组件触发的校验。',
  //     })
  //     onRowValidate: (event: any) => any;

  //     @Event({
  //       title: 'On Select Change',
  //       description:
  //         '选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据。',
  //     })
  //     onSelectChange: (event: any) => any;

  //     @Event({
  //       title: 'On Sort Change',
  //       description:
  //         '排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序。',
  //     })
  //     onSortChange: (event: any) => any;

  //     @Event({
  //       title: 'On Validate',
  //       description:
  //         '可编辑行表格，全部数据校验完成后触发。即组件实例方法 `validateTableData` 执行结束后触发。',
  //     })
  //     onValidate: (event: any) => any;

  //     @Slot({
  //       title: 'Async Loading',
  //       description:
  //         '异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容。',
  //     })
  //     slotAsyncLoading: () => Array<ViewComponent>;

  //     @Slot({
  //       title: 'Expand Icon',
  //       description:
  //         '用于控制是否显示「展开图标列」，值为 `false` 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。`expandedRow` 存在时，该参数有效。支持全局配置 `GlobalConfigProvider`。',
  //     })
  //     slotExpandIcon: () => Array<ViewComponent>;

  //     @Slot({
  //       title: 'Expanded Row',
  //       description: '展开行内容，泛型 T 指表格数据类型。',
  //     })
  //     slotExpandedRow: () => Array<ViewComponent>;

  //     @Slot({
  //       title: 'Filter Icon',
  //       description: '自定义过滤图标，支持全局配置 `GlobalConfigProvider`。',
  //     })
  //     slotFilterIcon: () => Array<ViewComponent>;

  //     @Slot({
  //       title: 'Filter Row',
  //       description: '自定义过滤状态行及清空筛选等。',
  //     })
  //     slotFilterRow: () => Array<ViewComponent>;

  //     @Slot({
  //       title: 'Sort Icon',
  //       description: '自定义排序图标，支持全局配置 `GlobalConfigProvider`。',
  //     })
  //     slotSortIcon: () => Array<ViewComponent>;
  //   }

  //   @Component({
  //     title: 'Enhanced Table',
  //     icon: 'enhanced-table',
  //     description: '',
  //     group: 'Table',
  //   })
  //   export class ElEnhancedTablePro extends ViewComponent {
  //     constructor(options?: Partial<ElEnhancedTableProOptions>) {
  //       super();
  //     }
  //   }

  //   export class ElEnhancedTableProOptions extends ViewComponentOptions {
  //     @Prop({
  //       group: '主要属性',
  //       title: 'Before Drag Sort',
  //       description:
  //         '树形结构中，拖拽排序前控制，返回值为 `true` 则继续排序；返回值为 `false` 则中止排序还原数据。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     beforeDragSort: any;

  //     @Prop({
  //       group: '主要属性',
  //       sync: true,
  //       title: 'Expanded Tree Nodes',
  //       description:
  //         '展开的树形节点。非必须。在需要自由控制展开的树形节点时使用。其他场景无需设置，表格组件有内置展开逻辑。支持语法糖 `.sync`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     expandedTreeNodes: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Default Expanded Tree Nodes',
  //       description:
  //         '展开的树形节点。非必须。在需要自由控制展开的树形节点时使用。其他场景无需设置，表格组件有内置展开逻辑。非受控属性。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     defaultExpandedTreeNodes: any[] = [];

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Tree',
  //       description:
  //         '树形结构相关配置。具体属性文档查看 `TableTreeConfig` 相关描述。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     tree: object;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Tree Expand And Fold Icon',
  //       description:
  //         '自定义树形结构展开图标，支持全局配置 `GlobalConfigProvider`。',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     treeExpandAndFoldIcon: any;

  //     @Prop({
  //       group: '主要属性',
  //       title: 'Primary Table Props T',
  //       description: '继承 `PrimaryTableProps<T>` 中的全部属性',
  //       setter: { concept: 'InputSetter' },
  //     })
  //     primaryTablePropsT: any;

  //     @Event({
  //       title: 'On Abnormal Drag Sort',
  //       description:
  //         '异常拖拽排序时触发，如：树形结构中，非同层级之间的交换。`context.code` 指交换异常错误码，固定值；`context.reason` 指交换异常的原因。',
  //     })
  //     onAbnormalDragSort: (event: any) => any;

  //     @Event({
  //       title: 'On Expanded Tree Nodes Change',
  //       description:
  //         '树形结构，展开的树节点发生变化时触发，泛型 T 指表格数据类型。',
  //     })
  //     onExpandedTreeNodesChange: (event: any) => any;

  //     @Event({
  //       title: 'On Tree Expand Change',
  //       description:
  //         '已废弃。树形结构，用户操作引起节点展开或收起时触发。请更为使用 `onExpandedTreeNodesChange`。',
  //     })
  //     onTreeExpandChange: (event: any) => any;
  //   }
}
