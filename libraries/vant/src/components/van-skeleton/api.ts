/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      forceUpdateWhenAttributeChange: true,
      containerDirection: "column",
      childAccept: '["van-skeleton-image", "van-skeleton-title", "van-skeleton-paragraph", "van-skeleton-avatar"].includes(target.tag)',
      slotWrapperInlineStyle: {
        template: "width:100%",
      },
      style: [
        {
          selector: '.van-skeleton--animate',
          declaration: 'animation-duration: 1.2s !important',
          append: true,
        },
      ],
    },
  })
  @Component({
    title: '骨架屏',
    icon: 'skeleton',
    description: '骨架屏',
    group: 'Display',
  })
  export class VanSkeleton extends ViewComponent {
    constructor(options?: Partial<VanSkeletonOptions>) {
      super();
    }
  }

  export class VanSkeletonOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '段落占位图行数',
      description: '段落占位图行数',
      setter: { concept: 'NumberInputSetter' },
    })
    row: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '段落宽度',
      description: '段落占位图宽度，可传数组来设置每一行的宽度',
      setter: { concept: 'InputSetter' },
    })
    rowWidth: nasl.core.String = '100%';

    @Prop({
      group: '主要属性',
      title: '是否显示标题占位图',
      description: '是否显示标题占位图',
      setter: { concept: 'SwitchSetter' },
    })
    title: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示头像占位图',
      description: '是否显示头像占位图',
      setter: { concept: 'SwitchSetter' },
    })
    avatar: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示骨架屏',
      description: '是否显示骨架屏，传 false 时会展示子组件内容',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否开启动画',
      description: '是否开启动画',
      setter: { concept: 'SwitchSetter' },
    })
    animate: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '圆角风格',
      description: '是否将标题和段落显示为圆角风格',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标题占位图宽度',
      description: '标题占位图宽度',
      setter: { concept: 'InputSetter' },
    })
    titleWidth: nasl.core.String = '40%';

    @Prop({
      group: '主要属性',
      title: '头像占位图大小',
      description: '头像占位图大小',
      setter: { concept: 'InputSetter' },
    })
    avatarSize: nasl.core.String = '32px';

    @Prop({
      group: '主要属性',
      title: '头像占位图形状',
      description: '头像占位图形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '方形' }],
      },
    })
    avatarShape: 'round' | 'square' = 'round';

    @Prop({
      group: '主要属性',
      title: '自定义骨架屏',
      description: '开启后会展示自定义的骨架屏',
      setter: { concept: 'SwitchSetter' },
    })
    isCustomSkeleton: nasl.core.Boolean = false;

    @Slot({
      title: '子组件内容插槽',
      description: '子组件内容插槽',
    })
    slotContent: () => Array<ViewComponent>;

    @Slot({
      title: '自定义骨架屏',
      description: '自定义骨架屏内容',
      snippets: [
        {
          title: '标题',
          code: '<van-skeleton-title />',
        },
        {
          title: '段落',
          code: '<van-skeleton-paragraph />',
        },
        {
          title: '头像',
          code: '<van-skeleton-avatar />',
        },
        {
          title: '图片',
          code: '<van-skeleton-image />',
        },
      ],
    })
    slotTemplate: () => Array<ViewComponent>;
  }


  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      // parentAccept: 'target.tag === "van-skeleton"',
    },
  })
  @Component({
    title: '骨架屏图片',
    icon: 'skeleton',
    description: '骨架屏图片',
    group: 'Display',
  })
  export class VanSkeletonImage extends ViewComponent {
    constructor(options?: Partial<VanSkeletonImageOptions>) {
      super();
    }
  }
  export class VanSkeletonImageOptions extends ViewComponentOptions { 
    @Prop({
      group: '主要属性',
      title: '图片占位图大小',
      description: '图片占位图大小',
      setter: { concept: 'InputSetter' },
    })
    imageSize: nasl.core.String = '96px';

    @Prop({
      group: '主要属性',
      title: '图片占位图形状',
      description: '图片占位图形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '方形' }],
      },
    })
    imageShape: 'round' | 'square' = 'square';
  }

  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      // parentAccept: 'target.tag === "van-skeleton"',
    },
  })
  @Component({
    title: '骨架屏标题',
    icon: 'skeleton',
    description: '骨架屏标题',
    group: 'Display',
  })
  export class VanSkeletonTitle extends ViewComponent {
    constructor(options?: Partial<VanSkeletonTitleOptions>) {
      super();
    }
  }
  export class VanSkeletonTitleOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题占位图宽度',
      description: '标题占位图宽度',
      setter: { concept: 'InputSetter' },
    })
    titleWidth: nasl.core.String = '40%';

    @Prop({
      group: '主要属性',
      title: '圆角风格',
      description: '是否将标题显示为圆角风格',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;
  }

  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      // parentAccept: 'target.tag === "van-skeleton"',
    },
  })
  @Component({
    title: '骨架屏段落',
    icon: 'skeleton',
    description: '骨架屏段落',
    group: 'Display',
  })
  export class VanSkeletonParagraph extends ViewComponent {
    constructor(options?: Partial<VanSkeletonParagraphOptions>) {
      super();
    }
  }
  export class VanSkeletonParagraphOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '段落占位图宽度',
      description: '段落占位图宽度',
      setter: { concept: 'InputSetter' },
    })
    rowWidth: nasl.core.String = '100%';

    @Prop({
      group: '主要属性',
      title: '圆角风格',
      description: '是否将段落显示为圆角风格',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;
  }

  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      // parentAccept: 'target.tag === "van-skeleton"',
    },
  })
  @Component({
    title: '骨架屏头像',
    icon: 'skeleton',
    description: '骨架屏头像',
    group: 'Display',
  })
  export class VanSkeletonAvatar extends ViewComponent {
    constructor(options?: Partial<VanSkeletonAvatarOptions>) {
      super();
    }
  }
  export class VanSkeletonAvatarOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '头像占位图大小',
      description: '头像占位图大小',
      setter: { concept: 'InputSetter' },
    })
    avatarSize: nasl.core.String = '32px';

    @Prop({
      group: '主要属性',
      title: '头像占位图形状',
      description: '头像占位图形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '方形' }],
      },
    })
    avatarShape: 'round' | 'square' = 'round';
  }
}
