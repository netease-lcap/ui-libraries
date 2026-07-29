/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    sourceDocURL: 'https://tdesign.tencent.com/vue/components/switch',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '',
    group: 'Form',
  })
  export class ElSwitchPro extends ViewComponent {

    @Prop({
      title: '值',
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Method({
      title: '获取值',
      description: '获取值',
    })
    getValue(): void {}

    @Method({
      title: '聚焦',
      description: '聚焦',
    })
    focus(): void {}

    constructor(options?: Partial<ElSwitchProOptions>) {
      super();
    }
  }

  export class ElSwitchProOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '开关值',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '自定义开关值',
      description:
        '用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、["open", "close"]。',
      setter: { concept: 'InputSetter' },
    })
    private customValue: any[];

    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '开关的宽度（像素）',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Decimal = 40;

    @Prop({
      group: '主要属性',
      title: '打开时图标',
      description:
        '开关打开时所显示图标的类名，设置此项会忽略（打开时文字）',
      setter: {
        concept: 'IconSetter',
        hideUploadIcon: true,
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    activeIconClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '关闭时图标',
      description:
        '开关关闭时所显示图标的类名，设置此项会忽略（关闭时文字）',
      setter: {
        concept: 'IconSetter',
        hideUploadIcon: true,
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    inactiveIconClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '打开时文字',
      description: '开关打开时的文字描述',
      setter: { concept: 'InputSetter' },
    })
    activeText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '关闭时文字',
      description: '开关关闭时的文字描述',
      setter: { concept: 'InputSetter' },
    })
    inactiveText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '打开时的值',
      description: 'switch 打开时的值',
      setter: { concept: 'InputSetter' },
    })
    activeValue: nasl.core.Boolean | nasl.core.String | nasl.core.Decimal = true;

    @Prop({
      group: '主要属性',
      title: '关闭时的值',
      description: 'switch 关闭时的值',
      setter: { concept: 'InputSetter' },
    })
    inactiveValue: nasl.core.Boolean | nasl.core.String | nasl.core.Decimal = false;

    @Prop({
      group: '样式属性',
      title: '打开时的背景色',
      description: '打开时的背景色',
      setter: { concept: 'InputSetter' },
    })
    activeColor: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '关闭时的背景色',
      description: '关闭时的背景色',
      setter: { concept: 'InputSetter' },
    })
    inactiveColor: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '开关内部文字',
      description:
        '开关内容，[开启时内容，关闭时内容]。示例：["开", "关"]',
      setter: { concept: 'InputSetter' },
    })
    label: any = [];

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '加载中',
      description: '是否处于加载中状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '开关尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Event({
      title: '改变后',
      description: '数据发生变化时触发',
    })
    onChange: (event: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean) => any;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      bindStyleAttr: 'inputStyle',
      bindStyleSelector: '.__cw-form-compose-input',
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
    },
    extends: [{
      name: 'ElFormItemPro',
      excludes: [
        'slotDefault', 'useRangeValue',
        'startFieldName', 'endFieldName',
        'startInitialValue', 'endInitialValue',
      ],
    }, {
      name: 'ElSwitchPro',
    }],
  })
  @Component({
    title: '表单开关',
    description: '表单开关',
    group: 'Form',
  })
  export class ElFormSwitchPro extends ViewComponent {
    constructor(options?: Partial<ElFormSwitchProOptions & ElFormItemProOptions & Omit<ElSwitchProOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class ElFormSwitchProOptions extends ViewComponentOptions {

  }
}
