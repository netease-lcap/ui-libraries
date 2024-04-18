/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '线性布局',
    icon: 'linear-layout',
    description: '内部元素按照一定的规则布局',
    group: "Layout"
  })
  export class VanLinearLayout extends ViewComponent {
    constructor(options?: Partial<VanLinearLayoutOptions>) {
      super();
    }
    @Method({
      title: '打开加载中',
      description: '打开加载中'
    })
    openLoading(): any {}
    @Method({
      title: '关闭加载中',
      description: '关闭加载中'
    })
    closeLoading(): any {}
  }
  export class VanLinearLayoutOptions extends ViewComponentOptions {
    @Prop({
      title: '展示方式',
      description: '行内展示，或块级换行展示',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '行内'
        }, {
          title: '块级'
        }]
      }
    })
    private display: 'inline' | 'block' = 'block';
    @Prop<VanLinearLayoutOptions, 'gap'>({
      group: '主要属性',
      title: '内容间隙',
      description: '内容块间隙大小',
      tabKind: 'style',
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
        }, {
          title: '默认'
        }]
      },
      if: _ => _.justify !== 'space-between' && _.justify !== 'space-around'
    })
    gap: 'shrink' | 'none' | 'mini' | 'small' | 'large' | 'normal' = 'normal';
    @Prop<VanLinearLayoutOptions, 'layout'>({
      group: '主要属性',
      title: '子元素展示方式',
      description: '设置子元素行内展示或块级换行展示',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '子元素默认布局'
        }, {
          title: '子元素行内布局'
        }, {
          title: '子元素块级布局'
        }]
      },
      if: _ => _.mode === 'inline' || _.mode === 'block'
    })
    layout: 'none' | 'inline' | 'block' = 'none';
    @Prop({
      group: '状态属性',
      title: '加载中图标',
      description: '加载状态中显示的图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    loadingIcon: nasl.core.String = 'loading';
    @Prop({
      group: '状态属性',
      title: '加载中图标旋转',
      description: '设置加载中图标是否旋转，默认开启。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    loadingIconRotate: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '加载中文案',
      description: '加载状态中显示的文案',
      implicitToString: true,
    })
    loadingText: nasl.core.String = '';
    @Prop<VanLinearLayoutOptions, 'mode'>({
      group: '样式属性',
      title: '布局模式',
      description: '设置布局模式',
      tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/020.%E7%BA%BF%E6%80%A7%E5%B8%83%E5%B1%80.html',
      bindHide: true,
      setter: {
        concept: "CapsulesSetter",
        options: [{
          title: '行内',
          icon: 'layout-inline-block',
          tooltip: '内联布局'
        }, {
          title: '块级',
          icon: 'layout-block',
          tooltip: '块级布局'
        }, {
          title: '弹性',
          icon: 'layout-flex',
          tooltip: '弹性布局'
        }]
      },
      onChange: [{
        clear: ['justify', 'alignment', 'wrap', 'layout']
      }]
    })
    mode: 'inline' | 'block' | 'flex' = 'block';
    @Prop<VanLinearLayoutOptions, 'direction'>({
      group: '样式属性',
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
      onChange: [{
        clear: ['justify', 'alignment']
      }]
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';
    @Prop<VanLinearLayoutOptions, 'justify'>({
      group: '主要属性',
      title: '横轴对齐',
      docDescription: `主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布，其中平均分布仅在弹性布局模式下展示。
主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度，其中占满容器宽度仅在弹性布局模式下展示。`,
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
          tooltip: '平均分布(两端不留空)',
          if: _  => _.mode === 'flex' || _.direction === 'horizontal'
        }, {
          title: '平均分布',
          icon: 'horizontal-justify-space-around',
          tooltip: '平均分布',
          if: _  => _.mode === 'flex'
        }]
      },
      if: _ => _.direction === 'horizontal' || _.mode === 'inline' && _.direction === 'vertical' || _.mode === 'block' && _.direction === 'vertical',
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
      }],
      tabKind: 'style'
    })
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';
    @Prop<VanLinearLayoutOptions, 'alignment'>({
      group: '主要属性',
      title: '纵轴对齐',
      docDescription: `主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。
主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。`,
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
    @Prop<VanLinearLayoutOptions, '_alignment'>({
      group: '主要属性',
      title: '纵轴对齐',
      docDescription: `主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。
主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。`,
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
    @Prop<VanLinearLayoutOptions, '_justify'>({
      group: '主要属性',
      title: '横轴对齐',
      docDescription: `主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布，其中平均分布仅在弹性布局模式下展示。
主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度，其中占满容器宽度仅在弹性布局模式下展示。`,
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
    _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';
    @Prop<VanLinearLayoutOptions, 'wrap'>({
      group: '样式属性',
      title: '换行',
      description: '弹性布局下子元素总宽度超出父级时子元素是否换行展示',
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.mode === 'flex'
    })
    wrap: nasl.core.Boolean = true;
    @Event({
      title: '点击后',
      description: '点击此项时触发'
    })
    onClick: (event: nasl.ui.BaseEvent) => void;
    @Slot({
      title: 'undefined',
      description: '内容'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
