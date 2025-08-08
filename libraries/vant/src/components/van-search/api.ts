/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
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
      title: '值',
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
    placeholder: nasl.core.String;

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
        options: [{ title: '一直显示' }, { title: '输入框获取焦点且不为空时展示' }],
      },
    })
    clearTrigger: 'always' | 'focus' = 'focus';

    @Prop({
      group: '主要属性',
      title: '格式化函数',
      description: '格式化函数',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    formatter: (value: nasl.core.String) => nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '格式化触发时机',
      description: '格式化触发时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '失去焦点时' }, { title: '输入框内容变化时' }],
      },
    })
    formatTrigger: 'onBlur' | 'onChange' = 'onChange';

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '居中对齐' }, { title: '右对齐' }],
      },
    })
    inputAlign: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '选择搜索框为方形或圆形',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '方形' }, { title: '圆形' }],
      },
    })
    shape: 'square' | 'round' = 'square';

    @Prop({
      group: '主要属性',
      title: '背景色',
      description: '搜索框背景色',
      setter: { concept: 'InputSetter' },
    })
    background: nasl.core.String = '#f2f2f2';

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
      description: '自动聚焦,iOS 系统不支持该属性',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop<VanSearchOptions, 'actionText'>({
      group: '主要属性',
      title: '按钮文字',
      description: '取消按钮文字',
      setter: { concept: 'InputSetter' },
      if: (_) => _.showAction,
    })
    actionText: nasl.core.String = '取消';

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

    @Event({
      title: '确定搜索时触发',
      description: '确定搜索时触发',
    })
    onSearch: (value: nasl.core.String) => void;

    @Event({
      title: '输入框获得焦点时触发',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: Event) => void;

    @Event({
      title: '输入框失去焦点时触发',
      description: '输入框失去焦点时触发',
    })
    onBlur: (event: Event) => void;

    @Event({
      title: '点击左侧搜索图标时触发',
      description: '点击左侧搜索图标时触发',
    })
    clickLeftIcon: (event: MouseEvent) => void;

    @Event({
      title: '点击右侧搜索图标时触发',
      description: '点击右侧搜索图标时触发',
    })
    clickRightIcon: (event: MouseEvent) => void;

    @Event({
      title: '点击输入区域时触发',
      description: '点击输入区域时触发',
    })
    onClickInput: (event: MouseEvent) => void;

    @Event({
      title: '点击清除图标时触发',
      description: '点击清除图标时触发',
    })
    onClear: (event: MouseEvent) => void;

    @Event({
      title: '点击操作按钮时触发',
      description: '点击操作按钮时触发',
    })
    onCancel: () => void;

    @Slot({
      title: '自定义左侧内容(搜索框外)',
      description: '自定义左侧内容(搜索框外)',
    })
    slotLeft: () => Array<ViewComponent>;

    @Slot({
      title: '自定义左侧内容(搜索框内)',
      description: '自定义左侧内容(搜索框内)',
    })
    slotLabel: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanSearch',
      },
    ],
  })
  @Component({
    title: '搜索框表单项',
    icon: 'search',
    description: '搜索框表单项组件',
    group: 'Form',
  })
  export class VanFormSearch extends ViewComponent {
    constructor(
      options?: Partial<VanFormSearchOptions & VanFormItemOptions & Omit<VanSearchOptions, keyof VanFormItemOptions>>,
    ) {
      super();
    }
  }

  export class VanFormSearchOptions extends ViewComponentOptions {}
}
