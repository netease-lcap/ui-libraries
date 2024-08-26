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
    
    @Prop({
      title: '值',
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

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
    customValue: any[];

    @Prop({
      group: '主要属性',
      title: '自定义开关文字',
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
}
