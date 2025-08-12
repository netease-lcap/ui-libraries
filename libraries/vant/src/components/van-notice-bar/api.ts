/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      style: [
        {
          selector: '.van-notice-bar__content',
          declaration: 'transition-timing-function: linear !important; animation-duration: 2s !important;',
        },
      ],
      additionalAttribute: {
        ":isDesigner": "\"true\"",
      },
    },
  })
  @Component({
    title: '通知栏',
    icon: 'notice-bar',
    description: '用于循环播放展示一组消息通知。',
    group: 'Display',
  })
  export class VanNoticeBar extends ViewComponent {
    @Event({
      title: '重置通知栏到初始状态',
      description: '重置通知栏到初始状态',
    })
    reset: () => void;

    constructor(options?: Partial<VanNoticeBarOptions>) {
      super();
    }
  }

  export class VanNoticeBarOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '模式',
      description: '通知栏模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '普通', value: '' },
          { title: '可关闭', value: 'closeable' },
          { title: '链接', value: 'link' },
        ],
      },
    })
    mode: '' | 'closeable' | 'link' = '';

    @Prop({
      group: '样式属性',
      title: '文本颜色',
      description: '通知栏文本颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#ed6a0c';

    @Prop({
      group: '样式属性',
      title: '滚动条背景',
      description: '滚动条背景',
      setter: { concept: 'InputSetter' },
    })
    background: nasl.core.String = '#fffbe8';

    @Prop({
      group: '主要属性',
      title: '动画延迟',
      description: '动画延迟时间（秒）',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    delay: nasl.core.Integer | nasl.core.String = 1;

    @Prop({
      group: '主要属性',
      title: '滚动速率',
      description: '滚动速率（px/s）',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    speed: nasl.core.Integer | nasl.core.String = 60;

    @Prop({
      group: '主要属性',
      title: '开启滚动',
      description: '是否开启滚动播放，内容长度溢出时默认开启',
      setter: { concept: 'SwitchSetter' },
    })
    scrollable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '多行展示',
      description: '是否开启文本换行，仅在禁用滚动时生效',
      setter: { concept: 'SwitchSetter' },
    })
    wrapable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '左侧图标',
      description: '左侧图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    leftIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右侧图标',
      description: '右侧图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    rightIcon: nasl.core.String;

    @Event({
      title: '点击通知栏',
      description: '点击通知栏时触发',
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
      title: '关闭通知栏',
      description: '关闭通知栏时触发',
    })
    onClose: (event: {
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
      title: '重新播放',
      description: '每当滚动栏重新开始滚动时触发',
    })
    onReplay: () => void;

    @Slot({
      title: '默认',
      description: '通知文本内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
