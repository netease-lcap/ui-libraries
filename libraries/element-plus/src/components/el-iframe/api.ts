/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
  })
  @Component({
    title: 'Iframe',
    icon: 'iframe',
    description: '用于嵌入其他网页的容器。',
    group: 'Container',
  })
  export class ElIframe extends ViewComponent {
    constructor(options?: Partial<ElIframeOptions>) {
      super();
    }
  }
  export class ElIframeOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '地址',
      description: '需要嵌入的网页地址',
      setter: {
        concept: 'InputSetter',
      }
    })
    src: nasl.core.String;

    @Event({
      title: '加载完成',
      description: '网页加载完成时触发。',
    })
    onLoad: (event: any) => any;
  }
}
