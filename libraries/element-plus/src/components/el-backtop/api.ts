/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      elementSutando: {
        condition: true,
        component: 'ElBacktopDesigner',
      },
      isOverMask: true,
    },
  })
  @Component({
    title: '回到顶部',
    icon: 'backtop',
    description: '回到顶部',
    group: 'Navigation',
  })
  export class ElBacktop extends ViewComponent {
    constructor(options?: Partial<ElBacktopOptions>) {
      super();
    }
  }

  export class ElBacktopOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '滚动容器',
      description: '触发滚动的容器元素',
      docDescription: '设置触发滚动的容器元素，可以是CSS选择器字符串。',
      setter: { concept: 'InputSetter' },
    })
    private target: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '显示阈值',
      description: '滚动多少高度后显示按钮',
      docDescription: '设置页面滚动高度达到此值后才显示回到顶部按钮，单位为像素。',
      setter: { concept: 'InputSetter' },
    })
    visibilityHeight: nasl.core.Integer = 200;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '右边距',
      description: '按钮距离页面右边的距离',
      docDescription: '设置回到顶部按钮距离页面右边的距离，单位为像素。',
      setter: { concept: 'InputSetter' },
    })
    right: nasl.core.Integer = 40;

    @Prop({
      group: '样式属性',
      title: '底部距离',
      description: '按钮距离页面底部的距离',
      docDescription: '设置回到顶部按钮距离页面底部的距离，单位为像素。',
      setter: { concept: 'InputSetter' },
    })
    bottom: nasl.core.Integer = 40;

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
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
    }) => any;
  }
}