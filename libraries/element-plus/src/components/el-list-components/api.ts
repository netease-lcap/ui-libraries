/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        ':dataSource': '"[{}, {}, {}]"',
        ':model': '"[{}, {}, {}]"',
      },
      childAccept: false,
      forceUpdateWhenAttributeChange: true,
      refreshMutationNodesWhenAttributeChange: ['formMode'],
      useTemplateInDefaultSlot: true,
      slotWrapperInlineStyle: {
        default: 'width: 100%;',
      },
      style: [
        {
          selector: '.el-list-components__item:not(:first-child)',
          declaration: 'opacity: 0.4; cursor: not-allowed !important; pointer-events: none',
        },
        {
          selector: '.el-list-components__frag:not(:first-child)',
          declaration: 'opacity: 0.4; cursor: not-allowed !important; pointer-events: none',
        },
      ],
    },
  })
  @Component({
    title: '组件列表',
    icon: 'forcom',
    description: '组件列表',
    group: 'Table',
  })
  export class ElListComponents<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponent {
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


    @Method({
      title: '带页码刷新',
      description: '保持页码，重新加载',
    })
    loadTo(
      @Param({
          title: '页数',
          description: '要刷新的页数',
      })
      page?: nasl.core.Integer,
    ): void {}

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElListComponentsOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElListComponentsOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '表单模式',
      description: '是否以表单模式显示',
      docDescription: '开启后，组件列表会以表单模式显示，每个列表项会显示在一个表单项中。',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        { clear: ['dataSource', 'dataSchema', 'model', 'idField', 'textField', 'pagination', 'selectionMode'] },
      ],
    })
    formMode: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '设置组件列表的数据来源，支持绑定集合类型变量或返回集合的逻辑',
      docDescription:
        '可以绑定 List<T> 类型的变量，或者绑定返回 List<T> 类型的逻辑。当使用数据源时，组件列表会根据数据动态生成，每个数据项对应一个列表项。',
      if: (_) => !_.formMode,
      setter: {
        concept: 'DataSourceSetter',
      },
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源中每个数据项的类型定义，用于类型推导和属性选择',
      docDescription: '此属性为只读，当绑定数据源后会自动识别数据项的类型T，用于在插槽中提供类型提示和属性选择器。',
      if: (_) => !_.formMode,
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '表单值',
      description: '组件列表的表单值',
      docDescription: '组件列表的表单值，用于存储组件列表的表单值。',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => _.formMode,
    })
    model: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '唯一标识',
      description: '指定数据项中哪个字段作为列表项的唯一标识',
      docDescription:
        '当使用数据源时，需要指定数据项中的哪个属性作为列表项的唯一标识。此值用于列表项的渲染和更新优化。默认为数据的索引值。',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => !_.formMode,
    })
    idField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '指定数据项中哪个字段作为列表项的显示文本',
      docDescription:
        '当插槽为空时，会显示此字段的值作为列表项的内容。例如：如果数据项有name字段，则选择name作为文本字段。',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => !_.formMode,
    })
    textField: (item: T) => any;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '列数',
      description: '设置每行显示的组件数量',
      docDescription:
        '控制每行排列的组件数量。设置为具体数字时，组件会按指定数量排列；为0时会根据容器宽度自适应排列并自动换行。默认值为0。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    column: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '均分宽度',
      description: '是否让每个组件平均分配宽度',
      docDescription:
        '开启后，每个组件会平均分配容器宽度。列数大于 0 时按列数等分；列数为 0 时所有项宽度与最宽项对齐。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    equalWidth: nasl.core.Boolean = true;

    // 分页相关（联动属性组）
    @Prop({
      group: '主要属性',
      title: '分页模式',
      description: '选择分页的显示模式',
      docDescription:
        '控制分页的显示方式。不启用：不显示分页；自动加载更多：滚动到底部时自动加载；分页：显示分页组件。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不启用' }, { title: '自动加载更多' }, { title: '分页' }],
      },
      if: (_) => !_.formMode,
    })
    pagination: 'none' | 'autoMore' | 'page' = 'none';

    @Prop({
      group: '主要属性',
      title: '显示总条数',
      description: '是否在分页组件中显示总条数',
      docDescription: '开启后，分页组件会显示数据的总条数信息，格式为"共 X 条"。',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination === 'page',
    })
    showTotal: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示跳转',
      description: '是否显示页码跳转输入框',
      docDescription: '开启后，分页组件会显示一个输入框，用户可以输入页码直接跳转到指定页面。',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination === 'page',
    })
    showJumper: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '当前页',
      description: '当前显示的页码',
      docDescription: '设置当前激活的页码，从1开始计数。用户切换页面时此值会自动更新。',
      sync: true,
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
      if: (_) => _.pagination === 'page',
    })
    currentPage: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '每页条数',
      description: '每页显示的数据条数',
      docDescription: '设置每页显示多少条数据。用户可以通过分页组件的下拉选择器修改此值。',
      sync: true,
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
      if: (_) => _.pagination === 'page',
    })
    pageSize: nasl.core.Integer = 10;

    @Prop({
      group: '主要属性',
      title: '每页数量选项',
      description: '每页条数选择器的可选值',
      docDescription: '设置每页条数选择器中显示的选项，用户可以从这些选项中选择每页显示的数据条数。',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.pagination === 'page',
    })
    pageSizes: nasl.collection.List<nasl.core.Integer> = [10, 20, 50, 100];

    @Prop({
      group: '主要属性',
      title: '分页背景色',
      description: '是否为分页按钮添加背景色',
      docDescription: '开启后，分页按钮会显示背景色，提供更好的视觉反馈。关闭后，分页按钮为透明背景。',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination === 'page',
    })
    paginationBackground: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '分页尺寸',
      description: '分页组件的尺寸大小',
      docDescription: '控制分页组件的整体尺寸。小：紧凑型分页；默认：标准尺寸；大：宽松型分页。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '默认' }, { title: '大' }],
      },
      if: (_) => _.pagination === 'page',
    })
    paginationSize: 'small' | 'default' | 'large' = 'default';

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    // 选择相关（联动属性组）
    @Prop({
      group: '交互属性',
      title: '选择模式',
      description: '设置列表项的选择模式',
      docDescription:
        '控制用户是否可以选择列表项以及选择的方式。不可选：用户无法选择；单选：只能选择一个；多选：可以选择多个。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不可选' }, { title: '单选' }, { title: '多选' }],
      },
      if: (_) => !_.formMode,
    })
    selectionMode: 'none' | 'single' | 'multiple' = 'none';

    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '是否允许清除已选中的项',
      docDescription: '开启后，用户可以通过点击清除按钮或按ESC键来清除所有已选中的项。',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.selectionMode !== 'none',
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '是否范围',
      description: '是否支持范围选择',
      docDescription: '开启后，用户可以选择一个范围内的连续项。此功能目前暂未实现。',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => false,
    })
    isRange: nasl.core.Boolean = false;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '选中值',
      description: '当前选中的列表项值',
      docDescription:
        '绑定当前选中的列表项值。单选模式下为单个值，多选模式下为数组。当用户选择或取消选择时，此值会自动更新。',
      sync: true,
      if: (_) => _.selectionMode !== 'none',
    })
    modelValue: M extends true ? nasl.collection.List<V> : V;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '行间距',
      description: '设置组件行与行之间的间距',
      docDescription: '控制垂直方向上相邻两行组件之间的距离。数值越大，行间距越大。单位为像素(px)。',
      setter: { concept: 'NumberInputSetter' },
    })
    rowGap: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '样式属性',
      title: '列间距',
      description: '设置组件列与列之间的间距',
      docDescription: '控制水平方向上相邻两列组件之间的距离。数值越大，列间距越大。单位为像素(px)。',
      setter: { concept: 'NumberInputSetter' },
    })
    columnGap: nasl.core.Decimal | nasl.core.Integer = 0;

    @Event({
      title: '页码改变时',
      description: '当前页码改变时触发',
    })
    onPageChange: (event: { page: nasl.core.Integer; pageSize: nasl.core.Integer }) => any;

    @Event({
      title: '每页数量改变时',
      description: '每页显示条数改变时触发',
    })
    onSizeChange: (event: { page: nasl.core.Integer; pageSize: nasl.core.Integer }) => any;

    @Event({
      title: '数据加载前触发',
      description: '数据加载前触发',
    })
    onBefore: () => any;

    @Event({
      title: '数据加载成功时触发',
      description: '数据加载成功时触发',
    })
    onSuccess: () => any;


    @Event({
      title: '选中改变时',
      description: '选中值改变时触发',
    })
    onSelectionChange: (event: { value: any; items: nasl.collection.List<T> }) => any;

    @Slot({
      title: '默认',
      description: '内容自定义',
    })
    slotDefault: (current: Current<T>) => Array<ViewComponent>;
  }
}
