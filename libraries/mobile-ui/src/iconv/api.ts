/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '图标',
    icon: 'icon',
    description: '图标',
    group: "Display"
  })
  export class VanIconv extends ViewComponent {
    constructor(options?: Partial<VanIconvOptions>) {
      super();
    }
  }
  export class VanIconvOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图标',
      setter: {
        concept: "IconSetter"
      }
    })
    name: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '布局类型',
      description: '设置图标布局类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '仅图标'
        }, {
          title: '组合图标-上下'
        }, {
          title: '组合图标-左右'
        }]
      }
    })
    icotype: 'only' | 'top' | 'left' = 'top';
    @Prop({
      group: '交互属性',
      title: '链接类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '页面跳转'
        }, {
          title: '下载链接'
        }]
      }
    })
    linkType: 'destination' | 'download' = 'destination';
    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '打开方式',
      description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '新窗口'
        }, {
          title: '当前窗口'
        }, {
          title: '父级窗口'
        }, {
          title: '顶级窗口'
        }]
      }
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
    @Event({
      title: '点击后',
      description: '点击此项时触发'
    })
    onClick: (event: any) => any ;
    @Slot({
      title: 'undefined',
      description: '插入文本或HTML'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
