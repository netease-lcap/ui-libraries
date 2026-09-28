/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      "idetype": "container",
    }
  })
  @Component({
    title: '公告',
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
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '公告类型',
      description: '选择公告的类型主题',
      docDescription: '控制公告的类型和主题色。成功：绿色主题；警告：橙色主题；提示：蓝色主题；错误：红色主题。',
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
      title: '显示图标',
      description: '是否显示类型图标',
      docDescription: '开启后，会在公告左侧显示对应类型的图标，增强视觉识别。',
      setter: { concept: 'SwitchSetter' },
    })
    showIcon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '文字居中',
      description: '文字内容是否居中显示',
      docDescription: '开启后，公告的文字内容会居中显示。',
      setter: { concept: 'SwitchSetter' },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '关闭文本',
      description: '自定义关闭按钮的文本',
      docDescription: '设置自定义的关闭按钮文本，默认显示关闭图标。设置后会显示文字而不是图标。',
      setter: { concept: 'InputSetter' },
    })
    closeText: nasl.core.String;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '可关闭',
      description: '是否可以关闭公告',
      docDescription: '开启后，公告右侧会显示关闭按钮，用户可以手动关闭公告。',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = true;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '主题风格',
      description: '选择公告的主题风格',
      docDescription: '控制公告的主题风格。浅色：浅色背景；深色：深色背景。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '浅色' }, { title: '深色' }],
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