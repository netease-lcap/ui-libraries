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
    order: 1,
    sourceDocURL: 'https://tdesign.tencent.com/vue/components/table',
    ideusage: {
      idetype: 'container',
      structured: true,
      containerDirection: 'row',
      disableSlotAutoFill: [
        {
          slot: 'expandedRow',
          expression: "!this.getAttribute('hasExpandedRow')?.value",
        },
      ],
      events: {
        click: "this.getAttribute('hasExpandedRow')?.value",
      },
      additionalAttribute: {
        rowKey: '"index"',
        valueField: '"index"',
      },
      forceUpdateWhenAttributeChange: true,
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
      childAccept: "target.tag === 'el-table-column-pro'",
    },
  })
  @Component({
    title: '数据表格',
    icon: 'table-view',
    description: '用于展示大量结构化数据。支持排序、过滤（筛选）、分页、自定义操作等复杂功能。',
    group: 'Table',
  })
  export class ElTablePro<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: ElTableProOptions<T, V, P, M>['dataSource'];

    @Prop({
      title: '分页大小',
    })
    size: ElTableProOptions<T, V, P, M>['pageSize'];

    @Prop({
      title: '当前页数',
    })
    page: ElTableProOptions<T, V, P, M>['page'];

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
    selectedRowKeys: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      group: '数据属性',
      title: '表格可选择',
      description: '表格可选择',
      docDescription: '表格可选择',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    selection: nasl.core.Boolean = false;

    @Prop<ElTableProOptions<T, V, P, M>, 'multiple'>({
      group: '数据属性',
      title: '可多选',
      description: '设置是否可以多选行',
      docDescription: '是否可以多选',
      setter: {
        concept: 'SwitchSetter',
      },

      if: (_) => _.selection,
    })
    multiple: M = false as any;

    @Prop<ElTableProOptions<T, V, P, M>, 'treeDisplay'>({
      group: '数据属性',
      title: '树形模式',
      description: '以树形数据展示表格',
      docDescription: '表格是否以树型方式展示。默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.hasExpandedRow === false,
    })
    treeDisplay: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '展开值',
      description: '展开行的值。',
    })
    expandedRowKeys: V;

    @Prop<ElTableProOptions<T, V, P, M>, 'hasExpandedRow'>({
      group: '主要属性',
      title: '是否打开展开行',
      description: '是否打开展开行',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.treeDisplay === false,
    })
    hasExpandedRow: nasl.core.Boolean = false;

    @Prop<ElTableProOptions<T, V, P, M>, 'hasIndexColumn'>({
      group: '主要属性',
      title: '是否显示序号列',
      description: '是否显示序号列',
      setter: { concept: 'SwitchSetter' },
    })
    hasIndexColumn: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示表格边框',
      description: '是否显示表格边框',
      setter: { concept: 'SwitchSetter' },
    })
    bordered: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription:
        '表格展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
      designerValue: [{}, {}, {}],
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '表格每一行的数据类型。该属性为展示属性，由数据源推导得到，无需填写',
    })
    dataSchema: T;

    // @Prop({
    //   group: '主要属性',
    //   title: '是否禁用本地数据分页',
    //   description:
    //     '是否禁用本地数据分页。当 `data` 数据长度超过分页大小时，会自动进行本地数据分页。如果 `disableDataPage` 设置为 true，则无论何时，都不会进行本地数据分页',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // disableDataPage: nasl.core.Boolean = false;

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
      description: '表格最大高度，超出后会出现滚动条。示例：100, "30%", "300"。值为数字类型，会自动加上单位 px',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String | nasl.core.Decimal;

    @Prop<ElTableProOptions<T, V, P, M>, 'pagination'>({
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
    pagination: nasl.core.Boolean = true;

    @Prop<ElTableProOptions<T, V, P, M>, 'pageSizeOptions'>({
      group: '数据属性',
      title: '每页条数选项 ',
      description: '每页条数切换器的选项',
      setter: { concept: 'InputSetter' },
      if: (_) => _.pagination !== false,
    })
    pageSizeOptions: nasl.core.String = '[10, 20, 50]';

    @Prop<ElTableProOptions<T, V, P, M>, 'pageSize'>({
      group: '数据属性',
      title: '默认每页条数',
      docDescription: '每页的数据条数。默认20条。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    pageSize: nasl.core.Integer = 10;

    @Prop<ElTableProOptions<T, V, P, M>, 'page'>({
      group: '数据属性',
      title: '当前页数',
      description: '当前默认展示在第几页',
      docDescription: '当前加载的表格页。默认1。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    page: nasl.core.Integer = 1;

    @Prop<ElTableProOptions<T, V, P, M>, 'showTotal'>({
      group: '数据属性',
      title: '显示总条数',
      description: '是否显示总条数',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.pagination !== false,
    })
    showTotal: nasl.core.Boolean = true;

    @Prop<ElTableProOptions<T, V, P, M>, 'showJumper'>({
      group: '数据属性',
      title: '显示跳转输入',
      description: '是否显示跳转页码控制器',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.pagination !== false,
    })
    showJumper: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '初始化排序规则',
      description: '设置数据初始化时的排序字段和顺序规则',
      docDescription: '支持选择数据表格数据源中的某一条数据，配置默认排序规则，支持升序和降序',
    })
    sorting: {
      field: nasl.core.String;
      order: nasl.core.String;
      compare?: Function;
    } = { field: undefined, order: 'desc' };

    @Prop({
      group: '样式属性',
      title: '表格行动态样式',
      description: '动态设置表格行背景色、字体颜色等样式',
      docDescription: '动态设置表格行背景色、字体颜色等样式',
      bindOpen: true,
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
    })
    rowStyle: (current: Current<T>) => {
      /**
       * @title 表格行背景颜色
       */
      backgroundColor?: nasl.core.String;
      /**
       * @title 表格行字体颜色
       */
      color?: nasl.core.String;
    };
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
    @Prop<ElTableProOptions<T, V, P, M>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '在单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      docDescription: '在表格开启了单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V;

    // @Prop({
    //   group: '主要属性',
    //   title: '唯一标识',
    //   description:
    //     '必需。唯一标识一行数据的字段名，来源于 `data` 中的字段。如果是字段嵌套多层，可以设置形如 `item.a.id` 的方法',
    //      setter: {
    //           concept: 'PropertySelectSetter',
    //       },
    // })
    // rowKey: nasl.core.String = 'index';

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
      title: '开启虚拟滚动',
      description: '是否开启表格虚拟滚动',
      setter: { concept: 'SwitchSetter' },
    })
    virtual: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示表头',
      description: '是否显示表头',
      setter: { concept: 'SwitchSetter' },
    })
    showHeader: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '表头吸顶',
      description: '是否表头吸顶',
      setter: { concept: 'SwitchSetter' },
    })
    headerAffixedTop: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '显示列',
      bindOpen: true,
      description: '列配置功能中，当前显示的列。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    displayColumns: nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '交互属性',
      title: '可调整列宽',
      description: '设置制品是否可以调整列宽',
      setter: { concept: 'SwitchSetter' },
    })
    resizable: nasl.core.Boolean = false;

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

    @Prop<ElTableProOptions<T, V, P, M>, 'parentField'>({
      group: '数据属性',
      title: '父级值字段',
      description: '当数据源为平铺数据时自动生成树形数据的节点字段名，重要：值字段名需要一起配置',
      docDescription:
        '标识父节点字段名，用于标识表格行取哪个数据作为父级的判断，需同步配置“值字段名”。在"树行模式"属性开启时有效',
      setter: {
        concept: 'PropertySelectSetter',
      },
      onChange: [{ update: { dragSort: 'disabled' } }],
      if: (_) => _.treeDisplay === true,
    })
    parentField: (item: T) => any;

    @Prop<ElTableProOptions<T, V, P, M>, 'checkStrictly'>({
      group: '数据属性',
      title: '父子行选中是否独立',
      description: '父子行选中是否独立',
      docDescription: '父子行选中是否独立',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.treeDisplay === true,
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop<ElTableProOptions<T, V, P, M>, 'dragSort'>({
      group: '主要属性',
      title: '行拖拽',
      description: '拖拽排序方式，行拖拽排序，这种方式无法进行文本复制，',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '行拖拽' }, { title: '关闭拖拽' }],
      },

      // if: (_) => _.treeDisplay === false,
    })
    dragSort: 'row' | 'disabled' = 'disabled';

    @Prop({
      group: '主要属性',
      title: '列配置控制器',
      description: '显示列控制器',
      setter: { concept: 'SwitchSetter' },
    })
    columnController: nasl.core.Boolean = false;
    // @Prop({
    //   group: '主要属性',
    //   title: 'Top Content',
    //   description: '表格顶部内容，可以用于自定义列设置、顶部查询条件等。',
    //   setter: { concept: 'InputSetter' },
    // })
    // topContent: any;

    // @Prop({
    //   group: '主要属性',
    //   title: '内容上下方向对齐',
    //   description: '行内容上下方向对齐。可选项：top/middle/bottom',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '上' }, { title: '中' }, { title: '下' }],
    //   },
    // })
    // verticalAlign: 'top' | 'middle' | 'bottom' = 'middle';

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
      title: '单元格点击时',
      description: '单元格点击时触发。',
    })
    onCellClick: (event: any) => any;

    @Event({
      title: '选中行变化时',
      description: '选中行变化时触发',
    })
    onSelectChange: (event: {
      selectedRowKeys: nasl.collection.List<V>;
      selectedRowData: nasl.collection.List<T>;
      type: nasl.core.String; // 'uncheck' | 'check'
      currentRowKey?: string;
      currentRowData?: T;
    }) => any;

    // @Event({
    //   title: 'On Column Resize Change',
    //   description:
    //     '列调整大小之后触发。`context.columnsWidth` 表示操作后各个列的宽度；',
    // })
    // onColumnResizeChange: (event: any) => any;

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
      title: '拖拽时触发',
      description: '拖拽时触发',
    })
    onDragSort: (event: {
      currentIndex: nasl.core.Integer;
      current: T;
      targetIndex: nasl.core.Integer;
      target: T;
      data: nasl.collection.List<T>;
      newData: nasl.collection.List<T>;
    }) => any;

    @Event({
      title: '列配置确认后',
      description: '列配置确认后触发',
    })
    onDisplayColumnsChange: (event: nasl.collection.List<string>) => any;
    // @row-dbclick='xxx'
    // onRowClick="log"
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
          code: '<el-table-column-pro data-nodepath-multiple="ture"><template #title><el-text text="表格列"></el-text></template></el-table-column-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '展开行',
      description: '表格列',
    })
    slotExpandedRow: (current: Current<T>) => Array<ViewComponent>;

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
      parentAccept: "['el-table-pro'].includes(target.tag)",
      childAccept: false,

      structured: true,
      // selector: 'multiple',
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'title')",
          cssSelector: 'th',
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'cell')",
          cssSelector: 'td',
        },
      ],
      namedSlotOmitWrapper: ['cell', 'edit'],
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
  export class ElTableColumnPro<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
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
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    colKey: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '排序',
      description: '设置该列是否可以排序',
      docDescription: '开启后该列可排序，可设置默认顺序，升序或倒序',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    sorter: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '列类型',
      description: '列类型',
      docDescription: '列类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '普通列' }, { title: '编辑列' }],
      },
    })
    type: 'normal' | 'editable' = 'normal';

    @Prop<ElTableColumnProOptions<T, V, P, M>, 'rules'>({
      group: '主要属性',
      title: '验证规则',
      description: '表单字段校验规则。',
      setter: { concept: 'InputSetter' },
      bindHide: true,
      if: (_) => _.type === 'editable',
    })
    rules: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '右对齐' }, { title: '居中对齐' }],
      },
    })
    align: 'left' | 'right' | 'center' = 'left';

    @Prop<ElTableColumnProOptions<T, V, P, M>, 'abortEditOnEvent'>({
      group: '主要属性',
      title: '退出编辑事件',
      description: '退出编辑事件',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '改变后' }, { title: '失去焦点后' }, { title: '点击其他单元格' }],
      },
      if: (_) => _.type === 'editable',
    })
    abortEditOnEvent: 'onChange' | 'onBlur' | '' = '';

    @Prop({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: ' 左侧固定' }, { title: '右侧固定' }, { title: '不固定' }],
      },
    })
    fixed: 'left' | 'right' | '' = '';

    @Prop({
      group: '主要属性',
      title: '表头文本过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription: '开启后，该列表头文本过长会省略显示，否则换行显示，默认关闭',
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

    @Prop({
      group: '样式属性',
      title: '自动合并相同数据',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autoMerge: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '列宽度',
      description: '设置列宽度，可设置为数字或百分比',
      docDescription:
        '列宽，可以作为最小宽度使用。当列宽总和小于 table 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 table 元素，表现为定宽。可以同时调整 table 元素的宽度来达到自己想要的效果	',
    })
    width: nasl.core.String | nasl.core.Decimal | nasl.core.Integer;

    @Event({
      title: '行编辑编辑完成',
      description: '退出编辑态后触发',
    })
    onRowEdit: (event: { colIndex: number; rowIndex: number; newRowData: T; row: T }) => any;

    @Slot({
      title: '单元格',
      description: '对单元格的数据展示进行自定义',
    })
    slotCell: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '编辑单元格',
      description: '对单元格的编辑数据展示进行自定义',
    })
    slotEdit: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '对标题进行自定义',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '多级表头',
      description: '多级表头',
      snippets: [
        {
          title: '表格列',
          code: '<el-table-column-pro data-nodepath-multiple="ture"><template #title><el-text text="表格列"></el-text></template></el-table-column-pro>',
        },
        // {
        //   title: '表格动态列列',
        //   code: '<el-table-column-dynamic-pro data-nodepath-multiple="ture"><template #title><el-text text="表格列"></el-text></template></el-table-column-dynamic-pro>',
        // }
      ],
    })
    slotDefault: () => Array<ViewComponent>;

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

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "['el-table-pro'].includes(target.tag)",
      childAccept: false,

      structured: true,
      // selector: 'multiple',
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'title')",
          cssSelector: 'th',
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'cell')",
          cssSelector: 'td',
        },
      ],
      namedSlotOmitWrapper: ['cell', 'edit'],
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
  export class ElTableColumnDynamicPro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    T1,
  > extends ViewComponent {
    constructor(options?: Partial<ElTableColumnDynamicProOptions<T, V, P, M, T1>>) {
      super();
    }
  }

  export class ElTableColumnDynamicProOptions<
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

    @Prop<ElTableColumnDynamicProOptions<T, V, P, M, T1>, 'colKey'>({
      group: '数据属性',
      title: '列字段',
      description: '在单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      docDescription: '在表格开启了单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
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
        concept: 'SwitchSetter',
      },
    })
    sorter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '右对齐' }, { title: '居中对齐' }],
      },
    })
    align: 'left' | 'right' | 'center' = 'left';

    @Prop({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: ' 左侧固定' }, { title: '右侧固定' }, { title: '不固定' }],
      },
    })
    fixed: 'left' | 'right' | '' = '';

    @Prop({
      group: '主要属性',
      title: '表头文本过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription: '开启后，该列表头文本过长会省略显示，否则换行显示，默认关闭',
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

    @Prop({
      group: '样式属性',
      title: '自动合并相同数据',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autoMerge: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '列宽度',
      description: '设置列宽度，可设置为数字或百分比',
      docDescription:
        '列宽，可以作为最小宽度使用。当列宽总和小于 table 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 table 元素，表现为定宽。可以同时调整 table 元素的宽度来达到自己想要的效果	',
    })
    width: nasl.core.String | nasl.core.Decimal | nasl.core.Integer;

    @Slot({
      title: '单元格',
      description: '对单元格的数据展示进行自定义',
    })
    slotCell: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '编辑单元格',
      description: '对单元格的编辑数据展示进行自定义',
    })
    slotEdit: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '对标题进行自定义',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;
  }
}
