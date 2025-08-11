/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      childAccept: "target.tag === 'van-col'",
      structured: true,
      displaySlotInline: {
        label: true,
      },
    },
  })
  @Component({
    title: '栅格布局',
    icon: 'row',
    description: '通过基础的 24 分栏，迅速简便地创建布局。',
    group: 'Layout',
  })
  export class VanRow extends ViewComponent {
    constructor(options?: Partial<VanRowOptions>) {
      super();
    }
  }

  export class VanRowOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '横轴对齐',
      description: '横轴对齐方式',
      setter: {
        concept: 'CapsulesSetter',
        options: [
          { title: '左对齐', icon: 'horizontal-justify-start', tooltip: '左对齐' },
          { title: '居中对齐', icon: 'horizontal-justify-center', tooltip: '居中对齐' },
          { title: '右对齐', icon: 'horizontal-justify-end', tooltip: '右对齐' },
          {
            title: '平均分布(两端不留空)',
            icon: 'horizontal-justify-space-between',
            tooltip: '平均分布(两端不留空)',
          },
          {
            title: '平均分布',
            icon: 'horizontal-justify-space-around',
            tooltip: '平均分布',
          },
        ],
      },
    })
    justify: 'start' | 'center' | 'end' | 'space-around' | 'space-between' = 'start';

    @Prop({
      group: '主要属性',
      title: '纵轴对齐',
      description: 'flex 布局下的纵轴对齐方式',
      setter: {
        concept: 'CapsulesSetter',
        options: [
          { title: '顶对齐', icon: 'horizontal-alignment-start', tooltip: '顶对齐' },
          { title: '垂直居中', icon: 'horizontal-alignment-center', tooltip: '垂直居中' },
          { title: '底对齐', icon: 'horizontal-alignment-end', tooltip: '底对齐' },
        ],
      },
    })
    align: 'top' | 'middle' | 'bottom' = 'top';

    @Prop({
      group: '主要属性',
      title: '列间隔',
      description: '列元素之间的间距（单位为 px）',
      setter: { concept: 'NumberInputSetter' },
    })
    gutter: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '标签',
      description: '标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'div';

    @Slot({
      title: '自定义默认内容',
      description: '自定义默认内容',
      emptyBackground: 'add-sub',
      snippets: [{ title: '列', code: '<van-col :span="8"></van-col>' }],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      slotInlineStyle: {
        default: 'min-width:auto',
      },
    },
  })
  @Component({
    title: '栅格列',
    icon: 'col',
    description: '',
    group: 'Layout',
  })
  export class VanCol extends ViewComponent {
    constructor(options?: Partial<VanColOptions>) {
      super();
    }
  }
  export class VanColOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '栅格占据的列数',
      description: '栅格占据的列数',
      setter: { concept: 'NumberInputSetter', min: 0, max: 24 },
    })
    span: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '栅格左侧的间隔格数',
      description: '栅格左侧的间隔格数',
      setter: { concept: 'NumberInputSetter', min: 0, max: 24 },
    })
    offset: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '标签',
      description: '标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'div';

    @Event({
      title: '点击栅格列',
      description: '点击栅格列时触发',
    })
    onClick: (event: { column: nasl.core.Integer }) => any;

    @Slot({
      title: '自定义默认内容',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
