/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 11,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '水印',
    icon: 'watermark',
    description: '在页面显示水印',
    group: 'Effects',
  })
  export class ElWatermark extends ViewComponent {
    constructor(options?: Partial<ElWatermarkOptions>) {
      super();
    }
  }

  export class ElWatermarkOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '宽度',
      description: '水印的宽度， content 的默认值是它自己的宽度',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Integer = 120;

    @Prop({
      group: '主要属性',
      title: '高度',
      description: '水印的高度， content 的默认值是它自己的高度',
      setter: { concept: 'NumberInputSetter' },
    })
    height: nasl.core.Integer = 64;

    @Prop({
      group: '主要属性',
      title: '旋转角度',
      description: '水印的旋转角度, 单位 °',
      setter: { concept: 'NumberInputSetter' },
    })
    rotate: nasl.core.Integer = -22;
    
    @Prop({
      group: '主要属性',
      title: 'zIndex值',
      description: '水印元素的z-index值',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 9;
    
    @Prop({
      group: '主要属性',
      title: '图片',
      description: '水印图片，建议使用 2x 或 3x 图像',
      setter: { concept: 'InputSetter' },
    })
    image: nasl.core.String;
    
    @Prop({
      group: '主要属性',
      title: '文本内容',
      description: '水印文本内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String;
    
    @Prop({
      group: '主要属性',
      title: '文字样式',
      description: '文字样式, JSON格式，例如：{ "color": "rgba(0,0,0,.15)", "fontSize": 16, "fontWeight": "normal" }，需满足Font class 的规范',
      setter: { concept: 'InputSetter' },
    })
    font: nasl.collection.Map<nasl.core.String, nasl.core.String>;
    
    @Prop({
      group: '主要属性',
      title: '水印之间的间距',
      description: '水印之间的间距, 例如：[100, 100]',
      setter: { concept: 'InputSetter' },
    })
    gap: nasl.collection.List<nasl.core.String>;
    
    @Prop({
      group: '主要属性',
      title: '偏移量',
      description: '水印从容器左上角的偏移 默认值为 gap/2, 例如：[50, 50]',
      setter: { concept: 'InputSetter' },
    })
    offset: nasl.core.String;
    
    @Slot({
      title: 'Default',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
