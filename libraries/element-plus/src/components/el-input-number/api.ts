/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '数字输入框',
    icon: 'number',
    description: '仅允许输入标准的数字值，可定义范围',
    group: 'Form',
  })
  export class ElInputNumber extends ViewComponent {
    @Prop({
      title: '输入值',
    })
    modelValue: nasl.core.Decimal;

    @Prop({
      title: '预览',
      description: '是否预览',
    })
    preview: nasl.core.Boolean;

    @Prop({
      title: '禁用状态',
      description: '是否禁用数字输入框',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读状态',
      description: '是否设置为只读状态',
    })
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<ElInputNumberOptions>) {
      super();
    }
  }

  export class ElInputNumberOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '输入值',
      description: '数字输入框的当前值',
      docDescription: '绑定数字输入框的当前值，支持双向绑定。仅允许输入数字类型的值。',
      sync: true,
      setter: { concept: 'NumberInputSetter' },
    })
    modelValue: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '限制输入的最小值',
      docDescription: '设置允许输入的最小值，小于此值时会自动调整为最小值。',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal = -Infinity;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '限制输入的最大值',
      docDescription: '设置允许输入的最大值，大于此值时会自动调整为最大值。',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = Infinity;

    @Prop({
      group: '数据属性',
      title: '步长',
      description: '数值增减的步长',
      docDescription: '设置点击加减按钮时数值变化的步长。例如步长为10时，每次点击增加或减少10。',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '数据属性',
      title: '严格步长',
      description: '是否只能输入步长的倍数',
      docDescription: '开启后，只能输入步长的倍数。例如步长为5时，只能输入0、5、10、15等值。',
      setter: { concept: 'SwitchSetter' },
    })
    stepStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '数值精度',
      description: '设置数值的小数位数',
      docDescription: '设置数值保留的小数位数。例如精度为2时，数值会保留两位小数。',
      setter: { concept: 'NumberInputSetter' },
    })
    precision: nasl.core.Integer;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用数字输入框',
      docDescription: '开启后，数字输入框将变为禁用状态，用户无法进行输入或点击加减按钮。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '只读状态',
      description: '是否设置为只读状态',
      docDescription: '开启后，数字输入框变为只读状态，用户无法修改数值但可以查看。',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '组件尺寸',
      description: '选择数字输入框的尺寸',
      docDescription: '控制数字输入框的整体尺寸。默认：标准尺寸；大：宽松型输入框；小：紧凑型输入框。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: 'default' | 'large' | 'small';

    @Prop({
      group: '主要属性',
      title: '可清空',
      description: '是否允许清空输入内容',
      docDescription: '开启后，当输入框有内容时会显示清空按钮，用户可以点击清空所有输入内容。',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '控制按钮',
      description: '是否使用控制按钮',
      setter: { concept: 'SwitchSetter' },
    })
    controls: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '控制按钮位置',
      description: '控制按钮位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '右侧' }],
      },
      if: (_) => !!_.controls,
    })
    controlsPosition: '' | 'right';

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '清空值',
    //   description: '输入框被清空时显示的值',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueOnClear: nasl.core.Decimal | null;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '表单验证',
      description: '是否触发表单验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '前缀单位',
      description: '输入框左侧显示的单位，如：元、%等',
      setter: { concept: 'InputSetter' },
    })
    prefix: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀单位',
      description: '输入框右侧显示的单位，如：元、%等',
      setter: { concept: 'InputSetter' },
    })
    suffix: nasl.core.String;

    @Event({
      title: '值改变时',
      description: '绑定值被改变时触发',
    })
    onChange: (value: nasl.core.Decimal) => any;

    @Event({
      title: '失去焦点时',
      description: '在 Input 失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '获得焦点时',
      description: '在 Input 获得焦点时触发',
    })
    onFocus: (event: any) => any;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      additionalAttribute: {
        ':isRequired': {
          condition:
            "(!this.getAttribute('isRequired')?.value) && (this.getAttribute('rules')?.rules || []).find(r => r.calleeName === 'filled')",
          value: '"true"',
        },
      },
    },
    extends: [
      {
        name: 'ElFormItemPro',
      },
      {
        name: 'ElInputNumber',
      },
    ],
  })
  @Component({
    title: '表单数字输入框',
    description: '表单数字输入框',
    group: 'Form',
  })
  export class ElFormInputNumber extends ViewComponent {
    constructor(
      options?: Partial<
        ElFormInputNumberOptions & ElFormItemProOptions & Omit<ElInputNumberOptions, keyof ElFormItemProOptions>
      >,
    ) {
      super();
    }
  }

  export class ElFormInputNumberOptions extends ViewComponentOptions {}
}
