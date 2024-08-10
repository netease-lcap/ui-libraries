/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '单选框',
    icon: 'radio',
    description: '在一组备选项中进行单选',
    group: 'Form',
  })
  export class ElRadio extends ViewComponent {
    constructor(options?: Partial<ElRadioOptions>) {
      super();
    }
  }

  export class ElRadioOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '标签',
      description: 'Radio 的 value',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示边框',
      description: '是否显示边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: 'Radio 的尺寸，仅在 border 为真时有效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'medium' }, { title: 'small' }, { title: 'mini' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '原生 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Event({
      title: '值变化时',
      description: '绑定值变化时触发的事件',
    })
    onInput: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        { title: 'Radio Group', code: '<el-radio-group></el-radio-group>' },
        { title: 'Radio Button', code: '<el-radio-button></el-radio-button>' },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Radio Group',
    icon: 'radio-group',
    description: '',
    group: 'Form',
  })
  export class ElRadioGroup extends ViewComponent {
    constructor(options?: Partial<ElRadioGroupOptions>) {
      super();
    }
  }

  export class ElRadioGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Value V Model',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'medium' }, { title: 'small' }, { title: 'mini' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Text Color',
      description: '按钮形式的 Radio 激活时的文本颜色',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#ffffff';

    @Prop({
      group: '主要属性',
      title: 'Fill',
      description: '按钮形式的 Radio 激活时的填充色和边框色',
      setter: { concept: 'InputSetter' },
    })
    fill: nasl.core.String = '#409EFF';

    @Event({
      title: 'On Input',
      description: '绑定值变化时触发的事件',
    })
    onInput: (event: any) => any;
  }

  @Component({
    title: 'Radio Button',
    icon: 'radio-button',
    description: '',
    group: 'Form',
  })
  export class ElRadioButton extends ViewComponent {
    constructor(options?: Partial<ElRadioButtonOptions>) {
      super();
    }
  }

  export class ElRadioButtonOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Label',
      description: 'Radio 的 value',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '原生 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;
  }
}
