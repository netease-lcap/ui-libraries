/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '头像',
    icon: 'image',
    description: '可以用来展示一张图片，支持设置图片地址。',
    group: 'Display',
  })
  export class Avatar extends ViewComponent {
    constructor(options?: Partial<ImageOptions>) {
      super();
    }
  }

  export class AvatarOptions extends ViewComponentOptions {
    @Prop({
      title: '图片地址转换器',
      description: '将传入的src转换为符合要求的字符串',
    })
    private convertSrcFn: Function;

    @Prop({
      group: '主要属性',
      title: '地址',
      docDescription: '图片链接，可以是来自网络的链接，也可以上传本地图片。',
      setter: {
        concept: 'ImageSetter',
      },
    })
    src: nasl.core.String = '';

    // @Prop({
    //   group: '主要属性',
    //   title: '填充方式',
    //   docDescription: '设置图片的显示方式，适应、适应（图片小于父元素时以原尺寸展示、原尺寸、拉伸、填充）',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '适应' }, { title: '适应（图片小于父元素时以原尺寸展示）' }, { title: '原尺寸' }, { title: '拉伸' }, { title: '填充' }],
    //   },
    // })
    // fit: 'contain' | 'scale-down' | 'none' | 'fill' | 'cover' = 'contain';

    // @Prop({
    //   group: '主要属性',
    //   title: '圆形遮罩',
    //   docDescription: '是否使用圆形进行图片展示。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // circle: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '水平对齐方式',
    //   docDescription: '左对齐、右对齐、居中对齐',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '左对齐' }, { title: '居中对齐' }, { title: '右对齐' }],
    //   },
    // })
    // horizontalCenter: 'left' | 'center' | 'right' = 'center';

    // @Prop({
    //   group: '主要属性',
    //   title: '垂直对齐方式',
    //   docDescription: '顶部对齐、居中对齐、底部对齐',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '顶部对齐' }, { title: '居中对齐' }, { title: '底部对齐' }],
    //   },
    // })
    // verticalCenter: 'top' | 'center' | 'bottom' = 'center';

    // @Prop({
    //   group: '交互属性',
    //   title: '点击放大',
    //   description: '是否支持点击放大全屏展示',
    //   docDescription: '是否支持点击放大全屏展示',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // preview: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '圆形' },
          { title: '方形' },
        ],
      },
    })
    shape: 'circle' | 'square' = 'circle';
  }
}
