/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单选择器',
    description: '表单选择器',
  })
  export class FormSelect<T, V, P extends boolean, M extends boolean, C extends string> extends ViewComponent {
    constructor(options?: Partial<FormSelectOptions<T, V, P, M, C> & SelectOptions<T, V, P, M, C> & FormItemOptions>) {
      super();
    }
  }

  export class FormSelectOptions<T, V, P extends boolean, M extends boolean, C extends string> extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: '标题自定义',
    //   description: '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
    //   docDescription: '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // labelIsSlot: nasl.core.Boolean = false;

    // @Prop<FormSelectOptions<T, V, P, M, C>, 'labelText'>({
    //   group: '主要属性',
    //   title: '标题',
    //   docDescription: '选择分组的标题，标题只有在没有文本插槽的时候生效',
    //   if: (_) => _.labelIsSlot === false,
    // })
    // labelText: nasl.core.String;
    // @Prop({
    //   title: '字段名称',
    //   description: '表单项名称。',
    // })
    // name: nasl.core.String;
    // @Prop({
    //   group: '主要属性',
    //   title: '占据数',
    //   description: '列跨越的格数',
    //   docDescription: '列跨越的格数。',
    //   setter: {
    //     concept: 'NumberInputSetter',
    //   },
    // })
    // span: nasl.core.Decimal = 24;
    // @Prop({
    //   group: '主要属性',
    //   title: '必填标记',
    //   description: '是否必填。仅显示样式，如果要验证必填项，需要在`rules`中添加必填规则。',
    //   docDescription: '是否必填。仅显示样式，如果要验证必填项，需要在rules中添加必填规则。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // required: nasl.core.Boolean = false;
    // @Prop({
    //   group: '主要属性',
    //   title: '释义提示',
    //   description: '鼠标悬浮标签后的图标显示释义提示信息',
    //   docDescription: '默认提示消息。',
    // })
    // tooltip: nasl.core.String;
    // @Prop({
    //   group: '主要属性',
    //   title: '验证规则',
    //   description: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型',
    //   docDescription: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型，详见[验证规则](#验证规则)。',
    //   bindHide: true,
    // })
    // rules: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
    })
    dataSource: P extends true ? { list: nasl.collection.List<T>; total: nasl.core.Integer } : nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<FormSelectOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => nasl.core.String;
    @Prop<FormSelectOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V;

    // @Prop({
    //   group: '数据属性',
    //   title: '选中值完整数据',
    //   description: '当下拉列表是分页或加载更多时，需要使用该字段回显选择框内数据。',
    //   docDescription: '当下拉列表是分页或加载更多时，需要使用该字段回显选择框内数据。',
    // })

    @Prop({
      group: '数据属性',
      title: '筛选',
      description: '设置是否可以筛选，开启将会支持搜索。',
      docDescription: '开启后选择框可输入文本进行筛选',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showSearch: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '选择框无内容时的提示信息，支持自定义编辑，默认为请选择',
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '交互属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '控制是否在进入页面时聚焦到该组件',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autoFocus: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除所选内容',
      docDescription: '控制是否显示清除按钮，支持一键清除所选内容',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    allowClear: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可多选',
      description: '设置是否可以多选行',
      docDescription: '是否可以多选',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '单选' }, { title: '多选' }],
      },
    })
    mode: 'single' | 'multiple';

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '设置选择框宽度大小',
      docDescription: '设置选择框宽度大小，支持大、中、小共3种模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中型' }, { title: '大' }],
      },
    })
    size: 'small' | 'middle' | 'large';

    @Event({
      title: '按下时',
      description: '按键按下时回调',
    })
    onInputKeyDown: (event: V) => void;

    @Event({
      title: '选择后',
      description: '选择某一项后触发。单选模式中：',
    })
    onSelect: (event: { value: V; items: nasl.collection.List<T> }) => void;

    @Event({
      title: '选中 option或输入变化时',
      description: '选中 option，或 input 的 value 变化时，调用此函数	',
    })
    onChange: (event: { value: V; items: nasl.collection.List<T> }) => void;

    @Event({
      title: '下拉框改变',
      description: '展开下拉菜单的回调',
    })
    onDropdownVisibleChange: (open: Boolean) => void;

    @Event({
      title: '失去焦点',
      description: '失去焦点时触发。',
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

    @Slot({
      title: '默认',
      description: '插入`<SelectOption>``子组件。',
      snippets: [
        {
          title: '选项',
          code: '<SelectOption><Text children="选项"></Text></SelectOption>',
        },
      ],
    })
    slotDefault: () => Array<SelectOption<T, V>>;

    @Slot({
      title: '标签自定义',
      description: '插入自定义标签，代替`label`属性。',
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
