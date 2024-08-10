/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '输入框',
    icon: 'input',
    description: '通过鼠标或键盘输入字符',
    group: 'Form',
  })
  export class ElInput extends ViewComponent {
    constructor(options?: Partial<ElInputOptions>) {
      super();
    }

    @Method({
      title: '使失去焦点',
      description: '使 input 失去焦点',
    })
    blur(): any {};

    @Method({
      title: '使获取焦点',
      description: '使 input 获取焦点',
    })
    focus(): any {};

    @Method({
      title: '清除值',
      description: '清除 input 值',
    })
    clear(): any {};

    @Method({
      title: 'Input HTML 元素',
      description: 'Input HTML 元素',
    })
    input(): any {};

    @Method({
      title: 'HTML元素 input',
      description: 'HTML元素 input 或 textarea',
    })
    ref(): any {};

    @Method({
      title: '改变textarea大小',
      description: '改变 textarea 大小',
    })
    resizeTextarea(): any {};

    @Method({
      title: '选中文字',
      description: '选中 input 中的文字',
    })
    select(): any {};

  }

  export class ElInputOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '输入类型',
      description: '输入类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '文本框' },
          { title: '密码输入框' }
        ],
      },
    })
    type: 'password' | 'text' = 'text';

    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '双向绑定值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '属性名',
      description: '原生属性，等价于原生 input name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占位文本',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '最大长度',
      description: '原生属性，最大输入长度',
      setter: { concept: 'NumberInputSetter' },
    })
    maxlength: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '最小长度',
      description: '原生属性，最小输入长度',
      setter: { concept: 'NumberInputSetter' },
    })
    minlength: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否显示字数统计',
      description:
        '是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效',
      setter: { concept: 'SwitchSetter' },
    })
    showWordLimit: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可清空输入内容',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示切换密码图标',
      description: '是否显示切换密码图标',
      setter: { concept: 'SwitchSetter' },
    })
    showPassword: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '禁用输入',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '输入框尺寸，只在 `type!="textarea"` 时有效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'medium' }, { title: 'small' }, { title: 'mini' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: '前缀图标',
      description: '输入框头部图标',
      setter: { concept: 'InputSetter' },
    })
    prefixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '输入框尾部图标',
      setter: { concept: 'InputSetter' },
    })
    suffixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '输入框行数',
      description: '输入框行数，只对 `type="textarea"` 有效',
      setter: { concept: 'NumberInputSetter' },
    })
    rows: nasl.core.Decimal = 2;

    @Prop({
      group: '主要属性',
      title: '内容高度',
      description:
        '自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }',
      setter: { concept: 'InputSetter' },
    })
    autosize: nasl.core.Boolean | object = false;

    @Prop({
      group: '主要属性',
      title: '自动补全',
      description: '原生属性，自动补全',
      setter: { concept: 'InputSetter' },
    })
    autocomplete: nasl.core.String = 'off';

    @Prop({
      group: '主要属性',
      title: '是否只读',
      description: '原生属性，是否只读',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '最大值',
      description: '原生属性，设置最大值',
      setter: { concept: 'InputSetter' },
    })
    max: any;

    @Prop({
      group: '主要属性',
      title: '最小值',
      description: '原生属性，设置最小值',
      setter: { concept: 'InputSetter' },
    })
    min: any;

    @Prop({
      group: '主要属性',
      title: '合法数字间隔',
      description: '原生属性，设置输入字段的合法数字间隔',
      setter: { concept: 'InputSetter' },
    })
    step: any;

    @Prop({
      group: '主要属性',
      title: '是否能缩放',
      description: '控制是否能被用户缩放',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
            { title: 'none' },
            { title: 'both' },
            { title: 'horizontal' },
            { title: 'vertical' }
        ],
      },
    })
    resize: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '原生属性，自动获取焦点',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Form',
      description: '原生属性',
      setter: { concept: 'InputSetter' },
    })
    form: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'label文字',
      description: '输入框提示文字',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Tab次序',
      description: '用户可以通过 tab 键在页面上的元素之间进行导航的次序',
      setter: { concept: 'InputSetter' },
    })
    tabindex: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '开启输入触发表单校验',
      description: '输入时是否触发表单的校验',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '输入框样式',
      description: 'input 元素或 textarea 元素的 style',
      setter: { concept: 'InputSetter' },
    })
    inputStyle: nasl.core.String | object = {};

    @Event({
      title: '失去焦点',
      description: '在 Input 失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '获得焦点',
      description: '在 Input 获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '绑定值改变时',
      description: '仅当 modelValue 改变时，仅在输入框失去焦点或用户按下回车时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: '值变化',
      description: '在 Input 值改变时触发',
    })
    onInput: (event: any) => any;

    @Event({
      title: '点击清空按钮',
      description: '在点击由 `clearable` 属性生成的清空按钮时触发',
    })
    onClear: (event: any) => any;

    @Slot({
      title: '头部内容插槽',
      description: '输入框头部内容，只对 `type="text"` 有效',
    })
    slotPrefix: () => Array<ViewComponent>;

    @Slot({
      title: '尾部内容插槽',
      description: '输入框尾部内容，只对 `type="text"` 有效',
    })
    slotSuffix: () => Array<ViewComponent>;

    @Slot({
      title: '前置内容插槽',
      description: '输入框前置内容，只对 `type="text"` 有效',
    })
    slotPrepend: () => Array<ViewComponent>;

    @Slot({
      title: '后置内容插槽',
      description: '输入框后置内容，只对 `type="text"` 有效',
    })
    slotAppend: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        { title: 'Autocomplete', code: '<el-autocomplete></el-autocomplete>' },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '自动补全',
    icon: 'autocomplete',
    description: '',
    group: 'Form',
  })
  export class ElAutocomplete extends ViewComponent {
    constructor(options?: Partial<ElAutocompleteOptions>) {
      super();
    }

    @Method({
      title: '使失去焦点',
      description: '使 input 失去焦点',
    })
    blur(): any {};

    @Method({
      title: '使获取焦点',
      description: '使 input 获取焦点',
    })
    focus(): any {};

    @Method({
      title: '清除值',
      description: '清除 input 值',
    })
    close(): any {};

    @Method({
      title: '触发选中',
      description: '手动触发选中建议事件',
    })
    handleSelect(): any {};

    @Method({
      title: '触发键盘回车',
      description: '手动触发键盘回车事件',
    })
    handleKeyEnter(): any {};

    @Method({
      title: '高亮显示某个项目',
      description: '在建议中高亮显示一个项目',
    })
    highlight(): any {};
  }

  export class ElAutocompleteOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '双向绑定值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占位文本',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '可清空',
      description: '是否可清空',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示键名',
      description: '输入建议对象中用于显示的键名',
      setter: { concept: 'InputSetter' },
    })
    valueKey: nasl.core.String = 'value';

    @Prop({
      group: '主要属性',
      title: '去抖延时时长',
      description: '获取输入建议的去抖延时',
      setter: { concept: 'NumberInputSetter' },
    })
    debounce: nasl.core.Decimal = 300;

    @Prop({
      group: '主要属性',
      title: '菜单弹出位置',
      description: '菜单弹出位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'top' },
          { title: 'top-start' },
          { title: 'top-end' },
          { title: 'bottom' },
          { title: 'bottom-start' },
          { title: 'bottom-end' },
        ],
      },
    })
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end' = 'bottom-start';

    @Prop({
      group: '主要属性',
      title: '输入建议方法',
      description:
        '返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它',
      setter: { concept: 'InputSetter' },
    })
    fetchSuggestions: any;

    @Prop({
      group: '主要属性',
      title: '获得焦点时显示建议',
      description: '是否在输入框 focus 时显示建议列表',
      setter: { concept: 'SwitchSetter' },
    })
    triggerOnFocus: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Select When Unmatched',
      description: '在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件',
      setter: { concept: 'SwitchSetter' },
    })
    selectWhenUnmatched: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生属性，等价于原生 input name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'lable提示',
      description: '原生属性，等价于原生 aria-label属性',
      setter: { concept: 'InputSetter' },
    })
    ariaLabel: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '隐藏加载图标',
      description: '是否隐藏远程加载时的加载图标',
      setter: { concept: 'SwitchSetter' },
    })
    hideLoading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '下拉列表类名',
      description: '下拉列表的类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '将下拉列表插入body',
      description: '是否将下拉列表插入至 body 元素。 在下拉列表的定位出现问题时，可将该属性设置为 false',
      setter: { concept: 'SwitchSetter' },
    })
    popperAppendToBody: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '将下拉列表插入指向元素下',
      description: '是否将下拉列表元素插入 append-to 指向的元素下',
      setter: { concept: 'SwitchSetter' },
    })
    teleported: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '高亮第一项',
      description: '是否默认高亮远程搜索结果的第一项',
      setter: { concept: 'SwitchSetter' },
    })
    highlightFirstItem: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '与输入框同宽',
      description: '下拉框的宽度是否与输入框相同',
      setter: { concept: 'SwitchSetter' },
    })
    fitInputWidth: nasl.core.Boolean = false;

    @Event({
      title: '选中建议项时',
      description: '点击选中建议项时触发',
    })
    onSelect: (event: any) => any;

    @Event({
      title: '值改变时',
      description: '在 Input 值改变时触发',
    })
    onChange: (event: any) => any;

    @Slot({
      title: '自定义输入建议',
      description: '自定义输入建议的内容，参数为 { item }',
    })
    slotDefault: (current: Current<any>) => Array<ViewComponent>;

    @Slot({
      title: '头部内容插槽',
      description: '输入框头部内容，只对 `type="text"` 有效',
    })
    slotPrefix: () => Array<ViewComponent>;

    @Slot({
      title: '尾部内容插槽',
      description: '输入框尾部内容，只对 `type="text"` 有效',
    })
    slotSuffix: () => Array<ViewComponent>;

    @Slot({
      title: '前置内容插槽',
      description: '输入框前置内容，只对 `type="text"` 有效',
    })
    slotPrepend: () => Array<ViewComponent>;

    @Slot({
      title: '后置内容插槽',
      description: '输入框后置内容，只对 `type="text"` 有效',
    })
    slotAppend: () => Array<ViewComponent>;

    @Slot({
      title: '自定义加载中',
      description: '自定义加载区域内容',
    })
    slotLoading: () => Array<ViewComponent>;
  }
}
