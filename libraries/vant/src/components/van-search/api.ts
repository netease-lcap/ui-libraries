/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'vant',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '搜索框',
    icon: 'search',
    description: '搜索框组件，用于搜索功能',
    group: 'Form',
  })
  export class VanSearch extends ViewComponent {
    constructor(options?: Partial<VanSearchOptions>) {
      super();
    }
  }

  export class VanSearchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '搜索框的值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '搜索框为空的显示文字',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请输入搜索关键词';

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否为禁用状态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '是否为只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可清除',
      description: '是否启用清除图标，点击清除图标后会清空输入框',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示清除图标',
      description: '清除图标的显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '一直显示' },
          { title: '输入框获取焦点且不为空时展示' },
        ],
      },
    })
    clearTrigger: 'always' | 'focus' = 'focus';

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左对齐' },
          { title: '居中对齐' },
          { title: '右对齐' },
        ],
      },
    })
    inputAlign: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '搜索图标位置',
      description: '设置搜索图标位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左' },
          { title: '右' },
        ],
      },
    })
    iconAlign: 'left' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '选择搜索框为方形或圆形',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '方形' },
          { title: '圆形' },
        ],
      },
    })
    shape: 'square' | 'round' = 'square';

    @Prop({
      group: '主要属性',
      title: '背景色',
      description: '搜索框背景色',
      setter: { concept: 'InputSetter' },
    })
    background: nasl.core.String = '#f7f8fa';

    @Prop({
      group: '主要属性',
      title: '最大字符数',
      description: '输入框内输入的最大字符数',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    maxlength: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '按钮文字',
      description: '搜索按钮文字',
      setter: { concept: 'InputSetter' },
    })
    actionText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示操作按钮',
      description: '是否显示操作按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showAction: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动完成',
      description: '是否启用自动完成',
      setter: { concept: 'SwitchSetter' },
    })
    autocomplete: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '拼写检查',
      description: '是否开启拼写检查',
      setter: { concept: 'SwitchSetter' },
    })
    spellcheck: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '确定搜索时触发',
      description: '确定搜索时触发',
    })
    onSearch: (value: nasl.core.String) => any;

    @Event({
      title: '输入框内容变化时触发',
      description: '输入框内容变化时触发',
    })
    onInput: (value: nasl.core.String) => any;

    @Event({
      title: '输入框获得焦点时触发',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '输入框失去焦点时触发',
      description: '输入框失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '点击搜索图标时触发',
      description: '点击搜索图标时触发',
    })
    onIconSearch: (event: any) => any;

    @Event({
      title: '点击输入区域时触发',
      description: '点击输入区域时触发',
    })
    onClickInput: (event: any) => any;

    @Event({
      title: '点击清除图标时触发',
      description: '点击清除图标时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: '点击操作按钮时触发',
      description: '点击操作按钮时触发',
    })
    onAction: (event: any) => any;

    @Slot({
      title: '自定义搜索图标',
      description: '自定义搜索图标',
    })
    slotIcon: () => Array<ViewComponent>;

    @Slot({
      title: '自定义操作按钮',
      description: '自定义操作按钮',
    })
    slotAction: () => Array<ViewComponent>;

    @Slot({
      title: '自定义左侧内容',
      description: '自定义左侧内容',
    })
    slotLeft: () => Array<ViewComponent>;

    @Slot({
      title: '自定义右侧内容',
      description: '自定义右侧内容',
    })
    slotRight: () => Array<ViewComponent>;
  }

  @Component({
    title: '搜索框表单项',
    icon: 'search',
    description: '搜索框表单项组件',
    group: 'Form',
  })
  export class VanFormSearch extends ViewComponent {
    constructor(options?: Partial<VanFormSearchOptions & ElFormItemProOptions & Omit<VanSearchOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class VanFormSearchOptions extends ViewComponentOptions {}
} 