/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    // 配置这个，是让分割线内可以拖入tex文本 需要有对应的slot插槽
    ideusage: {
      "idetype": "container",
      "structured": true,
      "selector": {
        "expression": "this",
        "cssSelector": "div[class='el-divider']"
      },
    }
  })
  @Component({
    title: '分割线',
    icon: 'divider',
    description: '区隔内容的分割线。',
    group: 'Display',
  })
  export class ElDivider extends ViewComponent {
    constructor(options?: Partial<ElDividerOptions>) {
      super();
    }
  }

  export class ElDividerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '分割线方向',
      description: '设置分割线方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '分割线文案的位置',
      description: '设置分割线文案的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左侧' }, { title: '右侧' }, { title: '中心' }],
      },
    })
    contentPosition: 'left' | 'right' | 'center' = 'center';

    @Slot({
      title: 'Default',
      description: '分割线内文案的内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
