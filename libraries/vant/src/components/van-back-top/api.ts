/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '返回顶部',
    icon: 'backtop',
    description: '返回顶部',
    group: 'Display',
  })
  export class VanBackTop extends ViewComponent {
    constructor(options?: Partial<VanBackTopOptions>) {
      super();
    }
  }

  export class VanBackTopOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '目标对象',
      description: '触发滚动的目标对象，支持传入选择器或 DOM 元素，默认最近的父级滚动容器',
      setter: { concept: 'InputSetter' },
    })
    target: nasl.core.Date | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右侧距离',
      description: '距离页面右侧的距离，默认单位为 px',
      setter: { concept: 'NumberInputSetter' },
    })
    right: nasl.core.Integer = 30;

    @Prop({
      group: '主要属性',
      title: '底部距离',
      description: '距离页面底部的距离，默认单位为 px',
      setter: { concept: 'NumberInputSetter' },
    })
    bottom: nasl.core.Integer = 40;

    @Prop({
      group: '主要属性',
      title: '滚动高度',
      description: '滚动高度达到此参数值时才显示组件，默认值为 200',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Integer = 200;

    @Prop({
      group: '主要属性',
      title: '展示层级',
      description: '和原生的 CSS 的 z-index 相同，改变 z 轴的顺序',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 100;

    @Prop({
      group: '主要属性',
      title: '瞬间滚动到顶部',
      description: '是否瞬间滚动到顶部',
      setter: { concept: 'SwitchSetter' },
    })
    immediate: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '挂载的节点',
      description: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setter: { concept: 'InputSetter' },
    })
    teleport: nasl.core.String = 'body';

    @Event({
      title: '点击',
      description: '点击组件时触发',
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
      title: 'default',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
