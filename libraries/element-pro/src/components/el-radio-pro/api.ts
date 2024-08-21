/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '单选框',
    icon: 'radio',
    description: '',
    group: 'Form',
  })
  export class ElRadioPro extends ViewComponent {
    constructor(options?: Partial<ElRadioProOptions>) {
      super();
    }
  }

  export class ElRadioProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Uncheck',
      description: '是否允许取消选中',
      setter: { concept: 'SwitchSetter' },
    })
    allowUncheck: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Checked',
      description: '是否选中。支持语法糖 `v-model`',
      setter: { concept: 'SwitchSetter' },
    })
    checked: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default Checked',
      description: '是否选中。非受控属性',
      setter: { concept: 'SwitchSetter' },
    })
    defaultChecked: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default',
      description: '单选按钮内容，同 label。',
      setter: { concept: 'InputSetter' },
    })
    default: any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否为禁用态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '主文案。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: 'HTML 元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '单选按钮的值。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Event({
      title: 'On Change',
      description: '选中状态变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Click',
      description: '点击时触发，一般用于外层阻止冒泡场景',
    })
    onClick: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '单选按钮内容，同 label。',
      snippets: [
        {
          title: 'Radio Group',
          code: '<el-radio-group-pro></el-radio-group-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description: '主文案。',
    })
    slotLabel: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Radio Group',
    icon: 'radio-group',
    description: '',
    group: 'Form',
  })
  export class ElRadioGroupPro extends ViewComponent {
    constructor(options?: Partial<ElRadioGroupProOptions>) {
      super();
    }
  }

  export class ElRadioGroupProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Uncheck',
      description: '是否允许取消选中',
      setter: { concept: 'SwitchSetter' },
    })
    allowUncheck: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用全部子单选框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: 'HTML 元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Options',
      description:
        '单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同。',
      setter: { concept: 'InputSetter' },
    })
    options: any[];

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '组件尺寸【讨论中】。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'small' },
          { title: 'medium' },
          { title: 'large。TS 类型：`SizeEnum`。[通用类型定义](https:' },
          { title: '' },
          { title: 'github.com' },
          { title: 'Tencent' },
          { title: 'tdesign-vue' },
          { title: 'blob' },
          { title: 'develop' },
          { title: 'src' },
          { title: 'common.ts)' },
        ],
      },
    })
    size:
      | 'small'
      | 'medium'
      | 'large。TS 类型：`SizeEnum`。[通用类型定义](https:'
      | ''
      | 'github.com'
      | 'Tencent'
      | 'tdesign-vue'
      | 'blob'
      | 'develop'
      | 'src'
      | 'common.ts)' = 'medium';

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选中的值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Variant',
      description:
        '单选组件按钮形式。可选项：outline/primary-filled/default-filled',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'outline' },
          { title: 'primary-filled' },
          { title: 'default-filled' },
        ],
      },
    })
    variant: 'outline' | 'primary-filled' | 'default-filled' = 'outline';

    @Event({
      title: 'On Change',
      description: '选中值发生变化时触发',
    })
    onChange: (event: any) => any;
  }
}
