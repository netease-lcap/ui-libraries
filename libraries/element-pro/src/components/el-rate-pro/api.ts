/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '评分',
    icon: 'rate',
    description: '',
    group: 'Form',
  })
  export class ElRatePro extends ViewComponent {
    constructor(options?: Partial<ElRateProOptions>) {
      super();
    }
  }

  export class ElRateProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Half',
      description: '是否允许半选',
      setter: { concept: 'SwitchSetter' },
    })
    allowHalf: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Color',
      description:
        '评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，示例：[选中颜色]。数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色，[选中颜色，未选中颜色]。示例：["#ED7B2F", "#E3E6EB"]。',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String | any[] = '#ED7B2F';

    @Prop({
      group: '主要属性',
      title: 'Count',
      description: '评分的数量',
      setter: { concept: 'NumberInputSetter' },
    })
    count: nasl.core.Decimal = 5;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用评分',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Gap',
      description: '评分图标的间距',
      setter: { concept: 'NumberInputSetter' },
    })
    gap: nasl.core.Decimal = 4;

    @Prop({
      group: '主要属性',
      title: 'Show Text',
      description: '是否显示对应的辅助文字',
      setter: { concept: 'SwitchSetter' },
    })
    showText: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '评分图标的大小，示例：`20px`',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String = '24px';

    @Prop({
      group: '主要属性',
      title: 'Texts',
      description:
        '评分等级对应的辅助文字。组件内置默认值为：["极差", "失望", "一般", "满意", "惊喜"]。自定义值示例：["1分", "2分", "3分", "4分", "5分"]。',
      setter: { concept: 'InputSetter' },
    })
    texts: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选择评分的值。支持语法糖 `v-model`',
      setter: { concept: 'NumberInputSetter' },
    })
    value: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选择评分的值。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    defaultValue: nasl.core.Decimal = 0;

    @Event({
      title: 'On Change',
      description: '评分数改变时触发',
    })
    onChange: (event: any) => any;

    @Slot({
      title: 'Icon',
      description: '自定义评分图标。',
    })
    slotIcon: () => Array<ViewComponent>;
  }
}
