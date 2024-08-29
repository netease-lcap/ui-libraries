/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      automate: [
        {
          command: "WRAP_FREE",
          useblock: 0
        }
      ]
    }
  })
  @Component({
    title: '线性布局',
    icon: 'linear-layout',
    description: '内部元素按照一定的规则布局',
    group: 'Layout',
  })
  export class ElFlex extends ViewComponent {
    constructor(options?: Partial<ElFlexOptions>) {
      super();
    }
  }

  export class ElFlexOptions extends ViewComponentOptions {
    @Prop<ElFlexOptions, 'mode'>({
      group: '样式属性',
      title: '布局模式',
      description: '设置布局模式',
      bindHide: true,
      tabKind: 'style',
      setter: {
        concept: "CapsulesSetter",
        options: [{
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
        clear: ['justify', 'alignment', 'wrap', 'layout'],
      }],
    })
    mode: 'block' | 'flex' = 'flex';

    @Prop<ElFlexOptions, 'direction'>({
      group: '主要属性',
      title: '主轴方向',
      docDescription: `横向：内部子元素进行横向排布，建议内部子元素使用行内布局。
纵向：内部子元素进行纵向排布，建议内部子元素使用块级布局。`,
      bindHide: true,
      setter: {
        concept: 'CapsulesSetter',
        options: [
          { title: '横向排列', icon: 'flex-horizontal', tooltip: '横向' },
          { title: '纵向排列', icon: 'flex-vertical', tooltip: '纵向' },
        ],
      },
      onChange: [
        { update: { alignment: 'start', justify: 'start' }, if: (_) => _ === 'horizontal' },
        { update: { alignment: 'stretch', justify: 'start' }, if: (_) => _ === 'vertical' },
      ],
      tabKind: 'style',
      if: (_) => _.mode === 'flex',
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Prop<ElFlexOptions, 'justify'>({
      group: '主要属性',
      title: '横轴对齐',
      docDescription: `主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布，其中平均分布仅在弹性布局模式下展示。
主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度，其中占满容器宽度仅在弹性布局模式下展示。`,
      bindHide: true,
      setter: {
        concept: 'CapsulesSetter',
        options: [
          {
            title: '左对齐',
            icon: 'horizontal-justify-start',
            tooltip: '左对齐',
          },
          {
            title: '居中对齐',
            icon: 'horizontal-justify-center',
            tooltip: '居中对齐',
          },
          {
            title: '右对齐',
            icon: 'horizontal-justify-end',
            tooltip: '右对齐',
          },
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
      tabKind: 'style',
      onChange: [
        { update: { gutter: 12 }, if: (_) => _ === 'space-between' },
        { update: { gutter: 12 }, if: (_) => _ === 'space-around' },
      ],
      if: (_) => _.mode === 'flex',
    })
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' =
      'start';

    @Prop<ElFlexOptions, 'alignment'>({
      group: '主要属性',
      title: '纵轴对齐',
      docDescription: `主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。
主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。`,
      bindHide: true,
      setter: {
        concept: 'CapsulesSetter',
        options: [
          {
            title: '顶对齐',
            icon: 'horizontal-alignment-start',
            tooltip: '顶对齐',
          },
          {
            title: '垂直居中',
            icon: 'horizontal-alignment-center',
            tooltip: '垂直居中',
          },
          {
            title: '底对齐',
            icon: 'horizontal-alignment-end',
            tooltip: '底对齐',
          },
          {
            title: '行内文字基线对齐',
            icon: 'horizontal-alignment-baseline',
            tooltip: '行内文字基线对齐',
          },
          {
            title: '占满容器高度',
            icon: 'horizontal-alignment-stretch',
            tooltip: '占满容器高度',
          },
        ],
      },
      tabKind: 'style',
      if: (_) => _.mode === 'flex',
    })
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'start';

    @Prop<ElFlexOptions, 'wrap'>({
      group: '主要属性',
      title: '换行',
      description: '设置弹性布局下子元素总宽度超出父级时子元素是否换行展示',
      docDescription:
        '支持控制弹性布局模式下，子元素总宽度超过父级时是否换行展示，默认开启。',
      setter: {
        concept: 'SwitchSetter',
      },
      tabKind: 'style',
      if: (_) => _.mode === 'flex',
    })
    wrap: nasl.core.Boolean = true;

    @Prop<ElFlexOptions, 'gutter'>({
      group: '样式属性',
      title: '内容间隙',
      description: '内容块间隙大小',
      docDescription:
        '布局内各个组件之间的间隔，通常有收缩、无、小、正常、大，默认为正常。',
      tabKind: 'style',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.mode === 'flex' && _.justify !== 'space-between' && _.justify !== 'space-around',
    })
    gutter: nasl.core.Decimal | nasl.core.Integer = 12;

    @Prop({
      group: '状态属性',
      title: '加载中',
      description: '加载中状态',
      docDescription: '加载中状态',
      settable: true,
      setter: {
        concept: 'SwitchSetter',
      }
    })
    loading: nasl.core.Boolean = false;

    @Prop({
        group: '状态属性',
        title: '加载中文案',
        description: '加载中状态显示的提示文案',
        docDescription: '支持编辑组件加载中情况显示文案。',
        implicitToString: true,
    })
    loadingText: nasl.core.String = '';

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '滚动时',
      description: '滚动时触发',
    })
    onScroll: (event: {
      scrollTop: nasl.core.Integer;
      scrollLeft: nasl.core.Integer;
      scrollWidth: nasl.core.Integer;
      scrollHeight: nasl.core.Integer;
      clientWidth: nasl.core.Integer;
      clientHeight: nasl.core.Integer;
    }) => any;

    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
