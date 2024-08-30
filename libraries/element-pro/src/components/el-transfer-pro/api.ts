/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'container',
    }
  })
  @Component({
    title: '穿梭框',
    icon: 'transfer',
    description: '',
    group: 'Selector',
  })
  export class ElTransferPro<T, V> extends ViewComponent {
    @Prop({
      title: '目标数据',
    })
    value: nasl.collection.List<V>;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElTransferProOptions<T, V>>) {
      super();
    }
  }

  export class ElTransferProOptions<T, V> extends ViewComponentOptions {
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

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElTransferProOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElTransferProOptions<T, V>, 'disabledField'>({
      group: '数据属性',
      title: '禁用字段',
      description: '集合的元素类型中，用于标识节点的disabled属性',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    disabledField: (item: T) => any = ((item: any) => item.disabled) as any;

    @Prop({
      group: '数据属性',
      title: '目标数据',
      description: '目标数据',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    value: nasl.collection.List<V>;

    @Prop({
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '数据列表选中项。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    checked: nasl.collection.List<V>;

    @Prop({
      group: '主要属性',
      title: '可操作方向',
      description: '穿梭框可操作方向。可选项：left/right/both',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左' }, { title: '右' }, { title: '两端' }],
      },
    })
    direction: 'left' | 'right' | 'both' = 'both';

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '禁用全部操作：搜索、选中等',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '暂无数据文本',
      description: '列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容。',
      setter: { concept: 'InputSetter' },
    })
    empty: nasl.core.String | nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '主要属性',
      title: '方向操作按钮文本',
      description: '方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：["向左", "向右"]',
      setter: { concept: 'InputSetter' },
    })
    operation: nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '数据属性',
      title: '筛选',
      description: '搜索框配置，值为 false 表示不显示搜索框；值为 true 表示显示默认搜索框',
      setter: { concept: 'SwitchSetter' },
    })
    search: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示全选',
      description: '是否显示全选，值类型为数组则表示分别控制源列表和目标列表。',
      setter: { concept: 'SwitchSetter' },
    })
    showCheckAll: nasl.core.Boolean | any[] = true;

    @Event({
      title: '改变后',
      description: '数据列表发生变化时触发，`type` 值为 `source`，表示源列表移动到目标列表，值为 `target` 表示目标列表移动到源列表，movedValue 则表示被移动的选项。',
    })
    onChange: (event: nasl.collection.List<V>) => any;

    @Event({
      title: '选中后',
      description: '源数据列表或目标数据列表的选中项发生变化时触发，`context.type` 可以区分触发来源是目标列表，还是源列表。',
    })
    onCheckedChange: (event: {
      checked: nasl.collection.List<V>;
      sourceChecked: nasl.collection.List<V>;
      targetChecked: nasl.collection.List<V>;
      type: 'source' | 'target';
    }) => any;

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
      }
    }) => any;

    @Event({
      title: '筛选时',
      description: '搜索时触发，options.query 表示用户输入的内容。',
    })
    onSearch: (event: {
      query: nasl.core.String;
      type: 'source' | 'target';
      trigger: 'input' | 'enter';
    }) => any;

    @Slot({
      title: '来源标题',
      description: '穿梭框标题',
    })
    slotTitlesource: () => Array<ViewComponent>;

    @Slot({
      title: '目标标题',
      description: '穿梭框标题',
    })
    slotTitletarget: () => Array<ViewComponent>;

    @Slot({
      title: '来源底部内容',
      description: '穿梭框底部内容。',
    })
    slotFootersource: () => Array<ViewComponent>;

    @Slot({
      title: '目标底部内容',
      description: '穿梭框底部内容。',
    })
    slotFootertarget: () => Array<ViewComponent>;
  }
}
