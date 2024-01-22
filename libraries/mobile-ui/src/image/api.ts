/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '图片展示',
    icon: 'image',
    description: '可以用来展示一张图片，支持设置图片地址。',
    group: "Display"
  })
  export class VanImage extends ViewComponent {
    constructor(options?: Partial<VanImageOptions>) {
      super();
    }
  }
  export class VanImageOptions extends ViewComponentOptions {
    @Prop({
      title: '加载样式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: 'Loading'
        }, {
          title: '不显示加载状态'
        }, {
          title: '自定义默认图'
        }]
      }
    })
    loadingType: 'loading' | 'none' | 'placeholder' = 'loading';
    @Prop<VanImageOptions, 'placeholderSrc'>({
      title: '默认图地址',
      if: _ => _.loadingType === 'placeholder'
    })
    placeholderSrc: nasl.core.String = 'https://static-vusion.nos-eastchina1.126.net/h5-template/lietu.png';
    @Prop({
      group: '主要属性',
      title: '图片地址',
      setter: {
        concept: "ImageSetter"
      }
    })
    src: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '填充方式',
      description: '设置图片的填充方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '适应'
        }, {
          title: '适应（图片小于父元素时以原尺寸展示）'
        }, {
          title: '原尺寸'
        }, {
          title: '拉伸'
        }, {
          title: '填充'
        }]
      }
    })
    fit: 'contain' | 'scale-down' | 'none' | 'fill' | 'cover' = 'contain';
    @Prop({
      group: '主要属性',
      title: '图片风格',
      description: '选择图片为方形或圆形',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '方形'
        }, {
          title: '圆形'
        }]
      }
    })
    sr: 's' | 'r' = 's';
    @Prop({
      group: '交互属性',
      title: '点击放大',
      description: '是否支持点击放大全屏展示',
      setter: {
        concept: "SwitchSetter"
      }
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '点击后',
      description: '点击此项时触发'
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
  }) => any ;
  }
}
