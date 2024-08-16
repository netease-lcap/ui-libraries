/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '卡片',
    icon: 'card',
    description: '用于快速布局',
    group: "Container"
  })
  export class VanCardu extends ViewComponent {
    constructor(options?: Partial<VanCarduOptions>) {
      super();
    }
  }
  export class VanCarduOptions extends ViewComponentOptions {
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
    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '卡片宽度：像素或百分比'
    })
    private width: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '图片风格',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '方角'
        }, {
          title: '圆角'
        }]
      }
    })
    sr: 's' | 'r' = 'r';
    @Prop({
      group: '样式属性',
      title: '卡片阴影',
      setter: {
        concept: "SwitchSetter"
      }
    })
    shadow: nasl.core.Boolean = true;
    @Prop({
      group: '样式属性',
      title: '卡片边框',
      setter: {
        concept: "SwitchSetter"
      }
    })
    border: nasl.core.Boolean = true;
    @Prop({
      group: '样式属性',
      title: '分割线',
      setter: {
        concept: "SwitchSetter"
      }
    })
    split: nasl.core.Boolean = false;
    @Event({
      title: '点击后',
      description: '点击事件'
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
  }) => void;
    @Slot({
      title: 'undefined',
      description: '插入默认的元素'
    })
    slotDefault: () => Array<ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '插入图片'
    })
    slotCover: () => Array<ViewComponent>;

    @Slot({
      title: '组件插槽',
      description: '标题'
    })
    slotHead: () => Array<ViewComponent>;
  }


  @Component({
    title: '卡片组',
    description: '卡片组',
    group: "Container"
  })
  class VanCarduGroup extends ViewComponent {
    constructor(options?: Partial<VanCarduGroupOptions>) {
      super();
    }
  }
  class VanCarduGroupOptions extends ViewComponentOptions {
    @Prop({
      title: '标题',
      description: '卡片组的标题',
      implicitToString: true,
    })
    title: nasl.core.String;
    @Slot({
      title: 'undefined',
      description: '插入默认的元素'
    })
    slotDefault: () => Array<ViewComponent>;
    @Slot({
      title: 'undefined',
      description: '插入图片'
    })
    slotCover: () => Array<ViewComponent>;
  }
}
