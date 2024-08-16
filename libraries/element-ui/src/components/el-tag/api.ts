/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '标签',
    icon: 'label',
    description: '用于标记和选择。',
    group: 'Display',
  })
  export class ElTag extends ViewComponent {
    constructor(options?: Partial<ElTagOptions>) {
      super();
    }
  }

  export class ElTagOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '标签内容',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: 'type属性，可选择标签的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '成功' },
          { title: '普通' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    type: '' | 'success' | 'info' | 'warning' | 'danger';

    @Prop({
      group: '主要属性',
      title: '背景色',
      description: 'color属性，可以设置标签背景色',
      setter: {
        concept: 'InputSetter'
      },
    })
    color: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: 'size属性，用于设置标签尺寸大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认标签' },
          { title: '中等标签' },
          { title: '小型标签' },
          { title: '超小标签' }
        ],
      },
    })
    size: '' | 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: '主题',
      description: 'effect属性，用于设置标签主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'dark' },
          { title: 'light' },
          { title: 'plain' }
        ],
      },
    })
    effect: 'dark' | 'light' | 'plain' = 'light';

    @Prop({
      group: '交互属性',
      title: '是否有边框描边',
      description: 'hit属性，是否有边框描边',
      setter: { concept: 'SwitchSetter' },
    })
    hit: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '是否添加移除图标',
      description: 'closable属性，是否添加移除图标',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '是否禁用渐变动画',
      description: 'disable-transitions属性，是否禁用渐变动画',
      setter: { concept: 'SwitchSetter' },
    })
    disableTransitions: nasl.core.Boolean = false;

    @Event({
      title: '点击',
      description: '点击 Tag 时触发的事件',
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
      title: '关闭',
      description: '关闭 Tag 时触发的事件',
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
  }
}
