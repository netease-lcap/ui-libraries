/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '进度条',
    icon: 'linear-progress',
    description: '用于展示操作的当前进度。',
    group: "Display"
  })
  export class VanProgress extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: VanProgressOptions['value'];
    constructor(options?: Partial<VanProgressOptions>) {
      super();
    }
  }
  export class VanProgressOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '值',
      description: '用于标识进度条的值',
      sync: true,
      setter: {
        concept: "NumberInputSetter",
        min: 0
      }
    })
    value: nasl.core.Decimal;
    @Prop({
      group: '主要属性',
      title: '文字内容',
      description: '进度条中的显示文字',
    })
    pivotText: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '显示文字',
      description: '是否显示进度条中的文字',
      setter: {
        concept: "SwitchSetter"
      }
    })
    showPivot: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '自定义',
      setter: {
        concept: "SwitchSetter"
      }
    })
    custom: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    inactive: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '进度条粗细',
      description: '设置进度条粗细，单位为px。',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    strokeWidth: nasl.core.Decimal = 4;
    @Prop({
      group: '样式属性',
      title: '进度条颜色'
    })
    color: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '轨道颜色'
    })
    trackColor: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '文字颜色'
    })
    textColor: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '文字背景色'
    })
    pivotColor: nasl.core.String;
    @Slot({
      title: '默认',
      description: '显示的文本'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
