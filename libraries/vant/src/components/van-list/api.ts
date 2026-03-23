/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    show: true,
    ideusage: {
      idetype: 'container',
      dataSource: {
        display: 3,
        loopElem: ' > div',
        loopRule: 'nth-child(n+2)',
        displayData: '"[{}, {}, {}]"',
        propertyName: ':dataSource',
        emptySlot: {
          condition: '!this.getAttribute("dataSource")',
          accept: false,
        },
      },
    },
  })
  @Component({
    title: '列表',
    icon: 'list-view',
    description: '用于列举大量数据的列表框',
    group: 'Table',
  })
  export class VanList<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void { }

    constructor(options?: Partial<VanListOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class VanListOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '组件的数据源，配置内容为数据集对象或者返回数据集的逻辑。',
      setter: {
        concept: 'DataSourceSetter',
      },
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
      title: '唯一标识',
      description: '指定数据项中哪个字段作为列表项的唯一标识',
      docDescription:
        '当使用数据源时，需要指定数据项中的哪个属性作为列表项的唯一标识。此值用于列表项的渲染和更新优化。默认为数据的索引值。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '指定数据项中哪个字段作为列表项的显示文本',
      docDescription:
        '当插槽为空时，会显示此字段的值作为列表项的内容。例如：如果数据项有name字段，则选择name作为文本字段。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any;

    @Prop({
      group: '主要属性',
      title: '列数',
      description: '设置每行显示的组件数量',
      docDescription:
        '控制每行排列的组件数量。设置为具体数字时，组件会按指定数量排列；为空时会根据容器宽度自适应排列并自动换行。默认值为5。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
    })
    column: nasl.core.Decimal | nasl.core.Integer = 5;

    @Prop({
      group: '主要属性',
      title: '均分宽度',
      description: '是否让每个组件平均分配宽度',
      docDescription:
        '开启后，每个组件会平均分配容器宽度，宽度计算公式为：容器宽度 / 每行列数。关闭后，每个组件根据内容自适应宽度。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    equalWidth: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '分页模式',
      description: '选择分页的显示模式',
      docDescription:
        '控制分页的显示方式。不启用：不显示分页；自动加载更多：滚动到底部时自动加载；分页：显示分页组件。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '不启用' }, { title: '自动加载更多' }],
      },
    })
    pagination: 'none' | 'autoMore' = 'none';


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

    @Prop({
      group: '主要属性',
      title: '单元格模式',
      description: '是否为单元格模式',
      setter: { concept: 'SwitchSetter' },
    })
    isCell: nasl.core.Boolean = false;

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


    @Prop({
      group: '样式属性',
      title: '加载过程中的提示文案',
      description: '加载过程中的提示文案',
      setter: { concept: 'InputSetter' },
    })
    loadingText: nasl.core.String = '加载中...';

    @Prop({
      group: '样式属性',
      title: '加载完成后的提示文案',
      description: '加载完成后的提示文案',
      setter: { concept: 'InputSetter' },
    })
    finishedText: nasl.core.String = '没有更多了';

    @Prop({
      group: '样式属性',
      title: '加载失败后的提示文案',
      description: '加载失败后的提示文案',
      setter: { concept: 'InputSetter' },
    })
    errorText: nasl.core.String = '请求失败，点击重新加载';

    @Slot({
      title: '项',
      description: '自定义选项的结构和样式',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
