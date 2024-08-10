/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '时间线',
    icon: 'timeline',
    description: '可视化地呈现时间流信息。',
    group: 'Display',
  })
  export class ElTimeline extends ViewComponent {
    constructor(options?: Partial<ElTimelineOptions>) {
      super();
    }
  }

  export class ElTimelineOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Reverse',
      description: '指定节点排序方向，默认为正序',
      setter: { concept: 'SwitchSetter' },
    })
    reverse: nasl.core.Boolean = false;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: 'Timeline Item',
          code: '<el-timeline-item></el-timeline-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Timeline Item',
    icon: 'timeline-item',
    description: '',
    group: 'Display',
  })
  export class ElTimelineItem extends ViewComponent {
    constructor(options?: Partial<ElTimelineItemOptions>) {
      super();
    }
  }

  export class ElTimelineItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Timestamp',
      description: '时间戳',
      setter: { concept: 'InputSetter' },
    })
    timestamp: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Hide Timestamp',
      description: '是否隐藏时间戳',
      setter: { concept: 'SwitchSetter' },
    })
    hideTimestamp: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Placement',
      description: '时间戳位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'top' }, { title: 'bottom' }],
      },
    })
    placement: 'top' | 'bottom' = 'bottom';

    @Prop({
      group: '主要属性',
      title: 'Type',
      description: '节点类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'primary' },
          { title: 'success' },
          { title: 'warning' },
          { title: 'danger' },
          { title: 'info' },
          { title: '默认' }
        ],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | '' = '';

    @Prop({
      group: '主要属性',
      title: 'Color',
      description: '节点颜色',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'hsl' },
          { title: 'hsv' },
          { title: 'hex' },
          { title: 'rgb' },
          { title: '默认' }
        ],
      },
    })
    color: 'hsl' | 'hsv' | 'hex' | 'rgb' | '' = '';

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '节点尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'normal' }, { title: 'large' }],
      },
    })
    size: 'normal' | 'large' = 'normal';

    @Prop({
      group: '主要属性',
      title: 'Icon',
      description: '节点图标',
      setter: { concept: 'InputSetter' },
    })
    icon: nasl.core.String = '';

    @Slot({
      title: 'Default',
      description: 'Timeline-Item 的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Dot',
      description: '自定义节点',
    })
    slotDot: () => Array<ViewComponent>;
  }
}
