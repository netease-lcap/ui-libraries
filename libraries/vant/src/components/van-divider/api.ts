/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 12,
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
  export class VanDivider extends ViewComponent {
    constructor(options?: Partial<VanDividerOptions>) {
      super();
    }
  }

  export class VanDividerOptions extends ViewComponentOptions {
    // HACK: 文档中没有提到 direction, 文档中用 boolean vertical=true 表示“竖直”，false（默认）即水平
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
      //TODO: 文档中是 content-position，但是这里却是 contentPosition,
      // 且但官方只支持 left/right（默认 center），这里多了 center 选项
      group: '主要属性',
      title: '分割线文案的位置',
      description: '设置分割线文案的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左侧' }, { title: '右侧' }, { title: '中心' }],
      },
    })
    contentPosition: 'left' | 'right' | 'center' = 'center';

    @Prop({
      group: '主要属性',
      title: '虚线',
      description: '是否使用虚线',
      setter: { concept: 'SwitchSetter' },
    })
    dashed: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '细线',
      description: '是否使用细线',
      setter: { concept: 'SwitchSetter' },
    })
    hairline: nasl.core.Boolean = true;

    @Prop({
      //HUSK: 文档中没有提到 content
      group: '主要属性',
      title: '内容',
      description: '分割线内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String;

    @Prop({
      //HUSK: 文档中没有提到 color
      group: '样式属性',
      title: '颜色',
      description: '分割线颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#dcdee0';

    @Prop({
      //HUSK: 文档中没有提到 fontSize
      group: '样式属性',
      title: '字体大小',
      description: '文字字体大小',
      setter: { concept: 'InputSetter' },
    })
    fontSize: nasl.core.String = '14px';

    @Prop({
      //HUSK: 文档中没有提到 borderStyle
      group: '样式属性',
      title: '边框样式',
      description: '边框样式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '实线' }, { title: '虚线' }, { title: '点线' }],
      },
    })
    borderStyle: 'solid' | 'dashed' | 'dotted' = 'solid';

    @Prop({
      //HUSK: 文档中没有提到 marginLeft
      group: '主要属性',
      title: '左边距',
      description: '左边距',
      setter: { concept: 'InputSetter' },
    })
    marginLeft: nasl.core.String = '16px';

    @Prop({
      //HUSK: 文档中没有提到 marginRight
      group: '主要属性',
      title: '右边距',
      description: '右边距',
      setter: { concept: 'InputSetter' },
    })
    marginRight: nasl.core.String = '16px';

    @Slot({
      title: 'Default',
      description: '分割线内文案的内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
} 