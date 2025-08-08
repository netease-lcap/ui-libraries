/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 14,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '环形进度条',
    icon: 'circular-progress',
    description: '圆环形的进度条组件',
    group: 'Display',
  })
  export class VanCircle extends ViewComponent {
    constructor(options?: Partial<VanCircleOptions>) {
      super();
    }
  }

  export class VanCircleOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '进度值',
      description: '进度值',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    currentRate: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '目标进度',
      description: '目标进度值',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    rate: nasl.core.Decimal = 100;

    @Prop({
      group: '主要属性',
      title: '文本',
      description: '文本',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '圆环';

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '环形进度条尺寸',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String = '100px';

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
    layerColor: nasl.core.String = 'white';

    @Prop({
      group: '主要属性',
      title: '动画速度',
      description: '动画速度（0 表示无动画）',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    speed: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '顺时针',
      description: '是否顺时针方向',
      setter: { concept: 'SwitchSetter' },
    })
    clockwise: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '线条端点样式',
      description: '线条端点样式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '方形' }],
      },
    })
    strokeLinecap: 'round' | 'butt' = 'round';

    @Prop({
      group: '主要属性',
      title: '线条宽度',
      description: '线条宽度',
      setter: { concept: 'NumberInputSetter' },
    })
    strokeWidth: nasl.core.Decimal = 40;

    @Prop({
      group: '主要属性',
      title: '开始位置',
      description: '开始位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '顶部' }, { title: '右侧' }, { title: '底部' }, { title: '左侧' }],
      },
    })
    startPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';
  }
}
