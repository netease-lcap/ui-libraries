/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "selector": {
        "expression": "this",
        "cssSelector": "div[class='el-alert']"
      }
    }
  })
  @Component({
    title: '警告',
    icon: 'alert',
    description: '用于页面中展示重要的提示信息。',
    group: 'Display',
  })
  export class ElAlert extends ViewComponent {
    constructor(options?: Partial<ElAlertOptions>) {
      super();
    }
  }

  export class ElAlertOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '成功' },
          { title: '警告' },
          { title: '提示' },
          { title: '错误' },
        ],
      },
    })
    type: 'success' | 'warning' | 'info' | 'error' = 'info';

    @Prop({
      group: '主要属性',
      title: '描述',
      description: '辅助性文字。也可通过默认 slot 传入',
      setter: { concept: 'InputSetter' },
    })
    description: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否可以关闭',
      description: '是否可关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '文字是否居中',
      description: '文字是否居中',
      setter: { concept: 'SwitchSetter' },
    })
    center: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '关闭按钮自定义文本',
      description: '关闭按钮自定义文本',
      setter: { concept: 'InputSetter' },
    })
    closeText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否显示图标',
      description: '是否显示图标',
      setter: { concept: 'SwitchSetter' },
    })
    showIcon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '主题',
      description: '选择提供的主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'light' }, { title: 'dark' }],
      },
    })
    effect: 'light' | 'dark' = 'light';

    @Event({
      title: '关闭alert时触发的事件',
      description: '关闭alert时触发的事件',
    })
    onClose: (event: {}) => any;

    @Slot({
      title: '描述',
      description: '描述',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '标题的内容',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
