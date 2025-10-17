/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        ':dataSource': '"[{}, {}, {}]"',
      },
      childAccept: false,
      useTemplateInDefaultSlot: true,
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
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '组件的数据源，配置内容为数据集对象或者返回数据集的逻辑。',
      bindOpen: true,
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: 'IDE 根据配置的数据源动态计算返回内容的数据结构，用于动态配置项 current.item 的类型说明。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '唯一字段',
      description: '唯一字段，默认使用数据 index 作为唯一字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    idField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '指定显示的文本字段，当插槽为空时显示该字段的值',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any;

    @Prop({
      group: '主要属性',
      title: '每行排列项数',
      description: '为空时默认为5',
      docDescription: '支持定义每一行排列的项数，为空时会自适应宽度并自动换行。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
    })
    column: nasl.core.Decimal | nasl.core.Integer = 5;

    @Prop({
      group: '状态属性',
      title: '是否可选择',
      description: '是否可选择',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不可选' }, { title: '单选' }, { title: '多选' }],
      },
    })
    selection: 'none' | 'single' | 'multiple' = 'none';

    @Prop({
      group: '数据属性',
      title: '是否范围',
      description: '是否范围选择',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => false,
    })
    isRange: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '清除选中值',
      description: '是否清除选中值',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.selection !== 'none',
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '行间距',
      description: '行间距',
      setter: { concept: 'NumberInputSetter' },
    })
    rowGap: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '样式属性',
      title: '列间距',
      description: '列间距',
      setter: { concept: 'NumberInputSetter' },
    })
    columnGap: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '样式属性',
      title: '均分宽度',
      description: '设置是否均分宽度',
      docDescription: `支持根据组件列表所占宽度自动均匀排布各项。
- 开启：默认根据组件列表宽度自动计算每一项内容宽度，宽度为 100% / 每行项数。
- 关闭：每一项内容自适应宽度。`,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    equalWidth: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '分页',
      description: '是否显示分页组件',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    pagination: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '总条数',
      description: '总条数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    total: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '显示总条数',
      description: '是否显示总条数',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination !== false,
    })
    showTotal: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示跳转输入',
      description: '是否显示跳转输入',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination !== false,
    })
    showJumper: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '当前页',
      description: '当前页码',
      sync: true,
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
      if: (_) => _.pagination !== false,
    })
    currentPage: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '每页条数',
      description: '每页条数',
      sync: true,
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
      if: (_) => _.pagination !== false,
    })
    pageSize: nasl.core.Integer = 10;

    @Prop({
      group: '主要属性',
      title: '每页数量选项',
      description: '每页显示个数选择器的选项设置',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    pageSizes: nasl.collection.List<nasl.core.Integer> = [10, 20, 50, 100];

    @Prop({
      group: '主要属性',
      title: '分页背景色',
      description: '是否为分页按钮添加背景色',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.pagination !== false,
    })
    paginationBackground: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '分页尺寸',
      description: '分页组件的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '默认' }, { title: '大' }],
      },
      if: (_) => _.pagination !== false,
    })
    paginationSize: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '选中值',
      description: '当前选中的值',
      sync: true,
      if: (_) => _.selection !== 'none',
    })
    modelValue: M extends true ? nasl.collection.List<V> : V;

    @Prop({
      group: '主要属性',
      title: '选择模式',
      description: '选择模式：none-不可选，single-单选，multiple-多选',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不可选' }, { title: '单选' }, { title: '多选' }],
      },
    })
    selectionMode: 'none' | 'single' | 'multiple' = 'none';

    @Prop({
      group: '主要属性',
      title: '是否可选',
      description: '是否可选（兼容旧版，建议使用 selectionMode）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    selectable: nasl.core.Boolean = false;

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
