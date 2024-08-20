/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "structured": true,
      "childAccept": "['el-option-group', 'el-option'].includes(target.tag)"
    }
  })
  @Component({
    title: '选择器',
    icon: 'select',
    description: '当选项过多时，使用下拉菜单展示并选择内容。',
    group: 'Selector',
  })
  export class ElSelect<T, V, P extends boolean, M extends boolean, C extends string> extends ViewComponent {
    constructor(options?: Partial<ElSelectOptions<T, V, P, M, C>>) {
      super();
    }

    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void { }

    @Method({
      title: 'Focus',
      description: '使 input 获取焦点',
    })
    focus(): any { }

    @Method({
      title: 'Blur',
      description: '使 input 失去焦点，并隐藏下拉框',
    })
    blur(): any { }
  }

  export class ElSelectOptions<T, V, P extends boolean, M extends boolean, C extends string> extends ViewComponentOptions {
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

    @Prop({
      group: '数据属性',
      sync: true,
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => nasl.core.String;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V;

    @Prop<ElSelectOptions<T, V, P, M, C>, 'disabledField'>({
      group: '交互属性',
      title: '不可选择字段',
      description: '集合的元素类型中，用于标识节点的disabled属性',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    disabledField: (item: T) => nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '是否多选',
      description: '是否多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Value Key',
    //   description: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueKey: nasl.core.String = 'value';

    @Prop({
      group: '主要属性',
      title: '输入框尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '中' }, { title: '小' }, { title: '超小' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: '是否可以清空选项',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '多选时是否将选中值按文字的形式展示',
      description: '多选时是否将选中值按文字的形式展示',
      setter: { concept: 'SwitchSetter' },
    })
    collapseTags: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '多选时用户最多可以选择的项目数',
      description: '多选时用户最多可以选择的项目数，为 0 则不限制',
      setter: { concept: 'NumberInputSetter' },
    })
    multipleLimit: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: 'select input 的 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'select input 的 autocomplete 属性',
      description: 'select input 的 autocomplete 属性',
      setter: { concept: 'InputSetter' },
    })
    autocomplete: nasl.core.String = 'off';

    @Prop({
      group: '主要属性',
      title: 'Auto Complete',
      description: '下个主版本弃用',
      setter: { concept: 'InputSetter' },
    })
    autoComplete: nasl.core.String = 'off';

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '数据属性',
      title: '筛选',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否允许用户创建新条目',
      description: '是否允许用户创建新条目，需配合 `filterable` 使用',
      setter: { concept: 'SwitchSetter' },
    })
    allowCreate: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '远程搜索',
      description: '是否为远程搜索',
      setter: { concept: 'SwitchSetter' },
    })
    remote: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否正在从远程获取数据',
      description: '是否正在从远程获取数据',
      setter: { concept: 'SwitchSetter' },
    })
    private loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '远程加载时显示的文字',
      description: '远程加载时显示的文字',
      setter: { concept: 'InputSetter' },
    })
    loadingText: nasl.core.String = '加载中';

    @Prop({
      group: '主要属性',
      title: '搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置',
      description: '搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置',
      setter: { concept: 'InputSetter' },
    })
    noMatchText: nasl.core.String = '无匹配数据';

    @Prop({
      group: '主要属性',
      title: '选项为空时显示的文字，也可以使用`slot="empty"`设置',
      description: '选项为空时显示的文字，也可以使用`slot="empty"`设置',
      setter: { concept: 'InputSetter' },
    })
    noDataText: nasl.core.String = '无数据';

    @Prop({
      group: '主要属性',
      title: 'Select 下拉框的类名',
      description: 'Select 下拉框的类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
      description: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
      setter: { concept: 'SwitchSetter' },
    })
    reserveKeyword: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '在输入框按下回车，选择第一个匹配项',
      description:
        '在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用',
      setter: { concept: 'SwitchSetter' },
    })
    defaultFirstOption: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否将弹出框插入至 body 元素',
      description:
        '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false',
      setter: { concept: 'SwitchSetter' },
    })
    popperAppendToBody: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
      description:
        '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
      setter: { concept: 'SwitchSetter' },
    })
    automaticDropdown: nasl.core.Boolean = false;

    @Event({
      title: '选中值发生变化时触发',
      description: '选中值发生变化时触发',
    })
    onChange: (event: V) => any;

    @Event({
      title: '下拉框出现/隐藏时触发',
      description: '下拉框出现/隐藏时触发',
    })
    onVisibleChange: (event: nasl.core.Boolean) => any;

    @Event({
      title: '多选模式下移除tag时触发',
      description: '多选模式下移除tag时触发',
    })
    onRemoveTag: (event: V) => any;

    @Event({
      title: '可清空的单选模式下用户点击清空按钮时触发',
      description: '可清空的单选模式下用户点击清空按钮时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: '当 input 失去焦点时触发',
      description: '当 input 失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '当 input 获得焦点时触发',
      description: '当 input 获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Slot({
      title: 'Default',
      description: 'Option 组件列表',
      snippets: [
        { title: 'Option Group', code: '<el-option-group></el-option-group>' },
        { title: 'Option', code: '<el-option></el-option>' },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Select 组件头部内容',
      description: 'Select 组件头部内容',
    })
    slotPrefix: () => Array<ViewComponent>;

    @Slot({
      title: '无选项时的列表',
      description: '无选项时的列表',
    })
    slotEmpty: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "structured": true,
      "parentAccept": "target.tag === 'el-select'",
      "childAccept": "target.tag === 'el-option'"
    }
  })

  @Component({
    title: 'Option Group',
    icon: 'option-group',
    description: '',
    group: 'Selector',
  })
  export class ElOptionGroup extends ViewComponent {
    constructor(options?: Partial<ElOptionGroupOptions>) {
      super();
    }
  }

  export class ElOptionGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '分组的组名',
      description: '分组的组名',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否将该分组下所有选项置为禁用',
      description: '是否将该分组下所有选项置为禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Slot({
      title: '默认',
      description: '默认',
      snippets: [
        {
          title: 'Option',
          code: '<el-option></el-option>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

  }


  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-select' || target.tag === 'el-option-group'"
    }
  })

  @Component({
    title: 'Option',
    icon: 'option',
    description: '',
    group: 'Selector',
  })
  export class ElOption extends ViewComponent {
    constructor(options?: Partial<ElOptionOptions>) {
      super();
    }
  }

  export class ElOptionOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '选项的值',
      description: '选项的值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | object;

    @Prop({
      group: '主要属性',
      title: '选项的标签',
      description: '选项的标签，若不设置则默认与 `value` 相同',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用该选项',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

  }
}
