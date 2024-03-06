/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '栅格行',
    description: '内部元素按照一定的规则布局',
    icon: 'grid-layout',
    group: 'Layout',
  })
  export class Row extends ViewComponent {
    constructor(options?: Partial<RowOptions>) {
      super();
    }
  }

  export class RowOptions extends ViewComponentOptions {
    @Prop<RowOptions, 'justify'>({
      group: '主要属性',
      title: '横轴对齐',
      docDescription: '支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。',
      bindHide: true,
      setter: {
        concept: 'CapsulesSetter',
        options: [
          { title: '左对齐', icon: 'horizontal-justify-start', tooltip: '左对齐' },
          { title: '居中对齐', icon: 'horizontal-justify-center', tooltip: '居中对齐' },
          { title: '右对齐', icon: 'horizontal-justify-end', tooltip: '右对齐' },
          { title: '平均分布(两端不留空)', icon: 'horizontal-justify-space-between', tooltip: '平均分布(两端不留空)' },
          { title: '水平分布-左右留空', icon: 'horizontal-justify-space-around', tooltip: '平均分布' },
        ],
      },
    })
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

    @Prop<RowOptions, 'align'>({
      group: '主要属性',
      title: '纵轴对齐',
      docDescription: '支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。',
      bindHide: true,
      setter: {
        concept: 'CapsulesSetter',
        options: [
          { title: '顶对齐', icon: 'horizontal-alignment-start', tooltip: '顶对齐' },
          { title: '垂直居中', icon: 'horizontal-alignment-center', tooltip: '垂直居中' },
          { title: '底对齐', icon: 'horizontal-alignment-end', tooltip: '底对齐' },
          { title: '行内文字基线对齐', icon: 'horizontal-alignment-baseline', tooltip: '行内文字基线对齐' },
          { title: '占满容器高度', icon: 'horizontal-alignment-stretch', tooltip: '占满容器高度' },
        ],
      },
    })
    align: 'top' | 'middle' | 'bottom' | 'stretch' | 'stretch' = 'stretch';

    // @Prop<RowOptions, 'gutter'>({
    //   group: '主要属性',
    //   title: '栅格数',
    //   description: '默认24，可设置栅格行大小',
    //   docDescription: '支持设置栅格行大小，默认为24。',
    //   setter: {
    //     concept: 'NumberInputSetter',
    //     min: 1,
    //     max: 24,
    //   },
    // })
    // gutter: nasl.core.Decimal = 12;

    @Prop({
      group: '样式属性',
      title: '栅格水平间隔',
      description: '栅格列之间的间隔',
      docDescription: '栅格列之间的间隔，支持无（0）、迷你（4）、小（8）、正常（16）、巨大（32）共6种间隔模式。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    gutterJustify: nasl.core.Decimal = 0;

    @Prop({
      group: '样式属性',
      title: '栅格垂直间隔',
      description: '栅格列之间的间隔',
      docDescription: '栅格列之间的间隔，支持无（0）、迷你（4）、小（8）、正常（16）、巨大（32）共6种间隔模式。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    gutterAlign: nasl.core.Decimal = 0;

    @Prop<RowOptions, 'wrap'>({
      group: '主要属性',
      title: '是否自动换行',
      description: '设置弹性布局下子元素总宽度超出父级时子元素是否换行展示',
      docDescription: '支持控制弹性布局模式下，子元素总宽度超过父级时是否换行展示，默认开启。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    wrap: nasl.core.Boolean = true;

    @Slot({
      title: 'undefined',
      description: '插入`<Col>`子组件。',
      snippets: [
        {
          title: '插入一列',
          code: '<Col span={4}></Col>',
        },
      ],
    })
    slotDefault: () => Array<Col>;
  }

  @Component({
    title: '栅格列',
    description: '内部元素行内列布局',
  })
  export class Col extends ViewComponent {
    constructor(options?: Partial<ColOptions>) {
      super();
    }
  }

  export class ColOptions extends ViewComponentOptions {
    @Prop({
      title: '响应超大屏',
      description: '响应式布局`≥ ≥ 1600px`的列跨越栅格数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private xxl: nasl.core.Decimal;

    @Prop({
      title: '响应很大屏',
      description: '响应式布局`≥ 1200px`的列跨越栅格数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private xl: nasl.core.Decimal;

    @Prop({
      title: '响应大屏',
      description: '响应式布局`≥ 992px`的列跨越栅格数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private lg: nasl.core.Decimal;

    @Prop({
      title: '响应中屏',
      description: '响应式布局`≥ 768px`的列跨越栅格数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private md: nasl.core.Decimal;

    @Prop({
      title: '响应小屏',
      description: '响应式布局`≥ 576px`的列跨越栅格数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private sm: nasl.core.Decimal;

    @Prop({
      title: '响应迷你屏',
      description: '响应式布局`<=576px`的列跨越栅格数',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private xs: nasl.core.Decimal;

    @Prop<ColOptions, 'flex'>({
      group: '主要属性',
      title: '项目放大比例',
      // tooltipLink:
      //   'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/030.%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html',
      docDescription: '存在剩余空间时项目的放大比例,为0时存在剩余空间也不放大',
      bindHide: true,
      setter: {
        concept: 'NumberInputSetter',
      },
      // onChange: [{ clear: ['justify', 'alignment', 'wrap', 'gap'] }],
    })
    flex: string | number;

    // @Prop<ColOptions, 'direction'>({
    //   group: '主要属性',
    //   title: '主轴方向',
    //   docDescription: '横向：内部子元素进行横向排布，建议内部子元素使用行内布局。纵向：内部子元素进行纵向排布，建议内部子元素使用块级布局。',
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       { title: '横向排列', icon: 'flex-horizontal', tooltip: '横向' },
    //       { title: '纵向排列', icon: 'flex-vertical', tooltip: '纵向' },
    //     ],
    //   },
    //   if: (_) => _.mode === 'flex',
    //   onChange: [{ clear: ['justify', 'alignment'] }],
    // })
    // direction: 'horizontal' | 'vertical' = 'horizontal';

    // @Prop<ColOptions, '_justify'>({
    //   group: '主要属性',
    //   title: '横轴对齐',
    //   docDescription: '主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度。',
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       { title: '左对齐', icon: 'horizontal-justify-start', tooltip: '左对齐' },
    //       { title: '居中对齐', icon: 'horizontal-justify-center', tooltip: '居中对齐' },
    //       { title: '右对齐', icon: 'horizontal-justify-end', tooltip: '右对齐' },
    //       { title: '平均分布(两端不留空)', icon: 'horizontal-justify-space-between', tooltip: '平均分布(两端不留空)' },
    //       { title: '平均分布', icon: 'horizontal-justify-space-around', tooltip: '平均分布' },
    //     ],
    //   },
    //   if: (_) => _.mode === 'flex' && _.direction === 'horizontal',
    //   onChange: [
    //     { update: { gap: 'normal' }, if: (_) => _ === 'space-between' },
    //     { update: { gap: 'normal' }, if: (_) => _ === 'space-around' },
    //   ],
    // })
    // _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

    // @Prop<ColOptions, 'alignment'>({
    //   group: '主要属性',
    //   title: '纵轴对齐',
    //   docDescription: '主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。',
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       { title: '顶对齐', icon: 'horizontal-alignment-start', tooltip: '顶对齐' },
    //       { title: '垂直居中', icon: 'horizontal-alignment-center', tooltip: '垂直居中' },
    //       { title: '底对齐', icon: 'horizontal-alignment-end', tooltip: '底对齐' },
    //       { title: '行内文字基线对齐', icon: 'horizontal-alignment-baseline', tooltip: '行内文字基线对齐' },
    //       { title: '占满容器高度', icon: 'horizontal-alignment-stretch', tooltip: '占满容器高度' },
    //     ],
    //   },
    //   if: (_) => _.mode === 'flex' && _.direction === 'horizontal',
    // })
    // alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'stretch';

    // @Prop<ColOptions, '_alignment'>({
    //   group: '主要属性',
    //   title: '纵轴对齐',
    //   docDescription: '主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。',
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       { title: '左对齐', icon: 'vertical-alignment-start', tooltip: '左对齐' },
    //       { title: '居中对齐', icon: 'vertical-alignment-center', tooltip: '居中对齐' },
    //       { title: '右对齐', icon: 'vertical-alignment-end', tooltip: '右对齐' },
    //       { title: '拉伸子元素充满整个父元素空间', icon: 'vertical-alignment-stretch', tooltip: '占满容器宽度' },
    //     ],
    //   },
    //   if: (_) => _.mode === 'flex' && _.direction === 'vertical',
    // })
    // _alignment: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

    // @Prop<ColOptions, 'justify'>({
    //   group: '主要属性',
    //   title: '横轴对齐',
    //   docDescription: '主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。 主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度。',
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       { title: '顶对齐', icon: 'vertical-justify-start', tooltip: '顶对齐' },
    //       { title: '垂直居中', icon: 'vertical-justify-center', tooltip: '垂直居中' },
    //       { title: '底对齐', icon: 'vertical-justify-end', tooltip: '底对齐' },
    //       { title: '平均分布(两端不留空)', icon: 'vertical-justify-space-between', tooltip: '平均分布(两端不留空)' },
    //       { title: '平均分布', icon: 'vertical-justify-space-around', tooltip: '平均分布' },
    //     ],
    //   },
    //   if: (_) => _.mode === 'flex' && _.direction === 'vertical',
    //   onChange: [
    //     { update: { gap: 'normal' }, if: (_) => _ === 'space-between' },
    //     { update: { gap: 'normal' }, if: (_) => _ === 'space-around' },
    //   ],
    // })
    // justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

    @Prop<ColOptions, 'span'>({
      group: '主要属性',
      title: '占据栅格数',
      description: '列占据栅格行的栅格数',
      docDescription: '支持设置当前栅格列占据的栅格数，不能超过当前栅格行栅格数。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    span: nasl.core.Decimal = 1;

    @Prop<ColOptions, 'offset'>({
      group: '主要属性',
      title: '偏移栅格数',
      description: '列偏移的栅格数',
      docDescription: '支持设置栅格列偏移数，控制当前栅格列与其左侧栅格列的距离，处于当前栅格列右侧的栅格列也会同步偏移。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    offset: nasl.core.Decimal = 0;

    @Prop<ColOptions, 'pull'>({
      group: '主要属性',
      title: '左移动栅格数',
      description: '列向左移动的栅格数',
      docDescription: '向左移动的栅格数，支持栅格互相重合。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    pull: nasl.core.Decimal = 0;

    @Prop<ColOptions, 'push'>({
      group: '主要属性',
      title: '右移动栅格数',
      description: '列向右移动的栅格数',
      docDescription: '向右移动的栅格数，支持栅格互相重合。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    push: nasl.core.Decimal = 0;

    @Prop<ColOptions, 'order'>({
      group: '主要属性',
      title: '栅格顺序	',
      description: '栅格顺序',
      docDescription: '栅格顺序	',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    order: nasl.core.Decimal = 0;
    // @Prop<ColOptions, 'wrap'>({
    //   group: '主要属性',
    //   title: '换行',
    //   description: '设置弹性布局下子元素总宽度超出父级时子元素是否换行展示',
    //   docDescription: '支持控制弹性布局模式下，子元素总宽度超过父级时是否换行展示，默认开启。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    //   if: (_) => _.mode === 'flex',
    // })
    // wrap: nasl.core.Boolean = true;

    // @Prop<ColOptions, 'gap'>({
    //   group: '样式属性',
    //   title: '内容间隙',
    //   description: '内容块间隙大小',
    //   docDescription: '布局内各个组件之间的间隔，通常有收缩、无、小、正常、大，默认为正常。',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '收缩' }, { title: '无' }, { title: '小' }, { title: '正常' }, { title: '大' }],
    //   },
    //   if: (_) => _.mode === 'flex' && _.justify !== 'space-between' && _.justify !== 'space-around',
    // })
    // gap: 'shrink' | 'none' | 'small' | 'normal' | 'large' = 'normal';

    // @Event({
    //   title: '响应窗口变化时',
    //   description: '响应式布局引发栅格变化时触发',
    // })
    // onResponsive: (event: any) => any;

    @Slot({
      title: 'undefined',
      description: '插入需要布局的元素。',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
