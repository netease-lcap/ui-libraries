/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
    }
  })
  
  @Component({
    title: '签名',
    icon: 'signature',
    description: '用于签名场景的组件，基于 Canvas 实现。',
    group: 'Form',
  })
  export class VanSignature extends ViewComponent {
    @Event({
      title: '外层元素大小或组件显示状态变化时触发',
      description: '外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘',
    })
    resize: () => void;

    @Event({
      title: '清除签名',
      description: '可调用此方法来清除签名',
    })
    clear: () => void;

    @Event({
      title: '触发 submit 事件',
      description: '触发 submit 事件，与点击确认按钮的效果等价',
    })
    submit: () => any;
    
    constructor(options?: Partial<VanSignatureOptions>) {
      super();
    }
  }

  export class VanSignatureOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '导出图片类型',
      description: '导出图片类型',
      setter: { concept: 'InputSetter' },
    })
    type: nasl.core.String = 'png';

    @Prop({
      group: '主要属性',
      title: '笔触颜色',
      description: '笔触颜色',
      setter: { concept: 'InputSetter' },
    })
    penColor: nasl.core.String = '#000';

    @Prop({
      group: '主要属性',
      title: '线条宽度',
      description: '线条宽度',
      setter: { concept: 'InputSetter' },
    })
    lineWidth: nasl.core.Integer = 3;

    @Prop({
      group: '样式属性',
      title: '背景颜色',
      description: '背景颜色',
      setter: { concept: 'InputSetter' },
    })
    backgroundColor: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '提示文案',
      description: '当不支持 Canvas 的时候出现的提示文案',
      setter: { concept: 'InputSetter' },
    })
    tips: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '清除按钮文案',
      description: '清除按钮文案',
      setter: { concept: 'InputSetter' },
    })
    clearButtonText: nasl.core.String = '清空';

    @Prop({
      group: '主要属性',
      title: '确认按钮文案',
      description: '确认按钮文案',
      setter: { concept: 'InputSetter' },
    })
    confirmButtonText: nasl.core.String = '确认';

    @Event({
      title: '开始签名时触发',
      description: '开始签名时触发',
    })
    onStart: () => void;

    @Event({
      title: '结束签名时触发',
      description: '结束签名时触发',
    })
    onEnd: () => void;

    @Event({
      title: '签名过程中触发',
      description: '签名过程中触发',
    })
    onSigning: (event: any) => void;

    @Event({
      title: '点击确定按钮时触发',
      description: '点击确定按钮时触发',
    })
    onSubmit: (event: { image: nasl.core.String, canvas: HTMLCanvasElement }) => void;

    @Event({
      title: '点击取消按钮时触发',
      description: '点击取消按钮时触发',
    })
    onClear: () => void;

    @Slot({
      title: '自定义提示文案',
      description: '自定义提示文案',
    })
    slotTips: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
    },
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanSignature',
      },
    ],
  })
  @Component({
    title: '表单签名',
    description: '表单签名',
    group: 'Form',
  })
  export class VanFormSignature extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormSignatureOptions & VanFormItemOptions & Omit<VanSignatureOptions, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormSignatureOptions extends ViewComponentOptions {}
} 