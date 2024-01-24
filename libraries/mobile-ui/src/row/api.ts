/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '栅格布局',
    icon: 'row',
    description: '内部元素按照一定的规则布局',
    group: "Layout"
  })
  export class VanRow extends ViewComponent {
    constructor(options?: Partial<VanRowOptions>) {
      super();
    }
  }
  export class VanRowOptions extends ViewComponentOptions {
    @Prop<VanRowOptions, 'type'>({
      group: '样式属性',
      title: '布局模式',
      description: '设置布局模式',
      tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/030.%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '正常',
          icon: 'layout-block',
          tooltip: '块级布局'
        }, {
          title: '弹性布局',
          icon: 'layout-flex',
          tooltip: '弹性布局'
        }]
      }
    })
    type: '-' | 'flex' = 'flex';
    @Prop<VanRowOptions, 'justify'>({
      group: '样式属性',
      title: '横轴对齐',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '左对齐',
          icon: 'horizontal-justify-start',
          tooltip: '左对齐'
        }, {
          title: '居中对齐',
          icon: 'horizontal-justify-center',
          tooltip: '居中对齐'
        }, {
          title: '右对齐',
          icon: 'horizontal-justify-end',
          tooltip: '右对齐'
        }, {
          title: '平均分布(两端不留空)',
          icon: 'horizontal-justify-space-between',
          tooltip: '平均分布(两端不留空)'
        }, {
          title: '水平分布-左右留空',
          icon: 'horizontal-justify-space-around',
          tooltip: '平均分布'
        }]
      },
      if: _ => _.type === 'flex'
    })
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';
    @Prop<VanRowOptions, 'alignment'>({
      group: '样式属性',
      title: '纵轴对齐',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '顶对齐',
          icon: 'horizontal-alignment-start',
          tooltip: '顶对齐'
        }, {
          title: '垂直居中',
          icon: 'horizontal-alignment-center',
          tooltip: '垂直居中'
        }, {
          title: '底对齐',
          icon: 'horizontal-alignment-end',
          tooltip: '底对齐'
        }, {
          title: '行内文字基线对齐',
          icon: 'horizontal-alignment-baseline',
          tooltip: '行内文字基线对齐'
        }, {
          title: '占满容器高度',
          icon: 'horizontal-alignment-stretch',
          tooltip: '占满容器高度'
        }]
      },
      if: _ => _.type === 'flex'
    })
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'stretch';
    @Prop({
      group: '样式属性',
      title: '列间距',
      description: '列元素之间的间距，单位为 px。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '无（0）'
        }, {
          title: '小（10）'
        }, {
          title: '正常（20）'
        }, {
          title: '大（30）'
        }]
      }
    })
    gutter: '0' | '10' | '20' | '30' = '0';
    @Slot({
      title: 'undefined',
      description: '插入`<van-col>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '插入一列',
        code: '<van-col span="8"></van-col>'
      }]
    })
    slotDefault: () => Array<VanCol>;
  }
  @Component({
    title: '栅格列',
    description: '内部元素行内列布局',
    group: "Layout"
  })
  export class VanCol extends ViewComponent {
    constructor(options?: Partial<VanColOptions>) {
      super();
    }
  }
  export class VanColOptions extends ViewComponentOptions {
    @Prop<VanColOptions, 'direction'>({
      title: '主轴方向',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '横向排列',
          icon: 'flex-horizontal',
          tooltip: '横向'
        }, {
          title: '纵向排列',
          icon: 'flex-vertical',
          tooltip: '纵向'
        }]
      },
      if: _ => _.mode === 'flex',
      onChange: [{
        clear: ['justify', 'alignment']
      }]
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';
    @Prop<VanColOptions, '_justify'>({
      group: '主要属性',
      title: '横轴对齐',
      docDescription: '主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度。',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '左对齐',
          icon: 'horizontal-justify-start',
          tooltip: '左对齐'
        }, {
          title: '居中对齐',
          icon: 'horizontal-justify-center',
          tooltip: '居中对齐'
        }, {
          title: '右对齐',
          icon: 'horizontal-justify-end',
          tooltip: '右对齐'
        }, {
          title: '平均分布(两端不留空)',
          icon: 'horizontal-justify-space-between',
          tooltip: '平均分布(两端不留空)'
        }, {
          title: '平均分布',
          icon: 'horizontal-justify-space-around',
          tooltip: '平均分布'
        }]
      },
      if: _ => _.mode === 'flex' && _.direction === 'horizontal',
      onChange: [{
        update: {
          gap: 'normal'
        },
        if: _ => _ === 'space-between'
      }, {
        update: {
          gap: 'normal'
        },
        if: _ => _ === 'space-around'
      }]
    })
    _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';
    @Prop<VanColOptions, 'alignment'>({
      group: '主要属性',
      title: '纵轴对齐',
      docDescription: '主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '顶对齐',
          icon: 'horizontal-alignment-start',
          tooltip: '顶对齐'
        }, {
          title: '垂直居中',
          icon: 'horizontal-alignment-center',
          tooltip: '垂直居中'
        }, {
          title: '底对齐',
          icon: 'horizontal-alignment-end',
          tooltip: '底对齐'
        }, {
          title: '行内文字基线对齐',
          icon: 'horizontal-alignment-baseline',
          tooltip: '行内文字基线对齐'
        }, {
          title: '占满容器高度',
          icon: 'horizontal-alignment-stretch',
          tooltip: '占满容器高度'
        }]
      },
      if: _ => _.mode === 'flex' && _.direction === 'horizontal'
    })
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'stretch';
    @Prop<VanColOptions, '_alignment'>({
      group: '主要属性',
      title: '纵轴对齐',
      docDescription: '主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '左对齐',
          icon: 'vertical-alignment-start',
          tooltip: '左对齐'
        }, {
          title: '居中对齐',
          icon: 'vertical-alignment-center',
          tooltip: '居中对齐'
        }, {
          title: '右对齐',
          icon: 'vertical-alignment-end',
          tooltip: '右对齐'
        }, {
          title: '拉伸子元素充满整个父元素空间',
          icon: 'vertical-alignment-stretch',
          tooltip: '占满容器宽度'
        }]
      },
      if: _ => _.mode === 'flex' && _.direction === 'vertical'
    })
    _alignment: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
    @Prop<VanColOptions, 'justify'>({
      group: '主要属性',
      title: '横轴对齐',
      docDescription: '主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。 主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度。',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '顶对齐',
          icon: 'vertical-justify-start',
          tooltip: '顶对齐'
        }, {
          title: '垂直居中',
          icon: 'vertical-justify-center',
          tooltip: '垂直居中'
        }, {
          title: '底对齐',
          icon: 'vertical-justify-end',
          tooltip: '底对齐'
        }, {
          title: '平均分布(两端不留空)',
          icon: 'vertical-justify-space-between',
          tooltip: '平均分布(两端不留空)'
        }, {
          title: '平均分布',
          icon: 'vertical-justify-space-around',
          tooltip: '平均分布'
        }]
      },
      if: _ => _.mode === 'flex' && _.direction === 'vertical',
      onChange: [{
        update: {
          gap: 'normal'
        },
        if: _ => _ === 'space-between'
      }, {
        update: {
          gap: 'normal'
        },
        if: _ => _ === 'space-around'
      }]
    })
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';
    @Prop<VanColOptions, 'wrap'>({
      title: '是否换行',
      description: '弹性布局下子元素总宽度超出父级时子元素是否换行展示',
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.mode === 'flex'
    })
    wrap: nasl.core.Boolean = true;
    @Prop<VanColOptions, 'gap'>({
      title: '内容间隙',
      description: '内容块间隙大小',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '收缩'
        }, {
          title: '无'
        }, {
          title: '小'
        }, {
          title: '正常'
        }, {
          title: '大'
        }]
      },
      if: _ => _.mode === 'flex' && _.justify !== 'space-between' && _.justify !== 'space-around'
    })
    gap: 'shrink' | 'none' | 'small' | 'normal' | 'large' = 'normal';
    @Prop<VanColOptions, 'span'>({
      group: '主要属性',
      title: '占据列数',
      description: '栅格列宽度，栅格行最大为24列。',
      setter: {
        concept: "NumberInputSetter",
        min: 1,
        max: 24,
        precision: 0
      }
    })
    span: nasl.core.Integer = 1;
    @Prop<VanColOptions, 'offset'>({
      group: '主要属性',
      title: '偏移数',
      description: '栅格列向右偏移列数',
      setter: {
        concept: "NumberInputSetter",
        precision: 0
      }
    })
    offset: nasl.core.Integer = 0;
    @Prop<VanColOptions, 'mode'>({
      group: '主要属性',
      title: '布局模式',
      description: '设置布局模式',
      tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/030.%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '块级',
          icon: 'layout-inline-block',
          tooltip: '内联布局'
        }, {
          title: '弹性',
          icon: 'layout-flex',
          tooltip: '弹性布局'
        }]
      },
      onChange: [{
        clear: ['justify', 'alignment', 'wrap', 'gap']
      }]
    })
    mode: 'inline' | 'flex' = 'inline';
    @Slot({
      title: 'undefined',
      description: '插入需要布局的元素。'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
