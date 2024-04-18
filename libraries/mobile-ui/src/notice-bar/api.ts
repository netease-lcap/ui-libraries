/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '通知栏',
    icon: 'notice-bar',
    description: '用于循环播放展示一组消息通知。',
    group: "Display"
  })
  export class VanNoticeBar extends ViewComponent {
    constructor(options?: Partial<VanNoticeBarOptions>) {
      super();
    }
  }
  export class VanNoticeBarOptions extends ViewComponentOptions {
    @Prop({
      title: '通知文本内容',
      description: '通知文本内'
    })
    private text: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '类型',
      description: '设置通知栏类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '可关闭'
        }, {
          title: '链接'
        }, {
          title: '普通'
        }]
      }
    })
    mode: 'closeable' | 'link' | 'normal' = 'normal';
    @Prop({
      group: '主要属性',
      title: '开启滚动播放',
      setter: {
        concept: "SwitchSetter"
      }
    })
    scrollable: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '开启文本换行',
      description: '关闭滚动播放时该属性即可生效',
      setter: {
        concept: "SwitchSetter"
      }
    })
    wrapable: nasl.core.Boolean = false;
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
      title: '点击通知栏时触发',
      description: '点击通知栏时触发'
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
    @Event({
      title: '关闭通知栏时触发',
      description: '关闭通知栏时触发'
    })
    onClose: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '点击链接',
      description: '点击链接'
    })
    onRout: (event: nasl.ui.BaseEvent) => void;
    @Slot({
      title: 'undefined',
      description: '文本插槽'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
