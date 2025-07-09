/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 13,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '空状态',
    icon: 'empty',
    description: '空状态时的占位提示。',
    group: 'Display',
  })
  export class VanEmpty extends ViewComponent {
    constructor(options?: Partial<VanEmptyOptions>) {
      super();
    }
  }

  export class VanEmptyOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图片类型',
      description: '图片类型，可选值为 error、network、search 或图片 URL',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '错误' },
          { title: '网络' },
          { title: '搜索' },
        ],
      },
    })
    image: 'default' | 'error' | 'network' | 'search' = 'default';

    @Prop({
      group: '主要属性',
      title: '图片大小',
      description: '图片大小',
      setter: { concept: 'InputSetter' },
    })
    imageSize: nasl.core.String = '160px';

    @Prop({
      group: '主要属性',
      title: '描述文字',
      description: '描述文字',
      setter: { concept: 'InputSetter' },
    })
    description: nasl.core.String = '暂无数据';

    @Prop({
      group: '主要属性',
      title: '自定义图片',
      description: '自定义图片 URL',
      setter: { concept: 'InputSetter' },
    })
    customImage: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '图片宽度',
      description: '图片宽度',
      setter: { concept: 'InputSetter' },
    })
    imageWidth: nasl.core.String = '160px';

    @Prop({
      group: '样式属性',
      title: '图片高度',
      description: '图片高度',
      setter: { concept: 'InputSetter' },
    })
    imageHeight: nasl.core.String = '160px';

    @Prop({
      group: '样式属性',
      title: '描述文字颜色',
      description: '描述文字颜色',
      setter: { concept: 'InputSetter' },
    })
    descriptionColor: nasl.core.String = '#969799';

    @Prop({
      group: '样式属性',
      title: '描述文字大小',
      description: '描述文字大小',
      setter: { concept: 'InputSetter' },
    })
    descriptionFontSize: nasl.core.String = '14px';

    @Prop({
      group: '样式属性',
      title: '底部内容上边距',
      description: '底部内容上边距',
      setter: { concept: 'InputSetter' },
    })
    bottomMarginTop: nasl.core.String = '24px';

    @Prop({
      group: '主要属性',
      title: '显示图片',
      description: '是否显示图片',
      setter: { concept: 'SwitchSetter' },
    })
    showImage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示描述',
      description: '是否显示描述文字',
      setter: { concept: 'SwitchSetter' },
    })
    showDescription: nasl.core.Boolean = true;

    @Slot({
      title: 'Default',
      description: '自定义底部内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Image',
      description: '自定义图片',
    })
    slotImage: () => Array<ViewComponent>;

    @Slot({
      title: 'Description',
      description: '自定义描述',
    })
    slotDescription: () => Array<ViewComponent>;
  }
}
