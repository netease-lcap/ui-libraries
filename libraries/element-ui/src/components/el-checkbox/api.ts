/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '多选框',
    icon: 'checkbox',
    description: '一组备选项中进行多选',
    group: 'Form',
  })
  export class ElCheckbox extends ViewComponent {
    constructor(options?: Partial<ElCheckboxOptions>) {
      super();
    }
  }

  export class ElCheckboxOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '双向绑定值',
      setter: { concept: 'InputSetter' },
    })
    vModel: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '选中状态值',
      description: '选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: 'label文字',
      description: '选项提示文字|选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: '选中时值',
      description: '选中时的值',
      setter: { concept: 'InputSetter' },
    })
    trueValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '没选中时值',
      description: '没有选中时的值',
      setter: { concept: 'InputSetter' },
    })
    falseValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示边框',
      description: '是否显示边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: 'Checkbox 的尺寸大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '大' }, { title: '默认' }, { title: '小' }],
      },
    })
    size: 'large' | 'default' | 'small';

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '默认勾选',
      description: '当前是否勾选',
      setter: { concept: 'SwitchSetter' },
    })
    checked: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '不确定状态',
      description: '设置 indeterminate 状态，只负责样式控制',
      setter: { concept: 'SwitchSetter' },
    })
    indeterminate: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '开启输入触发表单校验',
      description: '输入时是否触发表单的校验',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Tab次序',
      description: '用户可以通过 tab 键在页面上的元素之间进行导航的次序',
      setter: { concept: 'InputSetter' },
    })
    tabindex: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '唯一标识',
      description: '等价于原生 input id 属性',
      setter: { concept: 'InputSetter' },
    })
    id: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '控制按钮',
      description: '是否使用控制按钮',
      setter: { concept: 'InputSetter' },
    })
    ariaControls: nasl.core.String = '';

    @Event({
      title: '绑定值改变时',
      description: '当绑定值变化时触发的事件',
    })
    onChange: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
        title: 'Checkbox Group',
          code: '<el-checkbox-group></el-checkbox-group>',
        },
        {
        title: 'Checkbox Button',
          code: '<el-checkbox-button></el-checkbox-button>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '复选框组',
    icon: 'checkbox-group',
    description: '',
    group: 'Form',
  })
  export class ElCheckboxGroup extends ViewComponent {
    constructor(options?: Partial<ElCheckboxGroupOptions>) {
      super();
    }
  }

  export class ElCheckboxGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '绑定值',
      description: '双向绑定值',
      setter: { concept: 'InputSetter' },
    })
    vModel: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '选中状态值',
      description: '选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: 'label文字',
      description: '选项提示文字|选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示边框',
      description: '是否显示边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: 'Checkbox 的尺寸大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '大' }, { title: '默认' }, { title: '小' }],
      },
    })
    size: 'large' | 'default' | 'small';

    @Prop({
      group: '主要属性',
      title: '最小勾选量',
      description: '可被勾选的 checkbox 的最小数量',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '最大勾选量',
      description: '可被勾选的 checkbox 的最大数量',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'lable提示',
      description: '原生属性，等价于原生 aria-label属性',
      setter: { concept: 'InputSetter' },
    })
    ariaLabel: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '勾选中文本颜色',
      description: '按钮形式的 Checkbox 激活时的文本颜色',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#ffffff';

    @Prop({
      group: '主要属性',
      title: '勾选中填充色',
      description: '按钮形式的 Checkbox 激活时的填充色和边框色',
      setter: { concept: 'InputSetter' },
    })
    fill: nasl.core.String = '#409EFF';

    @Prop({
      group: '主要属性',
      title: '元素标签',
      description: '复选框组元素标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'div';

    @Prop({
      group: '主要属性',
      title: '开启输入触发表单校验',
      description: '输入时是否触发表单的校验',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Event({
      title: '绑定值改变时',
      description: '当绑定值变化时触发的事件',
    })
    onChange: (event: any) => any;
  }

  @Component({
    title: 'Checkbox Button',
    icon: 'checkbox-button',
    description: '',
    group: 'Form',
  })
  export class ElCheckboxButton extends ViewComponent {
    constructor(options?: Partial<ElCheckboxButtonOptions>) {
      super();
    }
  }

  export class ElCheckboxButtonOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '选中状态值',
      description: '选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: 'label文字',
      description: '选项提示文字|选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '选中时值',
      description: '选中时的值',
      setter: { concept: 'InputSetter' },
    })
    trueValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '没选中时值',
      description: '没有选中时的值',
      setter: { concept: 'InputSetter' },
    })
    falseValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '默认勾选',
      description: '当前是否勾选',
      setter: { concept: 'SwitchSetter' },
    })
    checked: nasl.core.Boolean = false;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
        title: 'Checkbox Group',
          code: '<el-checkbox-group></el-checkbox-group>',
        },
        {
        title: 'Checkbox Button',
          code: '<el-checkbox-button></el-checkbox-button>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
