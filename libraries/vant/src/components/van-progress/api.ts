/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '进度条',
    icon: 'linear-progress',
    description: '用于展示操作进度，告知用户当前状态和预期。',
    group: 'Display',
  })
  export class VanProgress extends ViewComponent {
    constructor(options?: Partial<VanProgressOptions>) {
      super();
    }
  }

  export class VanProgressOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '进度百分比',
      description: '进度百分比，0-100',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        max: 100,
      },
    })
    percentage: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '进度条颜色',
      description: '进度条颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '轨道颜色',
      description: '轨道颜色',
      setter: { concept: 'InputSetter' },
    })
    trackColor: nasl.core.String = '#e5e5e5';

    @Prop({
      group: '主要属性',
      title: '进度条宽度',
      description: '进度条宽度',
      setter: { concept: 'NumberInputSetter' },
    })
    strokeWidth: nasl.core.Decimal = 4;

    @Prop({
      group: '主要属性',
      title: '是否显示文字',
      description: '是否显示文字',
      setter: { concept: 'SwitchSetter' },
    })
    showPivot: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '文字颜色',
      description: '文字颜色',
      setter: { concept: 'InputSetter' },
    })
    pivotColor: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '文字颜色',
      description: '文字颜色',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#fff';

    @Prop({
      group: '主要属性',
      title: '是否置灰',
      description: '是否置灰',
      setter: { concept: 'SwitchSetter' },
    })
    inactive: nasl.core.Boolean = false;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: {}) => void;
  }
}
