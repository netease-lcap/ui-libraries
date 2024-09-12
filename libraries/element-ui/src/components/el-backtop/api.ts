/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 7,
    ideusage: {
      idetype: 'element',
      elementSutando: {
        condition: true,
        component: 'ElBacktopDesigner',
      }
    }
  })
  @Component({
    title: '回到顶部',
    icon: 'backtop',
    description: '回到顶部',
    group: 'Display',
  })
  export class ElBacktop extends ViewComponent {
    constructor(options?: Partial<ElBacktopOptions>) {
      super();
    }
  }

  export class ElBacktopOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '触发滚动的对象',
      description: '触发滚动的对象',
      setter: { concept: 'InputSetter' },
    })
    private target: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '滚动高度阈值',
      description: '滚动高度达到此参数值才出现',
      setter: { concept: 'InputSetter' },
    })
    visibilityHeight: nasl.core.Integer = 200;

    @Prop({
      group: '主要属性',
      title: '距离页面右边距',
      description: '控制其显示位置, 距离页面右边距',
      setter: { concept: 'InputSetter' },
    })
    right: nasl.core.Integer = 40;

    @Prop({
      group: '主要属性',
      title: '距离页面底部距离',
      description: '控制其显示位置, 距离页面底部距离',
      setter: { concept: 'InputSetter' },
    })
    bottom: nasl.core.Integer = 40;

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: any) => any;
  }
}
