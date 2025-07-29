/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '倒计时',
    icon: 'countdown',
    description: '倒计时',
    group: 'Display',
  })
  export class VanCountDown extends ViewComponent {
    constructor(options?: Partial<VanCountDownOptions>) {
      super();
    }
  }

  export class VanCountDownOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '时长（毫秒）',
      description: '倒计时时长，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    time: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '毫秒级渲染',
      description: '是否开启毫秒级渲染',
      setter: { concept: 'SwitchSetter' },
      onChange: [
        { clear: ['format'], if: (_) => _ === false },
        { update: { format: 'HH:mm:ss:SS' }, if: (_) => _ === true },
      ],
    })
    millisecond: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '时间格式',
      description: '时间格式',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自动开始',
      description: '是否自动开始倒计时',
      setter: { concept: 'SwitchSetter' },
    })
    autoStart: nasl.core.Boolean = true;

    @Event({
      title: '倒计时结束',
      description: '倒计时结束时触发',
    })
    onFinish: (event: any) => any;

    @Event({
      title: '倒计时变化',
      description: '倒计时变化时触发',
    })
    onChange: (event: {
      days: nasl.core.Integer;
      hours: nasl.core.Integer;
      milliseconds: nasl.core.Integer;
      minutes: nasl.core.Integer;
      seconds: nasl.core.Integer;
      total: nasl.core.Integer;
    }) => any;

  }
}
