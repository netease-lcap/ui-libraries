/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      style: [
        {
          selector: '.el-affix',
          declaration: 'min-height: 32px; width: 100% ',
          append: true,
        },
      ],
    },
  })
  @Component({
    title: '固钉',
    icon: 'affix',
    description: '将页面元素固定在特定可视区域',
    group: 'Navigation',
  })
  export class ElAffix extends ViewComponent {
    constructor(options?: Partial<ElAffixOptions>) {
      super();
    }
  }

  export class ElAffixOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '固定位置',
      description: '选择固钉的固定位置',
      docDescription: '控制元素固定的位置。顶部：固定在页面顶部；底部：固定在页面底部。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '顶部' }, { title: '底部' }],
      },
    })
    position: 'top' | 'bottom' = 'top';

    @Prop({
      group: '主要属性',
      title: '偏移距离',
      description: '固定时距离边界的偏移距离',
      docDescription: '设置元素固定时距离容器边界的偏移距离，单位为像素。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    offset: nasl.core.Integer = 0;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '显示层级',
      description: '固定时的z-index层级',
      docDescription: '设置元素固定时的z-index值，控制元素的显示层级。数值越大，元素越靠前显示。',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 100;

    @Event({
      title: '改变时触发的事件',
      description: '改变时触发的事件',
    })
    onChange: (fixed: nasl.core.Boolean) => void;

    @Event({
      title: '滚动时触发的事件',
      description: '滚动时触发的事件',
    })
    onScroll: (value: { scrollTop: nasl.core.Decimal; fixed: nasl.core.Boolean }) => void;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
