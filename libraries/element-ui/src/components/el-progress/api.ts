/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '进度条',
    icon: 'progress',
    description: '用于展示操作进度，告知用户当前状态和预期。',
    group: 'Display',
  })
  export class ElProgress extends ViewComponent {
    constructor(options?: Partial<ElProgressOptions>) {
      super();
    }
  }

  export class ElProgressOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '百分比',
      description: '**百分比（必填）**',
      setter: { concept: 'NumberInputSetter' },
    })
    percentage: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '进度条类型',
      description: '进度条类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '线性' },
          { title: '环形' },
          { title: '仪表盘形' },
        ],
      },
    })
    type: 'line' | 'circle' | 'dashboard' = 'line';

    @Prop({
      group: '样式属性',
      title: '进度条宽度',
      description: '进度条的宽度，单位 px',
      setter: { concept: 'NumberInputSetter' },
    })
    strokeWidth: nasl.core.Decimal = 6;

    @Prop({
      group: '主要属性',
      title: '进度条显示文字内置在进度条内',
      description: '进度条显示文字内置在进度条内（只在 type=line 时可用）',
      setter: { concept: 'SwitchSetter' },
    })
    textInside: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '进度条当前状态',
      description: '进度条当前状态',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '完成' },
          { title: '异常' },
          { title: '警告' },
        ],
      },
    })
    status: '' | 'success' | 'exception' | 'warning';

    @Prop({
      group: '样式属性',
      title: '进度条背景色',
      description: '进度条背景色（会覆盖 status 状态颜色）',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String | any | any[] = '';

    @Prop({
      group: '样式属性',
      title: '环形进度条画布宽度',
      description:
        '环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Decimal = 126;

    @Prop({
      group: '主要属性',
      title: '是否显示进度条文字内容',
      description: '是否显示进度条文字内容',
      setter: { concept: 'SwitchSetter' },
    })
    showText: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '路径两端的形状',
      description: 'circle/dashboard 类型路径两端的形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '圆形' }, { title: '方形' }],
      },
    })
    strokeLinecap: 'butt' | 'round' | 'square' = 'round';

    @Prop({
      group: '主要属性',
      title: '进度条文字内容',
      description: '指定进度条文字内容',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '进度条底色',
      description: '指定进度条底色（支持 hex 格式）',
      setter: { concept: 'InputSetter' },
    })
    defineBackColor: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '进度条字体颜色',
      description: '指定进度条字体颜色（支持 hex 格式）',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String;
  }
}
