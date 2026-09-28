/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      style: [
        {
          selector: '.van-loading__spinner',
          declaration: 'animation-duration: 2s !important',
        },
        {
          selector: '.van-loading__spinner--circular',
          declaration: 'animation-duration: 2s !important',
        },
        {
          selector: '.van-loading__circular circle',
          declaration: 'animation-duration: 1.5s !important',
        },
      ],
    },
  })
  @Component({
    title: '加载中',
    icon: 'loading',
    description: '加载中',
    group: 'Feedback',
  })
  export class VanLoading extends ViewComponent {
    constructor(options?: Partial<VanLoadingOptions>) {
      super();
    }
  }

  export class VanLoadingOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否显示',
      description: '是否显示',
      setter: { concept: 'SwitchSetter' },
    })
    isLoading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载图标颜色',
      description: '加载图标颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#c9c9c9';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '类型',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '旋转' }, { title: '圆圈' }] },
    })
    type: 'spinner' | 'circular' = 'circular';

    @Prop({
      group: '主要属性',
      title: '加载图标',
      description: '加载图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '加载图标大小',
      description: '加载图标大小',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String = '30px';

    @Prop({
      group: '主要属性',
      title: '文字大小',
      description: '文字大小',
      setter: { concept: 'InputSetter' },
    })
    textSize: nasl.core.String = '14px';

    @Prop({
      group: '主要属性',
      title: '文字颜色',
      description: '文字颜色',
      setter: { concept: 'InputSetter' },
    })
    textColor: nasl.core.String = '#c9c9c9';

    @Prop({
      group: '主要属性',
      title: '是否垂直排列图标和文字内容',
      description: '是否垂直排列图标和文字内容',
      setter: { concept: 'SwitchSetter' },
    })
    vertical: nasl.core.Boolean = false;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '加载文案',
      description: '加载文案',
    })
    slotLoadingText: () => Array<ViewComponent>;
  }
}
