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
    icon: 'circle-progress',
    description: '环形进度条，用于展示操作进度，告知用户当前状态和预期。',
    group: 'Feedback',
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
      description: '**进度值（必填）**',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        max: 100,
      },
    })
    value: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '目标进度',
      description: '目标进度值',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        max: 100,
      },
    })
    rate: nasl.core.Decimal = 100;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '环形进度条尺寸',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String = '100px';

    @Prop({
      group: '主要属性',
      title: '进度条宽度',
      description: '进度条宽度',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    strokeWidth: nasl.core.Decimal = 40;

    @Prop({
      group: '主要属性',
      title: '进度条颜色',
      description: '进度条颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#337eff';

    @Prop({
      group: '主要属性',
      title: '轨道颜色',
      description: '轨道颜色',
      setter: { concept: 'InputSetter' },
    })
    layerColor: nasl.core.String = '#E5E5E5';

    @Prop({
      group: '主要属性',
      title: '填充颜色',
      description: '填充颜色',
      setter: { concept: 'InputSetter' },
    })
    fill: nasl.core.String = '#ffffff';

    @Prop({
      group: '主要属性',
      title: '文字',
      description: '显示的文字',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String;

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
        options: [{ title: '默认' }, { title: '圆形' }, { title: '方形' }],
      },
    })
    strokeLinecap: 'butt' | 'round' | 'square' = 'round';

    @Prop({
      group: '样式属性',
      title: '显示文字',
      description: '是否显示文字',
      setter: { concept: 'SwitchSetter' },
    })
    showText: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '文字颜色',
      description: '文字颜色',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#323233';

    @Prop({
      group: '样式属性',
      title: '文字大小',
      description: '文字大小',
      setter: { concept: 'InputSetter' },
    })
    textSize: nasl.core.String = '14px';

    @Prop({
      group: '样式属性',
      title: '文字位置',
      description: '文字位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '居中' }, { title: '顶部' }, { title: '底部' }],
      },
    })
    textPosition: 'center' | 'top' | 'bottom' = 'center';

    @Prop({
      group: '主要属性',
      title: '格式化函数',
      description: '自定义文字格式化函数',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    private format: (value: any) => any;

    @Slot({
      title: 'Default',
      description: '自定义文字内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
