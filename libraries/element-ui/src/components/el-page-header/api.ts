/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '页头',
    icon: 'page-header',
    description: '如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。',
    group: 'Display',
  })
  export class ElPageHeader extends ViewComponent {
    constructor(options?: Partial<ElPageHeaderOptions>) {
      super();
    }
  }

  export class ElPageHeaderOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String = '返回';

    @Prop({
      group: '主要属性',
      title: '内容',
      description: '内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String;

    @Event({
      title: '点击左侧区域触发',
      description: '点击左侧区域触发',
    })
    onBack: (event: any) => any;

    @Slot({
      title: '标题内容',
      description: '标题内容',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotContent: () => Array<ViewComponent>;
  }
}
