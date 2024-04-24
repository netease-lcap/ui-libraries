/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '计时器',
    icon: 'countdown',
    description: '用于计时',
    group: "Display"
  })
  export class VanCountDownNew extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '开始计时器'
    })
    start(): any {}
    @Method({
      title: 'undefined',
      description: '暂停计时器'
    })
    pause(): any {}
    @Method({
      title: 'undefined',
      description: '继续计时器'
    })
    continue(): any {}
    @Method({
      title: 'undefined',
      description: '停止计时器'
    })
    stop(): any {}
    constructor(options?: Partial<VanCountDownNewOptions>) {
      super();
    }
  }
  export class VanCountDownNewOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '计时器时长（秒）',
      description: '设置定时时间',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      }
    })
    timer: nasl.core.Integer = 60;
    @Prop({
      group: '主要属性',
      title: '计时方式',
      description: '设置计时器计时方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '正计时'
        }, {
          title: '倒计时'
        }]
      }
    })
    reverse: 'positive' | 'negative' = 'positive';
    @Prop({
      group: '主要属性',
      title: '自动开始计时',
      description: '是否开启自动开始计时',
      setter: {
        concept: "SwitchSetter"
      }
    })
    autostart: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '隐藏分钟',
      description: '设置是否隐藏分钟',
      setter: {
        concept: "SwitchSetter"
      }
    })
    hideMinute: nasl.core.Boolean = false;
    @Event({
      title: '计时器开始',
      description: '计时器开始时触发'
    })
    onStart: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '计时器暂停',
      description: '计时器暂停时触发'
    })
    onPause: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '计时器继续',
      description: '计时器继续时触发'
    })
    onContinue: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '计时器结束',
      description: '计时器结束时触发'
    })
    onStop: (event: nasl.ui.BaseEvent) => void;
  }
}
