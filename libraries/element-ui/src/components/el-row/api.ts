/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: "container",
      childAccept: "target.tag === 'el-col'",
      structured: true
    }
  })
  @Component({
    title: '栅格布局',
    icon: 'row',
    description: '通过基础的 24 分栏，迅速简便地创建布局。',
    group: 'Layout',
  })
  export class ElRow extends ViewComponent {
    constructor(options?: Partial<ElRowOptions>) {
      super();
    }
  }

  export class ElRowOptions extends ViewComponentOptions {

    @Prop({
      group: '主要属性',
      title: '布局模式',
      description: '布局模式，可选 flex，现代浏览器下有效',
      setter: {
        concept: 'CapsulesSetter',
        options: [{ title: '默认布局', icon: 'layout-block', tooltip: '块级布局' }, { title: '弹性', icon: 'layout-flex', tooltip: '弹性布局' }],
      },
      onChange: [
        { clear: ['align', 'justify'] }
      ],
      tabKind: 'style'
    })
    type: 'block' | 'flex' = 'block';

    @Prop<ElRowOptions, 'justify'>({
      group: '主要属性',
      title: '横轴对齐',
      description: 'flex 布局下的横轴对齐方式',
      setter: {
        concept: 'CapsulesSetter',
        options: [
            { title: '左对齐', icon: 'horizontal-justify-start', tooltip: '左对齐' },
            { title: '居中对齐', icon: 'horizontal-justify-center', tooltip: '居中对齐' },
            { title: '右对齐', icon: 'horizontal-justify-end', tooltip: '右对齐' },
            {
              title: '平均分布(两端不留空)',
              icon: 'horizontal-justify-space-between',
              tooltip: '平均分布(两端不留空)' ,
            },
            {
              title: '平均分布',
              icon: 'horizontal-justify-space-around',
              tooltip: '平均分布',
            }
        ],
      },
      if: _ => _.type === 'flex',
      tabKind: 'style',
    })
    justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' = 'start';

    @Prop<ElRowOptions, 'align'>({
      group: '主要属性',
      title: '纵轴对齐',
      description: 'flex 布局下的纵轴对齐方式',
      setter: {
          concept: 'CapsulesSetter',
          options: [{ title: '顶对齐', icon: 'horizontal-alignment-start', tooltip: '顶对齐' }, { title: '垂直居中', icon: 'horizontal-alignment-center', tooltip: '垂直居中' }, { title: '底对齐', icon: 'horizontal-alignment-end', tooltip: '底对齐' }],
      },
      if: _ => _.type === 'flex',
      tabKind: 'style',
    })
    align: 'top' | 'middle' | 'bottom' = 'top';

    @Prop({
      group: '主要属性',
      title: '列间隔',
      description: '列间隔',
      setter: { concept: 'NumberInputSetter' },
      tabKind: 'style',
    })
    gutter: nasl.core.Decimal | nasl.core.Integer = 0;

    @Slot({
      title: '自定义默认内容',
      description: '自定义默认内容',
      emptyBackground: 'add-sub',
      snippets: [{ title: '列', code: '<el-col :span="1"></el-col>' }],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '栅格列',
    icon: 'col',
    description: '',
    group: 'Layout',
  })
  export class ElCol extends ViewComponent {
    constructor(options?: Partial<ElColOptions>) {
      super();
    }
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: "container",
      parentAccept: "target.tag === 'el-row'",
      slotInlineStyle: {
        default: "min-width:auto"
      }
    }
  })
  export class ElColOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '栅格占据的列数',
      description: '栅格占据的列数',
      setter: { concept: 'NumberInputSetter' },
    })
    span: nasl.core.Decimal | nasl.core.Integer = 24;

    @Prop({
      group: '主要属性',
      title: '栅格左侧的间隔格数',
      description: '栅格左侧的间隔格数',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '栅格向右移动格数',
      description: '栅格向右移动格数',
      setter: { concept: 'NumberInputSetter' },
    })
    push: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '栅格向左移动格数',
      description: '栅格向左移动格数',
      setter: { concept: 'NumberInputSetter' },
    })
    pull: nasl.core.Decimal | nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: 'Xs栅格占据的列数',
      description: '`<768px` 响应式栅格占据的列数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    xsSpan: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Xs左侧的间隔格数',
      description: '`<768px` 响应式栅格左侧的间隔格数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    xsOffset: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Sm栅格占据的列数',
      description: '`≥768px` 响应式栅格占据的列数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    smSpan: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Sm左侧的间隔格数',
      description: '`≥768px` 响应式栅格左侧的间隔格数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    smOffset: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Md栅格占据的列数',
      description: '`≥992px` 响应式栅格占据的列数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    mdSpan: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Md左侧的间隔格数',
      description: '`≥992px` 响应式栅格左侧的间隔格数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    mdOffset: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Lg栅格占据的列数',
      description: '`≥1200px` 响应式栅格占据的列数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    lgSpan: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Lg左侧的间隔格数',
      description: '`≥1200px` 响应式栅格左侧的间隔格数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    lgOffset: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Xl栅格占据的列数',
      description: '`≥1920px` 响应式栅格占据的列数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    xlSpan: nasl.core.Decimal | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'Xl左侧的间隔格数',
      description: '`≥1920px` 响应式栅格左侧的间隔格数',
      setter: {
        concept: 'NumberInputSetter',
        max: 24,
      },
    })
    xlOffset: nasl.core.Decimal | nasl.core.Integer;

    @Event({
      title: '点击栅格列',
      description: '点击栅格列时触发',
    })
    onClick: (event: {
        column: nasl.core.Integer;
    }) => any;

    @Slot({
      title: '自定义默认内容',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
