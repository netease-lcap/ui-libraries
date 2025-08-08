/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      slotWrapperInlineStyle: {
        action: 'display: inline-block',
      },
      translateBindingProperty: ["content"],
    }
  })
  
  @Component({
    title: '文本省略',
    icon: 'text-ellipsis',
    description: '对长文本进行省略，支持展开/收起。',
    group: 'Display',
  })
  export class VanTextEllipsis extends ViewComponent {
    @Event({
      title: '切换文本的展开状态',
      description: '切换文本的展开状态，传 true 为展开，false 为收起，不传参为切换',
    })
    toggle: (expanded?: nasl.core.Boolean) => void;

    constructor(options?: Partial<VanTextEllipsisOptions>) {
      super();
    }
  }

  export class VanTextEllipsisOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '展示的行数',
      description: '展示的行数',
      setter: { concept: 'InputSetter' },
    })
    rows: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '需要展示的文本',
      description: '需要展示的文本',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '展开操作的文案',
      description: '展开操作的文案',
      setter: { concept: 'InputSetter' },
    })
    expandText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '收起操作的文案',
      description: '收起操作的文案',
      setter: { concept: 'InputSetter' },
    })
    collapseText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '省略号的文本内容',
      description: '省略号的文本内容',
      setter: { concept: 'InputSetter' },
    })
    dots: nasl.core.String = '...';

    @Prop({
      group: '主要属性',
      title: '省略位置',
      description: '省略位置',
      setter: {
        concept: "EnumSelectSetter",
        options: [
          { title: '开始'},
          { title: '中间' },
          { title: '结束' },
        ]
      }
    })
    position: 'start' | 'middle' | 'end' = 'end';

    @Prop({
      group: '主要属性',
      title: '自定义操作',
      description: '开启后展开/收起区域会显示自定义操作',
      setter: {
        concept: "SwitchSetter",
      }
    })
    isCustomAction: nasl.core.Boolean = false;

    @Event({
      title: '点击展开/收起时触发',
      description: '点击展开/收起时触发',
    })
    onClickAction: () => void;

    // TODO LD:这里的 slot 需要接收参数，应该怎么设置？
    @Slot({
      title: '自定义操作',
      description: '自定义操作',
    })
    slotAction: (current: { expanded: nasl.core.Boolean }) => Array<ViewComponent>;
  }
} 