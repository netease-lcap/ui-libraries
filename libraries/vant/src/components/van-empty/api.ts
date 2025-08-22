/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 13,
    ideusage: {
      idetype: 'element',
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
        options: [{ title: '默认' }, { title: '错误' }, { title: '网络' }, { title: '搜索' }],
      },
    })
    image: 'default' | 'error' | 'network' | 'search' = 'default';

    @Prop({
      group: '主要属性',
      title: '自定义图片',
      description: '自定义图片',
      setter: { concept: 'ImageSetter' },
    })
    customImage: nasl.core.String;

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
  }
}
