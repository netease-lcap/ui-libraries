/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '数字输入框',
    icon: 'input-number',
    description: '仅允许输入标准的数字值，可定义范围',
    group: 'Form',
  })
  export class ElInputNumber extends ViewComponent {
    constructor(options?: Partial<ElInputNumberOptions>) {
      super();
    }

    @Method({
      title: '使获取焦点',
      description: '使 input 获取焦点',
    })
    focus(): any {}

    @Method({
      title: '选中文字',
      description: '选中 input 中的文字',
    })
    select(): any {}
  }

  export class ElInputNumberOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '双向绑定值',
      setter: { concept: 'NumberInputSetter' },
    })
    modelValue: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '属性名',
      description: '原生属性，等价于原生 input name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;
  
    @Prop({
      group: '主要属性',
      title: 'label文字',
      description: '输入框关联的label文字',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;
  
    @Prop({
      group: '主要属性',
      title: 'lable提示',
      description: '原生属性，等价于原生 aria-label属性',
      setter: { concept: 'InputSetter' },
    })
    ariaLabel: nasl.core.String;
    
    @Prop({
      group: '主要属性',
      title: '占位文本',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '最大值',
      description: '设置计数器允许的最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = Infinity;
  
    @Prop({
      group: '主要属性',
      title: '最小值',
      description: '设置计数器允许的最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal = -Infinity;

    @Prop({
      group: '主要属性',
      title: 'Step',
      description: '计数器步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '只能倍数输入',
      description: '是否只能输入 step 的倍数',
      setter: { concept: 'SwitchSetter' },
    })
    stepStrictly: nasl.core.Boolean = false;
  
    @Prop({
      group: '主要属性',
      title: '数值精度',
      description: '数值精度',
      setter: { concept: 'NumberInputSetter' },
    })
    precision: nasl.core.Decimal;
  
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
      title: '是否只读',
      description: '原生 readonly 属性，是否只读',
      setter: { concept: 'InputSetter' },
    })
    readonly: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用计数器',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;
  
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
      description: '控制按钮显示位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '' }, { title: 'right' }],
      },
    })
    controlsPosition: '' | 'right';

    @Prop({
      group: '主要属性',
      title: '唯一标识',
      description: '等价于原生 input id 属性',
      setter: { concept: 'InputSetter' },
    })
    id: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '清空时显示值',
      description: '当输入框被清空时显示的值',
      setter: { concept: 'InputSetter' },
    })
    valueOnClear: nasl.core.Decimal | null | 'min' | 'max';

    @Prop({
      group: '主要属性',
      title: '开启输入触发表单校验',
      description: '输入时是否触发表单的校验',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Slot({
      title: '减少图标',
      description: '自定义输入框按钮减少图标',
    })
    slotDecreaseIcon: () => Array<ViewComponent>;
  
    @Slot({
      title: '增加图标',
      description: '自定义输入框按钮增加图标',
    })
    slotIncreaseIcon: () => Array<ViewComponent>;

    @Event({
      title: '绑定值改变时',
      description: '绑定值被改变时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: '失去焦点',
      description: '在组件 Input 失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '获得焦点',
      description: '在组件 Input 获得焦点时触发',
    })
    onFocus: (event: any) => any;
  }
}
