/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '评分',
    icon: 'rate',
    description: '评分组件',
    group: 'Form',
  })
  export class ElRate extends ViewComponent {
    constructor(options?: Partial<ElRateOptions>) {
      super();
    }
  }

  export class ElRateOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '评分值',
      description: '绑定值',
      setter: { concept: 'NumberInputSetter' },
    })
    value: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '最大分数',
      description: '最大分值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 5;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '是否为只读',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可半选',
      description: '是否允许半选',
      setter: { concept: 'SwitchSetter' },
    })
    allowHalf: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '低分界限值',
      description: '低分和中等分数的界限值，值本身被划分在低分中',
      setter: { concept: 'NumberInputSetter' },
    })
    lowThreshold: nasl.core.Decimal = 2;

    @Prop({
      group: '主要属性',
      title: '高分界限值',
      description: '高分和中等分数的界限值，值本身被划分在高分中',
      setter: { concept: 'NumberInputSetter' },
    })
    highThreshold: nasl.core.Decimal = 4;

    @Prop({
      group: '主要属性',
      title: '颜色',
      description:
        'icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色',
      setter: { concept: 'InputSetter' },
    })
    colors: any[] | object = ['#F7BA2A', '#F7BA2A', '#F7BA2A'];

    @Prop({
      group: '主要属性',
      title: '未选中颜色',
      description: '未选中 icon 的颜色',
      setter: { concept: 'InputSetter' },
    })
    voidColor: nasl.core.String = '#C6D1DE';

    @Prop({
      group: '主要属性',
      title: '只读时未选中颜色',
      description: '只读时未选中 icon 的颜色',
      setter: { concept: 'InputSetter' },
    })
    disabledVoidColor: nasl.core.String = '#EFF2F7';

    @Prop({
      group: '主要属性',
      title: '类名',
      description:
        'icon 的类名。若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名',
      setter: { concept: 'InputSetter' },
    })
    iconClasses: any[] | object = [
      'el-icon-star-on',
      'el-icon-star-on',
      'el-icon-star-on',
    ];

    @Prop({
      group: '主要属性',
      title: '未选中类名',
      description: '未选中 icon 的类名',
      setter: { concept: 'InputSetter' },
    })
    voidIconClass: nasl.core.String = 'el-icon-star-off';

    @Prop({
      group: '主要属性',
      title: '只读时未选中类名',
      description: '只读时未选中 icon 的类名',
      setter: { concept: 'InputSetter' },
    })
    disabledVoidIconClass: nasl.core.String = 'el-icon-star-on';

    @Prop({
      group: '主要属性',
      title: '展示辅助文字',
      description:
        '是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容',
      setter: { concept: 'SwitchSetter' },
    })
    showText: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '辅助文字颜色',
      description: '辅助文字的颜色',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#1F2D3D';

    @Prop({
      group: '主要属性',
      title: '辅助文字枚举',
      description: '辅助文字数组',
      setter: { concept: 'InputSetter' },
    })
    texts: any[] = ['极差', '失望', '一般', '满意', '惊喜'];

    @Prop({
      group: '主要属性',
      title: '展示当前分数',
      description: '是否显示当前分数，show-score 和 show-text 不能同时为真',
      setter: { concept: 'SwitchSetter' },
    })
    showScore: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '分数显示模板',
    //   description: '分数显示模板',
    //   setter: { concept: 'InputSetter' },
    // })
    // scoreTemplate: nasl.core.String = '{value}';

    @Event({
      title: '分值改变时',
      description: '分值改变时触发',
    })
    onChange: (event: {
      value: nasl.core.String;
    }) => void;
  }
}
