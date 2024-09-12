/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 14,
    ideusage: {
      "idetype": "element",
    }
  })
  @Component({
    title: '头像',
    icon: 'avatar',
    description: '用图标、图片或者字符的形式展示用户或事物信息。',
    group: 'Display',
  })
  export class ElAvatar extends ViewComponent {
    constructor(options?: Partial<ElAvatarOptions>) {
      super();
    }
  }

  export class ElAvatarOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '链接',
      description: '图片头像的资源地址',
      setter: { concept: 'ImageSetter' },
    })
    src: nasl.core.String;

    @Prop<ElAvatarOptions, 'fallbackSrc'>({
      group: '主要属性',
      title: '兜底链接',
      description: '图片头像的资源地址',
      setter: { concept: 'ImageSetter' },
      if: _ => !!_.src,
    })
    fallbackSrc: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '设置头像的图标类型，参考 Icon 组件',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS'
      },
    })
    icon: nasl.core.String;

    @Prop<ElAvatarOptions, 'size'>({
      group: '主要属性',
      title: '尺寸',
      description: '设置头像的大小，可选值为 large/medium/small',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '小' },
          { title: '中等' },
          { title: '大' },
        ],
      },
      // @ts-ignore
      implicitToString: true
    })
    size: 'small' | 'medium' | 'large' = 'large';

    @Prop({
      group: '主要属性',
      title: '形状',
      description: '设置头像的形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '矩形' }],
      },
    })
    shape: 'circle' | 'square' = 'circle';

    @Prop({
      group: '主要属性',
      title: '描述',
      description: '描述图像的替换文本',
      setter: { concept: 'InputSetter' },
    })
    alt: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '适应',
      description: '当展示类型为图片的时候，设置图片如何适应容器框',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '拉伸填充' },
          { title: '宽高比约束填充' },
          { title: '覆盖填充' },
          { title: '原图尺寸' },
          { title: '缩小填充' },
        ],
      },
    })
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';

    @Prop({
      group: '主要属性',
      title: '系列',
      description:
        '以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像',
      setter: { concept: 'InputSetter' },
    })
    srcSet: nasl.core.String;

    @Event({
      title: '加载失败的回调',
      description: '图片类头像加载失败的回调',
    })
    onError: (event: any) => any;

    // @Slot({
    //   title: 'Default',
    //   description: '自定义头像展示内容',
    // })
    // slotDefault: () => Array<ViewComponent>;
  }
}
