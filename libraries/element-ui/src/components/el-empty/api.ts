/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: "container"
    }
  })
  @Component({
    title: '空状态',
    icon: 'empty',
    description: '空状态时的占位提示。',
    group: 'Display',
  })
  export class ElEmpty extends ViewComponent {
    constructor(options?: Partial<ElEmptyOptions>) {
      super();
    }
  }

  export class ElEmptyOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图片地址',
      description: '图片地址',
      setter: { concept: 'ImageSetter' },
    })
    image: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图片大小（宽度）',
      description: '图片大小（宽度）',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    imageSize: nasl.core.Decimal;

    // @Prop({
    //   group: '主要属性',
    //   title: '文本描述',
    //   description: '文本描述',
    //   setter: { concept: 'InputSetter' },
    // })
    // description: nasl.core.String;

    @Slot({
      title: '自定义底部内容',
      description: '自定义底部内容',
    })
    slotDefault: () => Array<ViewComponent>;

    // @Slot({
    //   title: '自定义图片',
    //   description: '自定义图片',
    // })
    // slotImage: () => Array<ViewComponent>;

    @Slot({
      title: '自定义描述文字',
      description: '自定义描述文字',
    })
    slotDescription: () => Array<ViewComponent>;
  }
}
