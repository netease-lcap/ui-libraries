/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      // "structured": true,
      selector: {
        expression: "this.getElement(el => el.slotTarget === 'placeholder' )",
        cssSelector: '.el-image',
      },
    },
  })
  @Component({
    title: '图片',
    icon: 'image',
    description:
      '图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等',
    group: 'Display',
  })
  export class ElImage extends ViewComponent {
    constructor(options?: Partial<ElImageOptions>) {
      super();
    }
  }

  export class ElImageOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图片地址',
      description: '图片源，同原生',
      setter: { concept: 'ImageSetter' },
    })
    src: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '如何适应容器框的fit选项',
      description:
        '确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'fill' },
          { title: 'contain' },
          { title: 'cover' },
          { title: 'none' },
          { title: 'scale-down' },
          { title: '默认' },
        ],
      },
    })
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | '' = '';

    @Prop({
      group: '主要属性',
      title: '图片无法显示时的Alt值',
      description: '原生 alt',
      setter: { concept: 'InputSetter' },
    })
    alt: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: 'Referrer Policy',
      description: '原生 referrerPolicy',
      setter: { concept: 'InputSetter' },
    })
    referrerPolicy: nasl.core.String = '';

    @Prop({
      group: '状态属性',
      title: '是否开启懒加载',
      description: '是否开启懒加载',
      setter: { concept: 'SwitchSetter' },
    })
    lazy: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '监听 scroll 事件的容器',
    //   description: '开启懒加载后，监听 scroll 事件的容器',
    //   setter: { concept: 'InputSetter' },
    // })
    // scrollContainer: nasl.core.String | any;

    @Prop({
      group: '主要属性',
      title: '开启图片预览功能',
      description: '开启图片预览功能,用逗号分隔',
      setter: { concept: 'InputSetter' },
    })
    previewSrcList: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '图片预览的z-index值',
      description: '设置图片预览的 z-index',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Decimal = 2000;

    @Prop({
      group: '数据属性',
      title: '图片预览的初始图片Index值',
      description: '图片预览初始图片index',
      setter: { concept: 'NumberInputSetter' },
    })
    initialIndex: nasl.core.Decimal;

    @Event({
      title: '图片加载成功时',
      description: '图片加载成功触发',
    })
    onLoad: (event: any) => any;

    @Event({
      title: '图片加载失败时',
      description: '图片加载失败触发',
    })
    onError: (event: any) => any;

    @Slot({
      title: '图片未加载的占位内容',
      description: '图片未加载的占位内容',
    })
    slotPlaceholder: () => Array<ViewComponent>;

    @Slot({
      title: '加载失败的内容',
      description: '加载失败的内容',
    })
    slotError: () => Array<ViewComponent>;
  }
}
