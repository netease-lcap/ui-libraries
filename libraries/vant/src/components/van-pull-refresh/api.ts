/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      events: {
        touch: true,
      },
    }
  })
  
  @Component({
    title: '下拉刷新',
    icon: 'pull-refresh',
    description: '用于提供下拉刷新的交互操作。',
    group: 'Display',
  })
  export class VanPullRefresh extends ViewComponent {
    constructor(options?: Partial<VanPullRefreshOptions>) {
      super();
    }
  }

  export class VanPullRefreshOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '下拉过程提示文案',
      description: '下拉过程提示文案',
      setter: { concept: 'InputSetter' },
    })
    pullingText: nasl.core.String = '下拉即可刷新...';

    @Prop({
      group: '主要属性',
      title: '释放过程提示文案',
      description: '释放过程提示文案',
      setter: { concept: 'InputSetter' },
    })
    loosingText: nasl.core.String = '释放即可刷新...';

    @Prop({
      group: '主要属性',
      title: '加载过程提示文案',
      description: '加载过程提示文案',
      setter: { concept: 'InputSetter' },
    })
    loadingText: nasl.core.String = '加载中...';

    @Prop({
      group: '主要属性',
      title: '刷新成功提示文案',
      description: '刷新成功提示文案',
      setter: { concept: 'InputSetter' },
    })
    successText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '刷新成功提示展示时长(ms)',
      description: '刷新成功提示展示时长(ms)',
      setter: { concept: 'NumberInputSetter' },
    })
    successDuration: nasl.core.Integer = 500;

    @Prop({
      group: '主要属性',
      title: '动画时长',
      description: '动画时长',
      setter: { concept: 'NumberInputSetter' },
    })
    animationDuration: nasl.core.Integer = 300;

    @Prop({
      group: '主要属性',
      title: '顶部内容高度',
      description: '顶部内容高度',
      setter: { concept: 'NumberInputSetter' },
    })
    headHeight: nasl.core.Integer = 50;

    @Prop({
      group: '主要属性',
      title: '触发下拉刷新的距离',
      description: '触发下拉刷新的距离',
      setter: { concept: 'NumberInputSetter' },
    })
    pullDistance: nasl.core.Integer = 50;

    @Prop({
      group: '主要属性',
      title: '是否禁用下拉刷新',
      description: '是否禁用下拉刷新',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: '下拉刷新时触发',
      description: '下拉刷新时触发',
    })
    onRefresh: () => void;

    // TODO LD: 参数
    @Event({
      title: '拖动时或状态改变时触发',
      description: '拖动时或状态改变时触发',
    })
    onChange: (current: { status: nasl.core.String, distance: nasl.core.Decimal }) => void;

    @Slot({
      title: '自定义内容',
      description: '自定义内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '非下拉状态时顶部内容',
      description: '非下拉状态时顶部内容',
    })
    slotNormal: () => Array<ViewComponent>;

    // TODO LD: 参数
    @Slot({
      title: '下拉过程中顶部内容',
      description: '下拉过程中顶部内容',
    })
    slotPulling: (current: { distance: nasl.core.Decimal }) => Array<ViewComponent>;

    // TODO LD: 参数
    @Slot({
      title: '释放过程中顶部内容',
      description: '释放过程中顶部内容',
    })
    slotLoosing: (current: { distance: nasl.core.Decimal }) => Array<ViewComponent>;

    // TODO LD: 参数
    @Slot({
      title: '加载过程中顶部内容',
      description: '加载过程中顶部内容',
    }) 
    slotLoading: (current: { distance: nasl.core.Decimal }) => Array<ViewComponent>;

    @Slot({
      title: '刷新成功提示内容',
      description: '刷新成功提示内容',
    })
    slotSuccess: () => Array<ViewComponent>;
  }
} 