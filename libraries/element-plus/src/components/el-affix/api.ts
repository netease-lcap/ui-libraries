/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      style: [
        {
          selector: '.el-affix',
          declaration: 'min-height: 32px !important; width: 100% !important;',
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
    @Prop({
      group: '主要属性',
      title: '偏移量',
      description: '偏移量',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    offset: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '位置',
      description: '固钉位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '顶部' }, { title: '底部' }],
      },
    })
    position: 'top' | 'bottom' = 'top';

    // @Prop({
    //   group: '主要属性',
    //   title: '指定容器',
    //   description: '指定容器（CSS 选择器）',
    //   setter: { concept: 'InputSetter' },
    // })
    // target: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '展示层级',
      description: '和原生的 CSS 的 z-index 相同，改变 z 轴的顺序',
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
