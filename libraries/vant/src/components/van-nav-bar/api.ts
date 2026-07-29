/// <reference types="@nasl/types" />

namespace nasl.ui {

  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '导航栏',
    icon: 'nav-bar',
    description: '用于页面顶部的导航栏。',
    group: 'Navigation',
  })
  export class VanNavBar<T> extends ViewComponent {
    constructor(options?: Partial<VanNavBarOptions<T>>) {
      super();
    }
  }

  export class VanNavBarOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '下边框',
      description: '是否显示下边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = true;


    @Prop({
      group: '主要属性',
      title: '固定顶部',
      description: '是否固定在顶部',
      setter: { concept: 'SwitchSetter' },
    })
    fixed: nasl.core.Boolean = false;

    @Prop<VanNavBarOptions<T>, 'placeholder'>({
      group: '主要属性',
      title: '占位元素',
      description: '固定在顶部时，是否在标签位置生成一个等高的占位元素',
      setter: { concept: 'SwitchSetter' },
      if: _ => !!_.fixed
    })
    placeholder: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '层级',
      description: '导航栏 z-index',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '顶部安全区',
      description: '是否开启顶部安全区适配',
      setter: { concept: 'SwitchSetter' },
    })
    safeAreaInsetTop: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '点击反馈',
      description: '是否开启两侧按钮的点击反馈',
      setter: { concept: 'SwitchSetter' },
    })
    clickable: nasl.core.Boolean = true;

    @Slot({
      title: '左侧插槽',
      description: '自定义左侧区域内容',
    })
    slotLeft: () => Array<ViewComponent>;

    @Slot({
      title: '右侧插槽',
      description: '自定义右侧区域内容',
    })
    slotRight: () => Array<ViewComponent>;

    @Slot({
      title: '标题插槽',
      description: '自定义标题内容',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
