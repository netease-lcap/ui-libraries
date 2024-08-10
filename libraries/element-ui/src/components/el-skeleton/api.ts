/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "structured": "template",
      "childAccept": {
        "template": "target.tag === 'skeleton-item'"
      },
      "selector": {
        "expression": "this",
      }
    }
    // el- skeleton is - animated
  })
  @Component({
    title: '骨架屏',
    icon: 'skeleton',
    description:
      '在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。',
    group: 'Display',
  })
  export class ElSkeleton extends ViewComponent {
    constructor(options?: Partial<ElSkeletonOptions>) {
      super();
    }
  }

  export class ElSkeletonOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否使用动画',
      description: '是否使用动画',
      setter: { concept: 'SwitchSetter' },
    })
    animated: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '渲染template数量',
      description: '渲染多少个 template, 建议使用尽可能小的数字',
      setter: { concept: 'NumberInputSetter' },
    })
    count: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '是否显示 skeleton 骨架屏',
      description: '是否显示 skeleton 骨架屏',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '骨架屏段落数量',
      description: '骨架屏段落数量',
      setter: { concept: 'NumberInputSetter' },
    })
    rows: nasl.core.Decimal = 4;

    @Prop({
      group: '主要属性',
      title: '延迟占位 DOM 渲染的时间',
      description: '延迟占位 DOM 渲染的时间, 单位是毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    throttle: nasl.core.Decimal = 0;

    @Slot({
      title: '默认插槽',
      description: '用来展示真实 UI',
      snippets: [
        {
          title: 'Skeleton Item',
          code: '<el-skeleton-item></el-skeleton-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '用来展示自定义占位符',
      description: '用来展示自定义占位符',
    })
    slotTemplate: () => Array<ViewComponent>;
  }


  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "element",
      "parentAccept": "target.tag === 'template' && target.slotTarget ==='template'",
    }
  })

  @Component({
    title: 'Skeleton Item',
    icon: 'skeleton-item',
    description: '',
    group: 'Display',
  })
  export class ElSkeletonItem extends ViewComponent {
    constructor(options?: Partial<ElSkeletonItemOptions>) {
      super();
    }
  }

  export class ElSkeletonItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Variant',
      description: '当前显示的占位元素的样式',
      setter: { concept: 'InputSetter' },
    })
    variant: any;
  }
}
