/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '',
    group: 'Form',
  })
  export class ElSwitchPro extends ViewComponent {
    constructor(options?: Partial<ElSwitchProOptions>) {
      super();
    }
  }

  export class ElSwitchProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Custom Value',
      description:
        '用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、["open", "close"]。',
      setter: { concept: 'InputSetter' },
    })
    customValue: any[];

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description:
        '开关内容，[开启时内容，关闭时内容]。示例：["开", "关"] 或 (value) => value ? "开" : "关"。',
      setter: { concept: 'InputSetter' },
    })
    label: any = [];

    @Prop({
      group: '主要属性',
      title: 'Loading',
      description: '是否处于加载中状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '开关尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'small' }, { title: 'medium' }, { title: 'large' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Prop({
      group: '数据属性',
      title: '值',
      description: '开关值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '开关值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Event({
      title: 'On Change',
      description: '数据发生变化时触发',
    })
    onChange: (event: any) => any;

    @Slot({
      title: 'Label',
      description:
        '开关内容，[开启时内容，关闭时内容]。示例：["开", "关"] 或 (value) => value ? "开" : "关"。',
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
