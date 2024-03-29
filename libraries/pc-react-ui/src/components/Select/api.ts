/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: "选择器",
    icon: "select",
    description: "下拉选择器，支持单选、多选、搜索等功能",
    group: "Selector",
  })
  export class Select<
    T,
    V,
    P extends boolean,
    M extends boolean,
    C extends string
  > extends ViewComponent {
    constructor(options?: Partial<SelectOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class SelectOptions<
    T,
    V,
    P extends boolean,
    M extends boolean,
    C extends string
  > extends ViewComponentOptions {
    @Prop({
      group: "数据属性",
      title: "数据源",
      description:
        "展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。",
      docDescription:
        "支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑",
    })
    dataSource: P extends true
      ? { list: nasl.collection.List<T>; total: nasl.core.Integer }
      : nasl.collection.List<T>;

    @Prop({
      group: "数据属性",
      title: "数据类型",
      description: "数据源返回的数据结构的类型，自动识别类型进行展示说明",
      docDescription:
        "该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。",
    })
    dataSchema: T;

    @Prop({
      group: "数据属性",
      title: "选中值",
      description: "当前选中的值",
      sync: true,
      docDescription: "当前选择的值",
    })
    value: M extends true
      ? C extends ""
        ? nasl.collection.List<V>
        : nasl.core.String
      : V;

    @Prop<SelectOptions<T, V, P, M, C>, "textField">({
      group: "数据属性",
      title: "文本字段",
      description: "集合的元素类型中，用于显示文本的属性名称",
      docDescription:
        "集合的元素类型中，用于显示文本的属性名称，支持自定义变更。",
      setter: {
        concept: "PropertySelectSetter",
      },
    })
    textField: (item: T) => nasl.core.String;

    @Prop<SelectOptions<T, V, P, M, C>, "valueField">({
      group: "数据属性",
      title: "值字段",
      description: "集合的元素类型中，用于标识选中值的属性",
      docDescription: "集合的元素类型中，用于标识选中值的属性，支持自定义变更",
      setter: {
        concept: "PropertySelectSetter",
      },
    })
    valueField: (item: T) => V;

    @Prop({
      group: "数据属性",
      title: "初始化排序规则",
      description: "设置数据初始化时的排序字段和顺序规则",
    })
    sorting: { field: nasl.core.String; order: "asc" | "desc" } = {
      field: '',
      order: "desc",
    };

    @Prop({
      group: "数据属性",
      title: "选中值完整数据",
      description:
        "当下拉列表是分页或加载更多时，需要使用该字段回显选择框内数据。",
      docDescription:
        "当下拉列表是分页或加载更多时，需要使用该字段回显选择框内数据。",
    })
    private labelInValue: nasl.collection.List<{
      text: nasl.core.String;
      value: V;
    }>;

    @Prop({
      group: "数据属性",
      title: "筛选",
      description: "设置是否可以筛选，开启将会支持搜索。",
      docDescription: "开启后选择框可输入文本进行筛选",
      setter: {
        concept: "SwitchSetter",
      },
    })
    showSearch: nasl.core.Boolean = false;

    @Prop({
      group: "主要属性",
      title: "占位符",
      description: "为空时显示的占位符文本",
      docDescription: "选择框无内容时的提示信息，支持自定义编辑，默认为请选择",
    })
    placeholder: nasl.core.String = "请选择";

    @Prop({
      group: "主要属性",
      title: "自动获取焦点",
      description: "设置是否自动获取焦点",
      docDescription: "控制是否在进入页面时聚焦到该组件",
      designerValue: false,
      setter: {
        concept: "SwitchSetter",
      },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: "交互属性",
      title: "可清除",
      description: "可点击清除按钮一键清除所选内容",
      docDescription: "控制是否显示清除按钮，支持一键清除所选内容",
      setter: {
        concept: "SwitchSetter",
      },
    })
    allowClear: nasl.core.Boolean = false;

    @Prop({
      group: "交互属性",
      title: "多选项展示形式",
      description: "多选项过多时的展示形式",
      setter: {
        concept: "EnumSelectSetter",
        options: [
          { title: "过多时省略" },
          { title: "过多时收缩" },
          { title: "过多时显示" },
        ],
      },
    })
    tagsOverflow: "hidden" | "collapse" | "visible" = "collapse";

    @Prop({
      group: "交互属性",
      title: "可取消",
      description: "设置是否可以取消选择",
      setter: {
        concept: "SwitchSetter",
      },
    })
    private cancelable: nasl.core.Boolean = false;

    @Prop({
      group: "交互属性",
      title: "可多选",
      description: "设置是否可以多选行",
      docDescription: "是否可以多选",
      setter: {
        concept: "EnumSelectSetter",
        options: [{ title: "单选" }, { title: "多选" }],
      },
    })
    mode: "single" | "multiple";

    @Prop({
      group: "状态属性",
      title: "初始即加载",
      description: "设置初始时是否立即加载",
      docDescription: "是否在初始时立即加载",
      setter: {
        concept: "SwitchSetter",
      },
    })
    initialLoad: nasl.core.Boolean = true;

    @Prop({
      group: "状态属性",
      title: "展示暂无数据文案",
      description: "是否在数据为空时展示暂无数据的文字提示",
      docDescription: "是否在数据为空时展示暂无数据的文字提示",
      setter: {
        concept: "SwitchSetter",
      },
    })
    showEmptyText: nasl.core.Boolean = true;

    @Prop({
      group: "状态属性",
      title: "禁用",
      description: "置灰显示，且禁止任何交互（焦点、点击、选择、输入等）",
      docDescription: "置灰显示，且禁止任何交互（焦点、点击、选择、输入等）",
      setter: {
        concept: "SwitchSetter",
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: "样式属性",
      title: "宽度",
      description: "设置选择框宽度大小",
      docDescription: "设置选择框宽度大小，支持大、中、小共3种模式",
      setter: {
        concept: "EnumSelectSetter",
        options: [{ title: "小" }, { title: "中型" }, { title: "大" }],
      },
    })
    size: "small" | "middle" | "large";

    @Event({
      title: "按下时",
      description: "按键按下时回调",
    })
    onInputKeyDown: (event: V) => void;

    @Event({
      title: "选择后",
      description: "选择某一项后触发。单选模式中：",
    })
    onSelect: (event: { value: V; items: nasl.collection.List<T> }) => void;

    @Event({
      title: "选中 option",
      description: "选中 option，或 input 的 value 变化时，调用此函数	",
    })
    onChange: (event: { value: V; items: nasl.collection.List<T> }) => void;

    @Event({
      title: "下拉框改变",
      description: "展开下拉菜单的回调",
    })
    private onDropdownVisibleChange: (open: Boolean) => void;

    @Event({
      title: "失去焦点",
      description: "失去焦点时触发。",
    })
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => void;
  }

  @Component({
    title: "选择项",
    description: "选择项",
  })
  export class SelectOption<T, V> extends ViewComponent {
    constructor(options?: Partial<SelectOptionOptions<T, V>>) {
      super();
    }
  }

  @Component({
    title: "选择项",
    description: "选择项",
  })
  export class SelectOptionOptions<T, V> extends ViewComponentOptions {
    @Prop({
      title: "选项文本",
      description: "此项的显示值",
    })
    label: nasl.core.String;

    @Prop({
      group: "数据属性",
      title: "值",
      description: "此项的值。",
      docDescription: "此项的值",
    })
    value: V;

    @Prop({
      group: "状态属性",
      title: "禁用",
      description: "置灰显示，且禁止任何交互（焦点、点击、选择、输入等）",
      docDescription: "该项不可选，默认关闭",
      setter: {
        concept: "SwitchSetter",
      },
    })
    disabled: nasl.core.Boolean = false;
  }

  @Component({
    title: "选择分组",
    description: "选择分组",
  })
  export class SelectOptGroup<T, V> extends ViewComponent {
    constructor(options?: Partial<SelectOptGroupOptions<T, V>>) {
      super();
    }
  }

  export class SelectOptGroupOptions<T, V> extends ViewComponentOptions {
    @Prop({
        group: '主要属性',
        title: '标题',
        docDescription: '选择分组的标题，标题只有在没有文本插槽的时候生效',
    })
    title: nasl.core.String;
  }
}
