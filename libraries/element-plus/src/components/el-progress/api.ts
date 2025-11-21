/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'element'
    }
  })
  @Component({
    title: '进度条',
    icon: 'linear-progress',
    description: '用于展示操作进度，告知用户当前状态和预期。',
    group: 'Feedback',
  })
  export class ElProgress extends ViewComponent {
    constructor(options?: Partial<ElProgressOptions>) {
      super();
    }

    @Prop({
      title: '百分比',
    })
    percentage: nasl.core.Decimal = 0;
  }

  export class ElProgressOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      sync: true,
      title: '进度百分比',
      description: '当前的进度百分比值',
      docDescription: '设置进度条的百分比值，范围为0-100。支持双向绑定，可以动态更新进度。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        max: 100,
      },
    })
    percentage: nasl.core.Decimal = 0;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '进度条类型',
      description: '选择进度条的显示类型',
      docDescription: '控制进度条的显示类型。线性：水平进度条；环形：圆环进度条；仪表盘形：仪表盘样式进度条。',
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
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    strokeWidth: nasl.core.Decimal = 6;
    
    @Prop<ElProgressOptions, 'textInside'>({
      group: '主要属性',
      title: '内置文字',
      description: '文字是否显示在进度条内',
      docDescription: '开启后，进度百分比文字会显示在进度条内部。仅在线性类型时可用，文字显示不全时需调整进度条宽度。',
      setter: { concept: 'SwitchSetter' },
      if: _ => _.type === 'line',
    })
    textInside: nasl.core.Boolean = false;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '进度状态',
      description: '进度条的当前状态',
      docDescription: '设置进度条的状态主题。成功：绿色主题；异常：红色主题；警告：橙色主题；默认：蓝色主题。',
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
      title: '动画进度条',
      description: '是否为动画进度条',
      setter: { concept: 'SwitchSetter' },
    })
    indeterminate: nasl.core.Boolean = false;
    
    @Prop({
      group: '样式属性',
      title: '进度条速度',
      description: '控制动画进度条速度和条纹进度条流动速度',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    duration: nasl.core.Decimal = 3;

    @Prop({
      group: '样式属性',
      title: '进度条背景色',
      description: '进度条背景色（会覆盖 status 状态颜色）',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String | nasl.collection.List<any> = '';

    @Prop<ElProgressOptions, 'width'>({
      group: '样式属性',
      title: '环形进度条画布宽度',
      description:
        '环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
      if: _ => _.type === 'circle' || _.type === 'dashboard',
    })
    width: nasl.core.Decimal = 126;

    @Prop({
      group: '主要属性',
      title: '显示文字内容',
      description: '是否显示进度条文字内容',
      setter: { concept: 'SwitchSetter' },
    })
    showText: nasl.core.Boolean = true;

    @Prop<ElProgressOptions, 'strokeLinecap'>({
      group: '样式属性',
      title: '路径两端的形状',
      description: 'circle/dashboard 类型路径两端的形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '圆形' }, { title: '方形' }],
      },
      if: _ => _.type === 'circle' || _.type === 'dashboard',
    })
    strokeLinecap: 'butt' | 'round' | 'square' = 'round';

    @Prop({
      group: '主要属性',
      title: '进度条文字内容',
      description: '指定进度条文字内容',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    private format: (value: any) => any;

    // @Prop({
    //   group: '样式属性',
    //   title: '进度条底色',
    //   description: '指定进度条底色（支持 hex 格式）',
    //   setter: { concept: 'InputSetter' },
    // })
    // defineBackColor: nasl.core.String;

    // @Prop({
    //   group: '样式属性',
    //   title: '进度条字体颜色',
    //   description: '指定进度条字体颜色（支持 hex 格式）',
    //   setter: { concept: 'InputSetter' },
    // })
    // textColor: nasl.core.String;
    
    @Prop<ElProgressOptions, 'striped'>({
      group: '样式属性',
      title: '增加条纹',
      description: '在进度条上增加条纹',
      setter: { concept: 'SwitchSetter' },
      if: _ => _.type === 'line'
    })
    striped: nasl.core.Boolean = false;
    
    @Prop({
      group: '样式属性',
      title: '条纹流动',
      description: '让进度条上的条纹流动起来',
      setter: { concept: 'SwitchSetter' },
    })
    stripedFlow: nasl.core.Boolean = false;
  }
}
