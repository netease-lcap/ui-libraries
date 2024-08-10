/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container"
    }
  })
  @Component({
    title: '统计数值',
    icon: 'statistic',
    description: '用于突出某个或某组数字时，如显示数值，如金额，排名等。',
    group: 'Display',
  })
  export class ElStatistic extends ViewComponent {
    constructor(options?: Partial<ElStatisticOptions>) {
      super();
    }

    @Method({
      title: '暂停倒计时',
      description: '暂停倒计时',
    })
    suspend(
      @Param({ title: '暂停/继续' })
      stop: nasl.core.Boolean
    ): any { }
  }

  export class ElStatisticOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数值',
      description: '数值内容',
      setter: { concept: 'InputSetter' },
    })
    value: any;

    @Prop({
      group: '主要属性',
      title: '小数点',
      description: '设置小数点',
      setter: { concept: 'InputSetter' },
    })
    decimalSeparator: nasl.core.String = '.';

    @Prop({
      group: '主要属性',
      title: '自定义数值展示',
      description: '自定义数值展示',
      setter: { concept: 'InputSetter' },
    })
    formatter: any;

    @Prop({
      group: '主要属性',
      title: '千分位标识符',
      description: '设置千分位标识符',
      setter: { concept: 'InputSetter' },
    })
    groupSeparator: nasl.core.String = ',';

    @Prop({
      group: '数据属性',
      title: '精度',
      description: '数值精度',
      setter: { concept: 'NumberInputSetter' },
    })
    precision: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '前缀',
      description: '设置数值的前缀',
      setter: { concept: 'InputSetter' },
    })
    prefix: any;

    @Prop({
      group: '主要属性',
      title: '后缀',
      description: '设置数值的后缀',
      setter: { concept: 'InputSetter' },
    })
    suffix: any;

    @Prop({
      group: '主要属性',
      title: '标题',
      description: '数值的标题',
      setter: { concept: 'InputSetter' },
    })
    title: any;

    @Prop({
      group: '样式属性',
      title: '样式',
      description: '设置数值的样式',
      setter: { concept: 'InputSetter' },
    })
    valueStyle: object;

    @Prop({
      group: '数据属性',
      title: '倍率',
      description: '设置倍率',
      setter: { concept: 'NumberInputSetter' },
    })
    rate: nasl.core.Decimal = 1000;

    @Prop({
      group: '状态属性',
      title: '是否开启倒计时',
      description: '是否开启倒计时功能',
      setter: { concept: 'SwitchSetter' },
    })
    timeIndices: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '格式化倒计时展示',
      description: '格式化倒计时展示',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String = 'HH:mm:ss';

    @Event({
      title: '倒计时过程中',
      description: '在`倒计时`的功能中开启',
    })
    onChange: (event: any) => any;

    @Event({
      title: '倒计时完成时',
      description: '在`倒计时` 完成后启动',
    })
    onFinish: (event: any) => any;

    @Slot({
      title: '前缀',
      description: '数值的前缀',
    })
    slotPrefix: () => Array<ViewComponent>;

    @Slot({
      title: '后缀',
      description: '数值的后缀',
    })
    slotSuffix: () => Array<ViewComponent>;

    // 不建议用这个插槽，用数值属性就可以
    // @Slot({
    //   title: '内容',
    //   description: '数值内容',
    // })
    // slotFormatter: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '数值的标题',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '默认',
      description: '默认',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
