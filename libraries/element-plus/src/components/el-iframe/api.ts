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
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '网页地址',
      description: '需要嵌入的网页URL地址',
      docDescription: '设置需要嵌入的外部网页URL地址，支持HTTP/HTTPS协议。',
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
