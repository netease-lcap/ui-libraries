/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
  })
  @Component({
    title: '卡片',
    icon: 'card',
    description: '将信息聚合在卡片容器中展示。',
    group: 'Container',
  })
  export class ElCard extends ViewComponent {
    constructor(options?: Partial<ElCardOptions>) {
      super();
    }
  }

  export class ElCardOptions extends ViewComponentOptions {


    // @Prop({
    //   group: '主要属性',
    //   title: '设置 body 的样式',
    //   description: '设置 body 的样式',
    //   setter: { concept: 'InputSetter' },
    // })
    // bodyStyle: object = { padding: '20px' };

    @Prop({
      group: '主要属性',
      title: '设置阴影显示时机',
      description: '设置阴影显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '总是' }, { title: '悬浮' }, { title: '不显示' }],
      },
    })
    shadow: 'always' | 'hover' | 'never' = 'always';

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: MouseEvent) => any;

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: MouseEvent) => any;

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: MouseEvent) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: MouseEvent) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: MouseEvent) => any;

    @Slot({
      title: '卡片内容',
      description: '卡片内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '卡片头部',
      description: '卡片头部',
    })
    slotHeader: () => Array<ViewComponent>;
  }
}
