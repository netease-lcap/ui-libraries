/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 12,
    // 配置这个，是让分割线内可以拖入tex文本 需要有对应的slot插槽
    ideusage: {
      idetype: 'container',
    },
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
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '分割方向',
      description: '设置分割线的方向',
      docDescription: '控制分割线的方向。水平：横向分割线，用于垂直分隔内容；垂直：纵向分割线，用于水平分隔内容。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '文案位置',
      description: '分割线文案的显示位置',
      docDescription: '设置分割线中文案的位置。左侧：文案靠左；右侧：文案靠右；中心：文案居中。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左侧' }, { title: '右侧' }, { title: '中心' }],
      },
    })
    contentPosition: 'left' | 'right' | 'center' = 'center';

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '边框样式',
      description: '设置分割线的边框样式',
      docDescription: '控制分割线的边框样式。实线：标准实线；虚线：方形虚线；圆点：圆点虚线；双实线：双层实线；以及各种3D效果样式。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '不显示' },
          { title: '圆点' },
          { title: '方形虚线' },
          { title: '实线' },
          { title: '双实线' },
          { title: '雕刻效果' },
          { title: '浮雕效果' },
          { title: '陷入效果' },
          { title: '突出效果' },
        ],
      },
    })
    borderStyle: 'none' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' = 'solid';

    @Slot({
      title: 'Default',
      description: '分割线内文案的内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
